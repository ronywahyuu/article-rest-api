// import express from "express";
import mongoose from "mongoose";
import Article from "../models/Article.js";
import User from "../models/User.js";

export const getAll = async (req, res, next) => {
    try {
        const articles = await Article.find()

        if (articles.length <= 0) {
            res.status(200).json({
                msg: "Article is Empty"
            })
        }

        // console.log(req.verifiedId)
        res.json(articles)

        // console.log(articles)
    } catch (err) {
        next(err)
    }
}

export const getArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id)
        const author = await User.findById(article.authorId)

        console.log(author)
        if (article.length <= 0) res.status(200).json({ msg: 'Article is Empty' })

        if (!article) res.json({ msg: 'Article is Not Found' })

        res.json({
            status : "Success",
            msg: "Article Found! ",
            article : {
                title : article.title,
                content : article.body,
                author : author.username,
                authorEmail : author.email,
            }
        })

    } catch (err) {
        next(err)
        // console.info(err)
    }
}

export const createArticle = async (req, res, next) => {
    try {
        if (req.verifiedId) {

            const article = new Article({
                title: req.body.title,
                body: req.body.body,
                authorId: req.verifiedId.id
            })

            await article.save()
            res.status(201)
            res.json({
                status: "Success",
                msg: "Article successfully created",
                article: {
                    title: article.title,
                }
            })
        }

        res.status(401).json({
            msg: "You are not authorized to create an article"
        })
        // console.log(req.verifiedId)
    } catch (err) {
        // console.log(err)
        next(err)
    }
}

export const updateArticle = async (req, res, next) => {
    try {
        const articleId = await Article.findById(req.params.id)
        if (articleId.length <= 0) res.status(200).json({ msg: 'Article is Empty' })

        if (!articleId) res.json({ msg: 'Article is Not Found' })

        if (req.verifiedId.id === articleId.authorId) {
            const updatedArticle = await Article.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.json({
                msg: "Article Updated",
                updatedArticle
            })
        }

        res.status(401).json({
            msg: "You are not authorized to update an article"
        })

    } catch (err) {
        next(err)
    }
}

export const deleteArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id)
        console.log(article)

        if (article.length <= 0) res.status(200).json({ msg: 'Article is Empty' })

        if (!article) res.json({ msg: 'Article is Not Found' })

        if (req.verifiedId.id === article.authorId) {
            await Article.findByIdAndDelete(req.params.id)
            res.status(200).json({
                status: "Deleted",
                msg: "Article successfully deleted"
            })
        } else {
            res.status(401).json({
                msg: "You are not authorized to delete an article"
            })
        }
    } catch (err) {
        // console.log(err)
        next(err)
    }
}