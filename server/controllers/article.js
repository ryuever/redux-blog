var Article = require('../models/article');
var Tag = require('../models/tag');
var Promise = require('bluebird');

exports.postArticle = function(req, res, next){
  console.log('call article post api');
  var {newTitle, newContent, tags} = req.body;
  var _sessionId = req._sessionId;
  console.log("tags : ", tags);

  var $checkTags = Promise.map(tags, function(tag){
    console.log("check tags");
    return Tag.findOne({_id: tag.id}).exec();
  });

  console.log('hhah');
  $checkTags
    .then(function(fetchTags){
      var $newArticle = new Article({
        creatorId: _sessionId,
        title: newTitle,
        content: newContent,
        tags: tags.map((item)=>item.id)
      });

      return $newArticle.save();
    })
    .then(function(article){
      if(article){

        var ret = {
          _id: article._id,
          title: article.title,
          content: article.content,
          tags: article.tags,
          createDate: article.createDate.toLocaleDateString()
        };
        return res.status(200).send(ret);
      }
    })
    .catch(function(err){
      if(err){
        console.log('err : ', err);
        res.status(500).send('error');
      }
    });
}

exports.getArticles = function(req, res, next){

  var _sessionId = req._sessionId;
  console.log("get article", _sessionId) ;
  var $articles = Article.find({
    creatorId: _sessionId
  }).exec();

  $articles
    .then(function(articles){
      if (articles){
        return $articles = Promise.map(articles, function(article){

          var $populateTags = Promise.map(article.tags, function(tagId){
            return Tag.findOne({_id: tagId}).exec();
          });

          return $populateTags
            .then(function(tags){
              console.log("popuate tags : ", tags);
              var ret = {
                _id: article._id,
                title: article.title,
                content: article.content,
                tags: tags,
                createDate: article.createDate.toLocaleDateString()
              };
              return ret;
            });
        });
      }})
    .then(function(ret){
      console.log("begin to return from article");
      console.log("return tags ", ret.tags);
      if(ret)
        return res.status(200).send(ret);
    })
    .catch(function(err){
      if(err){
        console.log('get articles error : ', err);
        res.status(500).send('error');
      }
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
        return res.status(200).send(ret);
      }
    })
    .catch(function(err){
      if(err){
        console.log("get article error : ", err);
        res.status(500).send('error');
      }
    });
};
