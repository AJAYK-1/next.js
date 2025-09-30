import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    userId: mongoose.SchemaTypes.ObjectId,
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    sentiment: { type: String },
}, { timestamps })

const FeedbackModel = mongoose.model('Feedback_Docs', FeedbackSchema)

export default FeedbackModel