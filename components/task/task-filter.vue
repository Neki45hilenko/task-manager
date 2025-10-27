<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "apply-filter", date: string | null): void;
}>();

const localDialog = ref(props.modelValue);
const filter = ref<string | null>(null);

function applyFilter() {
  emit("apply-filter", filter.value);
  emit("update:modelValue", false);
}

function resetFilter() {
  filter.value = null;
  emit("update:modelValue", false);
  emit("apply-filter", null);
}

watch(
  () => props.modelValue,
  (val) => (localDialog.value = val)
);
watch(localDialog, (val) => emit("update:modelValue", val));
</script>

<template>
  <v-dialog v-model="localDialog" max-width="400px">
    <v-card>
      <v-card-title class="mt-2 ml-2">Фильтр</v-card-title>
      <v-card-text>
        <v-text-field label="Выберите дату" type="date" v-model="filter" />
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between mb-2 mx-4">
        <v-btn text @click="resetFilter">Сбросить</v-btn>
        <v-btn color="primary" @click="applyFilter">Фильтровать</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
