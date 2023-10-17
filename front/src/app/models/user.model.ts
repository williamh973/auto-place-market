import { Card } from "./card.model";
import { Favorite } from "./favorite.model";
import { ReceivedMessage } from "./received-message.model";

export class User {
    constructor(
        public firstname: string,
        public lastname: string,
        public pseudo: string,
        public email: string,
        public blocked: boolean,
        public cardList: Card[],
        public favoriteList: Favorite[],
        public historicMessagesList: ReceivedMessage[],
        public receivedMessagesList: ReceivedMessage[],
        public role: "ROLE_USER" | "ROLE_ADMIN",
        public id?: number
    ) {}  
}  