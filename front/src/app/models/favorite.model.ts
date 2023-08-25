import { Card } from "./card.model";
import { User } from "./user.model";

export class Favorite {
    constructor(
        public card: Card,
        public user: User,
        public id?: number
    ) { }
}
