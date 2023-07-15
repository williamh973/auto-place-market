import { RentPictures } from "./rent-pictures.model";
import { User } from "./user.model";

export class Card {
    constructor(
        // public pictures: RentPictures[],
        public image: string,
        public title: string,
        public resume: string,
        public price: number,
        public kilometer: number,
        public door: number,
        public transmission: string,
        public fuel: string,
        public year: number,
        public user: User,
        public id?: number
    ) { }
}

