import { User } from "./user.model";

export class Card {
    constructor(
        public cardId: number,
        public image: string,
        public title: string,
        public resume: string,
        public fuel: string,
        public kilometer: number,
        public door: number,
        public price: number,
        public transmission: string,
        public user: User,
        public id?: number
    ) { }
}