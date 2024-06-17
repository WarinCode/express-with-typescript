import type { RequestHandler } from "express";
import type { Users } from "..";

export interface User {
    firstname: string;
    lastname: string;
    age: number;
    sex: string;
    birthday: string;
    id: string;
    email: string;
    password: string;
}
export interface UserModel {
    users: Users;
}
export interface CRUDOperations<T extends UserModel, D extends User> {
    read(): Promise<T | null>;
    create(data: D): Promise<void>;
    update(id: string, data: Partial<D>): Promise<void>;
    delete(id: string): Promise<void>;
}
export interface Sender<T = RequestHandler> {
    sendHtmlFile: T;
    sendData: T;
    sendAllData: T;
}
export interface UserManagement<T = RequestHandler> {
    createUser: T;
    updateUser: T;
    deleteUser: T;
}
export interface Params {
    id: string;
}