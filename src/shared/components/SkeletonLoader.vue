<!-- src/shared/components/SkeletonLoader.vue -->
<template>
  <div class="skeleton-card p-3 rounded-4 bg-white shadow-sm">
    <div class="skeleton-img mb-3 rounded-3"></div>
    <div class="skeleton-line w-50 mb-2"></div>
    <div class="skeleton-line w-100 mb-1"></div>
    <div class="skeleton-line w-75"></div>
  </div>
</template>

<style scoped>
.skeleton-card { width: 100%; border: 1px solid rgba(0,0,0,0.05); }
.skeleton-img { height: 180px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
.skeleton-line { height: 14px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 4px; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
</style>