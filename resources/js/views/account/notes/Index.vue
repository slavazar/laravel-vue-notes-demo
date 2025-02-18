<template>
    <h1 class="text-3xl mb-3">Notes</h1>
    <div class="grid mb-3 justify-end">
        <router-link :to="{ name: 'account.notes.create' }" class="btn-primary">Add note</router-link>
    </div>
    <div class="relative p-6 bg-white">
        <div v-show="isLoading" role="status" class="absolute z-50 -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span class="sr-only">Loading...</span>
        </div>
        <div class="mb-4 grid lg:grid-cols-4 gap-4">
            <input v-model="search_global" type="text" placeholder="Search..." class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-gray-50 text-left">
                <input v-model="search_id" type="text" class="inline-block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Filter by ID">
            </div>
            <div class="bg-gray-50 text-left">
                <input v-model="search_title" type="text" class="inline-block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Filter by Title">
            </div>
            <div class="bg-gray-50">
                <select v-model="search_category" class="inline-block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value="" selected>-- all categories --</option>
                    <option v-for="category in categoryList" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="relative overflow-x-auto">
            <table class="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex flex-row items-center cursor-pointer" @click="updateOrdering('id')">
                                <div class="tracking-wider" :class="{ 'font-bold text-blue-600': orderColumn === 'id' }">
                                    ID
                                </div>
                                <div class="select-none">
                                    <span :class="{
                                          'text-blue-600': orderDirection === 'asc' && orderColumn === 'id',
                                          'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'id',
                                          }">&uarr;</span>
                                    <span :class="{
                                          'text-blue-600': orderDirection === 'desc' && orderColumn === 'id',
                                          'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'id',
                                          }">&darr;</span>
                                </div>
                            </div>
                        </th>
                        <th class="px-6 py-3">
                            <div class="flex flex-row items-center cursor-pointer" @click="updateOrdering('title')">
                                <div class="tracking-wider" :class="{ 'font-bold text-blue-600': orderColumn === 'title' }">
                                    Title
                                </div>
                                <div class="select-none">
                                    <span :class="{
                                          'text-blue-600': orderDirection === 'asc' && orderColumn === 'title',
                                          'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'title',
                                          }">&uarr;</span>
                                    <span :class="{
                                          'text-blue-600': orderDirection === 'desc' && orderColumn === 'title',
                                          'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'title',
                                          }">&darr;</span>
                                </div>
                            </div>
                        </th>
                        <th class="px-6 py-3">
                            <div class="flex flex-row items-center cursor-pointer" @click="updateOrdering('category_name')">
                                <div class="tracking-wider" :class="{ 'font-bold text-blue-600': orderColumn === 'category_name' }">
                                    Category
                                </div>
                                <div class="select-none">
                                    <span :class="{
                                          'text-blue-600': orderColumn === 'category_name' && orderDirection === 'asc',
                                          'hidden': orderColumn === 'category_name' && orderDirection !== 'asc' && orderDirection !== '',
                                          }">&uarr;</span>
                                    <span :class="{
                                          'text-blue-600':  orderColumn === 'category_name' && orderDirection === 'desc',
                                          'hidden':  orderColumn === 'category_name' && orderDirection !== '' && orderDirection !== 'desc',
                                          }">&darr;</span>
                                </div>
                            </div>
                        </th>
                        <th class="px-6 py-3">
                            <div class="flex flex-row items-center cursor-pointer" @click="updateOrdering('created_at')">
                                <div class="tracking-wider" :class="{ 'font-bold text-blue-600': orderColumn === 'created_at' }">
                                    Created at
                                </div>
                                <div class="select-none">
                                    <span :class="{
                                          'text-blue-600': orderColumn === 'created_at' && orderDirection === 'asc',
                                          'hidden': orderColumn === 'created_at' && orderDirection !== 'asc' && orderDirection !== '',
                                          }">&uarr;</span>
                                    <span :class="{
                                          'text-blue-600': orderDirection === 'desc' && orderColumn === 'created_at',
                                          'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'created_at',
                                          }">&darr;</span>
                                </div>
                            </div>
                        </th>
                        <th class="px-6 py-3">
                            <div class="flex flex-row items-center cursor-pointer" @click="updateOrdering('updated_at')">
                                <div class="tracking-wider" :class="{ 'font-bold text-blue-600': orderColumn === 'updated_at' }">
                                    Updated at
                                </div>
                                <div class="select-none">
                                    <span :class="{
                                          'text-blue-600': orderColumn === 'updated_at' && orderDirection === 'asc',
                                          'hidden': orderColumn === 'updated_at' && orderDirection !== 'asc' && orderDirection !== '',
                                          }">&uarr;</span>
                                    <span :class="{
                                          'text-blue-600': orderColumn === 'updated_at' && orderDirection === 'desc',
                                          'hidden': orderColumn === 'updated_at' && orderDirection !== '' && orderDirection !== 'desc',
                                          }">&darr;</span>
                                </div>
                            </div>
                        </th>
                        <th class="px-6 py-3 text-center">
                            <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="note in notes.data" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ note.id }}
                        </th>
                        <td class="px-6 py-4">
                            {{ note.title }}
                        </td>
                        <td class="px-6 py-4">
                            {{ note.category_name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ note.created_at }}
                        </td>
                        <td class="px-6 py-4">
                            {{ note.updated_at }}
                        </td>
                        <td class="px-6 py-4 text-center">
                            <router-link v-if="true" :to="{ name: 'account.notes.edit', params: { id: note.id } }" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
                            <a href="#" v-if="true" @click.prevent="deleteNote(note.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <TailwindPagination :data="notes" @pagination-change-page="getResults" class="mt-4" />
    </div>
