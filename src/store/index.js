import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import questions from '../questions'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentQuestion: null,
        questions,
        alert: null,
        formOptions: {
            validateAfterLoad: true,
            validateAfterChanged: true,
            validateAsync: true
        }
    },
    getters: {
        currentQuestion: state => state.currentQuestion,
        questions: state => state.questions,
        alert: state => state.alert
    },
    mutations: {
        setCurrentQuestion: (state, payload) => (state.currentQuestion = payload),
        setQuestions: (state, payload) => (state.questions = payload),
        setAlert: (state, payload) => (state.alert = payload)
    },
    actions: {
        /**
         * Trigger a notification
         * @param commit
         * @param payload
         */
        alert({ commit }, payload) {
            commit('setAlert', payload)
        },
        /**
         * Next question
         * @param commit
         * @param state
         */
        nextQuestion({ commit, state }) {
            if (state.currentQuestion === null) commit('setCurrentQuestion', 0)
            else commit('setCurrentQuestion', state.currentQuestion + 1)
        }
    },
    modules: { auth, user }
    // plugins: [createPersistedState()]
})
