import mongoose, { Schema } from "mongoose"
import { ILogs } from "src/@types/global"

const logsSchema: Schema = new Schema({
    amount:
    {
        type: Number,
        required: true
    },

    paid_By:
    {
        type: String,
        required: true
    },

    description:
    {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model<ILogs>("Logs", logsSchema)