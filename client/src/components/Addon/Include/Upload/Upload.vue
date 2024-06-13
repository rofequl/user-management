<script setup>

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
