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

module.exports = router
