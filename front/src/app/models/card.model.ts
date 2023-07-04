import { User } from "./user.model";

export class Card {
    constructor(
        public cardId: number,
        public image: string,
        public title: string,
        public resume: string,
        public price: number,
        public kilometer: number,
        public door: number,
        public user: User,
        public id?: number
    ) { }
}