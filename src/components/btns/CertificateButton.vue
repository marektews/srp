<template>
    <button class="btn btn-lg btn-outline-primary">
        <FontAwesomeIcon :icon="faCertificate" />
        <span class="ms-2"><slot>Certyfikat</slot></span>
    </button>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
</script>