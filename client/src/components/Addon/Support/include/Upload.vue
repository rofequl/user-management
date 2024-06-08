<script setup>
import {ref} from "vue";
import {message} from 'ant-design-vue';

//  <--- Variable ---> //
// Data value declaration::::
const fileList = ref([]);

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
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      @change="handleChange"
      @drop="handleDrop"
    >
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
    </a-upload-dragger>
  </div>
</template>
