<template>
    <button class="btn btn-lg btn-outline-primary">
        <FontAwesomeIcon :icon="faChevronRight" />
        <span class="ms-2">Dalej</span>
    </button>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
</script>