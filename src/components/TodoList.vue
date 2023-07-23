<template>
    <div v-if="!todos.length">Todo List Done</div>
    <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
        <div class="card-body p-2 d-flex align-items-center" style="cursor: pointer" @click="moveToDetail(todo.id)">
            <div class="flex-grow-1">
                <input 
                    class="mx-2"
                    type="checkbox" 
                    v-bind:checked="todo.completed"
                    @change="toggleTodo(index, $event)"
                    @click.stop
                >
                <!-- <label class="form-check-label" for="" :style="todo.complated ? todoStyle : {}"> -->
                <span :class="{ todo: todo.completed }">
                    {{ todo.subject }}
                </span>
            </div>
            <div><button class="btn btn-danger btn-sm" @click.stop="openModal(todo.id)">Del</button></div>
        </div>
    </div>
    
    <teleport to="#modal">
        <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
    </teleport>
</template>
<script>
//import router from '../router'
import { useRouter} from 'vue-router'
import Modal from '@/components/DeleteModal.vue'
import {ref} from 'vue';
export default {
    components: {
        Modal
    },
    props: {
        todos: {
            type: Array,
            required: true
        }
    },
    emits: ['toggle-todo', 'delete-todo'],
    setup(props, {emit}){
        const router = useRouter();
        const showModal = ref(false);
        const todoDeleteId = ref(null);
        const toggleTodo = (index, event) => {
            emit('toggle-todo', index, event.target.checked)
        }
        const closeModal = () => {
            showModal.value = false;
            todoDeleteId.value = null;
        }
        const openModal = (id) => {
            todoDeleteId.value = id;
            showModal.value = true;
        }
        const deleteTodo = () => {
            emit('delete-todo', todoDeleteId.value);
            showModal.value = false;
            todoDeleteId.value = null;
        }
        const moveToDetail = (todoId) => {
            //router.push('/todos/' + todoId);
            router.push({
                name: 'Todo',
                params : {
                    id: todoId
                }
            })
        }
        return {
            toggleTodo,
            deleteTodo,
            moveToDetail,
            openModal,
            closeModal,
            showModal,
        }

    }
}
</script>
<style scoped>

.todo {
  text-decoration: line-through;
  color: gray;
}
</style>