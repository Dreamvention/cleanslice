<script lang="ts" setup>
import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
} from '#theme/components/ui/patternBackground';

definePageMeta({
  layout: 'teams',
  public: false,
});

const teamStore = useTeamStore();

onMounted(() => {
  // if (teamsStore.hasTeam) navigateTo({ name: 'teams' });
});
</script>
<template>
  <PatternBackground
    :animate="true"
    :direction="PATTERN_BACKGROUND_DIRECTION.TopRight"
    :variant="PATTERN_BACKGROUND_VARIANT.Dot"
    class="flex h-[36rem] w-full items-center justify-center"
    :speed="PATTERN_BACKGROUND_SPEED.Slow"
  >
    <TeamCreateProvider class="mx-auto max-w-md w-80" />
  </PatternBackground>
</template>
