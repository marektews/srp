<template>
    <button class="btn btn-lg btn-outline-primary">
        <FontAwesomeIcon :icon="faPaperPlane" />
        <span class="ms-2">Wyślij zgłoszenie</span>
    </button>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
</script>