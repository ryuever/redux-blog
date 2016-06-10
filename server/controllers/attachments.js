var mongoose = require('mongoose');

var conn = require('../components/mongodb');
var Grid = require('gridfs-stream');
var uuid = require('node-uuid');
var fs = require('fs');

var multiparty = require('multiparty');
var format = require('util').format;

var gfs = Grid(conn.db, mongoose.mongo);

exports.upload = function(req, res, next) {

  // create a form to begin parsing
  var form = new multiparty.Form();
  var image;
  var title;
  var os;
  var extension;

  form.on('error', next);
  form.on('close', function(){
    console.log('file info : ', image);
    /* res.send(format('\nuploaded %s (%d Kb) as %s'
       , image.filename
       , image.size / 1024 | 0
       , title)); */
    res.send({
      filename: image.filename,
      fileSize: image.size / 1024 | 0 + ' Kb'
    })
  });

  // listen on field event for title
  form.on('field', function(name, val){
    if (name !== 'title') return;
    title = val;
  });

  // listen on part event for image file
  form.on('part', function(part){
    if (!part.filename) return;
    // if (part.name !== 'image') return part.resume();
    image = {};
    extension = part.filename.split(/[. ]+/).pop();

    image.filename = uuid.v4()+'.'+extension;
    image.size = 0;
    os = gfs.createWriteStream({ filename: image.filename });
    part.pipe(os);
    part.on('data', function(buf){
      image.size += buf.length;
    });
  });

  // parse the form
  form.parse(req);

  /* var is;
     var os;
     console.log('req files : ', req.files, req.body);
     //get the extenstion of the file
     var extension = req.files.file.path.split(/[. ]+/).pop();
     is = fs.createReadStream(req.files.file.path);
     os = gridfs.createWriteStream({ filename: shortId.generate()+'.'+extension });
     is.pipe(os);

     os.on('close', function (file) {
     //delete file from temp folder
     fs.unlink(req.files.file.path, function() {
     res.json(200, file);
     });
     }); */

}


exports.getFileById = function(req, res, next) {
  const id = req.params.id;
  gfs.files.find({filename: id}).toArray(function (err, files) {
    console.log('files : ', files);
    if (err) {
      res.json(err);
    }
    if (files.length > 0) {
      var mime = 'image/jpeg';
      res.set('Content-Type', mime);
      var read_stream = gfs.createReadStream({filename: id});
      console.log('read stream : ', read_stream);
      read_stream.pipe(res);
    } else {
      res.json('File Not Found');
    }
  });
  /* var readstream = gfs.createReadStream({
     _id: '5759873e8d5b4f0e711ce569'
     });
     req.on('error', function(err) {
     res.send(500, err);
     });
     readstream.on('error', function (err) {
     res.send(500, err);
     });
     readstream.pipe(res); */
}
