<template>
  <div class="app">
    <RouterView />

    <nav class="bottom-nav">
      <RouterLink to="/" class="nav-item">
        <span class="nav-icon">🏠</span>
        <span class="nav-label">Главная</span>
      </RouterLink>
      <RouterLink to="/tasks" class="nav-item">
        <span class="nav-icon">⚡</span>
        <span class="nav-label">Задания</span>
        <span v-if="pendingCount > 0" class="badge">{{ pendingCount }}</span>
      </RouterLink>
      <RouterLink to="/shop" class="nav-item">
        <span class="nav-icon">🎁</span>
        <span class="nav-label">Магазин</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "./stores/user";

const store = useUserStore();
const pendingCount = computed(() => store.tasks.filter((t) => !t.completed).length);
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: var(--tg-theme-bg-color, #f5f5f5);
  color: var(--tg-theme-text-color, #000);
}

.app {
  max-width: 480px;
  margin: 0 auto;
  padding-bottom: 70px;
  min-height: 100vh;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 480px;
  margin: 0 auto;
  background: var(--tg-theme-bg-color, #fff);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 8px 0 16px;
  z-index: 100;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  text-decoration: none;
  color: var(--tg-theme-hint-color, #999);
  font-size: 11px;
  position: relative;
}

.nav-item.router-link-active {
  color: var(--tg-theme-button-color, #6c63ff);
}

.nav-icon {
  font-size: 22px;
}

.badge {
  position: absolute;
  top: -2px;
  right: calc(50% - 22px);
  background: #ff3b30;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 10px;
  min-width: 16px;
  text-align: center;
}
</style>
