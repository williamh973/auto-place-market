import { User } from "./user.model";

export class Message {
    constructor(
        public resume: string,
        public timestamp: Date,
        public user: User,
        public id?: number,
        public isExpanded?: boolean,
    ) { }
}
 
  