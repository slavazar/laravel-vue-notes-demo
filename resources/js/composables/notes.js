import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

export default function useNotes() {
    const notes = ref({});
    const note = ref({});
    const router = useRouter();
    const qtyNotes = ref(0);
    //const actionMessages = ref([]);
    const actionErrors = ref([]);
    const validationErrors = ref({});
    const isLoading = ref(false);
    const swal = inject('$swal');
    
    const countNotes = async () => {
        return axios.get('/api/notes/count')
            .then(response => {
                qtyNotes.value = response.data.data;
            })
            .catch(error => {});
    }

    const getNotes = async (
        page = 1,
        search_category = '',
        search_id = '',
        search_title = '',
        search_content = '',
        search_global = '',
        order_column = 'updated_at',
        order_direction = 'desc'
    ) => {
        isLoading.value = true;
        axios.get('/api/notes?page=' + page +
            '&search_category=' + search_category +
            '&search_id=' + search_id +
            '&search_title=' + search_title +
            '&search_content=' + search_content +
            '&search_global=' + search_global +
            '&order_column=' + order_column +
            '&order_direction=' + order_direction)
            .then(response => {
                notes.value = response.data;
            })
            .catch(error => {})
            .finally(() => isLoading.value = false);
    }

    const getNote = async (id) => {
        isLoading.value = true;
        actionErrors.value = [];
        
        axios.get('/api/notes/' + id)
            .then(response => {
                isLoading.value = false;
                note.value = response.data.data;
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

    const storeNote = async (input) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};
        actionErrors.value = [];

        await axios.post('/api/notes', input)
            .then(response => {
                let newNote = response.data.data;
                isLoading.value = false
                router.push({ name: 'account.notes.edit', params: { id: newNote.id } });
                swal({
                    icon: 'success',
                    title: 'The note created successfully.'
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

    const updateNote = async (input) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};
        actionErrors.value = [];

        await axios.put('/api/notes/' + input.id, input)
            .then(response => {
                isLoading.value = false;
                note.value = response.data.data;
                swal({
                    icon: 'success',
                    title: 'The note saved successfully.'
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

    const deleteNote = async (id) => {
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
                    await axios.delete('/api/notes/' + id)
                        .then(response => {
                            getNotes();
                            router.push({ name: 'account.notes.index' });
                            swal({
                                icon: 'success',
                                title: 'The note deleted successfully.'
                            });
                        })
                        .catch(error => {
                            swal({
                                icon: 'error',
                                title: 'Something went wrong.'
                            });
                        })
                }
            });
    }

    return {
        notes,
        note,
        getNotes,
        getNote,
        storeNote,
        updateNote,
        deleteNote,
        qtyNotes,
        countNotes,
        actionErrors,
        validationErrors,
        isLoading
    }
}