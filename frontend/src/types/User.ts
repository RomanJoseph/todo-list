export type User = {
    id: string;
    created_at: Date;
    updated_at: Date;
} & UserCreate;

export type UserCreate = {
    name: string;
    email: string;
}