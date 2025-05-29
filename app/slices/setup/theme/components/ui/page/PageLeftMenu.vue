<template>
  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <aside class="-mx-4 lg:w-1/5">
      <slot name="menu"></slot>
    </aside>
    <div class="flex-1 lg:max-w-2xl">
      <div class="space-y-6">
        <slot />
      </div>
    </div>
  </div>
</template>
