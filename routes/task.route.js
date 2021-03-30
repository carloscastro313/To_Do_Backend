const { Router } = require('express');
const { tasksUpdate, tasksGet, tasksPost, tasksDelete } = require('../controllers/task.controller');
const { checkToken } = require('../middleware/jwt.middleware');
const router = Router();

router.post('/', tasksPost);
router.get('/list', [checkToken], tasksGet);
router.put('/:id', [checkToken], tasksUpdate);
router.delete('/:id', [checkToken], tasksDelete);

module.exports = router;