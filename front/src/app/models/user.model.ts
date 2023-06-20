import { Card } from "./card.model";

export class User {
    constructor(
        public pseudo: string,
        public cardList: Card[],
        public id?: number
    ) { }
}