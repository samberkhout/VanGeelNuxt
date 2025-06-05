<template>
  <div class="container mx-auto p-4">
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Welkom</h1>
      <nav class="mt-2 flex gap-4">
        <NuxtLink to="/oppotten" class="text-blue-500">Oppotten</NuxtLink>
        <NuxtLink to="/potworm" class="text-blue-500">Potworm</NuxtLink>
        <NuxtLink to="/trips" class="text-blue-500">Trips</NuxtLink>
        <NuxtLink to="/ziekzoeken" class="text-blue-500">Ziekzoeken</NuxtLink>
      </nav>
    </header>
    <slot />
  </div>
</template>
