<script setup>
import store from "@/store";
import {computed, onMounted, reactive, ref} from "vue";
import dayjs from 'dayjs';
import {notification} from "ant-design-vue";

// Get support category list for support entry
const categoryList = computed(() => store.getters.supportCategoryList)
onMounted(async () => {
  if (!categoryList.value.length > 0) await store.dispatch('SUPPORT_CATEGORY_LIST')
});

//  <--- Variable ---> //
// Data value declaration::::
const formRef = ref();
const visible = ref(true);
const createdModal = ref(true);
const confirmLoading = ref(false);
const formState = reactive({
  id: '',
  supportTime: dayjs(),
  type: undefined,
  categoryId: undefined,
  status: undefined,
  medium: undefined,
  office: '',
  description: '',
  requestedBy: '',
});
// Form input validation rule
const rules = {
  supportTime: [
    {required: true, message: 'Please select support time'}
  ],
  categoryId: [
    {required: true, message: 'Please select support category type'}
  ],
  status: [
    {required: true, message: 'Please select support status'}
  ],
  type: [
    {required: true, message: 'Please select support type'}
  ],
  medium: [
    {required: true, message: 'Please select support medium'}
  ],
  office: [
    {required: true, message: 'Please enter ministry/office'},
    {max: 100, message: 'Ministry/Office maximum 100 character'}
  ],
  description: [
    {required: true, message: 'Please enter customer problem'},
    {max: 1000, message: 'Description maximum 1,000 character'}
  ],
  requestedBy: [
    {required: true, message: 'Please enter customer details'},
    {max: 1000, message: 'Customer details maximum 1,000 character'}
  ],
}
const emit = defineEmits(['update']);
// Model form save button action
const onSubmit = () => {
  confirmLoading.value = true;
  formRef.value.validateFields().then(values => {
    store.dispatch('CALL_SUPPORT_ENTRY', values)
      .then(() => {
        emit('update')
        notification.success({
          message: 'Congratulations',
          description: 'New call support entry successfully',
        });
      })
      .catch(err => requestFailed(err))
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
    store.dispatch('CALL_SUPPORT_UPDATE', {id: formState.id, data: values})
      .then(() => {
        emit('update')
        notification.success({
          message: 'Congratulations',
          description: 'New call support updated successfully',
        });
      })
      .catch(err => requestFailed(err))
    visible.value = false;
    formRef.value.resetFields();
  }).finally(() => {
    confirmLoading.value = false;
  })
};

// Form submit error notify::::
const requestFailed = (err) => {
  console.log(err)
  notification.error({
    message: err.message,
    description: ((err.response || {}).data || {}).message || ((err.response || {}).data || {}).errors.email.msg,
  });
}

// Parent component model pen action
const modal = (e) => {
  if (!e) {
    createdModal.value = true
    formState.id = ''
    formState.supportTime = dayjs()
    formState.type = undefined
    formState.categoryId = undefined
    formState.status = undefined
    formState.medium = undefined
    formState.office = ''
    formState.description = ''
    formState.requestedBy = ''
  } else {
    createdModal.value = false
    formState.id = e.id
    formState.supportTime = dayjs(e.supportTime)
    formState.type = e.type
    formState.categoryId = e.categoryId
    formState.status = e.status
    formState.medium = e.medium
    formState.office = e.office
    
    formState.description = e.description
    formState.requestedBy = e.requestedBy
  }
  visible.value = true
}

defineExpose({
  modal
})
</script>
<template>
  <a-modal v-model:open="visible" :title="createdModal? 'Support Entry':'support update'"
           :confirm-loading="confirmLoading" @ok="createdModal? onSubmit():onUpdate()" class="check"
           :ok-text="createdModal? 'Create':'Update'" cancel-text="Cancel" width="600px">
    <a-form ref="formRef" :model="formState" :rules="rules" class="my-4" @finish="createdModal? onSubmit():onUpdate()">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-form-item name="supportTime">
            <a-date-picker show-time v-model:value="formState.supportTime" placeholder="Call Date & Time"
                           style="width: 100%"/>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-form-item name="type">
            <a-select ref="select" class="w-100" placeholder="Select Support Type" v-model:value="formState.type">
              <a-select-option value="Support">Support</a-select-option>
              <a-select-option value="Training">Training</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-form-item name="categoryId">
            <a-select ref="select" class="w-100" placeholder="Select Support Category"
                      v-model:value="formState.categoryId">
              <a-select-option v-for="item in categoryList" :value="item.id" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-form-item name="status">
            <a-select ref="select" class="w-100" placeholder="Select Support Status" v-model:value="formState.status">
              <a-select-option value="Resolved">Resolved</a-select-option>
              <a-select-option value="Pending">Pending</a-select-option>
              <a-select-option value="Forward to dev">Forward to dev</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-form-item name="medium">
            <a-select ref="select" class="w-100" placeholder="Select Support Medium" v-model:value="formState.medium">
              <a-select-option value="Physical">Physical</a-select-option>
              <a-select-option value="Virtual">Virtual</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-form-item name="office">
            <a-input v-model:value="formState.office" placeholder="Ministry/Office"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item name="description">
        <a-textarea placeholder="Given Descriptions..." :auto-size="{ minRows: 2, maxRows: 5 }"
                    v-model:value="formState.description"/>
      </a-form-item>
      <a-form-item name="requestedBy">
        <a-textarea placeholder="Requested by" :auto-size="{ minRows: 2, maxRows: 5 }"
                    v-model:value="formState.requestedBy"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<style>
.ant-modal-mask, .ant-modal-wrap {
  z-index: 1050 !important;
}
</style>
