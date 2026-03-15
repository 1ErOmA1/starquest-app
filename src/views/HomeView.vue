<template>
  <div class="home">
    <!-- Шапка -->
    <header class="header">
      <div class="header-left">
        <div class="avatar">{{ store.name[0] }}</div>
        <div>
          <div class="username">{{ store.name }}</div>
          <div class="level-label">Уровень {{ store.level }} · Звёздный охотник хихи</div>
        </div>
      </div>
      <div class="stars-chip">⭐ {{ store.stars }}</div>
    </header>

    <!-- XP прогресс -->
    <div class="xp-card">
      <div class="xp-labels">
        <span>До уровня {{ store.level + 1 }}</span>
        <span>{{ store.xp }} / {{ store.xpToNext }}</span>
      </div>
      <div class="xp-bar">
        <div class="xp-fill" :style="{ width: store.xpPercent + '%' }" />
      </div>
      <div class="stats-row">
        <div class="stat">
          <strong>{{ store.completedCount }}</strong>
          <span>Заданий</span>
        </div>
        <div class="stat">
          <strong>{{ store.stars }}</strong>
          <span>Звёзд</span>
        </div>
        <div class="stat">
          <strong>{{ store.level }}</strong>
          <span>Уровень</span>
        </div>
      </div>
    </div>

    <!-- Быстрые задания -->
    <div class="section">
      <div class="section-header">
        <span>Задания сегодня</span>
        <RouterLink to="/tasks" class="see-all">Все →</RouterLink>
      </div>

      <div
        v-for="task in store.tasks.slice(0, 3)"
        :key="task.id"
        class="task-card"
        :class="{ done: task.completed }"
        @click="store.completeTask(task.id)"
      >
        <div class="task-icon">{{ task.icon }}</div>
        <div class="task-info">
          <div class="task-title">{{ task.title }}</div>
          <div class="task-desc">{{ task.description }}</div>
        </div>
        <div class="task-reward">
          <span v-if="!task.completed">+{{ task.reward }} ⭐</span>
          <span v-else class="done-label">✓</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/user";
const store = useUserStore();
</script>

<style scoped>
.home {
  padding: 12px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #6c63ff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
}
.username {
  font-size: 15px;
  font-weight: 600;
}
.level-label {
  font-size: 12px;
  color: var(--tg-theme-hint-color, #999);
}
.stars-chip {
  background: #fff8e0;
  border: 1px solid #f5c842;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  color: #92660a;
}

.xp-card {
  background: var(--tg-theme-secondary-bg-color, #fff);
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 16px;
}
.xp-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--tg-theme-hint-color, #999);
  margin-bottom: 6px;
}
.xp-bar {
  height: 6px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 12px;
}
.xp-fill {
  height: 100%;
  background: linear-gradient(90deg, #6c63ff, #a78bfa);
  border-radius: 3px;
  transition: width 0.4s ease;
}
.stats-row {
  display: flex;
}
.stat {
  flex: 1;
  text-align: center;
}
.stat strong {
  display: block;
  font-size: 18px;
  font-weight: 600;
}
.stat span {
  font-size: 11px;
  color: var(--tg-theme-hint-color, #999);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 600;
}
.see-all {
  font-size: 13px;
  color: #6c63ff;
  text-decoration: none;
}

.task-card {
  background: var(--tg-theme-secondary-bg-color, #fff);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition:
    opacity 0.2s,
    transform 0.1s;
  active: transform 0.1s;
}
.task-card:active {
  transform: scale(0.98);
}
.task-card.done {
  opacity: 0.5;
  pointer-events: none;
}
.task-icon {
  font-size: 24px;
}
.task-info {
  flex: 1;
}
.task-title {
  font-size: 14px;
  font-weight: 500;
}
.task-desc {
  font-size: 12px;
  color: var(--tg-theme-hint-color, #999);
  margin-top: 2px;
}
.task-reward {
  font-size: 13px;
  font-weight: 600;
  color: #92660a;
  white-space: nowrap;
}
.done-label {
  color: #34c759;
  font-size: 18px;
}
</style>
