const express = require('express');
const { Question, Like, Answer, Image, Comment, sequelize, User, Sequelize } = require('../../db/models')
const { requireAuth, sendAuthorizationError } = require('../../utils/auth.js')
const { Op } = require('sequelize');
const router = express.Router();

router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        query = {
            where: {
                userId: userId,
            },
            include: [{
                model: Like,
            }],
        }
        const comments = await Comment.findAll(query);

        let returnedComments = comments.map(obj => {
            let comment = obj.toJSON();
            let likes = 0;
            comment.Likes.forEach((like) => {
                if (like.dislike) {
                    likes -= 1;
                } else {
                    likes += 1;
                }
            });
            comment.numLikes = likes;
            delete comment.Likes;
            return comment;
        });
        return res.status(200).json({ Comments: returnedComments });
    }
);

router.post(
    '/',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id
        const { commentableType, commentableId, description } = req.body;
        const commentExists = await Comment.findOne({
            where: {
                userId,
                commentableType,
                commentableId
            }
        });
        if (commentExists) {
            const err = new Error("Forbidden. User already has a comment for this question or answer")
            err.message = "Forbidden. User already has a comment for this question or answer";
            err.errors = "Forbidden. User already has a comment for this question or answer";
            err.status = 403
            return next(err);
        }
        if (commentableType === 'question') {
            const question = await Question.findByPk(commentableId);
            if (!question) {
                const err = new Error("Question couldn't be found");
                err.title = "Question couldn't be found";
                err.errors = "Question couldn't be found";
                err.status = 404;
                return next(err);
            } else {
                const newComment = await question.createComment({
                    userId,
                    commentableType,
                    commentableId,
                    description
                })
                return res.status(201).json(newComment)
            }
        } else if (commentableType === 'answer') {
            const answer = await Answer.findByPk(commentableId);
            if (!answer) {
                const err = new Error("Answer couldn't be found");
                err.title = "Answer couldn't be found";
                err.errors = "Answer couldn't be found";
                err.status = 404;
                return next(err);
            } else {
                const newComment = await answer.createComment({
                    userId,
                    commentableType,
                    commentableId,
                    description
                })
                return res.status(201).json(newComment)
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
    '/:commentId',
    requireAuth,
    async (req, res, next) => {
        const usersId = req.user.id;
        const commentId = req.params.commentId;

        const { description } = req.body;

        if (!description) {
            const err = new Error("Bad Request");
            err.message = "Bad Request";
            err.errors = {
                "description": "Description is required",
            };
            err.status = 400;
            return next(err);
        }
        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            const err = new Error("Comment couldn't be found");
            err.title = "Comment couldn't be found";
            err.errors = "Comment couldn't be found";
            err.status = 404;
            return next(err);
        } else if (comment && usersId !== comment.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            comment.description = description;
            await comment.save();
            return res.status(200).json(comment)
        }
    }
);

router.delete(
    '/:commentId',
    requireAuth,
    async (req, res, next) => {
        const usersId = req.user.id;
        const commentId = req.params.commentId;
        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            const err = new Error("Comment couldn't be found");
            err.title = "Comment couldn't be found";
            err.errors = "Comment couldn't be found";
            err.status = 404;
            return next(err);
        } else if (comment && usersId !== comment.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            await comment.destroy();
            return res.status(200).json({ "message": "successfully deleted" })
        }
    }
);

module.exports = router
