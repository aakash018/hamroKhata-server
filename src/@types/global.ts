import { Document } from "mongoose"

export interface IEntry {
    amount: number,
    paid_by: string,
    description: string,
    freeze: boolean,
    frozenRoomies: Array<string>
}

export interface Logs extends Document {
    _id: string,
    amount: number,
    paid_By: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
}

export interface IPayment extends Document {
    paid_by: string,
    paid_to: string,
    amount: number,
    paid_time: Date
}
