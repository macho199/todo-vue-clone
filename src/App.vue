<template>
  <div id="app">
    <section class="todoapp" v-cloak>
			<header class="header">
				<h1>todos</h1>
				<input class="new-todo" autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
			</header>
			<section class="main" v-show="todos.length">
				<input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					<li class="todo" v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed, editing: todo == editedTodo }">
						<div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
							<label @dblclick="editTodo(todo)">{{ todo.title }}</label>
							<button class="destroy" @click="removeTodo(todo)"></button>
						</div>
						<input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
					</li>
				</ul>
			</section>
			<footer class="footer" v-show="todos.length">
				<span class="todo-count" v-show="remaning">
					<strong v-text="remaning"></strong> {{ pluralize('item', remaning) }} left
				</span>
				<ul class="filters">
					<li><a href="#/all" :class="{ selected: visibility == 'all' }">All</a></li>
					<li><a href="#/active" :class="{ selected: visibility == 'active' }">Active</a></li>
					<li><a href="#/completed" :class="{ selected: visibility == 'completed' }">Completed</a></li>
				</ul>
				<button class="clear-completed" v-show="todos.length > remaning" @click="removeCompleted">
					Clear completed
				</button>
			</footer>
		</section>
		<footer class="info">
			<p>Double-click to edit a todo</p>
			<p>Written by <a href="http://evanyou.me">Evan You</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
  </div>
</template>

<script>
import todoStorage from './store';

const filters = {
  all(todos) {
    return todos;
  },
  
  active(todos) {
    return todos.filter(todo => !todo.completed);
  },

  completed(todos) {
    return todos.filter(todo => todo.completed);
  }
};

export default {
  name: 'app',

  data () {
    return {
      todos: todoStorage.fetch(),
      newTodo: '',
      editedTodo: null,
      visibility: 'all',
    }
  },

  watch: {
    todos: {
      deep: true,
      handler: todoStorage.save
    },

    '$route'() {
      const path = this.$route.path.replace(/\//g, '');
      if (['all', 'active', 'completed'].indexOf(path) >= 0) {
        this.visibility = path;
      }
    }
  },

  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },

    remaning() {
      return filters.active(this.todos).length;
    },

    allDone: {
      get() {
        return this.remaning === 0;
      },
      set(value) {
        this.todos.forEach(todo => {
          todo.completed = value;
        });
      }
    }
  },

  methods: {
    pluralize(word, count) {
      return word + (count === 1 ? '' : 's');
    },

    addTodo() {
      const value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({id: this.todos.length + 1, title: value, completed: false});
      this.newTodo = '';
    },

    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },

    removeTodo(todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },

    removeCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  },

  directives: {
    'todo-focus'(el, binding) {
      if (binding) {
        el.focus();
      }
    }
  }
}
</script>

<style>
  
</style>
