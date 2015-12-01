// Set checkers

var assert = chai.assert;
var expect = chai.expect;

describe('The address book App', function() {
	describe('The contact service', function() {
		beforeEach(function (){
			module('AddressBook');
			inject(function($injector){
				contactService = $injector.get('contactService');
				$httpBackend = $injector.get('$httpBackend');
			});
		})

		it('Should have property contacts, an array', function() {
			
			expect(contactService.contacts).to.be.an('array');
		});

		it('Should call backend', function() {
			$httpBackend.expectGET('http://localhost:9001/contacts')
				.respond(200, []);
			$httpBackend.flush();
		});
	});

	describe('The contact controller', function() {
		beforeEach(function(){
			module('AddressBook');
			inject(function($injector, $rootScope){
				$scope = $rootScope.$new();
				contactService = $injector.get('contactService');
				$httpBackend = $injector.get('$httpBackend');
				$controller = $injector.get('$controller');
			})
		});

		it('Should stock an array contacts in scope', function() {
			$controller('ContactController', {$scope: $scope, contactService:contactService});
			assert.isArray($scope.contacts);
		});
	});

	describe('The proper filter', function() {
		beforeEach(function (){
			module('AddressBook');
			inject( function($injector) {
				proper = $injector.get('$filter')('proper');
			});
		});

		it('Should proper case a string', function() {
			expect(proper('ned stark')).to.equal('Ned Stark');
		});

		it('Should take a number and return it as string', function() {
			expect(proper(42)).to.equal('42');
		});


		it('Should throw an error', function() {
			assert.throws( function (){
				proper(undefined);
			})
		});
		
	});


	describe('Avatar', function() {
		beforeEach(function (){
			module('AddressBook');
		});

		it('Should display capitalized first latter of the name', function() {
			inject(function  ($rootScope, $compile) {
				$rootScope.contact = {name : 'jon arryn'};
				var element = $compile('<avatar name=contact.name/>')($rootScope);
				$rootScope.$digest();

				var dirText = element.text();
				expect(dirText).to.equal("J");
			});
			
		});
		
	});
});