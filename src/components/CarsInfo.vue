<template>
    <div class="mt-3 alert alert-info alert-layout">
        <i class="fa-solid fa-circle-info" />
        <ol>
            <li>Identyfikator uprawnia do wjazdu na parking tylko jeden pojazd danego dnia.</li>
            <li>Można na jeden identyfikator zgłosić wjazd różnych pojazdów, ale tylko w różne dni.</li>
        </ol>
    </div>
    <div class="mt-3 alert alert-danger alert-layout">
        <i class="fa-solid fa-triangle-exclamation" />
        <div class="ms-2">
            Prosimy również pamiętać, że ze względów bezpieczeństwa,
            na parking pod trybuną stadionu <b>nie zostaną wpuszczone 
            pojazdy posiadające instalację LPG</b>.
        </div>
    </div>
</template>

<style scoped>
.alert-layout {
    display: flex;
    flex-direction: row;
    align-items: first baseline;
    gap: 6pt;
}

ol {
    margin-bottom: 0;
}
</style>