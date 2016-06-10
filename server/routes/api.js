var express = require('express');
var router = express.Router();

var users = require('../controllers/user');
var articles = require('../controllers/article');
var comments = require('../controllers/comment');
var articleMetas = require('../controllers/article-meta');
var tags = require('../controllers/tag');
var attachments = require('../controllers/attachments');

// user authentication
router.post('/login', users.postLogin);
router.post('/signup', users.postSignUp);
router.get('/logout', users.getLogout);
router.post('/autologin', users.postAutoLogin);

router.get('/article/:id', articles.getArticle);
router.post('/article', articles.postArticle);
router.get('/articles', articles.getArticles);

router.post('/comment', comments.postComment);
router.get('/comments/:articleId', comments.getComments);

router.get('/articlemeta/:articleId', articleMetas.getArticleMeta);
router.post('/articlemeta', articleMetas.createArticleMeta);
router.put('/articlemeta/:articleId', articleMetas.updateArticleMeta);

router.post('/tag', tags.createTag);
router.get('/tags', tags.getTags);

router.post('/upload', attachments.upload);
router.get('/download/:id', attachments.getFileById);

module.exports = router;
