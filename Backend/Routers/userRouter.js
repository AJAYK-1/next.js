import express from 'express'
import { DeleteFeedback, EditFeedback, ExistingFeedback, NewFeedback, SignIn, UserSignUp } from '../Controllers/userController.js'
import TokenAuthentication from '../Middleware/TokenVerification.js'
const userRouter = express.Router()

userRouter.post('/user-signup', UserSignUp)
userRouter.post('/signIn', SignIn)
userRouter.get('/existing-feedback/:id', TokenAuthentication, ExistingFeedback)
userRouter.post('/add-feedback/:id', TokenAuthentication, NewFeedback)
userRouter.put('/edit-feedback/:id', TokenAuthentication, EditFeedback)
userRouter.delete('/delete-feedback/:id', TokenAuthentication, DeleteFeedback)

export default userRouter