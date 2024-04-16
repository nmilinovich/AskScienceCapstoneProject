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

router.post(
    '/',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id
        console.log(userId)
        const { questionId, description } = req.body;

        const question = await Question.findByPk(questionId);

        if(!question) {
            const err = new Error("Question couldn't be found");
            err.title = "Question couldn't be found";
            err.status = 404;
            return next(err);
        };

        const answerExist = await Answer.findOne({
            where: {
                questionId,
                userId
            }
        });
        

        if(answerExist) {
            const err = new Error("Bad Request. User already has an answer for this question")
            err.message = "Bad Request. User already has an answer for this question";
            err.errors = "Bad Request. User already has an answer for this question";
            err.status = 400
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

module.exports = router
