import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/index.vue'
import Todos from '../pages/todos/index.vue'
import Todo from '../pages/todos/_id.vue'
import TodoCreate from '../pages/todos/create/index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/todos',
            name:'Todos',
            component: Todos
        },
        {
            path: '/todos/create',
            name:'TodoCreate',
            component: TodoCreate
        },
        {
            path: '/todos/:id',
            name:'Todo',
            component: Todo
        },
    ]
})


// /home
// /todos           리스트
// /todos/create    게시물 추가
// /todos/:id       특정게시물
export default router;