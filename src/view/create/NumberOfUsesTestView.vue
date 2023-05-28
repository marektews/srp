<script setup>
import { ref, onMounted } from 'vue'
import FooterButtons from '@/components/btns/FooterButtons.vue'

const props = defineProps(['congregationName'])
const emit = defineEmits(['next', 'back'])
const checkResult = ref(0)

onMounted(() => {
    fetch(`/api/srp/isfreepass/${props.congregationName}`)
    .then(response => {
        console.log('SRP check free pass:', response.status)
        checkResult.value = response.status
        if(response.status === 200) {
            emit('next')
        } 
    })
    .catch(err => console.log('SRP check free pass error:', err))
})
</script>

<template>
    <div v-if="checkResult === 404" class="alert alert-danger alert-layout">
        <i class="fa-solid fa-triangle-exclamation" />
        <div>
            <div>Niestety, wszystkie identyfikatory zostały już wykorzystane.</div>
            <div>Poproś starszych ze swojego zboru o wyjaśnienie tej sprawy.</div>
        </div>
    </div>

    <div v-else-if="checkResult === 500" class="alert alert-danger alert-layout">
        <i class="fa-solid fa-face-sad-tear" />
        <div>
            <div>Przepraszamy, ale serwer zgłosił błąd.</div>
            <div>Odczekaj chwilę i spróbuj ponownie.</div>
        </div>
    </div>

    <div v-else
        class="waiting-layout"
    >
        <div class="spinner-border" />
        <div>Proszę czekać. Trwa sprawdzanie dostępności identyfikatorów ...</div>
    </div>

    <FooterButtons v-if="checkResult !== 200"
        class="mt-5"
        :next-visible="false"
        @back="$emit('back')"
    />
</template>

<style scoped>
.waiting-layout {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 9pt;
}

.alert-layout {
    display: flex;
    flex-direction: row;
    align-items: first baseline;
    gap: 9pt;
}
</style>