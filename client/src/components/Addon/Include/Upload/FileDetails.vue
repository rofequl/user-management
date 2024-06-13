<script setup>
import {CloudDownloadOutlined, DeleteFilled, FileImageTwoTone} from "@ant-design/icons-vue";
</script>
<template>
  <a-badge-ribbon text="PDF">
    <a-card hoverable style="width: 100%" :body-style="{padding: '3px 6px 8px', fontSize: '12px'}">
      <template #cover>
        <div class="d-flex justify-content-center p-3">
          <FileImageTwoTone style="font-size: 40px;" two-tone-color="#61a070e0"/>
        </div>
      </template>
      <template #actions>
        <cloud-download-outlined class="fs-6" key="setting"/>
        <delete-filled class="fs-6" key="edit"/>
      </template>
      <a-card-meta>
        <template #title>
          <p class="fw-normal mb-0" style="font-size: 14px">MyGov Stage QR Application Issue List.pdf</p>
        </template>
        <template #description class="fs-6">
          <div class="d-flex justify-content-between align-items-center">
            <span>Jun 6 at 10:58 am</span>
            <a-avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" :size="18"/>
          </div>
        </template>
      </a-card-meta>
      <div>

      </div>
    </a-card>
  </a-badge-ribbon>
</template>

<style scoped>

</style>
