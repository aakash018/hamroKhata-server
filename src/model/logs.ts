import mongoose, {Schema} from "mongoose"
import { Logs } from "src/@types/global"

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

export default mongoose.model<Logs>("Logs",logsSchema)