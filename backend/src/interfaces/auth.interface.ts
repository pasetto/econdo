import { User } from "./user.interface";

export interface Auth {
    id: string;
    name: string;
    drawnDate: Date;
    deliveryDate: Date;
    deliveryPlace: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
}

export interface AuthRegister {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface AuthLogin {
    email: string;
    password: string;
}

export interface AuthToken {
    accessToken: string;
}

export interface AuthMe {
    id: string;
    name: string;
    email: string;
    phone: string;
    password?: string;
    isAdmin?: boolean;
    isVerified?: boolean;
    accessToken?: string;
}
  
export interface AuthRepository {
    // create(data: AuthCreate): Promise<Auth>;
    // findAll(): Promise<Auth[]>;
    // findById(id: string): Promise<Auth | null>;
    // update(id: string, data: AuthCreate): Promise<Auth>;
    // delete(id: string): Promise<boolean>;
    login(email: string): Promise<AuthMe>;
    register(data: AuthRegister): Promise<User>;
    validateToken(token: string): Promise<boolean>;
    refreshToken(token: string): Promise<string>;
    logout(token: string): Promise<boolean>;
    me(token: string): Promise<Auth>;
}
  