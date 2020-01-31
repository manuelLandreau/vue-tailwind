import axios from 'axios'

const auth = {
    namespaced: true,
    state: () => ({
        loading: false,
        user: null
    }),
    getters: {
        loading: state => state.loading,
        user: state => state.user
    },
    mutations: {
        setLoading: (state, payload) => (state.loading = payload),
        setUser: (state, payload) => (state.user = payload)
    },
    actions: {
        /**
         *
         * @param commit
         * @param dispatch
         * @returns {Promise}
         */
        fetchUser({ commit }) {
            return axios
                .get('/users/1')
                .then(({ data }) => {
                    commit('setUser', data)
                })
                .catch(e => Promise.reject(e))
        }
    }
}

export default auth
