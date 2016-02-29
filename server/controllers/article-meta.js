var ArticleMeta = require('../models/article-meta');

exports.createArticleMeta = function(req, res, next){
  console.log('create article meta');
  const {articleId} = req.body;
  console.log("article id : ", articleId);

  var $articleMeta = new ArticleMeta({
    articleId: articleId
  }).save();

  $articleMeta
    .then(function(articleMeta){
      console.log("created article meta : ", articleMeta);
      res.status(200).send(articleMeta);
    })
    .catch(function(err){
      console.log("create article meta err ", err);
      res.status(500).send('create article meta error');
    });
}

exports.getArticleMeta = function(req, res, next){
  var {articleId} = req.params;
  var _sessionId = req._sessionId;

  var $articleMeta = ArticleMeta.findOne({
    articleId: articleId
  }).exec();

  $articleMeta
    .then(function(articleMeta){
      res.status(200).send(articleMeta);
    })
    .catch(function(err){
      res.status(500).send('get article meta err');
    });
};

exports.updateArticleMeta = function(req, res, next){
  var {articleId} = req.params;
  console.log("req body", req.body);
  var {metasToUpdate} = req.body;

  var $metaData = ArticleMeta.findOneAndUpdate({
    articleId: articleId
  }, {$inc: metasToUpdate}, {new: true});

  $metaData
    .then(function(metaData){
      if(metaData){
        res.status(200).send(metaData);
      }
    })
    .catch(function(err){
      if (err){
        res.status(500).send(err);
      }
    });

}
