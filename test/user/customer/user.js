const chai = require('chai');
var assert = require('assert');

const User = require('../../../models/users');


describe('hooks', function() {
    before(async function() {
        User.clear(function(err) {
            if (err) return done(err);
            db.save([tobi, loki, jane], done);
          });
    });
  
    after(function() {
      // runs once after the last test in this block
     console.log("after")
     const data = User.createUser('demo','demo last','','','ymunawwer','demo@mail.com','hello@test','8888899999','','','','24','TK','blore','KA','IN','560047')
    data.then(data=>{
console.log(data)
    }).catch(err=>{console.log(err)})
});
    beforeEach(function() {
      // runs before each test in this block
    });
  
    afterEach(function() {
      // runs after each test in this block
    });
    it('test 1', () => console.log(1));
  it('test 2', () => console.log(2));
  
    // test cases
  });
  