<template>
  <div class="hidden flex-col md:flex">
    <div class="grid items-stretch gap-4 md:grid-cols-[1fr_320px] divide-x">
      <div class="relative flex flex-col mt-4">
        <slot></slot>
      </div>
      <div class="flex-col space-y-4 sm:flex p-4">
        <slot name="side"></slot>
      </div>
    </div>
  </div>
</template>
