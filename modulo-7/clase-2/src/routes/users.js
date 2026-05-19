import { Router } from "express";
import { query} from '../db.js';
import { 
    getUsers,
    getUserById,
    deleteUserById,
    createUser,
    updateUserById
 } from "../controllers/users.controllers.js";

const router = Router();

router.get('/users', getUsers); 

router.get('/users/:id', getUserById);

router.delete('/users/:id', deleteUserById);

router.post('/users', createUser);

router.put('/users/:id', updateUserById);

export default router;