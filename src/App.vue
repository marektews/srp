<script setup>
import { ref } from 'vue'
import MainManuView from './view/MainMenuView.vue'
import LoginView from './view/LoginView.vue'
import GenerateView from './view/create/GenerateView.vue'
import NumberOfUsesTestView from './view/create/NumberOfUsesTestView.vue'
import LinksView from './view/LinksView.vue'
import GetCarRegistrationNumber from './view/GetCarRegistrationNumber.vue'
import UpdateIdentView from './view/update/UpdateIdentView.vue'

const step = ref(0)
const congregationName = ref('')
const passID = ref(-1)

</script>

<template>
    <div class="container">
        <header>
            <img width="48" height="48" src="@/assets/Parking_icon.svg" />
            <div>
                <div class="hdr-title">Identyfikator parkingowy</div>
                <div class="hdr-subtitle">Identyfikacja pojazdów uprawnionych do wjazdu na parking pod trybuną stadionu</div>
            </div>
        </header>

        <main>
            <LoginView v-if="step === 0"
                v-model="congregationName"
                @next="step = 1"
            />
            <MainManuView v-else-if="step === 1" 
                @step="step = $event"
            />

            <!-- Generowanie nowego -->
            <NumberOfUsesTestView v-else-if="step === 10"
                :congregation-name="congregationName"
                @back="step = 1"
                @next="step = 11"
            />
            <GenerateView v-else-if="step === 11"
                :congregation-name="congregationName"
                @back="step = 1"
                @next="step = 31; passID = $event"
            />

            <!-- Aktualizacja istniejącego -->
            <GetCarRegistrationNumber v-else-if="step === 20"
                :congregation-name="congregationName"
                @next="step = 21; passID = $event"
                @back="step = 1"
            />
            <UpdateIdentView v-else-if="step === 21"
                :pass-id="passID"
                @back="step = 1"
                @next="step = 31"
            />

            <!-- Pobieranie -->
            <GetCarRegistrationNumber v-else-if="step === 30"
                :congregation-name="congregationName"
                @next="step = 31; passID = $event"
                @back="step = 1"
            />
            <LinksView v-else-if="step === 31"
                :pass-id="passID"
                @back="step = 1"
            />
        </main>
    </div>
</template>

<style scoped>
main {
    margin-top: 3rem;
}

header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 9pt;
}

.hdr-title {
    font-size: 16pt;
}

.hdr-subtitle {
    font-size: 10pt;
}
</style>
