<template>
    <h1>ToDo Page</h1>
    <div v-if="isLoading" class="text-center">
        Loading...
    </div>
    <form v-else @submit.prevent="onSave">
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label>Subject</label>
                    <input type="text" class="form-control" v-model="todo.subject">
                </div>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <label>Status</label>
                    <div>
                        <button 
                            type="button"
                            class="btn" 
                            :class="todo.completed ? 'btn-success' : 'btn-danger'"
                            @click="toggleTodoStatus"
                        >
                            {{ todo.completed ? 'Completed' : 'Incomplete' }}
                        </button>
                    </div>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="completedCheck" v-model="todo.completed">
                    <label class="form-check-label" for="completedCheck">
                        Completed
                    </label>
                </div>        
            </div>
        </div>
        <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="todoUpdated"
        >
            Save
        </button>
        <button type="reset" class="btn btn-outline-dark ml-2" @click="moveTodoList">List</button>
    </form>
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'
import { ref, computed } from 'vue'
import _ from 'lodash';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const originalTodo = ref(null);
        const isLoading = ref(true);

        const todoUpdated = computed(() => {
            return _.isEqual(todo.value, originalTodo.value)
        })
        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        }
        const moveTodoList = () => {
            router.push({
                name: 'Todos',
            })
        }
        const getTodo = async () => {
            const res = await axios.get(`http://localhost:3000/todos/${route.params.id}`)
            todo.value = {...res.data}; // 스프레드 오퍼레이터
            originalTodo.value = {...res.data};
            isLoading.value = false;
        }

        getTodo();

        const onSave = async () => {
            const id = route.params.id;
            try {
                const res = await axios.patch(`http://localhost:3000/todos/${id}`, {
                    completed: todo.value.completed,
                    subject: todo.value.subject
                })
                todo.value = {...res.data}; // 스프레드 오퍼레이터
                originalTodo.value = {...res.data};
            } catch (err) {
                err.value = "deleteTodo: " + err;
            }
        }

        return {
            todo,
            isLoading,
            onSave,
            toggleTodoStatus,
            moveTodoList,
            todoUpdated,
        }
    }

}
</script>
<style></style>