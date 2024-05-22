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
const visible = ref(false);
const createdModal = ref(true);
const confirmLoading = ref(false);
const formState = reactive({
  id: '',
  callingTime: dayjs(),
  customerNumber: '',
  categoryId: undefined,
  status: undefined,
  problem: '',
  solution: '',
  note: '',
});
// Form input validation rule
const rules = {
  callingTime: [
    {required: true, message: 'Please select support call time'}
  ],
  customerNumber: [
    {required: true, message: 'Please enter customer number'},
    {max: 14, message: 'Customer number maximum 14 character'},
    {min: 11, message: 'Customer number minimum 11 character'},
    {type: 'number', message: 'The input is not valid number', transform: (value) => Number(value.trim())}
  ],
  categoryId: [
    {required: true, message: 'Please select support category type'}
  ],
  status: [
    {required: true, message: 'Please select support status'}
  ],
  problem: [
    {required: true, message: 'Please enter customer problem'},
    {max: 1000, message: 'Customer problem maximum 1,000 character'}
  ],
  solution: [
    {max: 1000, message: 'Customer solution maximum 1,000 character'}
  ],
  note: [
    {max: 1000, message: 'Note maximum 1,000 character'}
  ]
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
    formState.callingTime = dayjs()
    formState.customerNumber = ''
    formState.categoryId = undefined
    formState.status = undefined
    formState.problem = ''
    formState.solution = ''
    formState.note = ''
  } else {
    createdModal.value = false
    formState.id = e.id
    formState.callingTime = dayjs(e.callingTime)
    formState.customerNumber = e.customerNumber
    formState.categoryId = e.categoryId
    formState.status = e.status
    formState.problem = e.problem
    formState.solution = e.solution
    formState.note = e.note
  }
  visible.value = true
}

defineExpose({
  modal
})
</script>
<template>
  <a-modal v-model:open="visible" :title="createdModal? 'Call Support Entry':'Call support update'"
           :confirm-loading="confirmLoading" @ok="createdModal? onSubmit():onUpdate()" class="check"
           :ok-text="createdModal? 'Create':'Update'" cancel-text="Cancel" width="600px">
    <a-form ref="formRef" :model="formState" :rules="rules" class="my-4" @finish="createdModal? onSubmit():onUpdate()">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-form-item name="callingTime">
            <a-date-picker show-time v-model:value="formState.callingTime" placeholder="Call Date & Time"
                           style="width: 100%"/>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-form-item name="customerNumber">
            <a-input v-model:value="formState.customerNumber" placeholder="Customer Number"/>
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
              <a-select-option value="In Progress">In Progress</a-select-option>
              <a-select-option value="On Hold">On Hold</a-select-option>
              <a-select-option value="Pending">Pending</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item name="problem">
        <a-textarea placeholder="Customer Problem" auto-size v-model:value="formState.problem"/>
      </a-form-item>
      <a-form-item name="solution">
        <a-textarea placeholder="Given solution by call center" :auto-size="{ minRows: 2, maxRows: 5 }"
                    v-model:value="formState.solution"/>
      </a-form-item>
      <a-form-item name="note">
        <a-textarea placeholder="Note" auto-size v-model:value="formState.note"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<style>
.ant-modal-mask, .ant-modal-wrap {
  z-index: 1050 !important;
}
</style>
