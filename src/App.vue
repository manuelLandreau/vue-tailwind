<template>
    <div class="layout">
        <Header :user="user" />
        <div class="container mx-auto p-10">
            <router-view />
        </div>
        <notifications position="bottom right" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Header from '@/components/Header'

export default {
    components: {
        Header
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type.match(/setAlert/g)) {
                if (state.alert !== null) {
                    // https://github.com/nandi95/vue-toastify
                    this.$notify({
                        title: state.alert.title || null,
                        text: state.alert.text || null,
                        duration: state.alert.duration || 5000,
                        type: state.alert.type || 'info'
                    })
                }
            }
        })
    },
    computed: mapGetters({ loading: 'auth/loading', user: 'user/user' }),
    methods: mapActions({ initAuth: 'auth/initAuth' })
}
</script>
