<script setup>
import { ref, watch, computed} from 'vue'

const name = ref('')
const hints = ref([])

watch(name, async (value, old) => {
    // console.log("Watcher:", value, old)
    if(value.length < 3) {
        hints.value = []
        return
    }

    if(Math.abs(value.length - old.length) === 1) {
        try {
            const res = await fetch(`/api/srp/congregations/search/${value}`)
            hints.value = await res.json()
        }
        catch(e) {
            console.debug(e)
        }
    }
})

const btnDisabled = computed(() => {
    return !hints.value.includes(name.value)
})
</script>

<template>
    <div class="input-group input-group-lg">
        <span class="input-group-text">Wpisz nazwę zboru:</span>
        
        <input 
            v-model="name"
            type="text" 
            class="form-control"
            list="hints" />
        <datalist id="hints">
            <option v-for="(item, index) in hints" :value="item" :key="index" />
        </datalist>
        
        <button class="btn btn-primary btn-lg" :disabled="btnDisabled">
            <i class="fa-solid fa-chevron-right" />
            Dalej
        </button>
    </div>
</template>