<script setup lang="ts">
import TaskList from "~/components/task/task-list.vue";
import TaskToolbar from "~/components/task/task-toolbar.vue";
import TaskCreate from "~/components/task/task-create.vue";
import TaskFilter from "~/components/task/task-filter.vue";
import { useTaskStore } from "~/stores/task-store";

const showCreateDialog = ref(false);
const showFilterDialog = ref(false);
const filterDate = ref<string | null>(null);

const taskStore = useTaskStore();
const tasksToShow = computed(() => {
  if (!filterDate.value) return taskStore.tasks;
  return taskStore.tasks.filter((t) => t.date === filterDate.value);
});

function handleAddTask() {
  showCreateDialog.value = true;
}

function handleFilterTask() {
  showFilterDialog.value = true;
}

function handleApplyFilter(date: string | null) {
  filterDate.value = date;
}
</script>

<template>
  <v-main class="pa-4">
    <h1>Ежедневник</h1>
    <task-toolbar @add-task="handleAddTask" @toggle-filter="handleFilterTask" />
    <task-list :tasks="tasksToShow" />

    <task-create v-model="showCreateDialog" />
    <task-filter v-model="showFilterDialog" @apply-filter="handleApplyFilter" />
  </v-main>
</template>
