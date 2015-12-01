describe('End to end address tests', function() {
	it('Should have contact', function(done) {
		browser.get(' http://127.0.0.1:8080');

		element.all(by.repeater('contact in contacts'))
		.then(function(contacts){
			var first = contacts[0];
			var text = first.getText();
			expect(text).toEqual('Robert R');
		});

		done();
	});
});