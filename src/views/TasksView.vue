<template>
  <div class="tasks">
    <header class="page-header">
      <h1>Задания</h1>
      <div class="stars-chip">⭐ {{ store.stars }}</div>
    </header>

    <!-- Прогресс -->
    <div class="progress-card">
      <div class="progress-text">
        <span>Выполнено {{ store.completedCount }} из {{ store.tasks.length }}</span>
        <span>{{ Math.round((store.completedCount / store.tasks.length) * 100) }}%</span>
      </div>
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: (store.completedCount / store.tasks.length) * 100 + '%' }"
        />
      </div>
    </div>

    <!-- Фильтр -->
    <div class="filters">
      <button
        v-for="f in filters"
        :key="f.value"
        class="filter-btn"
        :class="{ active: activeFilter === f.value }"
        @click="activeFilter = f.value"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- Список -->
    <div
      v-for="task in filteredTasks"
      :key="task.id"
      class="task-card"
      :class="{ done: task.completed }"
      @click="handleTask(task)"
    >
      <div class="task-icon">{{ task.icon }}</div>
      <div class="task-info">
        <div class="task-title">{{ task.title }}</div>
        <div class="task-desc">{{ task.description }}</div>
      </div>
      <div class="task-right">
        <span v-if="!task.completed" class="reward">+{{ task.reward }} ⭐</span>
        <span v-else class="done-badge">✓ Готово</span>
      </div>
    </div>

    <div v-if="filteredTasks.length === 0" class="empty">
      <div class="empty-icon">🎉</div>
      <div>Все задания выполнены!</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user";
import type { Task } from "../stores/user";
import WebApp from "@twa-dev/sdk";

const store = useUserStore();

const filters = [
  { label: "Все", value: "all" },
  { label: "Активные", value: "active" },
  { label: "Готовые", value: "done" },
];
const activeFilter = ref("all");

const filteredTasks = computed(() => {
  if (activeFilter.value === "active") return store.tasks.filter((t) => !t.completed);
  if (activeFilter.value === "done") return store.tasks.filter((t) => t.completed);
  return store.tasks;
});

function handleTask(task: Task) {
  if (task.completed) return;

  WebApp.showConfirm(
    `Выполнить задание "${task.title}" и получить +${task.reward} ⭐?`,
    (confirmed) => {
      if (confirmed) store.completeTask(task.id);
    },
  );
}
</script>

<style scoped>
.tasks {
  padding: 12px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.page-header h1 {
  font-size: 22px;
  font-weight: 700;
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

.progress-card {
  background: var(--tg-theme-secondary-bg-color, #fff);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
}
.progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--tg-theme-hint-color, #999);
  margin-bottom: 8px;
}
.progress-bar {
  height: 6px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6c63ff, #a78bfa);
  border-radius: 3px;
  transition: width 0.4s ease;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.filter-btn {
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: var(--tg-theme-secondary-bg-color, #fff);
  color: var(--tg-theme-hint-color, #999);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.filter-btn.active {
  background: #6c63ff;
  border-color: #6c63ff;
  color: #fff;
}

.task-card {
  background: var(--tg-theme-secondary-bg-color, #fff);
  border-radius: 14px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: transform 0.1s;
}
.task-card:active {
  transform: scale(0.98);
}
.task-card.done {
  opacity: 0.5;
  cursor: default;
}
.task-icon {
  font-size: 26px;
}
.task-info {
  flex: 1;
}
.task-title {
  font-size: 14px;
  font-weight: 600;
}
.task-desc {
  font-size: 12px;
  color: var(--tg-theme-hint-color, #999);
  margin-top: 2px;
}
.reward {
  font-size: 13px;
  font-weight: 700;
  color: #92660a;
  white-space: nowrap;
}
.done-badge {
  font-size: 12px;
  font-weight: 500;
  color: #34c759;
  background: #f0fff4;
  border-radius: 8px;
  padding: 3px 8px;
  white-space: nowrap;
}

.empty {
  text-align: center;
  padding: 48px 0;
  color: var(--tg-theme-hint-color, #999);
  font-size: 15px;
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}
</style>
