var {Schema} = require('mongoose');
var db = require('../components/mongodb');

var SubscribeSchema = new Schema({
  followee: {type: Schema.Types.ObjectId, ref: 'User'},
  follower: [{type: Schema.Types.ObjectId, ref: 'User'}]
});
