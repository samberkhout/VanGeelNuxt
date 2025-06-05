<template>
  <form @submit.prevent="submit" class="space-y-4 p-4">
    <div>
      <label>Jaar</label>
      <input type="number" v-model.number="form.jaar" class="border p-2" required />
    </div>
    <div>
      <label>Weeknummer</label>
      <input type="number" v-model.number="form.week" class="border p-2" required />
    </div>
    <div>
      <label>Afdeling 1</label>
      <input type="number" v-model.number="form.afdeling1" class="border p-2" required />
    </div>
    <div>
      <label>Afdeling 16</label>
      <input type="number" v-model.number="form.afdeling16" class="border p-2" required />
    </div>
    <button class="bg-blue-500 text-white px-4 py-2">Opslaan</button>
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod'

definePageMeta({ middleware: 'auth' })

const schema = z.object({
  jaar: z.number().min(1).max(9999),
  week: z.number().min(1).max(52),
  afdeling1: z.number().min(0),
  afdeling16: z.number().min(0)
})

const form = reactive<{ jaar:number; week:number; afdeling1:number; afdeling16:number }>({
  jaar: new Date().getFullYear(),
  week: 1,
  afdeling1:0,
  afdeling16:0
})

async function submit() {
  const parsed = schema.safeParse(form)
  if (!parsed.success) return
  await $fetch('/api/potworm', { method:'POST', body: parsed.data })
  Object.assign(form, { jaar:new Date().getFullYear(), week:1, afdeling1:0, afdeling16:0 })
  alert('Opgeslagen')
}
</script>
