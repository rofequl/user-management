<script setup>
import {ref} from "vue";
import {api_base_url} from "@/core/config/app";
import apiService from "@/core/services/api.service";

//  <--- Variable ---> //
// Data value declaration::::
const props = defineProps({
  uploadUrl: {
    type: String
  }
})
const fileList = ref([

]);
const uploadURL = ref(api_base_url + props.uploadUrl)

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
    onSuccess(response.data);
  }).catch(error => {
    onError(error);
  });
};
</script>
<template>
  <div>
    <a-upload-dragger name="file" :multiple="true" :customRequest="handleCustomRequest">
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
    </a-upload-dragger>
  </div>
</template>
