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
        console.log(userId);
        query = {
            where: {
                userId: userId,
            },
            include: [{
                model: Like,
            }, {
                model: Image,
                attributes: ['url'],
            }],
        }

        const answers = await Answer.findAll(query);

        let returnedAnswers = answers.map(obj => {
            let answer = obj.toJSON();
            let likes = 0;
            answer.Likes.forEach((like) => {
                if (like.dislike) {
                    likes -= 1;
                } else {
                    likes += 1;
                }
            });
            answer.numLikes = likes;
            delete answer.Likes;
            return answer;
        });
        return res.status(200).json({ Answers: returnedAnswers });
    }
);

router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        console.log(userId);
        query = {
            where: {
                userId: userId,
            },
            include: [{
                model: Like,
            }, {
                model: Image,
                attributes: ['url'],
            }],
        }

        const answers = await Answer.findAll(query);

        let returnedAnswers = answers.map(obj => {
            let answer = obj.toJSON();
            let likes = 0;
            answer.Likes.forEach((like) => {
                if (like.dislike) {
                    likes -= 1;
                } else {
                    likes += 1;
                }
            });
            answer.numLikes = likes;
            delete answer.Likes;
            return answer;
        });
        return res.status(200).json({ Answers: returnedAnswers });
    }
);

router.post(
    '/',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id
        const { questionId, description } = req.body;

        const question = await Question.findByPk(questionId);

        if(!question) {
            const err = new Error("Question couldn't be found");
            err.title = "Question couldn't be found";
            err.status = 404;
            return next(err);
        };

        const answerExists = await Answer.findOne({
            where: {
                questionId,
                userId
            }
        });

        if(answerExists) {
            const err = new Error("Forbidden. User already has an answer for this question")
            err.message = "Forbidden. User already has an answer for this question";
            err.errors = "Forbidden. User already has an answer for this question";
            err.status = 403
            return next(err);
        } else {
            console.log(userId)
            const newAnswer = await question.createAnswer({
                userId,
                questionId,
                description,
            });
            console.log(newAnswer)
            return res.status(201).json(newAnswer);
        }

    }
);

router.put(
    '/:answerId',
    requireAuth,
    async (req, res, next) => {
        const usersId = req.user.id;
        const answerId = req.params.answerId;

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

        const answer = await Answer.findByPk(answerId);

        if (!answer) {
            const err = new Error("Answer couldn't be found");
            err.title = "Answer couldn't be found";
            err.errors = "Answer couldn't be found";
            err.status = 404;
            return next(err);
        } else if (answer && usersId !== answer.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            answer.description = description;
            await answer.save();
            return res.status(200).json(answer)
        }
    }
);

router.delete(
    '/:answerId',
    requireAuth,
    async (req, res, next) => {
        const usersId = req.user.id;
        const answerId = req.params.answerId;
        const answer = await Answer.findByPk(answerId);

        if (!answer) {
            const err = new Error("Answer couldn't be found");
            err.title = "Answer couldn't be found";
            err.errors = "Answer couldn't be found";
            err.status = 404;
            return next(err);
        } else if (answer && usersId !== answer.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            await answer.destroy();
            return res.status(200).json({ "message": "successfully deleted" })
        }
    }
);

module.exports = router
