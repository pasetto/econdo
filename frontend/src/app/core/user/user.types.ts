export interface User
{
    id: string;
    name: string;
    email: string;
    password?: string;
    phone: string;
    accessToken?: string;
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
}