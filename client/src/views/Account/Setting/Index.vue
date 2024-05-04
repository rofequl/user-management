<script setup>
import store from "@/store";
import {computed, ref, watch} from "vue";

const isMobile = computed(() => store.getters.isMobile)
const current = ref(['mail']);
const items = ref([
  {
    key: 'mail',
    label: 'General Details',
    title: 'Navigation One',
  },
  {
    key: 'app',
    label: 'Security Setting',
    title: 'Navigation Two',
  },
]);
</script>
<template>
  <div>
    <!-- Start Page Header -->
    <a-page-header title="Settings" class="p-0 mb-2">
      <template #breadcrumb>
        <a-breadcrumb class="fs-7">
          <a-breadcrumb-item>
            <router-link to="/">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>Settings</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
    </a-page-header>
    <!-- End Page Header -->

    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="account-settings-info-main" :class="{ 'mobile': isMobile }">
        <div class="account-settings-info-left">
          <a-menu v-model:selectedKeys="current" :mode="isMobile ? 'horizontal':'inline'" :items="items"/>
        </div>
        <div class="account-settings-info-right">
          <router-view/>
        </div>
      </div>
    </a-card>
  </div>
</template>
<style lang="scss" scoped>
.account-settings-info-main {
  width: 100%;
  display: flex;
  height: 100%;
  overflow: auto;

  &.mobile {
    display: block;

    .account-settings-info-left {
      border-right: unset;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 50px;
      overflow-x: auto;
      overflow-y: scroll;
    }

    .account-settings-info-right {
      padding: 0 20px;
    }
  }

  .account-settings-info-left {
    border-right: 1px solid #e8e8e8;
    width: 224px;
  }

  .account-settings-info-right {
    flex: 1 1;
    padding: 0 20px;

    .account-settings-info-title {
      color: rgba(0, 0, 0, .85);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 12px;
    }

    .account-settings-info-view {
      padding-top: 12px;
    }
  }
}
</style>
