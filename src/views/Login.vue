<template>
    <div class="layout">
        <div class="w-full max-w-xs mx-auto mt-10">
            <h1 class="text-6xl mb-6">Login</h1>
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="submit">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input
                        id="username"
                        v-model="login"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        :class="{ 'border-red-500': submited && !validLogin }"
                        type="text"
                        placeholder="Username"
                    />
                    <p v-if="submited && !validLogin" class="text-red-500 text-xs italic">Please type a valid login.</p>
                </div>

                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input
                        id="password"
                        v-model="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        :class="{ 'border-red-500': submited && !validPassword }"
                        type="password"
                        placeholder="******************"
                    />
                    <p v-if="submited && !validPassword" class="text-red-500 text-xs italic">
                        Please type a valid password.
                    </p>
                </div>

                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        login: '',
        password: '',
        remember: false,
        submited: false
    }),
    computed: {
        ...mapGetters({ loading: 'auth/loading', isAuth: 'auth/isAuth', user: 'user/user' }),
        validLogin() {
            return this.login !== '' || this.login.length > 5
        },
        validPassword() {
            return this.password !== '' || this.password.length > 3
        }
    },
    mounted() {
        if (localStorage.getItem('remember')) {
            this.remember = true
        }
    },
    methods: {
        ...mapActions({ signin: 'auth/signin', alert: 'alert' }),
        submit() {
            this.submited = true
            if (this.validLogin && this.validPassword)
                this.signin({
                    email: this.login,
                    password: this.password,
                    remember: this.remember
                }).then(() => {
                    this.$router.push('/')
                })
            else
                this.alert({
                    text: `L'identifiant ou le mot de passe est invalide`,
                    type: 'error'
                })
        }
    }
}
</script>
