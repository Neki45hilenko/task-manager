import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Task } from "../components/task/task";

const STORAGE_KEY = "tasks";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<Task[]>([]);

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) tasks.value = JSON.parse(saved);
  }

  watch(
    tasks,
    (newVal) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
    },
    { deep: true }
  );

  function addTask(task: Task) {
    tasks.value.push(task);
  }

  function deleteTask(id: string | number) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }

  return {
    tasks,
    addTask,
    deleteTask,
  };
});
