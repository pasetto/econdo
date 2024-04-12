export interface User {
	id: string;
	name: string;
	email:  string;
	phone:  string;
	password?: string;
	isAdmin?:  boolean;
	isVerified?: boolean;
	createdAt:  Date;
	updatedAt:  Date;
}

export interface UserCreate {
	name: string;
	email: string;
	phone: string;
	password?: string;
}
export interface UserRepository {
	findAll(): Promise<User[]>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(data: UserCreate): Promise<User>;
	update(id: string, data: UserCreate): Promise<User>;
	delete(id: string): Promise<boolean>;
}
