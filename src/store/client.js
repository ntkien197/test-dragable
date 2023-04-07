const client = {
    namespaced: true,
    state: {
        getData: ''
    },
    mutations: {
        TEST(state, value) {
            state.getData = value
        }
    },
    actions: {
        test({ commit }, data) {
            return commit('TEST', data)
        }
    },
    getters: {
        getTest(state) {
            return state.getData
        }
    }
}
export default client
