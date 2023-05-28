<script setup>
import { ref, computed } from 'vue'
import BackButton from '@/components/btns/BackButton.vue'
import CertificateButton from '@/components/btns/CertificateButton.vue'
import ValidityInput from '@/components/input/ValidityInput.vue'
import CarsInfo from '@/components/CarsInfo.vue'

const props = defineProps(['congregationName'])
const emit = defineEmits(['back', 'next'])

const genStatus = ref(0)
const genStatusText = ref('')
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

function onGenerateID() {
    let data = {
        congregation: props.congregationName,
        regnum1: regNumber1.value,
        regnum2: regNumber2.value,
        regnum3: regNumber3.value,
    }
    console.log('Generate SRP pass card source data:', data)
    fetch('/api/srp/generate', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        genStatus.value = response.status
        if(response.status === 200)
            return response.json()
        else
            return {}
    })
    .then(data => {
        emit('next', data.passID)
    })
    .catch(err => {
        console.error('Generate SRP pass card error:', err)
    })
}

const isGenButtonDisabled = computed(() => {
    if(useManyCars.value) {
        return regNumber1.value.length === 0
            || regNumber2.value.length === 0
            || regNumber3.value.length === 0
    }
    else {
        return regNumber1.value.length === 0
    }
})
</script>

<template>
    <div class="container">
        <CarsInfo />

        <div class="mt-4">
            <label class="form-label">Wpisz numer rejestracyjny pojazdu</label>
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

        <CertificateButton 
            class="mt-5"
            :disabled="isGenButtonDisabled"
            @click="onGenerateID"
        >
            Generuj identyfikator
        </CertificateButton>
        <BackButton 
            class="mt-5 ms-2" 
            @click="$emit('back')"
        />
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