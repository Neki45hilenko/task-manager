<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { useTaskStore } from "~/stores/task-store";
import type { Task } from "./task";

const props = defineProps<{ modelValue: boolean }>();
const localDialog = ref(props.modelValue);

const taskStore = useTaskStore();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "add-task", task: Task): void;
}>();

const form = reactive<Omit<Task, "id">>({
  title: "",
  date: "",
  description: "",
});

const errors = reactive<{ title?: string; date?: string }>({});

const schema = yup.object({
  title: yup.string().required("Название задачи обязательно"),
  date: yup.string().required("Дата задачи обязательна"),
});

function close() {
  emit("update:modelValue", false);
  clearForm();
}

function clearForm() {
  form.title = "";
  form.date = "";
  form.description = "";
  Object.keys(errors).forEach((k) => delete errors[k as keyof typeof errors]);
}

function submit() {
  Object.keys(errors).forEach((k) => delete errors[k as keyof typeof errors]);

  try {
    schema.validateSync(form, { abortEarly: false });

    const newTask = {
      id: uuidv4(),
      title: form.title,
      date: form.date,
      description: form.description,
    };

    taskStore.addTask(newTask);

    close();
  } catch (err: any) {
    if (err.inner) {
      err.inner.forEach((e: any) => {
        errors[e.path as keyof typeof errors] = e.message;
      });
    }
  }
}

watch(localDialog, (val) => emit("update:modelValue", val));
watch(
  () => props.modelValue,
  (val) => {
    localDialog.value = val;
  }
);
</script>

<template>
  <v-dialog v-model="localDialog" max-width="500px">
    <v-card>
      <v-card-title class="mt-2 ml-2">Создать задачу</v-card-title>
      <v-card-text>
        <v-text-field
          label="Название"
          v-model="form.title"
          :error="!!errors.title"
          :error-messages="errors.title"
          required
        />

        <v-text-field
          label="Дата"
          v-model="form.date"
          type="date"
          :error="!!errors.date"
          :error-messages="errors.date"
          required
        />

        <v-textarea label="Описание" v-model="form.description" rows="3" />
      </v-card-text>

      <v-card-actions class="d-flex justify-space-between mb-2 mx-4">
        <v-btn variant="tonal" @click="close">Отмена</v-btn>
        <v-btn variant="tonal" color="primary" @click="submit">Добавить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
