<template>
  <v-app>
    <v-main>
      <v-container class="app-container" fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.app-container {
  max-width: 50vw;
  margin: auto;
  padding: 16px;
}
</style>
