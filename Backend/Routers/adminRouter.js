import express from 'express'
import { AdminViewFeedbacks, AdminViewUsers } from '../Controllers/adminController.js'
import TokenAuthentication from '../Middleware/TokenVerification.js'
const adminRouter = express.Router()

adminRouter.get('/view-all-feedbacks', TokenAuthentication, AdminViewFeedbacks)
adminRouter.get('/view-all-users', TokenAuthentication, AdminViewUsers)

export default adminRouter