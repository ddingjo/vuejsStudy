<template>
    <div v-if="!todos.length">Todo List Done</div>
    <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
        <div class="card-body p-2 d-flex align-items-center">
            <div class="form-check flex-grow-1">
                
                <input 
                    class="form-check-input" 
                    type="checkbox" 
                    v-bind:checked="todo.completed"
                    @change="toggleTodo(index)"
                >
                <!-- <label class="form-check-label" for="" :style="todo.complated ? todoStyle : {}"> -->
                <label for="" class="form-check-label " :class="{ todo: todo.completed }">
                    {{ todo.subject }}
                </label>
            </div>
            <div><button class="btn btn-danger btn-sm" @click="deleteTodo(index)">Del</button></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        todos: {
            type: Array,
            required: true
        }
    },
    emits: ['toggle-todo', 'delete-todo'],
    setup(props, {emit}){
        const toggleTodo = (index) => {
            emit('toggle-todo', index)
        }
        const deleteTodo = (index) => {
            emit('delete-todo', index)
        }
        return {
            toggleTodo,
            deleteTodo,
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