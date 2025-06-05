<template>
  <select v-model="model" class="border p-2">
    <option value="" disabled>Kies ras</option>
    <option v-for="ras in soorten" :key="ras.id" :value="ras.id">
      {{ ras.naam }}
    </option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: number | '' }>()
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: (val: number | '') => emit('update:modelValue', val)
})
const soorten = ref<{ id: number; naam: string }[]>([])

onMounted(async () => {
  soorten.value = await $fetch('/api/soorten')
})
</script>
