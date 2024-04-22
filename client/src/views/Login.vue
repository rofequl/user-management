<script setup>
import {CContainer, CCol, CRow} from "@coreui/vue";
import logo from '@/assets/brand/logo.svg'
import {reactive, ref} from "vue";
import store from "@/store";
import router from "@/router";

//  <--- Variable ---> //
// Data value declaration::::
const formRef = ref()
const loginBtn = ref(false)
const isLoginError = ref(false)
const formState = reactive({
  email: '',
  password: '',
});
const rules = {
  email: [
    {required: true, message: 'Please enter your email address'},
    {type: 'email', message: 'The input is not valid E-mail!'},
    {max: 100, message: 'Email maximum 100 character'}
  ],
  password: [
    {required: true, message: 'Please input your password!'},
    {min: 6, message: 'Password minimum 6 character'},
    {max: 20, message: 'Password maximum 20 character'}
  ]
}
//  <--- Method ---> //
// Form submit method::::
const onSubmit = (values) => {
  loginBtn.value = true
  store.dispatch('LOGIN', {email: values.email, password: values.password})
    .then(() => router.push({name: 'Dashboard'}))
    .catch(err => requestFailed(err))
    .finally(() => loginBtn.value = false)
};

// Form submit error notify::::
const requestFailed = () => {
  isLoginError.value = true
}

// Error alert close action::::
const closeErrorMessage = () => {
  isLoginError.value = false
}
</script>
<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="4">
          <a-card>
            <img :src="logo" alt="Center image" height="80px" class="d-block mx-auto mb-2">
            <a-form ref="formRef" :model="formState" autocomplete="off" @finish="onSubmit" :rules="rules">
              <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
                       message="Invalid credentials" closable :after-close="closeErrorMessage"/>
              <a-form-item name="email">
                <a-input v-model:value="formState.email" placeholder="Email"/>
              </a-form-item>
              <a-form-item name="password">
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
