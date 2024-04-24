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
        let query = {
            where: {
                userId: userId,
            },
            include: [
                {
                model: User,
                attributes: ['username'],
                as: 'questionOwner'
                },
                {
                model: Answer,
                group: ['Answer.id', 'Likes.id', 'Images.id', 'Comments.id'],
                    include: [
                        {
                            model: Like,
                        },
                        {
                            model: Image,
                        },
                        {
                            model: Comment,
                                group: ['Comment.id', 'Likes.id'],
                                include: [
                                    {
                                        model: Like
                                    }
                                ]
                        },
                        {
                            model: User,
                            attributes: ['username'],
                            as: 'answerOwner'
                        }
                    ]
                },
                {
                model: Comment,
                    group: ['Comment.id', 'Likes.id'],
                    include: [
                        {
                            model: Like,
                        },
                        {
                            model: User,
                            attributes:['username'],
                            as: 'commentOwner'
                        }
                    ]
                },
                {
                model: Like,
                },
                {
                model: Image,
                },
            ],
        };

        const questions = await Question.findAll(query);

        let returnedQuestions = questions.map(obj => {
            let question = obj.toJSON();
            let likes = 0;
            question.Likes.forEach((like) => {
                if (like.dislike === true) {
                    likes -= 1;
                } else {
                    likes += 1;
                }
            });
            question.numLikes = likes;
            return question;
        });
        return res.json({ Questions: returnedQuestions })
    }
);

router.get(
    '/:questionId',
    async (req, res, next) => {
        const user = req.user
        const questionId = req.params.questionId;
        let query = {
            include: [
                {
                model: User,
                attributes: ['username'],
                as: 'questionOwner'
                },
                {
                model: Answer,
                group: ['Answer.id', 'Likes.id', 'Images.id', 'Comments.id'],
                    include: [
                        {
                            model: Like,
                        },
                        {
                            model: Image,
                        },
                        {
                            model: Comment,
                                group: ['Comment.id', 'Likes.id'],
                                include: [
                                    {
                                        model: Like
                                    }
                                ]
                        },
                        {
                            model: User,
                            attributes: ['username'],
                            as: 'answerOwner'
                        }
                    ],
                },
                {
                model: Comment,
                    group: ['Comment.id', 'Likes.id'],
                    include: [
                        {
                            model: Like,
                        },
                        {
                            model: User,
                            attributes:['username'],
                            as: 'commentOwner'
                        }
                    ]
                },
                {
                model: Like,
                },
                {
                model: Image,
                },
            ],
            // attributes: [
            //     [sequelize.fn('COUNT', sequelize.col('Question.Likes')), 'numLikes'],
            // ]

        };

        const question = await Question.findByPk(questionId, query);
        // const questionLikes = await Like.findAll({
        //     where: {
        //         dislike: false,
        //         likeableType: 'question',
        //         likeableId: questionId
        //     },
        //     attributes: [
        //         [sequelize.fn('COUNT', sequelize.col('id')), 'numLikes']
        //     ]
        // });
        if (!question) {
            let err = new Error("Question couldn't be found");
            err.title = "Question couldn't be found";
            // err.errors = "Question couldn't be found";
            err.status = 404;
            return next(err);
        }

        // modifiedQuestion = question.map((obj) => {
        //     let question = obj.toJSON();
        //     let likes = 0;
        //     question.Likes.forEach(like => {
        //         if (like.dislike) likes -= 1;
        //         else {
        //             likes += 1;
        //         }
        //     });
        //     // delete question.Likes
        //     question.numLikes = likes;

        //     question.Answers.forEach(answer => {
        //         // answerOwner = async () => await User.findByPk(answer.userId);
        //         let answerLikes = 0;
        //         answer.Likes.forEach(answerlike => {
        //             if (answerlike.dislike) answerLikes -= 1;
        //             else {
        //                 answerLikes += 1
        //             }
        //         });
        //         answer.numLikes = answerLikes
        //         // delete answer.Likes

        //         answer.Comments.forEach(answerComment => {
        //             let answerCommentLikes = 0;
        //             answerComment.Likes.forEach(answerCommentLike => {
        //                 if (answerCommentLike.dislike) answerCommentLikes -= 1
        //                 else {
        //                     answerCommentLikes += 1;
        //                 }
        //             })
        //             answerComment.numLikes = answerCommentLikes
        //             // delete answerComment.Likes
        //         });
        //     });

        //     question.Comments.forEach(questionComment => {
        //         let questionCommentLikes = 0
        //         questionComment.Likes.forEach(questionCommentLike => {
        //             if (questionCommentLike.dislike) questionCommentLikes -=1
        //             else {
        //                 questionCommentLikes += 1;
        //             }
        //         });
        //         questionComment.numLikes = questionCommentLikes
        //         // delete questionComment.Likes
        //     });

        //     return question
        // })


        // {question, numLikes:questionLikes[0].numLikes}
        return res.json(question).status(200);
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
            include: [
                {
                model: User,
                attributes: ['username'],
                as: 'questionOwner'
                },
                {
                model: Answer,
                group: ['Answer.id', 'Likes.id', 'Images.id', 'Comments.id'],
                    include: [
                        {
                            model: Like,
                        },
                        {
                            model: Image,
                        },
                        {
                            model: Comment,
                                group: ['Comment.id', 'Likes.id'],
                                include: [
                                    {
                                        model: Like
                                    }
                                ]
                        },
                        {
                            model: User,
                            attributes: ['username'],
                            as: 'answerOwner'
                        }
                    ]
                },
                {
                model: Comment,
                    group: ['Comment.id', 'Likes.id'],
                    include: [
                        {
                            model: Like,
                        },
                        {
                            model: User,
                            attributes:['username'],
                            as: 'commentOwner'
                        }
                    ]
                },
                {
                model: Like,
                },
                {
                model: Image,
                },
            ],
        };


        // query.limit = size;
        // query.offset = size * (page - 1);

        // if (
        //     (!Number.isInteger(page) || page > 10 || page < 1) ||
        //     (!Number.isInteger(size) || size > 20 || size < 1)
        // ) {
        //     const err = new Error("Bad Request");
        //     err.message = "Bad Request";
        //     err.errors = {
        //         "page": "Page must be greater than or equal to 1",
        //         "size": "Size must be greater than or equal to 1",
        //     };
        //     err.status = 400;
        //     return next(err);
        // }

        const questions = await Question.findAll(query);

        let returnedQuestions = questions.map(obj => {
            let question = obj.toJSON();
            let likes = 0;
            question.Likes.forEach((like) => {
                if (like.dislike === true) {
                    likes -= 1
                } else {
                    likes += 1;
                }
            });

            question.numLikes = likes;

            question.Answers.forEach((answer) => {
                let answerLikes = 0;
                answer.Likes.forEach((like) => {
                    if (like.dislike === true) {
                        answerLikes -= 1
                    } else {
                        answerLikes += 1;
                    }
                })
                answer.numLikes = answerLikes;
            });
            return question;
        });

        return res.json({
           "Questions": returnedQuestions,
           "page": page,
           "size": size,
        });
    }
);

