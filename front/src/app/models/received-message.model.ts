import { User } from "./user.model";

export class ReceivedMessage {
    constructor(
        public resume: string,
        public timestamp: Date,
        public sender: User,
        public receiver: User,
        public id?: number,
        public isExpanded?: boolean,
    ) { }
} 

   