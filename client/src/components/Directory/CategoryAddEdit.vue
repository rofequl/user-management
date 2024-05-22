<script setup>
import {reactive, ref} from "vue";
import store from "@/store";
import {notification} from "ant-design-vue";

//  <--- Variable ---> //
// Data value declaration::::
const formRef = ref();
const visible = ref(false);
const createdModal = ref(true);
const confirmLoading = ref(false);
const formState = reactive({
  id: '',
  name: ''
});
// Form input validation rule
const rules = {
  name: [
    {required: true, message: 'Please enter support category'},
    {max: 100, message: 'Name maximum 100 character'}
  ]
}

// Model form save button action
const onSubmit = () => {
  confirmLoading.value = true;
  formRef.value.validateFields().then(values => {
    store.dispatch('SUPPORT_CATEGORY_CREATE', values).then(() => {
      notification.success({
        message: 'Congratulations',
        description: 'New support category created successfully',
      });
    }).catch(err => requestFailed(err))
    visible.value = false;
    formRef.value.resetFields();
  }).finally(() => {
    confirmLoading.value = false;
  }).catch(() => {
  })
};

// Model form update button action
const onUpdate = () => {
  confirmLoading.value = true;
  formRef.value.validateFields().then(values => {
    store.dispatch('SUPPORT_CATEGORY_UPDATE', {id: formState.id, data: values}).then(() => {
      notification.success({
        message: 'Congratulations',
        description: 'Support category updated successfully',
      });
    }).catch(err => requestFailed(err))
    visible.value = false;
    formRef.value.resetFields();
  }).finally(() => {
    confirmLoading.value = false;
  })
};

// Form submit error notify::::
const requestFailed = (err) => {
  notification.error({
    message: err.message,
    description: ((err.response || {}).data || {}).message || ((err.response || {}).data || {}).errors.email.msg,
  });
}

// Parent component model pen action
const showModal = (e) => {
  if (!e) {
    createdModal.value = true
    formState.id = ''
    formState.name = ''
    formRef.value ? formRef.value.resetFields() : '';
  } else {
    createdModal.value = false
    formState.id = e.id
    formState.name = e.name
  }
  visible.value = true
};
defineExpose({
  showModal
})
</script>
<template>
  <a-modal v-model:open="visible" :title="createdModal? 'Call support category created':'Call support category update'"
           :confirm-loading="confirmLoading" @ok="createdModal? onSubmit():onUpdate()" class="check"
           :ok-text="createdModal? 'Create':'Update'" cancel-text="Cancel">
    <a-form ref="formRef" :model="formState" :rules="rules" class="my-4" :hideRequiredMark="true"
            @finish="createdModal? onSubmit():onUpdate()">
      <a-form-item name="name" label="Category Name">
        <a-input v-model:value="formState.name" placeholder="Name" class="w-100" required/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<style>
.ant-modal-mask, .ant-modal-wrap {
  z-index: 1050 !important;
}
</style>
