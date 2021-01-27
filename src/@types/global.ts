import { Document } from "mongoose"

export interface Entry_Payload {
    amount: number,
    paid_by: string,
    description: string
}

export interface Logs extends Document {
    id: string,
    amount: number,
    paid_By: string,
    description: string,
    currentTime: Date
}