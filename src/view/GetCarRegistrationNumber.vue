<script setup>
import { ref, computed } from 'vue'
import ValidityInputGroup from '@/components/input/ValidityInputGroup.vue'
import FooterButtons from '@/components/btns/FooterButtons.vue'

const emit = defineEmits(['next', 'back'])
const props = defineProps(['congregationName'])

const _regNumber = ref('')
const showAlert = ref(false)

const regNumber = computed({
    get() { return _regNumber.value },
    set(v) { _regNumber.value = v.toUpperCase() }
})

function onCheckRegNumber() {
    let data = {
        congregation: props.congregationName,
        regnum: _regNumber.value
    }
    console.log("onCheckRegNumber", data)
    fetch('/api/srp/find', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => emit('next', data.pass_id))
    .catch(err => {
        console.error("SRP find passID error:", err)
        showAlert.value = true
    })
}
</script>

<template>
    <div>
        <ValidityInputGroup
            v-model="regNumber"
            title="Wpisz dowolny numer rejestracyjny pojazdu z aktualnego identyfikatora"
            required
            @input="showAlert = false"
        />

        <div v-if="showAlert" class="alert alert-danger mt-4">
            <div>Podany numer rejestracyjny pojazdu nie występuje w żadnym identyfikatorze.</div>
        </div>

        <FooterButtons 
            class="mt-5"
            :next-enabled="regNumber.length !== 0"
            @next="onCheckRegNumber"
            @back="$emit('back')"
        />
    </div>
</template>