export declare enum UserRole {
    ADMIN = "ADMIN",
    STAFF = "STAFF"
}
export declare class User {
    id: string;
    name: string;
    username: string;
    passwordHash: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
