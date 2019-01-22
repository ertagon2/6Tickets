var request = require('supertest');
var app = require('../app.js');

describe('GET /', function() {
 it('respond with hello world', function(done) {

 //navigate to root and check the the response is "hello world"
 request(app).get('/test').expect('hello world test', done);
 });
});
