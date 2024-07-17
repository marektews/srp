<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDownload, faMap, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';

const emit = defineEmits(['step'])
</script>

<template>
    <div class="container">
        <div class="card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Nowy identyfikator parkingowy</h5>
                <h6 class="card-subtitle my-3 text-muted">
                    Wygeneruj identyfikator, 
                    aby otrzymać przepustkę uprawniającą do wjazdu na parking Lodowiska
                </h6>
                <button class="btn btn-outline-primary btn-lg" @click="emit('step', 10)">
                    <FontAwesomeIcon :icon="faPlus" /> Wygeneruj
                </button>
            </div>
        </div>

        <div class="card text-bg-dark mt-3">
            <div class="card-body">
                <h5 class="card-title">Aktualizacja identyfikatora parkingowego</h5>
                <h6 class="card-subtitle my-3 text-muted">
                    Jeśli posiadasz już wygenerowany identyfikator i chcesz dokonać zmiany pojazdu
                </h6>
                <button class="btn btn-outline-primary btn-lg" @click="emit('step', 20)">
                    <FontAwesomeIcon :icon="faPen" /> Aktualizuj
                </button>
            </div>
        </div>

        <div class="card text-bg-dark mt-3">
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
                    Mapka pokazuje umiejscowienie wjazdu na parking Lodowiska.
                </h6>
                <a href="parking-lodowiska-mapa.png" download="parking-lodowiska-mapa.png" class="btn btn-lg btn-outline-primary">
                    <FontAwesomeIcon :icon="faMap" /> Pobierz mapę
                </a>
            </div>
        </div>        
    </div>
</template>