import { Card } from "./card.model";

export class Picture {
    constructor(
        public src: string, 
        public card: Card,
        public id?: number
        ) {}
}