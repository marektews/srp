<script setup>
import { ref, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import BackButton from '@/components/btns/BackButton.vue'
import ValidityInputGroup from '@/components/input/ValidityInputGroup.vue'

const props = defineProps(['congregationName'])
const emit = defineEmits(['back'])
const plimit = ref(0)
const used = ref(0)
const newPlimit = ref(0)
const reason = ref("")

onMounted(() => {
    fetch(`/api/srp/limit/${props.congregationName}`)
    .then(resp => {
        if(resp.ok)
            return resp.json()
    })
    .then(data => {
        plimit.value = data.plimit
        used.value = data.used
        newPlimit.value = data.plimit + 1
    })
    .catch(e => {
        console.error('Limit:', e)
    })
})

function onSendNewLimit() {
    const data = {
        congregation: props.congregationName,
        plimit: newPlimit.value,
        reason: reason.value,
    }

    fetch('/api/srp/limit/change', {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(resp => {
        if(resp.status === 200) {
            emit('back')
        }
    })
    .catch(e => {
        console.error('Limit change request:', e)
    })
}
</script>

<template>
    <div class="container">
        <div class="card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Limit identyfikatorów parkingowych</h5>
                <h6 class="card-subtitle mt-3 text-muted">
                    Aktualna wartość limitu pojazdów: {{plimit}}
                </h6>
                <h6 class="card-subtitle my-3 text-muted">
                    Liczba miejsc parkingowych jest ograniczona. <br/> Nie gwarantujemy, że życzenie uda się zrealizować w 100%.
                </h6>

                <ValidityInputGroup
                    v-model="newPlimit"
                    class="mt-3"
                    type="number"
                    title="Nowa wartość limitu"
                    required
                />

                <div class="mt-3">
                    <label for="reason" class="form-label">Krótkie uzasadnienie zmiany</label>
                    <textarea class="form-control" id="reason" rows="5" v-model="reason"></textarea>
                </div>

                <button class="btn btn-outline-warning btn-lg mt-4" @click="onSendNewLimit">
                    <FontAwesomeIcon :icon="faPaperPlane" /> Wyślij
                </button>
                <BackButton class="mt-4 ms-2" @click="emit('back')">
                    Anuluj
                </BackButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>