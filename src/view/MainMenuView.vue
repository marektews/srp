<script setup>
import { ref, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDownload, faMap, faPlus, faPen, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

const props = defineProps(['congregationName'])
const emit = defineEmits(['step'])
const plimit = ref(0)
const used = ref(0)
const gen_idents_enabled = ref(false)

onMounted(() => {
    fetch('/api/config/all')
    .then(resp => {
        if(resp.ok)
            return resp.json()
    })
    .then(data => {
        gen_idents_enabled.value = data.generate_idents.srp
    })
    .catch(e => {
        console.error('Config:', e)
    })

    fetch(`/api/srp/limit/${props.congregationName}`)
    .then(resp => {
        if(resp.ok)
            return resp.json()
    })
    .then(data => {
        plimit.value = data.plimit
        used.value = data.used
    })
    .catch(e => {
        console.error('Limit:', e)
    })
})
</script>

<template>
    <div class="container">
        <div class="card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Nowy identyfikator parkingowy</h5>
                <h6 class="card-subtitle my-3 text-muted">
                    Zarejestruj pojazd, aby otrzymać przepustkę uprawniającą do wjazdu na parking dla niepełnosprawnych.
                </h6>
                <h6 class="card-subtitle mb-3">
                    Aktualne wykorzystanie limitu pojazdów: {{used}} / {{plimit}}
                </h6>
                <button class="btn btn-outline-primary btn-lg" @click="emit('step', 10)">
                    <FontAwesomeIcon :icon="faPlus" /> Rejestruj
                </button>
                <button v-if="used >= plimit" class="btn btn-outline-warning btn-lg ms-2" @click="emit('step', 12)">
                    <FontAwesomeIcon :icon="faArrowTrendUp" /> Prośba o zwiększenie limitu
                </button>
            </div>
        </div>

        <div class="card text-bg-dark mt-3">
            <div class="card-body">
                <h5 class="card-title">Aktualizacja rejestracji pojazdu</h5>
                <h6 class="card-subtitle my-3 text-muted">
                    Jeśli posiadasz już zarejestrowany pojazd, ale chcesz dokonać aktualizacji danych
                </h6>
                <button class="btn btn-outline-primary btn-lg" @click="emit('step', 20)">
                    <FontAwesomeIcon :icon="faPen" /> Aktualizuj
                </button>
            </div>
        </div>

        <div v-if="gen_idents_enabled" class="card text-bg-dark mt-3">
            <div class="card-body">
                <h5 class="card-title">Pobieranie identyfikatora parkingowego</h5>
                <h6 class="card-subtitle my-3 text-muted">
                    Jeśli posiadasz już wygenerowany identyfikator i chcesz tylko ponownie go pobrać i wydrukować
                </h6>
                <button class="btn btn-outline-primary btn-lg" @click="emit('step', 30)">
                    <FontAwesomeIcon :icon="faDownload" /> Pobieranie
                </button>
            </div>
        </div>

        <div class="mt-4 card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Mapa dojazdu</h5>
                <h6 class="card-subtitle my-3 text-muted">
                    Mapka pokazuje umiejscowienie wjazdu na parking dla niepełnosprawnych.
                </h6>
                <a href="dojazd-na-parkingi-samochodowe.png" download="dojazd-na-parkingi-samochodowe.png" class="btn btn-lg btn-outline-primary">
                    <FontAwesomeIcon :icon="faMap" /> Pobierz mapę
                </a>
            </div>
        </div>        
    </div>
</template>