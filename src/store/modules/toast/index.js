export default {
        namespaced: true,
        state: {
            toastMessage: '',
            toastAlertType: '',
            isShowToast: false,
        },
        mutations: {
            UPDATE_TOAST_MESSAGE(state, payload) {
                state.toastMessage = payload;
            },
            UPDATE_TOAST_ALERT_TYPE(state, payload) {
                state.toastAlertType = payload;
            },
            UPDATE_TOAST_STATUS(state, payload) {
                state.isShowToast = payload;
            },
            UPDATE_TOAST_TIMEOUT(state, payload) {
                state.timeout = payload;
            }
        },
        actions: {
            triggerToast(context, message, type = 'success') {
                context.commit('UPDATE_TOAST_MESSAGE', message);
                context.commit('UPDATE_TOAST_ALERT_TYPE', type);
                context.commit('UPDATE_TOAST_STATUS', true);

                setTimeout(() => {
                    context.commit('UPDATE_TOAST_MESSAGE', '');
                    context.commit('UPDATE_TOAST_ALERT_TYPE', '');
                    context.commit('UPDATE_TOAST_STATUS', false);
                }, 3000)
            }
        },
        getters: {
            // vuex 안에서 사용하는 computed 라고 생각하면 됨 거의 똑 같음
            toastMessageWithSmile(state) {
                return state.toastMessage + '^_^';
            }
        },
}