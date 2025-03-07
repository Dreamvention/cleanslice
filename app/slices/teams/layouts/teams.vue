<template>
  <div class="flex min-h-screen flex-col bg-background">
    <CommonHeader />
    <div class="container mx-auto px-4 flex-1 py-4">
      <slot />
    </div>
    <CommonFooter />
  </div>
</template>
