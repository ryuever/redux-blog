var Comment = require("../models").Comment;

var under = require('lodash');

function createSlug(){
  return Math.random().toString(36).substr(2, 5);
}

exports.postComment = function(req, res, next){
  const {articleId, content, creatorName, avatar, creatorId, parent_slug}  = req.body;

  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  var slug_part = createSlug();
  var full_slug_part = [year, month, day, hours, minutes, seconds].join('.') + ':' + slug_part;
  var slug = '';
  var full_slug = '';
  var $parentSlug = Promise.resolve();

  if(parent_slug){
    $parentSlug = Comment.findOne({
      articleId: articleId,
      slug: parent_slug
    }).exec();
  }

  $parentSlug.then(function(parent){
    if(parent){
      slug = parent['slug'] + '/' + slug_part;
      full_slug = parent['full_slug'] + '/' + full_slug_part;
    }else{
      slug = slug_part;
      full_slug = full_slug_part;
    }

    const options = {
      articleId: articleId,
      content: content,
      creatorName: creatorName,
      avatar: avatar,
      creatorId: creatorId,
      slug: slug,
      full_slug: full_slug
    };

    const validOpt = under.pickBy(options, under.isundefined);
    console.log('valid opt ', validOpt);
    var $comment = new Comment(validOpt);
    return $comment.save();
  }).then(function(comment){

    var ret = {
      _id: comment._id,
      creatorName: comment.creatorName,
      content: comment.content,
      articleId: comment.articleId,
      avartar: comment.avartar,
      createDate: comment.createDate.toLocaleString(),
      slug: comment.slug,
      full_slug: comment.full_slug
    };

    // var createDate =comment.createDate;
    // console.log('comment createDate: ',createDate.toLocaleString());
    // console.log('new Date', new Date(createDate));
    // console.log('locale date', new Date(createDate).toLocaleString());
    return res.status(200).send(ret);
  }).catch(function(err){
    if(err){
      res.status(500).send('save comment err');
    }
  });
}


exports.getComments = function(req, res, next){
  const {articleId}  = req.params;
  var $comments = Comment.find({
    articleId: articleId
  }).exec();

  $comments
    .then(function(comments){
      if(comments){
        var tmp = comments.map(function(comment){
          var ret = {
            _id: comment._id,
            creatorName: comment.creatorName,
            content: comment.content,
            articleId: comment.articleId,
            avartar: comment.avartar,
            createDate: comment.createDate.toLocaleString(),
            slug: comment.slug,
            full_slug: comment.full_slug
          };
          return ret;
        });
        return res.status(200).send(tmp);
      }
    })
    .catch(function(err){
      if (err){
        res.status(500).send('get comments error');
      }
    });
}
