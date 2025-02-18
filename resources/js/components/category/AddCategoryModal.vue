<template>
    <!-- Main modal -->
    <Teleport to="body">
    <div
        id="category-modal"
        tabindex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Create new category
                    </h3>
                    <button type="button" v-show="!isLoading" v-on:click="hideModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                    <FlashMessage :messages="flashMessages"></FlashMessage>
                    <form class="">
                        <div class="grid gap-4 mb-4 grid-cols-2">
                            <div class="col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" v-model="form.name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type category name" required="">
                                <div class="text-red-600 mt-1">
                                    <div v-for="message in validationErrors?.name">
                                        {{ message }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <template v-if="isLoading">
                        <span
                            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Processing...
                        </span>
                    </template>
                    <template v-else>
                        <a href="#" role="button"
                            v-on:click.prevent="submitCategoryForm"
                            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Add new category
                        </a>
                        <a href="#" v-on:click.prevent="hideModal"
                           role="button"
                           class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                       >Close</a>
                    </template>
                </div>
            </div>
        </div>
    </div> 
    </Teleport>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from "vue";
import { Modal } from 'flowbite';
import FlashMessage from '@/components/FlashMessage.vue';

const props = defineProps(["showModal"]);
const emit = defineEmits(['hideModal']);

const form = reactive({
    name: ''
});

//const actionErrors = ref([]);
const isLoading = ref(false);
const validationErrors = ref({});
const flashMessages = ref({});

// options with default values
const modalOptions = {
    placement: 'center-center',
    backdrop: 'static',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: false,
    onHide: () => {
        //console.log('modal is hidden');
    },
    onShow: () => {
        //console.log('modal is shown');
    },
    onToggle: () => {
        //console.log('modal has been toggled');
    },
};

// instance options object
const modalInstanceOptions = {
    id: 'category-modal',
    override: true
};

function showModal() {
    const modal = FlowbiteInstances.getInstance('Modal', 'category-modal');
    modal.show();
}

function hideModal() {
    const modal = FlowbiteInstances.getInstance('Modal', 'category-modal');
    modal.hide();
    
    form.name = '';
    
    isLoading.value = false;
    validationErrors.value = {};
    flashMessages.value = {};
    
    emit('hideModal');
}

const addCategory = async () => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};
    flashMessages.value = {};

    await axios.post('/api/categories', form)
        .then(response => {
            //let newCategory = response.data.data;
            form.name = '';
            isLoading.value = false;
            flashMessages.value.success = ['The category created successfully.'];
        })
        .catch(error => {
            if ([403].includes(error.response.status)) {
                flashMessages.value.error = ["This action is unauthorized."];
                return;
            }

            if (error.response.status === 422) {
                validationErrors.value = error.response.data.errors;
            }

            /*
            if (error.response?.data?.message) {
                actionErrors.value.push(error.response.data.message)
            }
            */

            isLoading.value = false
        })
}

function submitCategoryForm() {
    addCategory();
}

onMounted(() => {
    // set the modal menu element
    const $modalTargetEl = document.getElementById('category-modal');

    /*
     * $targetEl: required
     * options: optional
     */
    const modal = new Modal($modalTargetEl, modalOptions, modalInstanceOptions);    
});

onUnmounted(() => {
    const modal = FlowbiteInstances.getInstance('Modal', 'category-modal');
    modal.destroyAndRemoveInstance();
});

watch(
    () => props.showModal,
    (newValue) => {
        if (newValue) {
            showModal();
        }
    },
);
</script>
