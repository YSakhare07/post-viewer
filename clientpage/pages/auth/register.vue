<script setup>
// import { ref } from 'vue';
definePageMeta({
    middleware:["guest"]
})
const auth = useAuthStore();
const form = reactive({
    email: null,
    password: null,
    c_password: null,
    name: null,
});

const errors = ref([]);

const handleSubmit = async () => {
    try {
        await auth.register(form)
    } catch (error) {
        errors.value = error.data.errors;
    }
};

</script>

<template>
    <div class="min-h-screen flex items-center">
        <div class="w-full">
            <div class="card bg-white p-8 rounded-lg shadow-xl md:w-3/4 mx-auto lg:w-1/3">
               
                <h3 class="text-center text-2xl font-semibold"> User Register</h3>
                <br>
                 <!-- {{ form }} -->
                <form @submit.prevent="handleSubmit" class="max-w-sm mx-auto">
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="email" name="email" id="email"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="" v-model="form.email" />
                        <label for="email"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 required-field">Email
                            address</label>
                            <span v-if= "errors.email" class="text-red-500">{{ errors.email[0] }}</span>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input name="password" type="password" id="password"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="" v-model="form.password"  />
                        <label for="password"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 required-field">Password</label>
                            <span v-if= "errors.password" class="text-red-500">{{ errors.password[0] }}</span>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="password" name="c_password" id="c_password"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " v-model="form.c_password" />
                        <label for="c_password"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 required-field">Confirm
                            password</label>
                            <span v-if= "errors.c_password" class="text-red-500">{{ errors.c_password[0] }}</span>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="name" id="name"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " v-model="form.name" />
                            <label for="name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 required-field">Name</label>
                                <span v-if= "errors.name" class="text-red-500">{{ errors.name[0] }}</span>
                        </div>
                    </div>
                    <ButtonPrimary>Register</ButtonPrimary>
                </form>
                <SocialLogin />
            </div>
        </div>
    </div>
</template>

<style scoped>
.required-field::after {
  content: "*";
  color: red;
}
</style>