<template>
    <h1 class="text-3xl mb-3">Note</h1>
    <div class="underline mb-3">
        <router-link :to="{ name: 'account.notes.index' }">return</router-link>
    </div>
    <div class="relative overflow-x-auto p-6 bg-white">
        <div v-show="isLoading || isCategoryLoading" role="status" class="absolute z-50 -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span class="sr-only">Loading...</span>
        </div>

        <FlashMessage :messages="flashMessages"></FlashMessage>

        <form @submit.prevent="updateNote(note)" class="w-full lg:w-3/4">
            <!-- Title -->
            <div>
                <label for="note-title" class="block font-medium text-sm text-gray-700">
                    Title
                </label>
                <input v-model="note.title" id="note-title" type="text" class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <div class="text-red-600 mt-1">
                    <div v-for="message in validationErrors?.title">
                        {{ message }}
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div class="mt-4">
                <label for="note-content" class="block font-medium text-sm text-gray-700">
                    Content
                </label>
                <textarea v-model="note.content" id="note-content" class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
                <div class="text-red-600 mt-1">
                    <div v-for="message in validationErrors?.content">
                        {{ message }}
                    </div>
                </div>
            </div>

            <!-- Category -->
            <div class="mt-4">
                <label for="note-category" class="block font-medium text-sm text-gray-700">
                    Category
                </label>
                <select v-model="note.category_id" id="note-category" class="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value="" selected>-- Choose category --</option>
                    <option v-for="category in categoryList" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
                <div class="text-red-600 mt-1">
                    <div v-for="message in validationErrors?.category_id">
                        {{ message }}
                    </div>
                </div>
            </div>
            
            <div class="text-right">
                <!-- Modal toggle -->
                <a href="#" v-on:click.prevent="showCategoryModal" class="underline" type="button">
                    Add new category
                </a>
            </div>

            <!-- Buttons -->
            <div class="mt-4">
                <button :disabled="isLoading" class="inline-flex items-center btn-primary disabled:opacity-75 disabled:cursor-not-allowed">
                    <span v-show="isLoading" class="inline-block animate-spin w-4 h-4 mr-2 border-t-2 border-t-white border-r-2 border-r-white border-b-2 border-b-white border-l-2 border-l-blue-600 rounded-full"></span>
                    <span v-if="isLoading">Processing...</span>
                    <span v-else>Save</span>
                </button>
            </div>
        </form>
    </div>
    <AddCategoryModal :show-modal="showModal" v-on:hide-modal="hideCategoryModal"></AddCategoryModal>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import useCategories from "@/composables/categories";
import useNotes from '@/composables/notes';
import FlashMessage from '@/components/FlashMessage.vue';
import AddCategoryModal from '@/components/category/AddCategoryModal.vue';

const { categoryList, getCategoryList, isLoading: isCategoryLoading } = useCategories();
const { note, getNote, updateNote, actionErrors, validationErrors, isLoading } = useNotes();

const route = useRoute();

const flashMessages = ref({});
const showModal = ref(false);

function showCategoryModal() {
    showModal.value = true;
}

function hideCategoryModal() {
    showModal.value = false;
    getCategoryList();
}

watch(actionErrors, (newValue, oldValue) => {
    flashMessages.value.error = newValue;
});

onMounted(() => {
    getNote(route.params.id);
    getCategoryList();
});

</script>