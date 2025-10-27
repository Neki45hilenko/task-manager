<script setup lang="ts">
import type { Task } from "~/components/task/task";
import TaskItem from "./task-item.vue";
import { useTaskStore } from "~/stores/task-store";

const taskStore = useTaskStore();

const props = defineProps<{ tasks: Task[] }>();

function handleDelete(id: string | number) {
  taskStore.deleteTask(id);
}
</script>

<template>
  <v-container fluid class="py-4">
    <v-row dense>
      <v-col v-for="task in props.tasks" :key="task.id" cols="12">
        <TaskItem :task="task" @delete="handleDelete" />
      </v-col>
    </v-row>

    <div
      v-if="!props.tasks.length"
      class="text-center text-medium-emphasis py-8"
    >
      <v-icon large class="mb-2">mdi-clipboard-list-outline</v-icon>
      <div>Нет задач</div>
    </div>
  </v-container>
</template>
