const express = require('express');
const { Question, Like, Answer, Image, Comment, sequelize, User, Sequelize } = require('../../db/models')
const { requireAuth, sendAuthorizationError } = require('../../utils/auth.js')
const { Op } = require('sequelize');
const router = express.Router();

router.post(
    '/',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id
        const { imageableType, imageableId, url } = req.body;

        if (imageableType === 'question') {
            const question = await Question.findByPk(imageableId);
            if (!question) {
                const err = new Error("Question couldn't be found");
                err.title = "Question couldn't be found";
                err.errors = "Question couldn't be found";
                err.status = 404;
                return next(err);
            } else if (question && question.userId !== userId) {
                const err = new Error("Forbidden");
                err.title = "Forbidden";
                err.errors = "Forbidden";
                err.status = 403;
                return next(err);
            } else {
                const newImage = await question.createImage({
                    userId,
                    url,
                    imageableType,
                    imageableId,
                })
                return res.status(201).json(newImage)
            }
        } else if (imageableType === 'answer') {
            const answer = await Answer.findByPk(imageableId);
            if (!answer) {
                const err = new Error("Answer couldn't be found");
                err.title = "Answer couldn't be found";
                err.errors = "Answer couldn't be found";
                err.status = 404;
                return next(err);
            } else if (answer && answer.userId !== userId) {
                const err = new Error("Forbidden");
                err.title = "Forbidden";
                err.errors = "Forbidden";
                err.status = 403;
                return next(err);
            } else {
                const newImage = await answer.createImage({
                    userId,
                    url,
                    imageableType,
                    imageableId,
                })
                return res.status(201).json(newImage)
            }
        } else {
            const err = new Error("Server Error");
            err.title = "Server Error";
            err.errors = "Server Error";
            err.status = 500;
            return next(err);
        }
    }
);

router.patch(
    '/:imageId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id
        const imageId = req.params.imageId
        const { url } = req.body;
        const image = await Image.findByPk(imageId);
        if (!image) {
            const err = new Error("Image couldn't be found");
            err.title = "Image couldn't be found";
            err.errors = "Image couldn't be found";
            err.status = 404;
            return next(err);
        } else if (image && image.userId !== userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            image.url = url
            await image.save();
            return res.status(200).json(image)
        }
    }
);

router.delete(
    '/:imageId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id
        const imageId = req.params.imageId
        const image = await Image.findByPk(imageId);
        if (!image) {
            const err = new Error("Image couldn't be found");
            err.title = "Image couldn't be found";
            err.errors = "Image couldn't be found";
            err.status = 404;
            return next(err);
        } else if (image && image.userId !== userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            await image.destroy()
            return res.status(200).json({ "message": "successfully deleted" })
        }
    }
);


module.exports = router;
