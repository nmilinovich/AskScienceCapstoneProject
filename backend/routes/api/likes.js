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
        const { likeableType, likeableId, dislike } = req.body;
        alreadyLiked = await Like.findOne({where: { likeableType, likeableId, userId }})
        if (alreadyLiked){
            const err = new Error("You cannot like the same item twice");
            err.title = "You cannot like the same item twice";
            err.errors = "You cannot like the same item twice";
            err.status = 404;
            return next(err);
        }
        if (likeableType === 'question') {
            const question = await Question.findByPk(likeableId);
            console.log(question)
            if (!question) {
                const err = new Error("Question couldn't be found");
                err.title = "Question couldn't be found";
                err.errors = "Question couldn't be found";
                err.status = 404;
                return next(err);
            }
            else {
                newLike = await question.createLike({
                    userId,
                    likeableType,
                    likeableId,
                    dislike
                })
                return res.status(201).json(newLike)
            }
        }
        if (likeableType === 'answer') {
            const answer = await Answer.findByPk(likeableId);
            if (!answer) {
                const err = new Error("Answer couldn't be found");
                err.title = "Answer couldn't be found";
                err.errors = "Answer couldn't be found";
                err.status = 404;
                return next(err);
            } else {
                newLike = await answer.createLike({
                    userId,
                    likeableType,
                    likeableId,
                    dislike
                })
                return res.status(201).json(newLike)
            }
        }
        if (likeableType === 'comment') {
            const comment = await Comment.findByPk(likeableId);
            if (!comment) {
                const err = new Error("Comment couldn't be found");
                err.title = "Comment couldn't be found";
                err.errors = "Comment couldn't be found";
                err.status = 404;
                return next(err);
            } else {
                newLike = await comment.createLike({
                    userId,
                    likeableType,
                    likeableId,
                    dislike
                })
                return res.status(201).json(newLike)
            }
        }
    }
);

router.patch(
    '/',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id
        const { likeableType, likeableId, dislike } = req.body;
        oldLike = await Like.findOne({where: { likeableType, likeableId, userId }});
        if (!oldLike) {
            const err = new Error("Like couldn't be found");
            err.title = "Like couldn't be found";
            err.errors = "Like couldn't be found";
            err.status = 404;
            return next(err);
        } else if (oldLike.dislike === dislike) {
            return res.status(400).json(oldLike);
        } else {
            oldLike.dislike = dislike
            await oldLike.save();
            return res.status(200).json(oldLike)
        }
    }
);

module.exports = router
