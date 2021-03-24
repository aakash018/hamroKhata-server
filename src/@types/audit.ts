import { Document } from "mongoose"

interface IAakash {
    Deekshit: Number,
    Subash: Number,
    Rohan: Number
}

interface IDeekshit {
    Aakash: Number,
    Subash: Number,
    Rohan: Number
}

interface ISubash {
    Aakash: Number,
    Deekshit: Number,
    Rohan: Number
}

interface IRohan {
    Aakash: Number,
    Deekshit: Number,
    Subash: Number
}

export interface IAuditDatabase extends Document {
    Aakash: IAakash,
    Deekshit: IDeekshit,
    Subash: ISubash,
    Rohan: IRohan,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IAudit {
    [key: number]: any
    Aakash: IAakash,
    Deekshit: IDeekshit,
    Subash: ISubash,
    Rohan: IRohan,
    _id: string
}