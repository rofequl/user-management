<script setup>
import {CContainer, CCol, CRow} from "@coreui/vue";
import logo from '@/assets/brand/logo.svg'
import {ref} from "vue";

const loginBtn = ref(false)
const formState = ref({
  email: '',
  password: '',
});
const onFinish = (values) => {
  loginBtn.value = true
  console.log('Success:', values);
};
</script>
<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="4">
          <a-card>
            <img :src="logo" alt="Center image" height="80px" class="d-block mx-auto mb-2">
            <a-form :model="formState" autocomplete="off" @finish="onFinish">
              <a-form-item name="email" :rules="[{ required: true, message: 'Please enter your email address' },
              {type: 'email',message: 'The input is not valid E-mail!'}]">
                <a-input v-model:value="formState.email" placeholder="Email"/>
              </a-form-item>
              <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-password v-model:value="formState.password" placeholder="Password"/>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit" :loading="loginBtn" :disabled="loginBtn">
                  Submit
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
