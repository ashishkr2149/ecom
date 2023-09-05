import express from 'express';
import { registerController, loginController, forgotPasswordController } from '../controllers/authController.js'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'

//Router object
const router = express.Router();

//Routing

//REGISTER || METHOD POST
router.post('/register', registerController)

//LOGIN || METHOD POST
router.post('/login', loginController)

//FORGOT PASSWORD || METHOD POST
router.post('/forgot-password', forgotPasswordController)

//PROTECTED USER ROUTE AUTH
router.get('/user-auth',requireSignIn, (req, res) => {
	res.status(200).send({ok: true});
})

//PROTECTED ADMIN  ROUTE AUTH
router.get('/admin-auth',requireSignIn, isAdmin,  (req, res) => {
	res.status(200).send({ok: true});
})

export default router