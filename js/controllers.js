angular.module('todoApp', [])
  .service('peernames', function () {
      return [
          {
              name: 'learn angular 1', 
              variants: ['good', 'bad', 'ugly'],
              target: 'Ololo'
          },
          {
              name: 'learn angular 2', 
              variants: ['good', 'bad', 'ugly'],
              target: 'Trololo'
          }
      ];
  })
  .controller('TodoListController', function (peernames) {
      var todoList = this;
      todoList.todos = peernames;
   
      todoList.addTodo = function () {
          todoList.todos.push({
              name: todoList.name, 
              target: todoList.target,
              variants: [],
              done: false              
          });
          todoList.name = '';
          todoList.target = '';
      };

      todoList.addVariant = function (index) {
          todoList.todos[index].variants.push(todoList.newVariant[index]);
          todoList.newVariant[index] = '';
      }; 
   
      todoList.remaining = function () {
          var count = 0;
          angular.forEach(todoList.todos, function (todo) {
            count += todo.done ? 0 : 1;
          });
          return count;
      };
   
      todoList.archive = function () {
          var oldTodos = todoList.todos;
          todoList.todos = [];
          angular.forEach(oldTodos, function(todo) {
              if (!todo.done) todoList.todos.push(todo);
          });
      };
  });