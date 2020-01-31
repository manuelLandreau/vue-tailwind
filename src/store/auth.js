import axios from 'axios'

const auth = {
    namespaced: true,
    state: () => ({
        isAuth: false,
        loading: false,
        alert: null
    }),
    getters: {
        isAuth: state => state.isAuth,
        loading: state => state.loading
    },
    mutations: {
        setAuth: (state, payload) => (state.isAuth = payload),
        setLoading: (state, payload) => (state.loading = payload)
    },
    actions: {
        /**
         * Log user from the jwt stored & Avoid logout at refresh
         * @param commit
         * @param dispatch
         */
        initAuth({ commit, dispatch }) {
            commit('setLoading', true)
            commit('setAlert', null)

            if (localStorage.getItem('token')) {
                commit('setAuth', true)
                axios.defaults.headers.common.Authorization = localStorage.getItem('token')
                return dispatch('auth/login', null, { root: true }).then(() => commit('setLoading', false))
            } else if (sessionStorage.getItem('token')) {
                commit('setAuth', true)
                axios.defaults.headers.common.Authorization = sessionStorage.getItem('token')
                return dispatch('user/fetchUser', null, { root: true }).then(() => commit('setLoading', false))
            } else {
                commit('setAuth', false)
                commit('setLoading', false)
            }
            return Promise.resolve()
        },
        /**
         * Login hanlder
         * @param commit
         * @param dispatch
         * @param {{identifier: string, password: string}} payload
         * @returns {Promise}
         */
        signin({ commit, dispatch }, payload) {
            commit('setLoading', true)
            return axios
                .post('/auth/login', payload)
                .then(({ data }) => {
                    // noinspection JSUnresolvedVariable
                    axios.defaults.headers.common.Authorization = 'Bearer ' + data.access_token

                    // noinspection JSUnresolvedVariable
                    if (payload.remember) {
                        localStorage.setItem('token', 'Bearer ' + data.access_token)
                    } else {
                        sessionStorage.setItem('token', 'Bearer ' + data.access_token)
                    }

                    commit('setAuth', true)
                    commit('setLoading', false)
                    commit('setAlert', null)

                    return dispatch('user/fetchUser', null, { root: true })
                })
                .catch(e => {
                    commit('setLoading', false)
                    dispatch(
                        'alert',
                        e.request.status === 401
                            ? { ...e, type: 'error', text: `Mauvais identifiant ou mot de passe` }
                            : { ...e, type: 'error', text: `Une erreur s'est produite` },
                        { root: true }
                    )
                    return Promise.reject()
                })
        },
        /**
         * Logout handler
         * @param commit
         * @returns {Promise<void>}
         */
        logout({ commit }) {
            commit('setAuth', false)
            delete axios.defaults.headers.common.Authorization
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            return Promise.resolve()
        }
    }
}

export default auth
