require('should');
Book = require('../app/book');
ShoppingCart = require('../app/shopping_cart');

describe("BookStore", function() {

	beforeEach(function() {
		shoppingCart = new ShoppingCart();
		book_1 = new Book("Book 1", 42);
		book_2 = new Book("Book 2", 42);
		book_3 = new Book("Book 3", 42);
		book_4 = new Book("Book 4", 42);
		book_5 = new Book("Book 5", 42);
		book_6 = new Book("Book 6", 42);
		book_7 = new Book("Book 7", 42);
	});

	it("should add books to the shopping cart", function() {
		shoppingCart.add(book_1);
		shoppingCart.add(book_2);

		shoppingCart.products.length.should.eql(2);
	});

	it("should increase the product amount when adding the same book twice", function() {
		shoppingCart.add(book_1);
		shoppingCart.add(book_1);
		shoppingCart.add(book_3);
		shoppingCart.add(book_4);
		shoppingCart.add(book_4);
		shoppingCart.add(book_4);

		shoppingCart.products.length.should.eql(3);

		shoppingCart.products[0].product.should.eql(book_1);
		shoppingCart.products[0].amount.should.eql(2);

		shoppingCart.products[1].product.should.eql(book_3);
		shoppingCart.products[1].amount.should.eql(1);

		shoppingCart.products[2].product.should.eql(book_4);
		shoppingCart.products[2].amount.should.eql(3);
	});

	it('should calculate the price of the books', function() {
		shoppingCart.add(book_1);
		shoppingCart.add(book_1);

		shoppingCart.products[0].product.should.eql(book_1);
		shoppingCart.products[0].amount.should.eql(2);
		shoppingCart.products[0].price.should.eql(84);
	});

	it('should give 5% of discount if there are 2 diferent books', function() {
		shoppingCart.add(book_1);
		shoppingCart.add(book_1);
		shoppingCart.add(book_2);

		shoppingCart.total.should.eql(126);
		shoppingCart.discount.should.eql(6.3);
		shoppingCart.valueToPay.should.eql(119.7);
	});

	it('should give 10% of discount if there are 3 diferent books', function() {
		shoppingCart.add(book_1);
		shoppingCart.add(book_1);
		shoppingCart.add(book_2);
		shoppingCart.add(book_2);
		shoppingCart.add(book_2);
		shoppingCart.add(book_3);

		shoppingCart.total.should.eql(252);
		shoppingCart.discount.should.eql(25.2);
		shoppingCart.valueToPay.should.eql(226.8);
	});


	it('should give 15% of discount if there are 4 diferent books', function() {
		shoppingCart.add(book_1);
		shoppingCart.add(book_1);
		shoppingCart.add(book_2);
		shoppingCart.add(book_2);
		shoppingCart.add(book_2);
		shoppingCart.add(book_3);
		shoppingCart.add(book_4);

		shoppingCart.total.should.eql(294);
		shoppingCart.discount.should.eql(44.1);
		shoppingCart.valueToPay.should.eql(249.9);
	});

	it('should give 20% of discount if there are 5 or more diferent books', function() {
		shoppingCart.add(book_1);
		shoppingCart.add(book_1);
		shoppingCart.add(book_2);
		shoppingCart.add(book_2);
		shoppingCart.add(book_3);
		shoppingCart.add(book_3);
		shoppingCart.add(book_4);
		shoppingCart.add(book_5);

		shoppingCart.total.should.eql(336);
		shoppingCart.discount.should.eql(67.2);
		shoppingCart.valueToPay.should.eql(268.8);
	});

});
