<script lang="ts" setup>
import { ApiRepository } from '#api/data';

const app = useNuxtApp();
const response = await app.$di.resolve(ApiRepository).health.getHealth();
</script>

<template>
  <Card>
    <CardHeader><CardTitle>Api Health</CardTitle></CardHeader>
    <CardContent>
      <p>
        The Api is currently <strong>{{ response.data.status }}</strong>
      </p>
    </CardContent>
  </Card>
</template>
