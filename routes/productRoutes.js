import express from 'express'
import { requireSignIn } from '../moddlewares/authMiddleware'
const router=express.Router()

//routers
router.post('/create-product',requireSignIn,is)