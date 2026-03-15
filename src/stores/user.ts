import { defineStore } from "pinia";
import WebApp from "@twa-dev/sdk";

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon: string;
  completed: boolean;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    name: WebApp.initDataUnsafe?.user?.first_name ?? "Гость",
    stars: 0,
    level: 1,
    xp: 0,
    xpToNext: 100,
    tasks: [
      {
        id: "t1",
        title: "Ежедневный вход",
        description: "Открой приложение сегодня",
        reward: 20,
        icon: "📅",
        completed: false,
      },
      {
        id: "t2",
        title: "Подпишись на канал",
        description: "@StarQuestNews",
        reward: 50,
        icon: "📢",
        completed: false,
      },
      {
        id: "t3",
        title: "Поделись ботом",
        description: "Отправь другу",
        reward: 30,
        icon: "🔗",
        completed: false,
      },
      {
        id: "t4",
        title: "Пройди квиз",
        description: "5 вопросов · ~2 мин",
        reward: 80,
        icon: "🧠",
        completed: false,
      },
      {
        id: "t5",
        title: "Пригласи друга",
        description: "Реферальная ссылка",
        reward: 200,
        icon: "👫",
        completed: false,
      },
    ] as Task[],
  }),

  getters: {
    completedCount: (state) => state.tasks.filter((t) => t.completed).length,
    xpPercent: (state) => Math.round((state.xp / state.xpToNext) * 100),
  },

  actions: {
    completeTask(id: string) {
      const task = this.tasks.find((t) => t.id === id);
      if (!task || task.completed) return;

      task.completed = true;
      this.stars += task.reward;
      this.xp += task.reward;

      if (this.xp >= this.xpToNext) {
        this.xp -= this.xpToNext;
        this.level++;
        this.xpToNext = Math.round(this.xpToNext * 1.5);
        WebApp.showAlert(`🎉 Уровень ${this.level}! Новые задания разблокированы`);
      }

      WebApp.HapticFeedback.notificationOccurred("success");
    },
  },
});
