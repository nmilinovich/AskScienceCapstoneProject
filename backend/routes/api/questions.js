const express = require('express');
const { Question, Like, Answer, Image, Comment, sequelize, User, Sequelize } = require('../../db/models')
const { requireAuth, sendAuthorizationError } = require('../../utils/auth.js')
const { Op } = require('sequelize');
const router = express.Router();


router.get(
    '/:questionId',
    async (req, res, next) => {
        const questionId = req.params.questionId;
        let query = {
            where: {
                id: questionId
            },
            include: [
                {
                model: Answer,
                    include: [
                        {
                            model: Like,
                        },
                        {
                            model: Image,
                        },
                        {
                            model: Comment,
                                include: [
                                    {
                                        model: Like
                                    }
                                ]
                        }
                    ]
                },
                {
                model: Comment,
                    include: [
                        {
                            model: Like,
                        }
                    ]
                },
                {
                model: Like,
                },
                {
                model: Image,
                attributes: ['url'],
                },
            ],
        };

        const question = await Question.findOne(query);

        if (!question) {
            let err = new Error("Question couldn't be found");
            err.title = "Question couldn't be found";
            // err.errors = "Question couldn't be found";
            err.status = 404;
            return next(err);
        }
        return res.json(question);
    }
);

router.get(
    '/',
    async (req, res, next) => {

        let { page, size,
            // type
            } = req.query;
        if (page) page = parseInt(page);
        if (size) size = parseInt(size);

        if (!page || !Number.isInteger(page) || page > 10 || page < 1) {
            page = 1;
        }

        if (!size || !Number.isInteger(size) || size > 20 || size < 1) {
            size = 20;
        }

        let query = {
            where: {
            },
            include: [
                {
                model: Like,
                // as: 'reviews'
                // attributes: ['stars'],
                },
                {
                model: Image,
                // where: {
                //     preview: true
                // },
                attributes: ['url'],
                // as: 'previewImage',
                },
            ],
        };

        query.limit = size;
        query.offset = size * (page - 1);

        if (
            (!Number.isInteger(page) || page > 10 || page < 1) ||
            (!Number.isInteger(size) || size > 20 || size < 1)
        ) {
            const err = new Error("Bad Request");
            err.message = "Bad Request";
            err.errors = {
                "page": "Page must be greater than or equal to 1",
                "size": "Size must be greater than or equal to 1",
            };
            err.status = 400;
            return next(err);
        }

        const questions = await Question.findAll(query);

        let returnedQuestions = questions.map(obj => {
            let question = obj.toJSON();
            let likes = 0;
            question.Likes.forEach((like) => {
                if (like.dislike) likes += 1;
                    if (!like.dislike) likes += 1;
            });
            question.numLikes = likes;
            delete question.Likes;
            return question;
        });

        return res.json({
           "Questions": returnedQuestions,
           "page": page,
           "size": size,
        });
    }
);





module.exports = router
