import FeedbackModel from "../Models/FeedbackModel.js";
import UserModel from "../Models/UserModel.js";

export const AdminViewFeedbacks = async (req, res) => {
    try {
        const allFeedbacks = await FeedbackModel.find().populate('userId')
        if (!allFeedbacks) return res.status(404).json({ message: 'No Feedbacks found.' })
        return res.status(200).json({ message: 'Feedbacks fetched successfully', data: allFeedbacks })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error' })
    }
}

export const AdminViewUsers = async (req, res) => {
    try {
        const allUsers = await UserModel.find()
        if (!allUsers) return res.status(404).json({ message: 'No Users found.' })
        return res.status(200).json({ message: 'Users fetched successfully', data: allUsers })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error' })
    }
}