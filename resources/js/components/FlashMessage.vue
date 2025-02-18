<script setup>
const props = defineProps(["messages"]);
</script>
<template>
    <div class="flash-messages">
        <div
            v-if="props?.messages?.success?.length"
            class="alert-success"
            >
            <div v-for="message in props.messages.success" :key="message">
                {{ message }}
            </div>
        </div>
        <div
            v-if="props?.messages?.info?.length"
            class="alert-info"
            >
            <div v-for="message in props.messages.info" :key="message">
                {{ message }}
            </div>
        </div>
        <div
            v-if="props?.messages?.warning?.length"
            class="alert-warning"
            >
            <div v-for="message in props.messages.warning" :key="message">
                {{ message }}
            </div>
        </div>
        <div
            v-if="props?.messages?.error?.length"
            class="alert-danger"
            >
            <div v-for="message in props.messages.error" :key="message">
                {{ message }}
            </div>
        </div>
    </div>
</template>