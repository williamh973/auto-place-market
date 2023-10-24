import { User } from "./user.model";

export class Notification {
    constructor(
        public resume: string,
        public timestamp: Date,
        public user: User,
        public id?: number,
        public isExpanded?: boolean,
    ) { }
} 

   