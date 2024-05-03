<script setup>
import {CRow, CCol} from "@coreui/vue";
import {LockFilled, MailFilled, PhoneFilled} from "@ant-design/icons-vue";
import {ref} from "vue";

const hideTooltipStr = ref('Hide Edit tooltip.');
const activeKey = ref('1');

</script>
<template>
  <div>
    <!-- Page Header -->
    <a-page-header title="Account Overview" class="p-0 mb-4">
      <template #breadcrumb>
        <a-breadcrumb class="fs-7">
          <a-breadcrumb-item>
            <router-link to="/">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>User Profile</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
    </a-page-header>

    <!-- End Page Header -->
    <a-card style="width: 100%" :bordered="false" size="default">
      <div class="d-flex flex-column flex-md-row gap-3 gap-md-0 justify-content-between mb-4">
        <a-flex gap="middle">
          <a-avatar shape="square" src="http://localhost:3030/public/images/profile.png" :size="84"/>
          <a-flex vertical justify="space-between">
            <a-typography-title :level="5" class="mb-0">Nayem</a-typography-title>
            <a-typography-paragraph v-model:content="hideTooltipStr" :editable="{ tooltip: false, maxlength: 50 }"/>
            <router-link to="/" class="gap-1 text-success text-decoration-none">
              <LockFilled/>
              Reset Password
            </router-link>
          </a-flex>
        </a-flex>
        <div class="d-flex flex-row flex-md-column gap-2 justify-content-between justify-content-md-start">
          <a-typography-text class="text-info-emphasis">
            <MailFilled class="me-2 text-success"/>
            nayem@uysys.com
          </a-typography-text>
          <a-typography-text class="text-info-emphasis">
            <PhoneFilled class="me-2 text-success"/>
            01966634890
          </a-typography-text>
        </div>
      </div>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Overview">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane key="2" tab="Activity Log" force-render>Content of Tab Pane 2</a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
