import express from 'express'
import { AdminViewFeedbacks } from '../Controllers/adminController.js'
import TokenAuthentication from '../Middleware/TokenVerification.js'
const adminRouter = express.Router()

adminRouter.get('/view-all-feedbacks', TokenAuthentication, AdminViewFeedbacks)

export default adminRouter