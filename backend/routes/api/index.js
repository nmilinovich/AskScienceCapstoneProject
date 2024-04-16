const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const questionsRouter = require('./questions.js')
const answersRouter = require('./answers.js')
const likesRouter = require('./likes.js')

const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/questions', questionsRouter);
router.use('/answers', answersRouter)
router.use('/likes', likesRouter)
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });

// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
module.exports = router;
