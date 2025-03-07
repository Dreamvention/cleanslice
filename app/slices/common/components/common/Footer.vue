<template>
  <footer class="py-6 md:px-8 md:py-0">
    <div class="container flex flex-col items-center justify-between gap-4 md:h-8 mb-4 md:flex-row">
      <div class="w-[100%] text-sm leading-loose text-muted-foreground">
        <span class="inline-block text-left">Copyright © 2024 Cleanslice All Rights Reserved.</span>
        <NuxtLink to="/privacy-policy" class="font-bold decoration-foreground mx-2"> Privacy Policy </NuxtLink>
        <NuxtLink to="/terms-of-use" class="font-bold decoration-foreground mx-2"> Terms of use </NuxtLink>
        <span class="inline-block md:text-right md:float-right">
          Built by
          <NuxtLink to="/" class="underline underline-offset-4 font-bold decoration-foreground">
            Cleanslice
          </NuxtLink></span
        >
      </div>
    </div>
  </footer>
</template>
