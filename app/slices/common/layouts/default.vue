<template>
  <div class="flex min-h-screen flex-col bg-background">
    <CommonHeader />
    <div
      class="container flex-1 items-start md:grid md:grid-cols-[140px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[160px_minmax(0,1fr)] lg:gap-10"
    >
      <aside
        class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-9.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto py-6"
      >
        <MenuSidebar />
      </aside>
      <main class="relative">
        <slot />
      </main>
    </div>
    <CommonFooter />
  </div>
</template>
