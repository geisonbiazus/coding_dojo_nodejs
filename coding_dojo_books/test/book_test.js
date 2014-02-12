require('should');
Book = require('../app/book');

describe('Book', function() {

	it('should store the title and the price of the book', function() {
		book = new Book("Harry Potter 1", 42);

		book.title.should.eql("Harry Potter 1");
		book.price.should.eql(42);
	})
});