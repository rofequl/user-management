<script setup>
import {computed, ref} from "vue";
import {message} from 'ant-design-vue';
import {api_base_url} from "@/core/config/app";

//  <--- Variable ---> //
// Data value declaration::::
const props = defineProps({
  uploadUrl: {
    type: String
  }
})
const fileList = ref([]);
const uploadURL = computed(() => api_base_url + props.uploadUrl)


const handleChange = info => {
  const status = info.file.status;
  console.log(status);
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};

function handleDrop(e) {
  console.log(e);
}
</script>
<template>
  <div>
    <a-upload-dragger
      v-model:fileList="fileList"
      name="file"
      :multiple="true"
      :action="uploadURL"
      @change="handleChange"
      @drop="handleDrop"
    >
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
    </a-upload-dragger>
  </div>
</template>
