<template>
    <div class="main-menu-container">
        <div class="card text-bg-dark main-menu-item">
            <div class="card-body">
                <h5 class="card-title">Wygeneruj identyfikator</h5>
                <p class="card-text">
                    Wygeneruj identyfikator, 
                    aby otrzymać przepustkę uprawniającą do wjazdu na parking pod trybuną stadionu
                </p>
                <button class="btn btn-primary">Wygeneruj</button>
            </div>
        </div>
        <div class="card text-bg-dark main-menu-item">
            <div class="card-body">
                <h5 class="card-title">Aktualizuj identyfikator</h5>
                <p class="card-text">
                    Jeśli posiadasz już wygenerowany identyfikator i chcesz dokonać zmiany pojazdu
                </p>
                <button class="btn btn-primary">Aktualizuj</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-menu-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12pt;
    align-items: stretch;
    align-content: stretch;
    justify-content: space-between;
}

.main-menu-item {
    flex-grow: 1;
}
</style>