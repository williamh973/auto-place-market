import { User } from "./user.model";

export class Card {
    constructor(
        public cardId: number,
        public image: string,
        public title: string,
        public resume: string,
        public userList: User[],
        public id?: number
    ) { }
}