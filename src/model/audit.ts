import mongoose, {Schema} from "mongoose"
import { IAuditDatabase } from "src/@types/audit"


const auditSchema: Schema = new Schema({
    Aakash: {
        Deekshit: { type: Number, required: true },
        Subash: { type: Number, required: true },
        Yaman: { type: Number, required: true }
    },
    Deekshit: {
        Aakash: { type: Number, required: true },
        Subash: { type: Number, required: true },
        Yaman: { type: Number, required: true }
    },
    Subash: {
        Aakash: { type: Number, required: true },
        Deekshit: { type: Number, required: true },
        Yaman: { type: Number, required: true }
    },
    Yaman: {
        Aakash: { type: Number, required: true },
        Deekshit: { type: String, required: true },
        Subash: { type: String, required: true }
    }

})

export default mongoose.model<IAuditDatabase>("Audit",auditSchema)