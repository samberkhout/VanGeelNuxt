<template>
  <form @submit.prevent="submit" class="space-y-4 p-4">
    <div>
      <label>Leverweek</label>
      <input type="number" v-model.number="form.leverweek" class="border p-2" required />
    </div>
    <div>
      <label>Ras</label>
      <RasSelect v-model="form.rasId" />
    </div>
    <div>
      <label>Aantal opgepot</label>
      <input type="number" v-model.number="form.opgepot" class="border p-2" required />
    </div>
    <div>
      <label>Aantal weggegooid</label>
      <input type="number" v-model.number="form.weggegooid" class="border p-2" required />
    </div>
    <div>
      <label>Reden weggooien</label>
      <select v-model="form.reden" class="border p-2" required>
        <option value="te klein">te klein</option>
        <option value="rot">rot</option>
        <option value="anders">anders</option>
      </select>
    </div>
    <div v-if="form.reden === 'anders'">
      <label>Extra reden</label>
      <input v-model="form.extraReden" class="border p-2" />
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
  rasId: z.number(),
  opgepot: z.number(),
  weggegooid: z.number(),
  reden: z.string(),
  extraReden: z.string().optional()
})

const form = reactive<{ leverweek:number; rasId:number|null; opgepot:number; weggegooid:number; reden:string; extraReden?:string }>({
  leverweek: 0,
  rasId: null,
  opgepot: 0,
  weggegooid: 0,
  reden: 'te klein',
  extraReden: ''
})

async function submit() {
  const parsed = schema.safeParse(form)
  if (!parsed.success) return
  await $fetch('/api/oppotten', { method: 'POST', body: parsed.data })
  Object.assign(form, { leverweek:0, rasId:null, opgepot:0, weggegooid:0, reden:'te klein', extraReden:'' })
  alert('Opgeslagen')
}
</script>
