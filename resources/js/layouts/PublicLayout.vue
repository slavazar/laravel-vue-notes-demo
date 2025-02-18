<template>
    <header>
        <nav class="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-3 px-4">
            <div class="flex justify-between items-center max-w-screen-2xl mx-auto">
                <div class="flex justify-start items-center">
                    <router-link :to="{ name: 'home' }" class="flex mr-14">
                        <img src="@/assets/logo.svg" class="mr-3 h-8" alt="Website Logo" />
                        <span class="self-center hidden sm:flex text-2xl font-semibold whitespace-nowrap dark:text-white">My notes</span>
                    </router-link>
                    <!-- Desktop menu -->
                    <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
                        <ul class="flex flex-col mt-4 space-x-6 font-medium lg:flex-row xl:space-x-8 lg:mt-0">
                            <li>
                                <router-link :to="{ name: 'home' }" class="block text-gray-700 hover:text-primary-700 dark:text-gray-400 dark:hover:text-white">
                                    Home
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name: 'about'}" class="block text-gray-700 hover:text-primary-700 dark:text-gray-400 dark:hover:text-white">
                                    About
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex justify-between items-center lg:order-2">
                    <template v-if="isAuthenticated">
                        <div class="hidden lg:flex">
                            <router-link :to="{name: 'account.dashboard'}" class="block text-gray-700 hover:text-primary-700 dark:text-gray-400 dark:hover:text-white">
                                Dashboard
                            </router-link>
                        </div>
                    </template>
                    <template v-else>
                        <div class="hidden lg:flex">
                            <router-link :to="{name: 'login'}" class="block text-gray-700 hover:text-primary-700 dark:text-gray-400 dark:hover:text-white">
                                Login
                            </router-link>
                            <router-link :to="{name: 'register'}" class="block ml-4 text-gray-700 hover:text-primary-700 dark:text-gray-400 dark:hover:text-white">
                                Register
                            </router-link>
                        </div>
                    </template>

                    <button type="button" id="toggleMobileMenuButton" data-collapse-toggle="mobileMenu" class="items-center p-2 text-gray-500 rounded-lg md:ml-2 lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                        <span class="sr-only">Open menu</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        </nav>
        <nav class="bg-white dark:bg-gray-900">
            <!-- Mobile menu -->
            <ul id="mobileMenu" class="hidden flex-col mt-0 pt-16 w-full text-sm font-medium lg:hidden">
                <li class="block border-b dark:border-gray-700">
                    <router-link :to="{ name: 'home' }" class="block py-3 px-4 text-gray-900 lg:py-0 dark:text-white lg:hover:underline lg:px-0">
                        Home
                    </router-link>
                </li>
                <li class="block border-b dark:border-gray-700">
                    <router-link :to="{name: 'about'}" class="block py-3 px-4 text-gray-900 lg:py-0 dark:text-white lg:hover:underline lg:px-0">
                        About
                    </router-link>
                </li>
                <template v-if="isAuthenticated">
                    <li class="block border-b dark:border-gray-700">
                        <router-link :to="{name: 'account.dashboard'}" class="block py-3 px-4 text-gray-900 lg:py-0 dark:text-white lg:hover:underline lg:px-0">
                            Dashboard
                        </router-link>
                    </li>
                </template>
                <template v-else>
                    <li class="block border-b dark:border-gray-700">
                        <router-link :to="{name: 'login'}" class="block py-3 px-4 text-gray-900 lg:py-0 dark:text-white lg:hover:underline lg:px-0">
                            Login
                        </router-link>
                    </li>
                    <li class="block border-b dark:border-gray-700">
                        <router-link :to="{name: 'register'}" class="block py-3 px-4 text-gray-900 lg:py-0 dark:text-white lg:hover:underline lg:px-0">
                            Register
                        </router-link>
                    </li>
                </template>

            </ul>
        </nav>
    </header>

    <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">

        <div id="main-content" class="relative w-full max-w-screen-2xl mx-auto h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <main>
                <slot></slot>
            </main>

            <footer class="md:flex md:items-center md:justify-between px-4 2xl:px-0 py-6 md:py-10">
                <p class="text-sm text-center text-gray-500 mb-4 md:mb-0">
                    &copy; 2019 <a href="#" class="hover:underline" target="_blank">Website</a>. All rights reserved.
                </p>
                <ul class="flex flex-wrap items-center justify-center">
                    <li><a href="#" class="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Terms</a></li>
                    <li><a href="#" class="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Licensing</a></li>
                    <li><a href="#" class="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Cookie Policy</a></li>
                    <li><a href="#" class="text-sm font-normal text-gray-500 hover:underline dark:text-gray-400">Contact</a></li>
                </ul>
            </footer>
        </div>

    </div>


</template>

<script setup>
    import { computed } from 'vue';
    import { useAuthStore } from '@/store/auth';
    import ToggleIcon from "@/components/icons/ToggleIcon.vue";
    import UserIcon from "@/components/icons/UserIcon.vue";
    import Sidebar from "@/layouts/parts//Sidebar.vue";

    import { onMounted } from 'vue';
    import { initFlowbite } from 'flowbite';

    const authStore = useAuthStore();

    // initialize components based on data attribute selectors
    onMounted(() => {
        initFlowbite();
    });
    
    const isAuthenticated = computed(() => {
        return authStore.isAuthenticated();
    });

</script>
