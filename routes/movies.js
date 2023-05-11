const router = require('express').Router();
const jsonParser = require('express').json();
// const {
//   getUsers,
//   getUserById,
//   patchUserMe,
//   patchUserMeAvatar,
//   getUserMe,
// } = require('../controllers/users');
// const {
//   userInfoValidation,
//   avatarValidation,
//   userIdUrlParamsValidation,
// } = require('../middlewares/validation/user');

router.get('/', () => {});
router.post('/', () => {});
router.patch('/me', jsonParser, () => {});

module.exports = router;
