var Comment = require("../models/comment");
var _ = require('lodash');

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

  console.log('parent_slug : ', parent_slug);
  if(parent_slug){
    $parentSlug = Comment.findOne({
      articleId: articleId,
      slug: parent_slug
    }).exec();
  }

  $parentSlug.then(function(parent){
    console.log('parent : ', parent);
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

    console.log('options : ', options);

    const validOpt = _.pickBy(options, _.isundefined);
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
      console.log("save comment error : ", err);
      res.status(500).send('save comment err');
    }
  });
}


exports.getComments = function(req, res, next){
  const {articleId}  = req.params;
  console.log("articleId : ", articleId);
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
        console.log('get comments error');
        res.status(500).send('get comments error');
      }
    });
}
