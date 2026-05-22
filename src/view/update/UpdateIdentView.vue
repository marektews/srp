<script setup>
import { ref, computed, onMounted } from 'vue'
import BackButton from '@/components/btns/BackButton.vue'
import CertificateButton from '@/components/btns/CertificateButton.vue'
import ValidityInput from '@/components/input/ValidityInput.vue'
import CarsInfo from '@/components/CarsInfo.vue'

const props = defineProps(['passId'])
const emit = defineEmits(['back', 'next'])

const useManyCars = ref(false)
const lpg1 = ref(false)
const lpg2 = ref(false)
const lpg3 = ref(false)
const mobilityRestrictions = ref(false)
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
        regNumber1.value = data.car1.regnum
        regNumber2.value = data.car2.regnum
        regNumber3.value = data.car3.regnum
        lpg1.value = data.car1.lpg
        lpg2.value = data.car2.lpg
        lpg3.value = data.car3.lpg
        mobilityRestrictions.value = data.smr
        useManyCars.value = data.car3.regnum.length > 0
    })
    .catch(err => console.error('SRP load update info error:', err))
})

function onSaveAndGenerate() {
    let data = {
        passid: props.passId,
        smr: mobilityRestrictions.value,
        car1: {
            regnum: regNumber1.value,
            lpg: lpg1.value,
        },
    }
    if(useManyCars.value) {
        data.car2 = {
            regnum: regNumber2.value,
            lpg: lpg2.value
        }
        data.car3 = {
            regnum: regNumber3.value,
            lpg: lpg3.value
        }
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

            <div v-if="!useManyCars" class="one-car-layout mt-2">
                <ValidityInput
                    v-model="regNumber1"
                    class="form-control form-control-lg"
                    required
                />
                <div class="form-check">
                    <input class="form-check-input" id="lpg1" type="checkbox" v-model="lpg1"/>
                    <label class="form-check-label" for="lpg1">
                        Pojazd z instalacją gazową (LPG)
                    </label>
                </div>
            </div>
            
            <div v-else class="days-layout mt-2">
                <div>Piątek:</div>
                <ValidityInput
                    v-model="regNumber1"
                    class="form-control form-control-lg"
                    required
                />
                <div class="form-check">
                    <input class="form-check-input" id="lpg1" type="checkbox" v-model="lpg1"/>
                    <label class="form-check-label" for="lpg1">
                        Pojazd z instalacją gazową (LPG)
                    </label>
                </div>

                <div>Sobota:</div>
                <ValidityInput
                    v-model="regNumber2"
                    class="form-control form-control-lg"
                    required
                />
                <div class="form-check">
                    <input class="form-check-input" id="lpg2" type="checkbox" v-model="lpg2"/>
                    <label class="form-check-label" for="lpg2">
                        Pojazd z instalacją gazową (LPG)
                    </label>
                </div>

                <div>Niedziela:</div>
                <ValidityInput
                    v-model="regNumber3"
                    class="form-control form-control-lg"
                    required
                />
                <div class="form-check">
                    <input class="form-check-input" id="lpg3" type="checkbox" v-model="lpg3"/>
                    <label class="form-check-label" for="lpg3">
                        Pojazd z instalacją gazową (LPG)
                    </label>
                </div>
            </div>

            <div class="form-check mt-4">
                <input class="form-check-input" id="smr" type="checkbox" v-model="mobilityRestrictions"/>
                <label class="form-check-label" for="smr">
                    Czy osoby które przyjadą będą miały poważne ograniczenia ruchowe? (wózek, chodzik, itp.)
                </label>
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
.one-car-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9pt 2rem;
    align-items: center;
}

.days-layout {
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    gap: 9pt 2rem;
    align-items: center;
}
</style>