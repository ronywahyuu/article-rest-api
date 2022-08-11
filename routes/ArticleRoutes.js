import express from 'express'
import { createArticle, deleteArticle, getAll, getArticle, updateArticle } from '../controllers/ArticleController.js'
import verifyToken from '../verifyToken.js'

const router = express.Router()

// get all articles
router.get('/',  getAll)

// get article by id
router.get('/find/:id', getArticle)

// create articles
router.post('/', verifyToken, createArticle)

// update articles 
router.put('/:id',  verifyToken, updateArticle)

// delete article
router.delete('/:id', verifyToken, deleteArticle)

export default router