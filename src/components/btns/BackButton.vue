<template>
    <button class="btn btn-lg btn-outline-secondary">
        <FontAwesomeIcon :icon="faChevronLeft" />
        <span class="ms-2">Powrót</span>
    </button>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
</script>