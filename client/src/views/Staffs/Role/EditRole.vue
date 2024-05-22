<script setup>
import RoleAddEdit from "@/components/Staffs/RoleAddEdit.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const id = route.params.id;
</script>
<template>
  <div>
    <RoleAddEdit :isEdit="true" :role-id="Number(id)"/>
  </div>
</template>
