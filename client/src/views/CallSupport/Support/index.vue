<script setup>
import SupportAddEdit from "@/components/CallSupport/SupportAddEdit.vue";

</script>
<template>
  <div>
    <!-- Start Page Header -->
    <a-page-header title="Call Support" class="p-0 mb-2">
      <template #extra>
        <a-button type="primary">New Support</a-button>
      </template>
      <template #breadcrumb>
        <a-breadcrumb class="fs-7">
          <a-breadcrumb-item>
            <router-link to="/">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>Call Support</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
    </a-page-header>
    <!-- End Page Header -->
    <SupportAddEdit/>
  </div>
</template>
