<template>
  <div class="shop">
    <header class="page-header">
      <h1>Магазин</h1>
      <div class="stars-chip">⭐ {{ store.stars }}</div>
    </header>

    <p class="subtitle">Обменивай звёзды на реальные награды</p>

    <div
      v-for="item in shopItems"
      :key="item.id"
      class="item-card"
      :class="{ locked: store.stars < item.price }"
      @click="buyItem(item)"
    >
      <div class="item-icon">{{ item.icon }}</div>
      <div class="item-info">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-desc">{{ item.description }}</div>
      </div>
      <div class="item-price" :class="{ cant: store.stars < item.price }">{{ item.price }} ⭐</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/user";
import WebApp from "@twa-dev/sdk";

const store = useUserStore();

const shopItems = [
  {
    id: "s1",
    title: "Стикерпак StarQuest",
    description: "Эксклюзивный набор стикеров",
    icon: "🎨",
    price: 100,
  },
  {
    id: "s2",
    title: 'Значок "Звёздный"',
    description: "Особый бейдж в профиле",
    icon: "🏅",
    price: 300,
  },
  {
    id: "s3",
    title: "Подписка Premium 1 мес",
    description: "Бонусные задания каждый день",
    icon: "👑",
    price: 500,
  },
  {
    id: "s4",
    title: "Telegram Premium",
    description: "Активация на 1 месяц",
    icon: "💎",
    price: 1000,
  },
  {
    id: "s5",
    title: "Скидка 10% у партнёра",
    description: "Промокод на email",
    icon: "🛍️",
    price: 200,
  },
];

function buyItem(item: { id: string; title: string; price: number }) {
  if (store.stars < item.price) {
    WebApp.showAlert(`Недостаточно звёзд! Нужно ещё ${item.price - store.stars} ⭐`);
    return;
  }

  WebApp.showConfirm(`Купить "${item.title}" за ${item.price} ⭐?`, (confirmed) => {
    if (confirmed) {
      store.stars -= item.price;
      WebApp.showAlert(`✅ Готово! "${item.title}" твой`);
    }
  });
}
</script>

<style scoped>
.shop {
  padding: 12px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
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
.subtitle {
  font-size: 13px;
  color: var(--tg-theme-hint-color, #999);
  margin-bottom: 14px;
}

.item-card {
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
.item-card:active {
  transform: scale(0.98);
}
.item-card.locked {
  opacity: 0.5;
}
.item-icon {
  font-size: 28px;
}
.item-info {
  flex: 1;
}
.item-title {
  font-size: 14px;
  font-weight: 600;
}
.item-desc {
  font-size: 12px;
  color: var(--tg-theme-hint-color, #999);
  margin-top: 2px;
}
.item-price {
  font-size: 14px;
  font-weight: 700;
  color: #92660a;
  white-space: nowrap;
}
.item-price.cant {
  color: var(--tg-theme-hint-color, #999);
}
</style>