</template>

<script setup>
    import { onMounted, ref, watch } from "vue";
    import { TailwindPagination } from 'laravel-vue-pagination';
    import useNotes from "@/composables/notes";
    import useCategories from "@/composables/categories";

    const search_category = ref('');
    const search_id = ref('');
    const search_title = ref('');
    const search_content = ref('');
    const search_global = ref('');
    const orderColumn = ref('updated_at');
    const orderDirection = ref('desc');
    const {notes, getNotes, deleteNote, isLoading} = useNotes();
    const { categoryList, getCategoryList} = useCategories();

    const updateOrdering = (column) => {
        orderColumn.value = column;
        orderDirection.value = (orderDirection.value === 'asc') ? 'desc' : 'asc';
        getNotes(
                1,
                search_category.value,
                search_id.value,
                search_title.value,
                search_content.value,
                search_global.value,
                orderColumn.value,
                orderDirection.value
                );
    }

    const getResults = async (page = 1) => {
        getNotes(
            page,
            search_category.value,
            search_id.value,
            search_title.value,
            search_content.value,
            search_global.value,
            orderColumn.value,
            orderDirection.value
        );
    }

    onMounted(() => {
        getNotes();
        getCategoryList();
    });

    watch(search_category, (current, previous) => {
        getNotes(
                1,
                current,
                search_id.value,
                search_title.value,
                search_content.value,
                search_global.value,
                orderColumn.value,
                orderDirection.value
                );
    });

    watch(search_id, (current, previous) => {
        getNotes(
                1,
                search_category.value,
                current,
                search_title.value,
                search_content.value,
                search_global.value,
                orderColumn.value,
                orderDirection.value
                );
    });

    watch(search_title, (current, previous) => {
        getNotes(
                1,
                search_category.value,
                search_id.value,
                current,
                search_content.value,
                search_global.value,
                orderColumn.value,
                orderDirection.value
                );
    });

    watch(search_content, (current, previous) => {
        getNotes(
                1,
                search_category.value,
                search_id.value,
                search_title.value,
                current,
                search_global.value,
                orderColumn.value,
                orderDirection.value
                );
    });

    watch(search_global, (current, previous) => {
        getNotes(
                1,
                search_category.value,
                search_id.value,
                search_title.value,
                search_content.value,
                current,
                orderColumn.value,
                orderDirection.value
                );
    });
</script>
