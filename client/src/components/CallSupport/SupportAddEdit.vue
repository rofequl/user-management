<script setup>
//  <--- Variable ---> //
// Data value declaration::::
import {reactive, ref} from "vue";
import dayjs from 'dayjs';

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
          <a-form-item name="email">
            <a-input v-model:value="formState.email" placeholder="Customer Number"/>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :md="12">
          <a-form-item name="email">
            <a-input v-model:value="formState.email" placeholder="Customer Number"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item name="email">
        <a-textarea placeholder="Autosize height based on content lines" auto-size/>
      </a-form-item>
      <a-form-item name="email">
        <a-textarea
          placeholder="Autosize height with minimum and maximum number of lines"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item name="email">
        <a-textarea placeholder="Autosize height based on content lines" auto-size/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
