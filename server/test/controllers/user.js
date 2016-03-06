var User = require('../models').User;
var request = require('supertest');
var app = require("../app");

var should = require('should');

describe("User", function(){
  describe('user signup', function(){
    it('should sign up an user', function(done){
      request(app)
        .post('/api/signup')
        .send({data: {email: "haha", password: "haha" }})
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if(err) return done(err);
          res.body.should.have.property('email');
          res.body.email.should.eql('haha');
          done();
        });
    });
  });
})
