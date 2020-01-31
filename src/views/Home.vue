<template>
    <div>
        <h1 class="text-6xl mb-6">Home</h1>
        <div v-if="currentQuestion === null" class="first-message">Commencer</div>
        <vue-form-generator :schema="schema" :model="model" :options="formOptions" />
        <button class="btn-primary" @click="submit">
            Next
        </button>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'

Vue.use(VueFormGenerator)

export default {
    data() {
        return {
            model: {},
            schema: {
                fields: []
            },
            formOptions: {
                validateAfterLoad: true,
                validateAfterChanged: true,
                validateAsync: true
            }
        }
    },
    watch: {
        currentQuestion(o, n) {
            if (o !== n) {
                this.model[this.questions[this.currentQuestion].model] = this.questions[this.currentQuestion].value
                if (
                    this.questions[this.currentQuestion].shouldEnter === undefined ||
                    this.questions[this.currentQuestion].shouldEnter(this.model)
                ) {
                    this.schema.fields = [this.questions[this.currentQuestion]]
                } else {
                    // noinspection JSCheckFunctionSignatures
                    this.nextQuestion()
                }
            }
        }
    },
    computed: {
        ...mapGetters(['currentQuestion', 'questions'])
    },
    methods: {
        ...mapActions(['nextQuestion']),
        submit() {
            // noinspection JSCheckFunctionSignatures
            this.nextQuestion()
        }
    }
}
</script>

<style>
.btn-primary {
    @apply bg-blue-500 text-white font-bold mt-4 py-2 px-4 rounded;

    &:hover {
        @apply bg-blue-700;
    }

    &:focus {
        @apply outline-none shadow-outline;
    }
}
</style>
