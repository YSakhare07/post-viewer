<script setup>
import { ref } from 'vue';

const auth = useAuthStore();
const token = useTokenStore();
const form = reactive({
    email: null,
    password: null,
});

const errors = ref([]);

const handleSubmit = async () => {
    try {
        await auth.login(form)
    } catch (error) {
        errors.value = error.data.errors;
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center">
        <div class="w-full">
            <div class="card bg-white p-8 rounded-lg shadow-xl md:w-3/4 mx-auto lg:w-1/3">
                <h3 class="text-center text-2xl font-semibold"> User Login</h3>

                <!-- {{ form }}
                {{ token.getToken}} - {{ token.getStatus }} -->

                <form @submit.prevent="handleSubmit" class="max-w-sm mx-auto">
                    <div class="mb-2">
                        <formDataLabel for="email">Email</formDataLabel>
                        <formDataInputText id="email" placeholder="xyz@ex0ample.com" v-model="form.email"
                            autocomplete="on" />
                            <span v-if= "errors.email" class="text-red-500">{{ errors.email[0] }}</span>
                    </div>
                    <div class="mb-2">
                        <formDataLabel for="password">Password</formDataLabel>
                        <formDataInputText type="password" id="password" placeholder="Enter your password" v-model="form.password"
                            autocomplete="off" />
                        <span v-if= "errors.password" class="text-red-500">{{ errors.password[0] }}</span>
                    </div>
                    <div class="flex items-start mb-5">
                        <div class="flex items-center h-5">
                            <input id="remember" type="checkbox" value=""
                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                required />
                        
                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember
                            me</label>
                    </div>
                </div>
                    <ButtonPrimary>Login</ButtonPrimary>
                    &nbsp;
                    <ButtonPrimary @click.prevent="token.removeToken()">Remove token</ButtonPrimary> 
                </form>
                <SocialLogin />
            </div>
        </div>
    </div>
</template>