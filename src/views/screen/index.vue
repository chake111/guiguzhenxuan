<template>
  <div class="screen-container">
    <StatisticsCard />
    <RecentActivity />
  </div>
</template>

<script setup lang="ts">
import StatisticsCard from '@/components/StatisticsCard/index.vue'
import RecentActivity from '@/components/RecentActivity/index.vue'
</script>

<style lang="scss" scoped>
.screen-container {
  padding: 20px;
}
</style>
