<script setup>
import { ref, computed, onMounted } from 'vue'
import BackButton from '@/components/btns/BackButton.vue'
import CertificateButton from '@/components/btns/CertificateButton.vue'
import ValidityInput from '@/components/input/ValidityInput.vue'
import CarsInfo from '@/components/CarsInfo.vue'

const props = defineProps(['passId'])
const emit = defineEmits(['back'])

const useManyCars = ref(false)
const _regNumber1 = ref('')
const _regNumber2 = ref('')
const _regNumber3 = ref('')
const regNumber1 = computed({
    get() { return _regNumber1.value },
    set(v) { _regNumber1.value = v.toUpperCase() }
})
const regNumber2 = computed({
    get() { return _regNumber2.value },
    set(v) { _regNumber2.value = v.toUpperCase() }
})
const regNumber3 = computed({
    get() { return _regNumber3.value },
    set(v) { _regNumber3.value = v.toUpperCase() }
})

onMounted(() => {
    fetch(`/api/srp/read/${props.passId}`)
    .then(response => response.json())
    .then(data => {
        regNumber1.value = data.regnum1
        regNumber2.value = data.regnum2
        regNumber3.value = data.regnum3
        useManyCars.value = data.regnum3.length > 0
    })
    .catch(err => console.error('SRP load update info error:', err))
})

function onSaveAndGenerate() {
    let data = {
        passid: props.passId,
        regnum1: regNumber1.value,
        regnum2: regNumber2.value,
        regnum3: regNumber3.value,
    }
    console.log('Update SRP pass card source data:', data)
    fetch('/api/srp/update', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(response.status === 200)
            emit('next')
    })
    .catch(err => console.error('Update SRP pass card error:', err))
}
</script>

<template>
    <div class="container">
        <CarsInfo />
        
        <div class="mt-4">
            <label class="form-label">Numer rejestracyjny pojazdu</label>
            <div class="form-check">
                <input class="form-check-input" id="sdf" type="checkbox" v-model="useManyCars"/>
                <label class="form-check-label" for="sdf">
                    Będę używał różnych pojazdów
                </label>
            </div>

            <ValidityInput v-if="!useManyCars"
                v-model="regNumber1"
                class="form-control form-control-lg mt-2"
                required
            />
            
            <div v-else class="days-layout mt-2">
                <div>Piątek:</div>
                <ValidityInput
                    v-model="regNumber1"
                    class="form-control form-control-lg"
                    required
                />

                <div>Sobota:</div>
                <ValidityInput
                    v-model="regNumber2"
                    class="form-control form-control-lg"
                    required
                />

                <div>Niedziela:</div>
                <ValidityInput
                    v-model="regNumber3"
                    class="form-control form-control-lg"
                    required
                />
            </div>
        </div>

        <CertificateButton class="mt-5" @click="onSaveAndGenerate">
            Zapisz i ponownie wygeneruj identyfikator
        </CertificateButton>
        <BackButton class="mt-5 ms-2" @click="emit('back')">
            Anuluj
        </BackButton>
    </div>
</template>

<style scoped>
.days-layout {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 9pt 2rem;
    align-items: center;
}
</style>