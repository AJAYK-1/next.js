import UserModel from "../Models/UserModel.js";
import FeedbackModel from "../Models/FeedbackModel.js";
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import natural from 'natural'

export const UserSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (email === process.env.ADMIN_ID) return res.status(409).json({ message: 'User already Exists' })

        const isUserPresent = await UserModel.findOne({ email })
        if (!isUserPresent) {
            const hashedPassword = await argon2.hash(password)
            const newUser = await UserModel.create({ name, email, password: hashedPassword })
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

        const passwordCheck = await argon2.verify(isUser.password, password)
        if (passwordCheck) {
            const token = jwt.sign({ id: isUser.id, role: 'user' }, secretKey, { expiresIn: '1h' })
            return res.status(200).json({ message: 'SignIn Successful...', token: token })
        }
        return res.status(401).json({ message: 'Incorrect Email or Password.' })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error' })
    }
}

let classifier;
// Load trained model from JSON
natural.BayesClassifier.load("./Data/sentiment_model_bayes.json", null, (err, loadedClassifier) => {
    if (err) {
        console.error("-----------Failed to load model-----------", err);
    } else {
        classifier = loadedClassifier;
        console.log("---------Model loaded----------");
    }
});

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

        if (!classifier) return res.status(503).json({ message: "Model not ready" })
        const formattedComment = comment.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ").trim()
        const sentiment = classifier.classify(formattedComment)

        const newFeedback = await FeedbackModel.create({ userId: id, rating, comment, sentiment })
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

        if (!classifier) return res.status(503).json({ message: "Model not ready" })
        const formattedComment = comment.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ").trim()
        const sentiment = classifier.classify(formattedComment)

        const EditedFB = await FeedbackModel.findOne({ userId: id })
        if (!EditedFB) return res.status(404).json({ message: 'Feedback not found.' })

        EditedFB.rating = rating
        EditedFB.comment = comment
        EditedFB.sentiment = sentiment
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