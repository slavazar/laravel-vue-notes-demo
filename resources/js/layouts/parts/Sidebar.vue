<template>
    <!-- desktop sidebar  -->
    <div
        class="bg-gray-300 text-light-grey h-screen hidden w-full md:block md:fixed md:top-0 md:bottom-0 md:z-10 md:pt-[68px]"
        :class="[showSidebar ? 'md:w-64' : 'md:w-16']"
    >
        <ChevronLeftIcon
            class="relative -right-48 ml-5 my-2 w-8 h-8 stroke-2 text-light-grey bg-dark-blue cursor-pointer"
            v-if="showSidebar"
            @click="toggleSidebar"
        />
        <ChevronRightIcon
            class="ml-5 my-2 w-8 h-8 stroke-2 text-light-grey bg-dark-blue cursor-pointer"
            v-if="!showSidebar"
            @click="toggleSidebar"
        />

        <nav class="relative">
            
            <SidebarItem
                to="home"
                class="group relative"
                :class="{
                    'menu-link-active menu-link-active-2':
                        $route.name.match('home') !== null,
                }"
            >
                <CompanyIcon class="w-10 h-10 fill-white" />
                <span class="group-hover:opacity-100 transition-opacity bg-gray-800 px-3 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto"
                v-if="!showSidebar"
                >Home</span>
                <span
                    class="sidebar-item text-white"
                    :class="[showSidebar ? 'block' : 'hidden']"
                    >Home</span
                >
            </SidebarItem>

            
            <SidebarItem
                to="about"
                class="group relative"
                :class="{
                    'menu-link-active':
                        $route.name.match('about') !== null,
                }"
            >
                <OrdersIcon class="w-6 h-10 fill-white ml-2" />
                <span class="group-hover:opacity-100 transition-opacity bg-gray-800 px-3 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto"
                v-if="!showSidebar"
                >About</span>
                <span
                    class="sidebar-item ml-2 text-white"
                    :class="[showSidebar ? 'block' : 'hidden']"
                    >About</span
                >
            </SidebarItem>
            
        </nav>
    </div>
    <!-- /desktop sidebar -->


    <!-- mobile side bar -->
    <MobileSidebar />
    <!-- /mobile side bar -->
</template>

<script setup>
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon.vue";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon.vue";
import CompanyIcon from "@/components/icons/CompnayIcon.vue";
import OrdersIcon from "@/components/icons/OrdersIcon.vue";
import SidebarItem from "@/layouts/parts/SidebarItem.vue";

import { computed, ref } from 'vue';
import { useBasicStore } from '@/store/basic';
import MobileSidebar from "@/layouts/parts/MobileSidebar.vue";

import { useRoute, useRouter } from 'vue-router'

const basicStore = useBasicStore();
const show = ref(true)

const toggleSidebar =()=>{
    basicStore.hiddenSidebar = !basicStore.hiddenSidebar;
}

const showSidebar = computed(() => basicStore.hiddenSidebar)

//const route = useRoute()
//console.log(route.name)

</script>
