
var should = require('should');


describe('chunk', function () {
    
    var chunk = require('..');
    
    it('should generate four chunks of two', function (done) {
        
        var result = chunk([1,2,3,4,5,6,7,8]);

        result.should.be.ok;
        result.should.eql([[1,2], [3,4], [5,6], [7,8]]);

        return done();
        
    });

    it('should generate two chunks of four', function (done) {

        var result = chunk([1,2,3,4,5,6,7,8], 4);

        result.should.be.ok;
        result.should.eql([[1,2,3,4], [5,6,7,8]]);

        return done();

    });
    
    it('should generate eight chunks of one', function (done) {

        var result = chunk([1,2,3,4,5,6,7,8], 1);

        result.should.be.ok;
        result.should.eql([[1],[2],[3],[4],[5],[6],[7],[8]]);

        return done();

    });

});