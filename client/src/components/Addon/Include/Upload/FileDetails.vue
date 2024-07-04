<script setup>
import {
  CloudDownloadOutlined,
  DeleteFilled,
  FileImageTwoTone,
  FilePdfTwoTone,
  FileExcelTwoTone,
  FileTextTwoTone,
  FileZipTwoTone
} from "@ant-design/icons-vue";
import {format} from "date-fns";
import {message} from 'ant-design-vue';
import apiService from "@/core/services/api.service";

//  <--- Variable ---> //
// Data value declaration::::
const props = defineProps({
  file: {
    type: Object
  },
  deleteUrl: {
    type: String
  }
})
const emit = defineEmits(['remove']);

const fileType = props.file.FileType;

const badgeColor = (e) => {
  if (e === 'JPG' || fileType === 'MP4') return 'pink';
  if (e === 'PDF') return 'orange';
  if (e === 'XLSX') return 'green';
  if (e === 'TXT') return 'Red';
  if (e === 'ZIP') return 'volcano';
}

const formattedString = (e) => {
  if (e.length <= 19) return e;
  return e.slice(0, 11) + "...." + e.slice(-7);
}

const confirm = () => {
  apiService.delete(props.deleteUrl.replace(/\/\d+$/, `/${props.file.id}`)).then(() => {
    emit('remove', props.file.id);
    message.success('Attachment has been deleted successfully!');
  }).catch(error => {
    message.error('Something went wrong!');
    console.log(error)
  });
};
</script>
<template>
  <a-badge-ribbon :text="fileType" :color="badgeColor(fileType)">
    <a-card hoverable style="width: 100%" :body-style="{padding: '3px 6px 8px', fontSize: '12px'}" class="custom-card">
      <template #cover>
        <div class="d-flex justify-content-center p-3">
          <FileImageTwoTone style="font-size: 30px;" two-tone-color="#FD5CA8"
                            v-if="fileType === 'JPG' || fileType === 'MP4'"/>
          <FilePdfTwoTone style="font-size: 30px;" two-tone-color="#FD5CA8" v-if="fileType === 'PDF'"/>
          <FileExcelTwoTone style="font-size: 30px;" two-tone-color="#FD5CA8" v-if="fileType === 'XLSX'"/>
          <FileTextTwoTone style="font-size: 30px;" two-tone-color="#FD5CA8" v-if="fileType === 'TXT'"/>
          <FileZipTwoTone style="font-size: 30px;" two-tone-color="#FD5CA8" v-if="fileType === 'ZIP'"/>
        </div>
      </template>
      <template #actions style="margin: 0;">
        <a :href="file.path" target="_blank">
          <cloud-download-outlined class="fs-6" key="setting"/>
        </a>
        <a-popconfirm title="Are you sure delete this file?"
                      ok-text="Yes" cancel-text="No" @confirm="confirm">
          <delete-filled class="fs-6" key="edit"/>
        </a-popconfirm>
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
            <a-tooltip :title="file.User.name">
              <a-avatar :src="file.User.profilePicture" :size="18"/>
            </a-tooltip>
          </div>
        </template>
      </a-card-meta>
      <div>

      </div>
    </a-card>
  </a-badge-ribbon>
</template>

<style>
.custom-card .ant-card-actions li {
  margin: 4px 0;
}
</style>
