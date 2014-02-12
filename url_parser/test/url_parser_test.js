require('should')
URLParser = require('../app/url_parser');

describe('URLParser', function() {

	it("should validate the invalid url format", function() {
		(function() {URLParser.parse("google.co safsd")}).should.throw('Invalid URL');
		(function() {URLParser.parse("http:// www.google.com")}).should.throw('Invalid URL');
		(function() {URLParser.parse("http://www.google.c om")}).should.throw('Invalid URL');
		(function() {URLParser.parse("http://.google")}).should.throw('Invalid URL');
		(function() {URLParser.parse("http://google.")}).should.throw('Invalid URL');
		(function() {URLParser.parse("http://www.google.com/m ail/to");}).should.throw('Invalid URL');
		(function() {URLParser.parse("http://www.google.com/mail/ to");}).should.throw('Invalid URL');
		(function() {URLParser.parse("http://www.google.com/ma.il/to");}).should.throw('Invalid URL');
		(function() {URLParser.parse("http://www.google.com/mail/to?a dsa=");}).should.throw('Invalid URL');
	});

	it("should not validate a valid url format", function() {
		(function() {URLParser.parse("http://www.google.com");}).should.not.throw('Invalid URL');
		(function() {URLParser.parse("http://www.google.com/mail/to");}).should.not.throw('Invalid URL');
		(function() {URLParser.parse("http://www.google.com/mail/to?user=john&mail=john@email.com");}).should.not.throw('Invalid URL');
		(function() {URLParser.parse("http://www.google.com/mail/to?user=john&mail=");}).should.not.throw('Invalid URL');
		(function() {URLParser.parse("ssh://google.com");}).should.not.throw('Invalid URL');
		(function() {URLParser.parse("ssh://user@google.com");}).should.not.throw('Invalid URL');
	});

	it("should return an object containing the URL parts", function() {
		url = URLParser.parse("http://user@www.google.com/mail/to?user=john&mail=john@email.com");
		url.protocol.should.eql("http");
		url.user.should.eql("user");
		url.domain.should.eql("www.google.com");
		url.path.should.eql("/mail/to");
		url.query.should.eql("user=john&mail=john@email.com");
	});

	it("should return an object containing the URL parts", function() {
		url = URLParser.parse("http://www.google.com");
		url.protocol.should.eql("http");
		url.domain.should.eql("www.google.com");
	});

});