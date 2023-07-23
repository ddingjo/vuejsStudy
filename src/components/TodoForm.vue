<template>
    <div v-if="isLoading" class="text-center">
        Loading...
    </div>
    <form v-else @submit.prevent="onSave">
        <div class="row">
            <div class="col-6">
                <!-- <div class="form-group">
                    <label>Subject</label>
                    <input type="text" class="form-control" v-model="todo.subject">
                    <div v-if="subjectErrMsg" style="color:red"> {{ subjectErrMsg }}</div>
                </div> -->
                <!-- <Input 
                    label="Subject" 
                    :error="subjectErrMsg" 
                    :subject="todo.subject" 
                    @update-subject="updateSubject"
                /> -->
                <Input 
                    label="Subject" 
                    v-model:subject="todo.subject"
                    :error="subjectErrMsg" 
                />
            </div>
            <div v-if="editing" class="col-6">
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
                <div class="form-check" >
                    <input class="form-check-input" type="checkbox" id="completedCheck" v-model="todo.completed">
                    <label class="form-check-label" for="completedCheck">
                        Completed
                    </label>
                </div>        
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label>Body</label>
                    <textarea v-model="todo.body" class="form-control" cols="30" rows="10">

                    </textarea>
                </div>      
            </div>
        </div>
        <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="todoUpdated"
        >
            {{ editing ? 'Update' : 'Create' }}
        </button>
        <button type="reset" class="btn btn-outline-dark ml-2" @click="moveTodoList">List</button>
    </form>
    <transition name="slide">
        <Toast v-if="isShowToast" :message="toastMessage" :type="toastAlertType"/>
    </transition>
    
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'
import { ref, computed } from 'vue'
import _ from 'lodash';
import Toast from '@/components/Toast.vue'
import {useToast} from '@/composables/toast'
import Input from '@/components/Input.vue'

export default {
    components: {
        Toast,
        Input
    },
    props: {
        editing: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            completed: false,
            body: ''
        });
        const subjectErrMsg = ref('')
        const originalTodo = ref(null);
        const isLoading = ref(false);
        
        
        const {
            toastMessage,
            toastAlertType,
            isShowToast,
            triggerToast, 
        } = useToast();
        
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
            isLoading.value = true;
            try{
                const res = await axios.get(`http://localhost:3000/todos/${route.params.id}`)
                todo.value = {...res.data}; // 스프레드 오퍼레이터
                originalTodo.value = {...res.data};
                isLoading.value = false;
            }catch(err){
                isLoading.value = false;
                triggerToast (err, danger);
            }
        }

        if (props.editing){
            getTodo();
        }

        
        const onSave = async () => {
            subjectErrMsg.value = '';
            if(!todo.value.subject){
                subjectErrMsg.value = 'Subject is required'
                return;
            }
            const id = route.params.id;
            try {
                let res;
                const data = {
                    completed: todo.value.completed,
                    subject: todo.value.subject,
                    body: todo.value.body
                }
                if (props.editing){
                    res = await axios.put(`http://localhost:3000/todos/${id}`, data)
                    originalTodo.value = {...res.data}; // 스프레드 오퍼레이터 
                }else{
                    res = await axios.post(`http://localhost:3000/todos`, data)
                    todo.value.subject = '';
                    todo.value.body = '';
                }
                
                const message = 'Successfully ' + (props.editing ? 'Updated!' : 'Created!');
                triggerToast(message);
            } catch (err) {
                triggerToast("onSave: " + err, 'danger');
            }
        }

        return {
            todo,
            isLoading,
            onSave,
            toggleTodoStatus,
            moveTodoList,
            todoUpdated,
            isShowToast,
            toastMessage,
            toastAlertType,
            subjectErrMsg,
        }
    }
}
</script>
<style scoped>
    .slide-enter-active,
    .slide-leave-active{
        transition: all 0.5s ease;
    }

    .slide-enter-from,
    .slide-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }

    .slide-enter-to,
    .slide-leave-from {
        opacity: 1;
        transform: translateY(0px);
    }
    /* .fade-enter-active,
    .fade-leave-active{
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
    } */
</style>