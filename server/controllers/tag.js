var Tag = require('../models/tag');

exports.createTag = function(req, res, next){

  console.log("create tags ");
  var {name} = req.body;
  var _sessionId = req._sessionId;

  var $tag = new Tag({
    name: name,
    creatorId: _sessionId
  }).save();

  $tag
    .then(function(tag){
      console.log("insert tags : ", tag);
      return res.status(200).send(tag);
    })
    .catch(function(err){
      if(err){
        console.log('create tags error : ', err);
        res.status(500).send('create tags error');
      }
    });
};

// exports.createTags = function(req, res, next){

//   console.log("create tags ");
//   var {tagsShouldCreate} = req.body;
//   var _sessionId = req._sessionId;

//   var tags = tagsShouldCreate.map(function(tagShouldCreate){
//     return ({
//       creatorId: _sessionId,
//       name: tagShouldCreate
//     });
//   });

//   Tag.insertMany(tags)
//     .then(function(tags){
//       console.log("insert tags : ", tags);
//       return res.status(200).send(tags);
//     })
//     .catch(function(err){
//       if(err){
//         console.log('create tags error : ', err);
//         res.status(500).send('create tags error');
//       }
//     });
// };



exports.getTags = function(req, res, next){
  var _sessionId = req._sessionId;

  var $tags = Tag.find({
    creatorId: _sessionId
  }).exec();

  $tags
    .then(function(tags){
      if(tags){
        res.status(200).send(tags);
      }
    })
    .catch(function(err){
      if(err){
        console.log('get articles error : ', err);
        res.status(500).send('error');
      }
    });
};
