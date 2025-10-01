import UserModel from "../Models/UserModel.js";
import FeedbackModel from "../Models/FeedbackModel.js";
import jwt from 'jsonwebtoken'

export const UserSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const isUserPresent = await UserModel.findOne({ email })
        if (!isUserPresent) {
            const newUser = await UserModel.create({ name, email, password })
            await newUser.save()
            return res.status(201).json({ message: 'User Registration Successful' })
        }
        return res.status(409).json({ message: 'User already Exists' })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error' })
    }
}

export const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const secretKey = process.env.JWT_SECRET || 'my_Secret_key'
        if (email === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ id: process.env.ADMIN_ID, role: 'admin' }, secretKey, { expiresIn: '1h' })
            return res.status(200).json({ message: 'SignIn Successful, Redirecting to admin dashboard.', token: token })
        }

        const isUser = await UserModel.findOne({ email })
        if (!isUser) return res.status(404).json({ message: 'User not found.' })
        if (isUser.password === password) {
            const token = jwt.sign({ id: isUser.id, role: 'user' }, secretKey, { expiresIn: '1h' })
            return res.status(200).json({ message: 'SignIn Successful...', token: token })
        }
        return res.status(401).json({ message: 'SignIn failed.' })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error' })
    }
}

export const ExistingFeedback = async (req, res) => {
    try {
        const id = req.params.id
        const userfeedback = await FeedbackModel.findOne({ userId: id }).populate("userId")
        console.log(userfeedback);

        if (userfeedback) return res.status(200).json({ message: 'Feedback Exists', data: userfeedback })
        return res.status(404).json({ message: 'Feedback not found.' })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error' })
    }
}

export const NewFeedback = async (req, res) => {
    try {
        const id = req.params.id
        const { rating, comment } = req.body
        // const ExistingFeedback = await FeedbackModel.findOne({ userId: id }).populate("userId")

        // if (ExistingFeedback) return res.status(409).json({ message: 'Feedback already Exists.' })

        const newFeedback = await FeedbackModel.create({ userId: id, rating, comment })
        await newFeedback.save()
        return res.status(201).json({ message: 'Feedback Added Successfully' })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error' })
    }
}

export const EditFeedback = async (req, res) => {
    try {
        const id = req.params.id
        const { rating, comment } = req.body
        const EditedFB = await FeedbackModel.findOne({ userId: id })
        if (!EditedFB) return res.status(404).json({ message: 'Feedback not found.' })
        EditedFB.rating = rating
        EditedFB.comment = comment
        await EditedFB.save()
        return res.status(201).json({ message: 'Feedback edited successfully.' })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error' })
    }
}

export const DeleteFeedback = async (req, res) => {
    try {
        const id = req.params.id
        await FeedbackModel.findOneAndDelete({ userId: id })
        return res.status(201).json({ message: 'Feedback Deleted Successfully.' })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error' })
    }
}