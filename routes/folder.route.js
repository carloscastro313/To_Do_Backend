const { Router } = require('express');
const { foldersDelete, foldersGet, foldersPost } = require('../controllers/folder.controller');
const { checkToken } = require('../middleware/jwt.middleware');
const router = Router();

router.post('/', foldersPost);
router.get('/list', [checkToken], foldersGet);
router.delete('/:id', [checkToken], foldersDelete);
module.exports = router;