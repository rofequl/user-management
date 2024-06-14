<script setup>
import {CloudDownloadOutlined, DeleteFilled, FileImageTwoTone} from "@ant-design/icons-vue";
import {format} from "date-fns";

//  <--- Variable ---> //
// Data value declaration::::
const props = defineProps({
  file: {
    type: Object
  }
})

const formattedString = (e) => {
  if (e.length <= 19) return e;
  return e.slice(0, 12) + "...." + e.slice(-7);
}
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
        <a :href="file.path" target="_blank">
          <cloud-download-outlined class="fs-6" key="setting"/>
        </a>
        <delete-filled class="fs-6" key="edit"/>
      </template>
      <a-card-meta>
        <template #title>
          <p class="fw-normal mb-0" style="font-size: 14px">
            <a-tooltip :title="file.FileName">{{ formattedString(file.FileName) }}</a-tooltip>
          </p>
        </template>
        <template #description class="fs-6">
          <div class="d-flex justify-content-between align-items-center">
            <span>{{ format(file.createdAt, "MMM dd 'at' h:mm a") }}</span>
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
