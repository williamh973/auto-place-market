import { Card } from "./card.model";

export class Favorite {
    constructor(
        public card: Card,
        public id?: number
    ) { }
}
