const express = require('express');
const { Question, Like, Answer, Image, Comment, sequelize, User, Sequelize } = require('../../db/models')
const { requireAuth, sendAuthorizationError } = require('../../utils/auth.js')
const { Op } = require('sequelize');
const router = express.Router();

router.get(
    '/',
    async (req, res, next) => {

        let { page, size,
            // biology, chemistry, physics
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

        const Questions = await Question.findAll(query);

        // let returnedQuestions = Spots.map(obj => {
        //     let spot = obj.toJSON();
        //     let numStars = 0;
        //     spot.Reviews.forEach((review) => {
        //         numStars += review.stars;
        //     });
        //     spot.avgRating = numStars/spot.Reviews.length;
        //     delete spot.Reviews;
        //     return spot;
        // });

        return res.json({
           "Questions": Questions,
           "page": page,
           "size": size,
        });
    }
);


module.exports = router
