import mongoose, { Schema } from "mongoose"
import { IAuditDatabase } from "src/@types/audit"


const auditSchema: Schema = new Schema({
    Aakash: {
        Deekshit: { type: Number },
        Subash: { type: Number },
        Rohan: { type: Number }
    },
    Deekshit: {
        Aakash: { type: Number },
        Subash: { type: Number },
        Rohan: { type: Number }
    },
    Subash: {
        Aakash: { type: Number },
        Deekshit: { type: Number },
        Rohan: { type: Number }
    },
    Rohan: {
        Aakash: { type: Number },
        Deekshit: { type: Number },
        Subash: { type: Number }
    },
},
    {
        timestamps: true
    }
)

export default mongoose.model<IAuditDatabase>("Audit", auditSchema)