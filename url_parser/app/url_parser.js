module.exports = {

	parse: function(url) {
		var parsedURL = {}
		var regexResult = url.match(/^(\w+):\/\/(?:(\w+)@)?((?:\w|\w\.\w)+)((?:\/\w+)*)(?:\?(\S+=.*?)*)?$/)

		if (regexResult) {
			parsedURL.protocol = regexResult[1];
			parsedURL.user = regexResult[2];
			parsedURL.domain = regexResult[3];
			parsedURL.path = regexResult[4];
			parsedURL.query = regexResult[5];
		} else {
			throw new Error('Invalid URL');
		}

		return parsedURL;
	}

};

 