router.post(
    '/current',
    requireAuth,
    async (req, res, next) => {
        const usersId = req.user.id;

        const { title, description, type } = req.body;

        if (!title) {
            const err = new Error("Bad Request");
            err.message = "Bad Request";
            err.errors = {
                "title": "Title is required",
            };
            if (!description) {
                err.errors['description'] = "Description is required"
            }
            if (!type) {
                err.errors['type'] = "Subject type is required"
            }
            err.status = 400;
            return next(err);
        }

        const user = await User.findByPk(usersId);
        const newQuestion = await user.createQuestion({
            userId: usersId,
            title,
            description,
            type
        });
        return res.status(201).json(newQuestion);
    }
);

router.put(
    '/:questionId',
    requireAuth,
    async (req, res, next) => {
        const usersId = req.user.id;
        const questionId = req.params.questionId;

        const { title, description, type } = req.body;

        const question = await Question.findByPk(questionId);
        if (!title) {
            const err = new Error("Bad Request");
            err.message = "Bad Request";
            err.errors = {
                "title": "Title is required",
            };
            if (!description) {
                err.errors['description'] =  "Description is required"
            }
            if (!type) {
                err.errors['type'] =  "Subject type is required"
            }
            err.status = 400;
            return next(err);
        }
        if (!question) {
            const err = new Error("Question couldn't be found");
            err.title = "Question couldn't be found";
            err.errors = "Question couldn't be found";
            err.status = 404;
            return next(err);
        } else if (question && usersId !== question.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            question.title = title;
            question.description = description;
            question.type = type;
            await question.save();
            return res.status(200).json(question)
        }
    }
);

router.delete(
    '/:questionId',
    requireAuth,
    async (req, res, next) => {
        const usersId = req.user.id;
        const questionId = req.params.questionId;
        const question = await Question.findByPk(questionId);

        if (!question) {
            const err = new Error("Question couldn't be found");
            err.title = "Question couldn't be found";
            err.errors = "Question couldn't be found";
            err.status = 404;
            return next(err);
        } else if (question && usersId !== question.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            await question.destroy();
            return res.status(200).json({ "message": "successfully deleted" })
        }
    }
);

module.exports = router
