<script setup>
import { ref } from 'vue'
import MainManu from './components/MainMenu.vue'
import SelectCongregation from './components/SelectCongregation.vue'
import GenerateView from './view/GenerateView.vue'

const mode = ref(1)
</script>

<template>
    <header>
        System Rejestracji Pojazdów uprawnionych do wjazdu na parking pod trybuną stadionu
    </header>

    <main>
        <MainManu v-if="mode === 0"/>
        <SelectCongregation v-else-if="mode === 1" />
        <GenerateView v-else-if="mode === 2" />
    </main>
</template>

<style scoped>
main {
    margin-top: 2rem;
}
</style>
