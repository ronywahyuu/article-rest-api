import express from 'express';
import { all, signin, signup } from '../controllers/UserController.js';
const router = express.Router()

// get all users
router.get('/users', all)

// sign up 
router.post('/signup', signup)

// sign in 
router.post('/signin', signin)

export default router