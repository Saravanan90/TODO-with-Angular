( function () {
	var flag = true, todos = [];
	for( var index = 0; index < 1000; index++ ){
		var obj = {};
		obj.label = index;
		flag = !flag;
		obj.completed = flag;
		todos.push( obj );
	}

	/*var todos = [{
		label: 'AA',
		completed: true
	}, {
		label: 'BB',
		completed: false
	}, {
		label: 'CC',
		completed: false
	}, {
		label: 'DD',
		completed: false
	}];*/
	var todoApp = angular.module('todoApp', ['todoDirectives']),
		todoDirectives = angular.module('todoDirectives', []);

	todoApp.directive('todo', function() {
		var properties = {
			restrict: 'EA',
			controller: function ($scope) {
				$scope.todos = todos;
				this.add = function( activity ) {
					$scope.todos.push(activity);
				}
			}
		};
		return properties;
	});

	todoDirectives.directive('todoList', function() {
		var properties = {
			restrict: 'EA',
			scope: {
				todos: '='
			},
			templateUrl: './templates/todoList.html',
			link: function( scope, element, attrs ) {
				scope.showOpt = 'all';
				scope.updateStatus = function(todo) {
					todo.completed = !todo.completed;
				};
				scope.statusCheck = function( item ) {
					var value = false;
					switch( scope.showOpt ){
						case 'all': value = true; break;
						case 'marked': value = item.completed; break;
						case 'unmarked': value = !item.completed; break;
					}
					return value;
				}
			}
		};
		return properties;
	});

	todoDirectives.directive('todoForm', function() {
		var properties = {
			restrict: 'EA',
			replace: true,
			scope: {},
			require: '^todo',
			templateUrl: './templates/todoForm.html',
			controller: function( $scope ) {
				$scope.todo = {};
			},
			link: function( scope, element, attrs, todoCtrl ){
				scope.addToTodo = function() {
					var todo = {
						label: scope.todo.activity,
						completed: false
					}
					todoCtrl.add( todo );
					scope.todo.activity = '';
				}
			}
		};
		return properties;
	});
})();