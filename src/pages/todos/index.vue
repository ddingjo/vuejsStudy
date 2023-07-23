<template>
    <router-view />
    <div class="container">
      <h2>To-Do List</h2>
      <input 
        class="form-control" 
        type="text" 
        v-model="searchText" 
        placeholder="Search Text"
        @keyup.enter="searchInput"
      >
      <hr />
      <TodoSimpleForm @add-todo="addTodo" />
      <div style="color:red">{{ error }}</div>
      <TodoList :todos="todos" @toggle-todo="togglTodo" @delete-todo="deleteTodo" />
      <hr />
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li v-if="currentPage !== 1" class="page-item">
            <a class="page-link" @click="getTodos(currentPage - 1)">Previous</a>
          </li>
          <li 
            v-for="page in numberOfPages"
            class="page-item" 
            :class="currentPage === page ? 'active' : '' "
            >
            <a class="page-link" @click="getTodos(page)">{{page}}</a>
          </li>
          <li v-if="numberOfPages !== currentPage" class="page-item">
            <a class="page-link" @click="getTodos(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  import { ref, computed, watch } from 'vue'
  import TodoSimpleForm from '@/components/TodoSimpleForm.vue'
  import TodoList from '@/components/TodoList.vue'
  import axios from 'axios';
  
  export default {
    components: {
      TodoSimpleForm,
      TodoList,
    },
    setup() {
      const todos = ref([])
      const searchText = ref('')
      const error = ref('')
      const numOfTodos = ref(0);
      const limit = 5;
      const currentPage = ref(1);
  
      const numberOfPages = computed(() => Math.ceil(numOfTodos.value / limit))
  
      
  
      const getTodos = async (page = currentPage.value) => {
        currentPage.value = page;
        try {
          const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
          numOfTodos.value = res.headers['x-total-count'];
          todos.value = res.data;
        } catch (err) {
          error.value = "getTodos: " + err;
        }
      }
      getTodos();
  
      const addTodo = async (todo) => {
        // 데이터베이스 투두 저장
        error.value = '';
        try {
          await axios.post('http://localhost:3000/todos', {
            subject: todo.subject, completed: todo.completed
          });
          getTodos(1);
          //todos.value.push(res.data);
        } catch (err) {
          error.value = "addTodo: " + err;
        }
      }
  
      const deleteTodo = async (index) => {
        error.value = '';
        const id = todos.value[index].id;
        try {
          await axios.delete(`http://localhost:3000/todos/${id}`);
          getTodos(currentPage.value);
          //todos.value.splice(index, 1)
        } catch (err) {
          error.value = "deleteTodo: " + err;
        }
  
      }
      const togglTodo = async (index, checked) => {
        error.value = '';
        const id = todos.value[index].id;
        try {
          const res = await axios.patch(`http://localhost:3000/todos/${id}`, {
            completed: checked
          })
          // console.log(res);
          todos.value[index].completed = checked;
  
        } catch (err) {
          error.value = "deleteTodo: " + err;
        }
  
      }
  
      let timeout = null;
      const searchInput = () => {
        clearTimeout(timeout);
        getTodos(1);
      }
      
      watch(searchText, () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          getTodos(1);
        }, 2000)
      });
      
      return {
        todos,
        searchText,
        error,
        numberOfPages,
        currentPage,
        getTodos,
        togglTodo,
        deleteTodo,
        addTodo,
  
      }
    }
  }
  </script>
  
  
  
  <style scoped></style>
  