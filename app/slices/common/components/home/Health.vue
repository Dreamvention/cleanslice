<script lang="ts" setup>
import { HealthService } from '#api/data';

const app = useNuxtApp();
const response = await HealthService.getHealth();
</script>

<template>
  <Card>
    <CardHeader><CardTitle>Api Health</CardTitle></CardHeader>
    <CardContent>
      <p>
        The Api is currently <strong>{{ response.data?.data.status }}</strong>
      </p>
    </CardContent>
  </Card>
</template>
