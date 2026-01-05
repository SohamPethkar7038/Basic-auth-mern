import express from 'express'
import { Router } from 'express'

import User from '../models/User.models.js'
import { registerUser, loginUser } from '../controller/user.controller.js';
import { verifyJWT } from '../middlewares/userAunthetication.middleware.js'

const router=Router();
router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.get('/profile', verifyJWT, (req, res) => {
    res.json({ user: req.user });  // req.user is set by verifyJWT
});





export default router;
