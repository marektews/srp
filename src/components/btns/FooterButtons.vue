<script setup>
import NextButton from './NextButton.vue'
import BackButton from './BackButton.vue'
import SubmitButton from './SubmitButton.vue'

defineEmits(['back', 'next', 'submit'])

const props = defineProps({
    backVisible: { type: Boolean, default: true },
    nextVisible: { type: Boolean, default: true },
    submitVisible: { type: Boolean, default: false },

    backEnabled: { type: Boolean, default: true },
    nextEnabled: { type: Boolean, default: true },
    submitEnabled: { type: Boolean, default: true },
})

</script>

<template>
    <div class="footer-buttons-layout mt-5">
        <BackButton v-if="props.backVisible"
            :disabled="!backEnabled"
            @click="$emit('back')" 
        />
        <NextButton v-if="props.nextVisible"
            :disabled="!nextEnabled"
            @click="$emit('next')" 
        />
        <SubmitButton v-if="props.submitVisible"
            :disabled="!submitEnabled"
            @click="$emit('submit')"
        />
    </div>
</template>

<style scoped>
.footer-buttons-layout {
    display: flex;
    flex-direction: row;
    gap: 4pt;
}

</style>