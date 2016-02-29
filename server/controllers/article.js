var Article = require('../models/article');

exports.postArticle = function(req, res, next){
  console.log('call article post api');
  var {newTitle, newContent} = req.body;
  var _sessionId = req._sessionId;

  var article = new Article({
    creatorId: _sessionId,
    title: newTitle,
    content: newContent
  });

  article.save()
    .then(function(article){
      console.log("article ", article);
      if(article){

        var ret = {
          _id: article._id,
          title: article.title,
          content: article.content,
          createDate: article.createDate.toLocaleDateString()
        };
        res.status(200).send(ret);

      }else{
        res.status(500).send('error');
      }
    })
    .catch(function(err){
      console.log('err : ', err);
      res.status(500).send('error');
    });
}

exports.getArticles = function(req, res, next){
  console.log("get article") ;
  var _sessionId = req._sessionId;

  var $articles = Article.find({
    creatorId: _sessionId
  }).exec();

  $articles
    .then(function(articles){
      if (articles){
        console.log("get articles from server : ", articles);
        var tmp = articles.map(function(article){
          var ret = {
            _id: article._id,
            title: article.title,
            content: article.content,
            createDate: article.createDate.toLocaleDateString()
          };
          return ret;
        });
        res.status(200).send(tmp);
      }else{
        res.status(500).send('error');
      }
    })
    .catch(function(err){
      console.log('get articles error : ', err);
      res.status(500).send('error');
    });
};

exports.getArticle = function(req, res, next){

  var {id} = req.params;
  var _sessionId = req._sessionId;
  console.log('id and _sessionId', id, _sessionId);

  var $article = Article.findOne({
    creatorId: _sessionId,
    _id: id
  }).exec();

  $article
    .then(function(article){
      if (article){
        var ret = {
          _id: article._id,
          title: article.title,
          content: article.content,
          createDate: article.createDate.toLocaleDateString()
        };
        res.status(200).send(ret);
      }else{
        res.status(500).send('error');
      }
    })
    .catch(function(err){
      console.log("get article error : ", err);
      res.status(500).send('error');
    });

};
