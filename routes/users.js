const router = require('express').Router();
const jsonParser = require('express').json();
const { getUserMe, patchUserMe } = require('../controllers/users');
const { userInfoValidation } = require('../middlewares/validation/user');

router.get('/me', getUserMe); // also used for automatic login if user data is returned
router.patch('/me', jsonParser, userInfoValidation, patchUserMe);

module.exports = router;
