<template>
  <div id="app">
    <section class="todoapp" v-cloak>
			<header class="header">
				<h1>todos</h1>
				<input class="new-todo" autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
			</header>
			<section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					<li class="todo">
						<div class="view">
							<input class="toggle" type="checkbox">
							<label></label>
							<button class="destroy"></button>
						</div>
						<input class="edit" type="text">
					</li>
				</ul>
			</section>
			<footer class="footer">
				<span class="todo-count">
					<strong></strong> left
				</span>
				<ul class="filters">
					<li><a href="#/all">All</a></li>
					<li><a href="#/active">Active</a></li>
					<li><a href="#/completed">Completed</a></li>
				</ul>
				<button class="clear-completed">
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

export default {
  name: 'app',
  data () {
    return {
      todos: [],
      newTodo: ''
    }
  },
  watch: {
    todos: {
      deep: true,
      handler: todoStorage.save
    }
  },
  methods: {
    addTodo() {
      const value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({id: this.todos.length + 1, title: value});
      this.newTodo = '';
    }
  }
}
</script>

<style>
  
</style>
