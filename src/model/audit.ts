import mongoose, {Schema} from "mongoose"
import { Logs } from "src/@types/global"

const auditSchema: Schema = new Schema({
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
    },

    currentTime: 
    {
        type: Date,
        default: Date.now(),
        required: true,
    }

})

export default mongoose.model<Logs>("Logs",auditSchema)