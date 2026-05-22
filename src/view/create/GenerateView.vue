<script setup>
import { ref, computed } from 'vue'
import BackButton from '@/components/btns/BackButton.vue'
import CertificateButton from '@/components/btns/CertificateButton.vue'
import ValidityInput from '@/components/input/ValidityInput.vue'
import CarsInfo from '@/components/CarsInfo.vue'

const props = defineProps(['congregationName'])
const emit = defineEmits(['back', 'next'])

const genStatus = ref(0)
const validInputs = ref([undefined, undefined, undefined])
const useManyCars = ref(false)
const lpg1 = ref(false)
const lpg2 = ref(false)
const lpg3 = ref(false)
const mobilityRestrictions = ref(false)
const regNumbers = ref(['', '', ''])
const regNumber1 = computed({
    get() { return regNumbers.value[0] },
    set(v) { regNumbers.value[0] = v.toUpperCase() }
})
const regNumber2 = computed({
    get() { return regNumbers.value[1] },
    set(v) { regNumbers.value[1] = v.toUpperCase() }
})
const regNumber3 = computed({
    get() { return regNumbers.value[2] },
    set(v) { regNumbers.value[2] = v.toUpperCase() }
})

function onGenerateID() {
    let data = {
        congregation: props.congregationName,
        smr: mobilityRestrictions.value,
        car1: {
            regnum: regNumber1.value,
            lpg: lpg1.value,
        },
    }
    if(useManyCars.value) {
        data.car2 = {
            regnum: regNumber2.value,
            lpg: lpg2.value,
        }
        data.car3 = {
            regnum: regNumber3.value,
            lpg: lpg3.value,
        }
    }

    console.log('Generate SRP pass card source data:', data)
    fetch('/api/srp/create', {
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
    })
    .then(data => {
        emit('next', data.passID)
    })
    .catch(err => {
        console.error('Generate SRP pass card error:', err)
    })
}

const isGenButtonDisabled = computed(() => {
    console.log('isGenButtonDisabled: enter:', validInputs.value, regNumbers.value)
    try {
        if(useManyCars.value) {
            validInputs.value.forEach((v) => { if(!v) throw new Error("100") })
            regNumbers.value.forEach((v) => { if(v.length == 0) throw new Error("200") })
            return false
        }
        else {
            return regNumber1.value.length === 0 || !validInputs.value[0]
        }
    }
    catch(e) {
        console.log('isGenButtonDisabled: disable after throw:', e)
        return true
    }
})

function onInputValid(input_nr, valid) {
    validInputs.value[input_nr] = valid
}
</script>

<template>
    <div class="container">
        <CarsInfo />

        <div class="mt-4">
            <label class="form-label">Wpisz numer rejestracyjny pojazdu (bez spacji i innych separatorów)</label>
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
                    pattern="[a-zA-Z0-9\u0400-\u04ff]{1,12}"
                    max-length="12"
                    required
                    @valid="onInputValid(0, $event)"
                    @input="genStatus = 0"
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
                    pattern="[a-zA-Z0-9\u0400-\u04ff]{1,12}"
                    max-length="12"
                    required
                    @valid="onInputValid(0, $event)"
                    @input="genStatus = 0"
                />
                <div class="form-check mt-1">
                    <input class="form-check-input" id="lpg1" type="checkbox" v-model="lpg1"/>
                    <label class="form-check-label" for="lpg1">
                        Pojazd z instalacją gazową (LPG)
                    </label>
                </div>

                <div>Sobota:</div>
                <ValidityInput
                    v-model="regNumber2"
                    class="form-control form-control-lg"
                    pattern="[a-zA-Z0-9\u0400-\u04ff]{1,12}"
                    max-length="12"
                    required
                    @valid="onInputValid(1, $event)"
                    @input="genStatus = 0"
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
                    pattern="[a-zA-Z0-9\u0400-\u04ff]{1,12}"
                    max-length="12"
                    required
                    @valid="onInputValid(2, $event)"
                    @input="genStatus = 0"
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

            <div v-if="genStatus === 400" class="mt-4 alert alert-danger">
                Podany pojazd jest już wpisany do innego identyfikatora
            </div>
        </div>

        <CertificateButton 
            class="mt-5"
            :disabled="isGenButtonDisabled"
            @click="onGenerateID"
        >
            Wyślij wniosek rejestracyjny
        </CertificateButton>
        <BackButton 
            class="mt-5 ms-2" 
            @click="$emit('back')"
        />
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