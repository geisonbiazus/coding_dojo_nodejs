var ShoppingCart = function() {

	_this = this;
	this.products = [];
	this.total = 0.0;

	this.add = function(product) {
		item = findItem(this.products, product);

		if (!item) {
			item = {product: product, amount: 0};
			this.products.push(item);
		}

		item.amount++;
		item.price = item.product.price * item.amount;

		this.total += product.price;		
		this.discount = calculateDiscount();
		this.valueToPay = this.total - this.discount;
	};

	findItem = function(products, product) {
		var found = null;
		products.forEach(function(item) {			
			if (item.product === product) {
				found = item;
				return;
			}			
		});

		return found;
	};

	calculateDiscount = function() {
		var discount_percent;
		
		if (_this.products.length >= 5)
			discount_percent =  20.0;			
		else if (_this.products.length >= 4)
			discount_percent =  15.0;			
		else if (_this.products.length >= 3)
			discount_percent =  10.0;			
		else if (_this.products.length >= 2)
			discount_percent =  5.0;
		else return 0;

		return _this.total * discount_percent / 100;
	}

}

module.exports = ShoppingCart;