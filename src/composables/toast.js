import {ref, onUnmounted} from 'vue'
export const useToast = () => {
    const toastMessage = ref('')
    const toastAlertType = ref('')
    const isShowToast = ref(false)
    const timeout = ref(null);
    
    onUnmounted(() => {
        clearTimeout(timeout.value);
    })
    
    const triggerToast = (message, type = 'success') => {
        toastAlertType.value = type;
        toastMessage.value = message;
        isShowToast.value  = true;
        timeout.value = setTimeout(() => {
            toastMessage.value = '';
            toastAlertType.value = '';
            isShowToast.value  = false;
        }, 3000)
    }

    return {
        toastMessage,
        toastAlertType,
        isShowToast,
        triggerToast, 
    }
}