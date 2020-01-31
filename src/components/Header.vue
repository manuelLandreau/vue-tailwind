<template>
    <nav class="flex items-center justify-between flex-wrap bg-white px-6 py-0 shadow-md">
        <router-link to="/" class="flex items-center flex-shrink-0 text-gray-black mr-6">
            <!--suppress HtmlUnknownTarget -->
            <img class="fill-current h-16 w-16 mr-2" src="@/assets/img/gide-white.svg" alt="GIDE" />
        </router-link>
        <div class="block md:hidden lg:hidden">
            <button class="toggle-btn" @click="toggleMenu">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>
        <div class="w-full flex-grow md:flex md:items-center md:w-auto" :class="{ hidden: open }">
            <div class="text-sm flex-grow">
                <router-link to="/about" class="nav-link">
                    About
                </router-link>
                <router-link to="/" class="nav-link">
                    Questions
                </router-link>
            </div>
            <div class="text-sm">
                <router-link v-if="!user" to="/login" class="nav-link">
                    Sign in
                </router-link>
                <router-link v-else to="/profil" class="nav-link capitalize">
                    <UserIcon size="20" class="inline-block pb-1" /> {{ user.firstname }}
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import { UserIcon } from 'vue-feather-icons'

export default {
    components: {
        UserIcon
    },
    data: () => ({
        open: false
    }),
    props: {
        user: Object
    },
    methods: {
        toggleMenu() {
            this.open = !this.open
        }
    }
}
</script>

<style>
.nav-link {
    @apply block mt-0 mr-4 text-black;

    &:hover {
        @apply text-gray-700;
    }

    @media (min-width: theme('screens.md')) {
        @apply inline-block;
    }
}

.toggle-btn {
    @apply flex items-center px-3 py-2 border rounded text-black border-black;

    &:hover {
        @apply text-gray-700 border-gray-700;
    }
}
</style>
