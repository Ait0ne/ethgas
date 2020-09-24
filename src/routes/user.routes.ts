import express from 'express';
import {postUpdateOrCreate, postDelete} from '../controllers/user.controllers';

export const router = express.Router();


router.post('/update-or-create-user', postUpdateOrCreate)


router.post('/delete', postDelete)