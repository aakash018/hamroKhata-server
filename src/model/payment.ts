import mongoose, { Schema } from "mongoose"
import { IPayment } from "src/@types/global"

const paymentSchema: Schema = new Schema({
    amount:
    {
        type: Number,
        required: true
    },

    paid_by:
    {
        type: String,
        required: true
    },

    paid_to:
    {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model<IPayment>("Payment", paymentSchema)