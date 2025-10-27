<template>
  <v-toolbar flat class="task-toolbar pa-2">
    <v-btn icon @click="$emit('toggle-filter')" title="Фильтр">
      <v-icon>mdi-filter-variant</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn color="primary" @click="$emit('add-task')" class="ma-0">
      <v-icon left>mdi-plus</v-icon> Создать
    </v-btn>
  </v-toolbar>
</template>
