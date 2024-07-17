<template>
    <div class="mt-3 alert alert-info alert-layout">
        <FontAwesomeIcon :icon="faCircleInfo" />
        <ol>
            <li>Identyfikator uprawnia do wjazdu na parking tylko jeden pojazd danego dnia.</li>
            <li>Można na jeden identyfikator zgłosić wjazd różnych pojazdów, ale tylko w różne dni.</li>
        </ol>
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
</script>

<style scoped>
.alert-layout {
    display: flex;
    flex-direction: row;
    align-items: first baseline;
    gap: 6pt;
}

ol {
    margin-bottom: 0;
}
</style>