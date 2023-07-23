<template>
    <div v-if="!todos.length">Todo List Done</div>
    <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
        <div class="card-body p-2 d-flex align-items-center" @click="moveToPage(todo.id)">
            <div class="form-check flex-grow-1">
                
                <input 
                    class="form-check-input" 
                    type="checkbox" 
                    v-bind:checked="todo.completed"
                    @change="toggleTodo(index, $event)"
                    @click.stop
                >
                <!-- <label class="form-check-label" for="" :style="todo.complated ? todoStyle : {}"> -->
                <label for="" class="form-check-label " :class="{ todo: todo.completed }">
                    {{ todo.subject }}
                </label>
            </div>
            <div><button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">Del</button></div>
        </div>
    </div>
</template>
<script>
import router from '../router'
import { useRouter} from 'vue-router'
export default {
    props: {
        todos: {
            type: Array,
            required: true
        }
    },
    emits: ['toggle-todo', 'delete-todo'],
    setup(props, {emit}){
        const router = useRouter();
        const toggleTodo = (index, event) => {
            emit('toggle-todo', index, event.target.checked)
        }
        const deleteTodo = (index) => {
            emit('delete-todo', index)
        }
        const moveToPage = (todoId) => {
            console.log(todoId);
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
            moveToPage,
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