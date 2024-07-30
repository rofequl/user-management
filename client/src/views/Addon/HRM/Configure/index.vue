<script setup>
import Navbar from "@/components/Addon/HRM/Navbar.vue";
import Employee from "@/components/Addon/HRM/Employee.vue";
import {ref} from "vue";

const current = ref(0);
</script>
<template>
  <div>
    <!-- ========== Start Page Header ========== -->
    <a-page-header title="HRM Configuration" class="p-0 mb-2">
      <template #breadcrumb>
        <a-breadcrumb class="fs-7">
          <a-breadcrumb-item>
            <router-link to="/">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>Human Resource Management</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
    </a-page-header>
    <!-- ========== End Page Header ========== -->
    <!-- ========== Start Navbar ========== -->
    <Navbar/>
    <!-- ========== End Navbar ========== -->
    <!-- ========== Start Employee Information ========== -->
    <Employee v-if="current === 1"/>
    <!-- ========== Start Employee Information ========== -->
    <a-card class="w-100 my-4" :body-style="{padding: 0, overflow: 'hidden'}">

    </a-card>


  </div>
</template>
<style scoped>
.custom-tabs :deep(.ant-tabs-nav-wrap) {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  margin-left: 20px;
}

.custom-card :deep(.ant-card-actions li) {
  margin: 0;
}
</style>
