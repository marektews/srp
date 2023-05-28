<script setup>
const emit = defineEmits(['step'])
</script>

<template>
    <div class="container">
        <div class="card text-bg-dark">
            <div class="card-body">
                <h5 class="card-title">Nowy identyfikator parkingowy</h5>
                <h6 class="card-subtitle my-3 text-muted">
                    Wygeneruj identyfikator, 
                    aby otrzymać przepustkę uprawniającą do wjazdu na parking pod trybuną stadionu
                </h6>
                <button class="btn btn-outline-primary btn-lg" @click="emit('step', 10)">
                    Wygeneruj
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
                    Aktualizuj
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
                    Pobieranie
                </button>
            </div>
        </div>
    </div>
</template>