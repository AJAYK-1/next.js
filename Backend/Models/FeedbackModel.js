import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User_Docs' },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    sentiment: { type: String },
}, { timestamps: true })

const FeedbackModel = mongoose.model('Feedback_Docs', FeedbackSchema)

export default FeedbackModel