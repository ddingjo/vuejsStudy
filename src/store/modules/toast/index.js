export default {
        namespaced: true,
        state: {
            toasts: [],
        },
        mutations: {
            ADD_TOAST(state, payload){
                state.toasts.push(payload)
            },
            REMOVE_TOAST(state) {
                state.toasts.shift();
            }
        },
        actions: {
            triggerToast(context, payload) {
                // message, type = 'success'
                context.commit('ADD_TOAST', {
                    id: Date.now(),
                    message: payload.message,
                    type: payload.type
                })

                setTimeout(() => {
                    context.commit('REMOVE_TOAST')
                }, 11000)
            }
        },
        getters: {
            // vuex 안에서 사용하는 computed 라고 생각하면 됨 거의 똑 같음
            toastMessageWithSmile(state) {
                return state.toastMessage + '^_^';
            }
        },
}