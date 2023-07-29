import { Card } from "./card.model";

export class User {
    constructor(
        public firstname: string,
        public lastname: string,
        public pseudo: string,
        public email: string,
        public cardList: Card[],
        public favoriteList: number[] = [],
        public role: "ROLE_USER" | "ROLE_ADMIN",
        public id?: number
    ) {}  
} 