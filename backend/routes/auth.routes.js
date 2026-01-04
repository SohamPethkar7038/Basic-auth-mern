import express from 'express'
import { Router } from 'express'

import { registerUser } from '../controller/user.controller.js'
import { loginUser } from '../controller/user.controller.js'
import User from '../models/User.models.js'

const router=Router();
router.route('/register').post(registerUser);

router.route('/login').post(loginUser);


export default router;
