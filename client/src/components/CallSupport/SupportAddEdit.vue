<script setup>
import store from "@/store";
import {computed, onMounted, reactive, ref} from "vue";
import dayjs from 'dayjs';

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
  supportDateTime: dayjs(),
  name: ''
});
// Form input validation rule
const rules = {
  name: [
    {required: true, message: 'Please enter support category'},
    {max: 100, message: 'Name maximum 100 character'}
  ]
}
</script>
<template>
  <a-modal v-model:open="visible" :title="createdModal? 'Call Support Entry':'Call support update'"
           :confirm-loading="confirmLoading" @ok="createdModal? onSubmit():onUpdate()" class="check"
           :ok-text="createdModal? 'Create':'Update'" cancel-text="Cancel">
    <a-form ref="formRef" :model="formState" :rules="rules" class="my-4" @finish="createdModal? onSubmit():onUpdate()">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-date-picker show-time v-model:value="formState.supportDateTime" placeholder="Call Date & Time"/>
        </a-col>
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-form-item name="email">
            <a-input v-model:value="formState.email" placeholder="Customer Number"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-form-item name="roleId">
            <a-select ref="select" class="w-100" placeholder="Select Support Category" v-model:value="formState.roleId">
              <a-select-option v-for="item in categoryList" :value="item.id" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-form-item name="roleId">
            <a-select ref="select" class="w-100" placeholder="Select Support Status" v-model:value="formState.roleId">
              <a-select-option value="Resolved">Resolved</a-select-option>
              <a-select-option value="In Progress">In Progress</a-select-option>
              <a-select-option value="On Hold">On Hold</a-select-option>
              <a-select-option value="Pending">Pending</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item name="email">
        <a-textarea placeholder="Customer Problem" auto-size/>
      </a-form-item>
      <a-form-item name="email">
        <a-textarea placeholder="Given solution by call center" :auto-size="{ minRows: 2, maxRows: 5 }"/>
      </a-form-item>
      <a-form-item name="email">
        <a-textarea placeholder="Note" auto-size/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
