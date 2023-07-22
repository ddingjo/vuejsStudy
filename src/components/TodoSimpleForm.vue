<template>
    <form @submit.prevent="onSubmit">
        <div class="d-flex">
            <div class="flex-grow-1 mr-2">
                <input class="form-control" type="text" v-model="todo" placeholder="Type new Todo">
            </div>
            <div>
                <button class="btn btn-primary" type="submit">Add</button>
            </div>
        </div>
        <div style="color:red" v-show="hasError">This field cannot be empty</div>
    </form>
</template>
<script>
import { ref } from 'vue'
export default {
    emits: ['add-todo'],
    setup(props, context) {
        const todo = ref('')
        const hasError = ref(false);
        const onSubmit = () => {
            if (todo.value !== '') {
                // todos.value.push(
                //     {
                //         id: Date.now(),
                //         subject: todo.value,
                //         complated: false,
                //     }
                // );
                context.emit('add-todo', {
                        id: Date.now(),
                        subject: todo.value,
                        complated: false,
                    }
                )
                todo.value = '';
                hasError.value = false;
            } else {
                hasError.value = true;
            }

        }
        return {
            todo,
            hasError,
            onSubmit
        }
    }
}
</script>
<style scoped></style>