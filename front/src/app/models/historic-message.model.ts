import { User } from "./user.model";

export class HistoricMessage {
    constructor(
        public resume: string,
        public timestamp: Date,
        public receiver: User,
        public id?: number,
        public isExpanded?: boolean,
    ) { }
} 

   