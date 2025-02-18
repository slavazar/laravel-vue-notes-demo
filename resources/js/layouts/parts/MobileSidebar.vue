<template>
    <!-- mobile side bar -->
    <div
        class="md:hidden fixed bg-gray-600 h-screen w-full z-10 transition-all duration-500 ease-in-out"
        :class="[showSidebar ? '-top-[1px] sm:70px block' : '-top-[900px]']"
    >
        <nav class="mt-[80px]">
            <SidebarItem
                to="home"
                :class="{
                    'menu-link-active':
                        $route.name.match('home') !== null,
                }"
                @click="toggleSidebar"
            >
                <CompanyIcon class="w-10 h-10 fill-white text-light-grey" />
                <span class="sidebar-item text-gray-100">Home </span>
            </SidebarItem>

            <SidebarItem
                to="about"
                :class="{
                    'menu-link-active':
                        $route.name.match('about') !== null,
                }"
                @click="toggleSidebar"
            >
                <CompanyIcon class="w-10 h-10 fill-white text-light-grey" />
                <span class="sidebar-item text-gray-100">About </span>
            </SidebarItem>
            
            
        </nav>
    </div>
    <!-- /mobile side bar -->
</template>

<script setup>
import { computed } from 'vue';
import { useBasicStore } from '@/store/basic';
import CompanyIcon from "@/components/icons/CompnayIcon.vue";
import SidebarItem from "./SidebarItem.vue";

const basicStore = useBasicStore();


const toggleSidebar =()=>{
    basicStore.hiddenSidebar = !basicStore.hiddenSidebar;
}

const showSidebar = computed(() => basicStore.hiddenSidebar)

</script>
