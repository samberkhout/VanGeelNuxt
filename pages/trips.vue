<template>
  <form @submit.prevent="submit" class="space-y-4 p-4">
    <div>
      <label>Leverweek</label>
      <input type="number" v-model.number="form.leverweek" class="border p-2" required />
    </div>
    <div>
      <label>Oppotweek</label>
      <input type="number" v-model.number="form.oppotweek" class="border p-2" required />
    </div>
    <div>
      <label>Ras</label>
      <RasSelect v-model="form.rasId" />
    </div>
    <div>
      <label>Aantal planten</label>
      <input type="number" v-model.number="form.aantal" class="border p-2" required />
    </div>
    <div>
      <label>Locatie X</label>
      <input type="number" v-model.number="form.locatieX" class="border p-2" required />
    </div>
    <div>
      <label>Locatie Y</label>
      <input type="number" v-model.number="form.locatieY" class="border p-2" required />
    </div>
    <button class="bg-blue-500 text-white px-4 py-2">Opslaan</button>
  </form>
</template>

<script setup lang="ts">
import RasSelect from '~/components/RasSelect.vue'
import { z } from 'zod'

definePageMeta({ middleware: 'auth' })

const schema = z.object({
  leverweek: z.number(),
  oppotweek: z.number(),
  rasId: z.number(),
  aantal: z.number(),
  locatieX: z.number().min(0).max(20),
  locatieY: z.number().min(0).max(20)
})

const form = reactive<{ leverweek:number; oppotweek:number; rasId:number|null; aantal:number; locatieX:number; locatieY:number }>({
  leverweek:0,
  oppotweek:0,
  rasId:null,
  aantal:0,
  locatieX:0,
  locatieY:0
})

async function submit() {
  const parsed = schema.safeParse(form)
  if (!parsed.success) return
  await $fetch('/api/trips', { method:'POST', body: parsed.data })
  Object.assign(form, { leverweek:0, oppotweek:0, rasId:null, aantal:0, locatieX:0, locatieY:0 })
  alert('Opgeslagen')
}
</script>
