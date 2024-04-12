import { Auth, AuthLogin, AuthRegister, AuthToken, AuthMe, AuthRepository } from '../interfaces/auth.interface';
import { AuthRepositoryPrisma } from '../repositories/auth.repository';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { User, UserRepository } from '../interfaces/user.interface';
import { UserRepositoryPrisma } from '../repositories/user.repository';
import UserNotificationService from "../services/userNotification.service";
// import user validators
import { validateEmail, validatePassword } from './../validators/userValidator';
import { ErrorHandler } from './../handlers/errorHandler';

export class AuthUseCase {
	private authRepository: AuthRepository;
	private userRepository: UserRepository;
	private userNotificationService = new UserNotificationService();
	constructor() {
		this.authRepository = new AuthRepositoryPrisma();
		this.userRepository = new UserRepositoryPrisma();
	}
	
	async login(email: string, password: string): Promise<AuthMe> {
		if (!validateEmail(email)) throw new ErrorHandler('Invalid email', 400);

		const user = await this.authRepository.login(email);
		if (!user) throw new ErrorHandler('Invalid email or password', 400);

		const isMatch = user && (await bcrypt.compare(password, user?.password || ""));
		if (!user || !isMatch) throw new ErrorHandler('Invalid email or password', 400);

		user.accessToken = await this._generateToken(user); // Await the generateToken function
		delete user.password;

		return user;
	}
	
	async register({ name, email, phone, password }: AuthRegister): Promise<User> {
		if (!validateEmail(email)) throw new ErrorHandler('Invalid email', 400);
		if (!validatePassword(password)) throw new ErrorHandler('Invalid password', 400);

		const user = await this.userRepository.findByEmail(email);
		if (user) throw new ErrorHandler("Users already exists", 400);
		
		const passwordHash = await bcrypt.hash(password, 10);
		const result = await this.authRepository.register({ name, email, phone, password: passwordHash });

		this.userNotificationService.sendNotification(
			{ name, email, phone },
			"Conta criada com sucesso",
			`Olá ${name}, sua conta foi criada com sucesso!<br>Agora você já pode criar um amigo secreto e convidar seus amigos!`
		);
		delete result.password;
		return result;
	}
	
	async validateToken(token: string): Promise<boolean> {
		console.log("token", token);
		const decodedToken = this._decodeToken(token);
		console.log("decodedToken", decodedToken);
		const user = await this.userRepository.findByEmail(decodedToken.email);
		if (!user) throw new ErrorHandler('Invalid token 2', 400);
		return true;
	}
	
	async refreshToken(token: string): Promise<string> {
		const result = await this.authRepository.refreshToken(token);
		return result;
	}
	
	// fazer logout
	async logout(token: string): Promise<boolean> {
		const result = await this.authRepository.logout(token);
		return result;
	}
	
	async me(token: string): Promise<AuthMe> {
		console.log("token", token);
		const decodedToken = await this._decodeToken(token).then((res) => res);
		console.log("decodedToken", decodedToken);
		const user = await this.userRepository.findByEmail(decodedToken.email);
		if (!user) throw new ErrorHandler('User not found', 400);
		delete user.password;
		return {...user, accessToken: token.replace("Bearer ", "")};
	}

	async recover(data: { email: string }): Promise<boolean> {
		const user = await this.userRepository.findByEmail(data.email);
		if (!user) throw new ErrorHandler('User not found', 400);
		const password = Math.random().toString(36).slice(-8);
		user.password = await bcrypt.hash(password, 10);
		const userUpdated = await this.userRepository.update(user.id, user);
		if(!userUpdated) throw new ErrorHandler('Error updating user', 400);
		this.userNotificationService.sendNotification(
			{ name: user.name, email: user.email, phone: user.phone },
			"Recuperação de senha?",
			`Olá ${user.name}, sua nova senha de acesso é ${password}!`
		);
		return true;
	}
			
	async _generateToken(user: AuthMe): Promise<string> {
		return jsonwebtoken.sign({ id: user.id, email: user.email, name: user.name}, process.env.JWT_SECRET || "secret", { expiresIn: process.env.JWT_EXPIRES_IN });
	}

	async _decodeToken(token: string) {
		token = token.replace("Bearer ", "");
		return jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err, decoded) => { if (err) throw new ErrorHandler('Invalid token', 400); return decoded; });
	}
}
