<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <router-link to="/">
        <a-button type="primary">Back Home</a-button>
      </router-link>
    </template>
  </a-result>
</template>
<script setup>
</script>
