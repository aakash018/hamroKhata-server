import { Document } from "mongoose"

interface IAakash {
    Deekshit: Number,
    Subash: Number,
    Yaman: Number
}

interface IDeekshit {
    Aakash: Number,
    Subash: Number,
    Yaman: Number
}

interface ISubash {
    Aakash: Number,
    Deekshit: Number,
    Yaman: Number
}

interface IYaman {
    Aakash: Number,
    Deekshit: Number, 
    Subash: Number
}

export interface IAuditDatabase extends Document {
    Aakash: IAakash,
    Deekshit: IDeekshit,
    Subash: ISubash,
    Yaman: IYaman,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IAudit {
    [key: number] : any
    Aakash: IAakash,
    Deekshit: IDeekshit,
    Subash: ISubash,
    Yaman: IYaman
}