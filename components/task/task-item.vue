<script setup lang="ts">
import type { Task } from "./task";

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{ (e: "delete", id: string | number): void }>();

const expanded = ref(false);

function toggle() {
  expanded.value = !expanded.value;
}

function onDelete() {
  emit("delete", props.task.id);
}

const formattedDate = computed(() => {
  if (!props.task.date) return "";
  const d = new Date(props.task.date);
  return isNaN(d.getTime()) ? props.task.date : d.toLocaleDateString();
});
</script>

<template>
  <v-card class="task-card pa-3" elevation="2" hover>
    <div
      class="card-header d-flex align-center justify-space-between"
      @click="toggle"
    >
      <div class="text-h6">{{ task.title }}</div>

      <v-btn
        icon
        small
        variant="text"
        title="Развернуть / Свернуть"
        @click.stop="toggle"
      >
        <v-icon v-show="!expanded">mdi-chevron-down</v-icon>
        <v-icon v-show="expanded">mdi-chevron-up</v-icon>
      </v-btn>
    </div>

    <v-expand-transition>
      <div v-show="expanded" class="card-body pa-4">
        <div class="text-subtitle-2 mb-2" v-if="formattedDate">
          {{ formattedDate }}
        </div>

        <div class="text-body-1 mb-4" v-if="task.description">
          {{ task.description }}
        </div>

        <div class="d-flex justify-end">
          <v-btn small outlined color="error" @click="onDelete">
            <v-icon left>mdi-delete</v-icon> Удалить
          </v-btn>
        </div>
      </div>
    </v-expand-transition>
  </v-card>
</template>
