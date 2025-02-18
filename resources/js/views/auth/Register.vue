<template>
    <AuthLayout>

        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto dark:bg-gray-900">
            <router-link :to="{ name: 'home' }" class="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
                <img src="@/assets/logo.svg" class="mr-4 h-11" alt="Website Logo" />
                <span>My notes</span>
            </router-link>
            <div class="w-full max-w-xl p-6 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                    Create a free account
                </h2>
                <div class="alert-danger" v-if="Object.keys(validationErrors).length > 0">
                    <div class="" v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</div>
                </div>
                <form class="mt-8 space-y-6" action="#" @submit.prevent="register">
                    <div>
                        <label for="username" class="block mb-2 font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" v-model="user.name" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" v-model="user.email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" v-model="user.password" id="password" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                    </div>
                    <div>
                        <label for="confirm-password" class="block mb-2 font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" v-model="user.password_confirmation" id="confirm-password" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                    </div>
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input id="accept-terms" aria-describedby="remember" v-model="user.accept_terms" type="checkbox" class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" required>
                        </div>
                        <div class="ml-3">
                            <label for="accept-terms" class="font-medium text-gray-900 dark:text-white">I accept the <a href="#" class="text-primary-700 hover:underline dark:text-primary-500">Terms and Conditions</a></label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        class="w-full bg-blue-500 rounded-lg text-white text-center p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        :disabled="processing"
                        >
                        Register
                    </button>
                    <div class="text-right font-medium text-gray-500 dark:text-gray-400">
                        Already have an account? <router-link :to="{name:'login'}" class="text-blue-500">Login here</router-link>
                    </div>
                </form>
            </div>
        </div>        
    </AuthLayout>
</template>

<script setup>
    import { ref, reactive } from 'vue';
    import { onBeforeMount } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import AuthLayout from "@/layouts/AuthLayout.vue";
    import { useAuthStore } from '@/store/auth';

    const router = useRouter();
    const authStore = useAuthStore();

    const validationErrors = ref({});
    const processing = ref(false);
    
    onBeforeMount(async () => {
        await authStore.fetchUser();
        
        if (authStore.isAuthenticated()) {
            router.push({name: 'home'});
        }
    });

    const user = reactive({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        accept_terms: false
    });

    async function register() {
        processing.value = true;

        await axios.get('/sanctum/csrf-cookie');

        await axios.post('/register', user).then((response) => {
            validationErrors.value = {};
            router.push({name: "login"});
            //authStore.login();
        }).catch((error) => {
            if (error.response.status === 422) {
                validationErrors.value = error.response.data.errors;
            } else if ([401, 419].includes(error.response.status)) {
                //validationErrors.value = {error: [error.response.data.message]};
                router.push({name: "register"});
            } else {
                validationErrors.value = {};
                alert(error.response.data.message);
            }
        }).finally(() => {
            processing.value = false;
        });
    }
</script>

