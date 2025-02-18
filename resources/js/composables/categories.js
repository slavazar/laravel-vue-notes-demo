import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

export default function useCategories() {
    const categories = ref({});
    const category = ref({});
    const categoryList = ref({});
    const qtyCategories = ref(0);
    const router = useRouter();
    const actionErrors = ref([]);
    const validationErrors = ref({});
    const isLoading = ref(false);
    const swal = inject('$swal');

    const getCategoryList = async () => {
        isLoading.value = true;
        axios.get('/api/categories/list')
            .then(response => {
                categoryList.value = response.data.data;
            })
            .catch(error => {})
            .finally(() => isLoading.value = false);
    }

    const countCategories = async () => {
        return axios.get('/api/categories/count')
            .then(response => {
                qtyCategories.value = response.data.data;
            })
            .catch(error => {});
    }

    const getCategories = async (
        page = 1,
        search_global = '',
        order_column = 'name',
        order_direction = 'asc'
    ) => {
        isLoading.value = true;
        axios.get('/api/categories?page=' + page +
            '&search_global=' + search_global +
            '&order_column=' + order_column +
            '&order_direction=' + order_direction)
            .then(response => {
                categories.value = response.data;
            })
            .catch(error => {})
            .finally(() => isLoading.value = false);
    }

    const getCategory = async (id) => {
        isLoading.value = true;
        actionErrors.value = [];
        
        axios.get('/api/categories/' + id)
            .then(response => {
                isLoading.value = false;
                category.value = response.data.data;
            })
            .catch(error => {
                if ([403].includes(error.response.status)) {
                    actionErrors.value.push("This action is unauthorized.");
                    return;
                }
                
                if (error.response?.data?.message) {
                    actionErrors.value.push(error.response.data.message);
                }
            })
            .finally(() => isLoading.value = false);
    }

    const storeCategory = async (input) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};
        actionErrors.value = [];

        await axios.post('/api/categories', input)
            .then(response => {
                let newCategory = response.data.data;
                isLoading.value = false
                router.push({ name: 'account.categories.edit', params: { id: newCategory.id } });
                swal({
                    icon: 'success',
                    title: 'The category created successfully.'
                });
            })
            .catch(error => {
                if ([403].includes(error.response.status)) {
                    actionErrors.value.push("This action is unauthorized.");
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

    const updateCategory = async (input) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};
        actionErrors.value = [];

        await axios.put('/api/categories/' + input.id, input)
            .then(response => {
                isLoading.value = false;
                category.value = response.data.data;
                swal({
                    icon: 'success',
                    title: 'The category saved successfully.'
                });
            })
            .catch(error => {
                if ([403].includes(error.response?.status)) {
                    actionErrors.value.push("This action is unauthorized.");
                    isLoading.value = false;
                    return;
                }
                
                if (error.response?.status === 422) {
                    validationErrors.value = error.response.data.errors;
                }
                
                if (error.response?.message) {
                    actionErrors.value.push('Invalid action.');
                }
                
                isLoading.value = false;
            })
            .finally(() => {
                isLoading.value = false;
            });
    }

    const deleteCategory = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true
        })
            .then(async result => {
                if (result.isConfirmed) {
                    await axios.delete('/api/categories/' + id)
                        .then(response => {
                            getCategories();
                            router.push({ name: 'account.categories.index' });
                            swal({
                                icon: 'success',
                                title: 'The category deleted successfully.'
                            });
                        })
                        .catch(error => {
                            if ([406].includes(error.response?.status)) {
                                swal({
                                    icon: 'warning',
                                    title: error.response?.data.message
                                });
                                return;
                            }
                            
                            swal({
                                icon: 'error',
                                title: 'Something went wrong.'
                            });
                        })
                }
            });
    }

    return {
        categories,
        category,
        categoryList,
        getCategoryList,
        qtyCategories,
        countCategories,
        getCategories,
        getCategory,
        storeCategory,
        updateCategory,
        deleteCategory,
        actionErrors,
        validationErrors,
        isLoading
    };
}
