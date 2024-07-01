<script setup>
import {ref} from "vue";
import {api_base_url} from "@/core/config/app";
import apiService from "@/core/services/api.service";
import FileDetails from "@/components/Addon/Include/Upload/FileDetails.vue";

//  <--- Variable ---> //
// Data value declaration::::
const props = defineProps({
  uploadUrl: {
    type: String
  },
  attachmentList: {
    type: Object
  }
})

const uploadURL = ref(api_base_url + props.uploadUrl)
const emit = defineEmits(['upload']);


//Handles the custom request for file upload.
const handleCustomRequest = ({file, onSuccess, onError, onProgress}) => {
  const formData = new FormData();
  formData.append('file', file);

  apiService.post(uploadURL.value, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: event => {
      onProgress({percent: Math.round((event.loaded / event.total) * 100)});
    }
  }).then(response => {
    emit('upload', response.data)
    onSuccess(response.data);
  }).catch(error => {
    console.log(error);
    onError(error);
  });
};
</script>
<template>
  <div>
    <a-upload-dragger name="file" :multiple="true" :customRequest="handleCustomRequest" :showUploadList="false">
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
    </a-upload-dragger>
    <a-list :grid="{ gutter: 0, xs: 1, sm: 3, md: 4, lg: 3, xl: 4, xxl: 5 }" :data-source="attachmentList" class="my-3">
      <template #renderItem="{ item }">
        <a-list-item class="ps-0">
          <FileDetails :file="item"/>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
