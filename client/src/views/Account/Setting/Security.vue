<script setup>
import {reactive, ref} from "vue";

const formRef = ref();
const formState = reactive({
  pass: '',
  checkPass: '',
  age: undefined,
});

const validatePass = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Please input the password');
  } else {
    if (formState.checkPass !== '') {
      formRef.value.validateFields('checkPass');
    }
    return Promise.resolve();
  }
};
const validatePass2 = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Please input the password again');
  } else if (value !== formState.pass) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
};
const rules = {
  pass: [
    {
      validator: validatePass,
      trigger: 'change',
    },
  ],
  checkPass: [
    {
      validator: validatePass2,
      trigger: 'change',
    },
  ],
};
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};
const handleFinish = values => {
  console.log(values, formState);
};
const resetForm = () => {
  formRef.value.resetFields();
};
</script>
<template>
  <div>
    <a-typography>
      <a-typography-title :level="4" class="mb-0">Security Setting</a-typography-title>
      <a-typography-paragraph class="mb-0">
        It's a good idea to use a strong password that you're not using elsewhere
      </a-typography-paragraph>
    </a-typography>
    <a-divider class="mt-2 mb-3" style="height: 1px;background-color: #e8e8e8"/>
    <a-row :gutter="[16, 16]">
      <!--begin::Profile details edit-->
      <a-col :xs="{span: 24, order: 2}" :md="{span: 16, order: 1}">
        <a-card title="Change password" size="small">
          <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout"
                  @finish="handleFinish">
            <a-form-item has-feedback label="Current Password" name="pass">
              <a-input v-model:value="formState.pass" type="password" autocomplete="off"/>
            </a-form-item>
            <a-form-item has-feedback label="New Password" name="pass">
              <a-input v-model:value="formState.pass" type="password" autocomplete="off"/>
            </a-form-item>
            <a-form-item has-feedback label="Confirm Password" name="checkPass">
              <a-input v-model:value="formState.checkPass" type="password" autocomplete="off"/>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
              <a-button type="primary" html-type="submit">Submit</a-button>
              <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
      <!--end::Profile details edit-->
    </a-row>
  </div>
</template>
<style scoped>

</style>
