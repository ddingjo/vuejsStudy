import { computed } from 'vue'
import { useStore } from 'vuex'

export const useToast = () => {
    const store = useStore();
    const toastMessage = computed( () => store.getters.toastMessageWithSmile);
    const toastAlertType = computed( () => store.state.toastAlertType);
    const isShowToast = computed( () => store.state.isShowToast);
    
    const triggerToast = (message, type = 'success') => {
        store.dispatch('triggerToast', message, type);
    }

    return {
        toastMessage,
        toastAlertType,
        isShowToast,
        triggerToast, 
    }
}