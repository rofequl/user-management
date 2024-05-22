<script setup>
import {computed, onMounted, reactive, ref} from 'vue';
import store from "@/store";
import {notification} from "ant-design-vue";

// Get role list for user creation role set
const roleList = computed(() => store.getters.roleList)
onMounted(async () => {
  if (!roleList.value.length > 0) await store.dispatch('ROLE_LIST')
});

//  <--- Variable ---> //
// Data value declaration::::
const formRef = ref();
const visible = ref(false);
const modalAdd = ref(true);
const formState = reactive({
  id: '',
  name: '',
  email: '',
  gender: undefined,
  roleId: undefined,
  password: '',
  confirm_password: '',
});
const emit = defineEmits(['update']);

// Password confirmation custom validation
const validatePass = () => {
  if (formState.confirm_password !== '') formRef.value.validateFields('confirm_password');
  return Promise.resolve();
}
const validatePass2 = (_rule, value) => value !== formState.password ? Promise.reject("Two inputs don't match!") : Promise.resolve();
// Form input validation rule
const rules = {
  name: [
    {required: true, message: 'Please enter user name'},
    {max: 100, message: 'Name maximum 100 character'}
  ],
  email: [
    {required: true, message: 'Please enter user email'},
    {max: 100, message: 'Name maximum 100 character'},
    {type: 'email', message: 'The input is not valid E-mail!'}
  ],
  gender: [
    {required: true, message: 'Please select user gender'},
  ],
  roleId: [
    {required: true, message: 'Please select user role'},
  ],
  password: [
    {required: true, message: 'Please input user password!'},
    {min: 6, message: 'Password minimum 6 character'},
    {max: 20, message: 'Password maximum 20 character'},
    {validator: validatePass}
  ],
  confirm_password: [
    {required: true, message: 'Please input user confirm password!'},
    {min: 6, message: 'Password minimum 6 character'},
    {max: 20, message: 'Password maximum 20 character'},
    {validator: validatePass2}
  ],
}
// Model form save button action
const onSubmit = () => {
  formRef.value
    .validateFields()
    .then(values => {
      store.dispatch('USER_CREATE', values)
        .then(() => {
          emit('update')
          notification.success({
            message: 'Congratulations',
            description: 'New user created successfully',
          });
        })
        .catch(err => requestFailed(err))
      visible.value = false;
      formRef.value.resetFields();
    })
};

// Model form update button action
const onUpdate = () => {
  formRef.value
    .validateFields()
    .then(values => {
      store.dispatch('USER_UPDATE', {id: formState.id, data: values})
        .then(() => {
          emit('update')
          notification.success({
            message: 'Congratulations',
            description: 'User updated successfully',
          });
        })
        .catch(err => requestFailed(err))
      visible.value = false;
      formRef.value.resetFields();
    })
};
// Form submit error notify::::
const requestFailed = (err) => {
  notification.error({
    message: err.message,
    description: ((err.response || {}).data || {}).message || ((err.response || {}).data || {}).errors.email.msg,
  });
}

const modal = (e) => {
  if (!e) {
    modalAdd.value = true
    formState.id = ''
    formState.name = ''
    formState.email = ''
    formState.gender = undefined
    formState.roleId = undefined
  } else {
    modalAdd.value = false
    formState.id = e.id
    formState.name = e.name
    formState.email = e.email
    formState.gender = e.gender
    formState.roleId = e.roleId
  }
  visible.value = true
}

defineExpose({
  modal
})
</script>
<template>
  <div>
    <a-modal v-model:open="visible" :title="modalAdd? 'Create a new staff':'Edit this staff'"
             :ok-text="modalAdd? 'Create':'Update'"
             cancel-text="Cancel" autocomplete="off" @ok="modalAdd? onSubmit(): onUpdate()">
      <a-form ref="formRef" :model="formState" autocomplete="off" :rules="rules">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col class="gutter-row" :xs="24" :md="12">
            <a-form-item name="name">
              <a-input v-model:value="formState.name" placeholder="Name" class="w-100"/>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :xs="24" :md="12">
            <a-form-item name="email">
              <a-input v-model:value="formState.email" placeholder="Email"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col class="gutter-row" :xs="24" :md="12">
            <a-form-item name="gender">
              <a-select ref="select" class="w-100" placeholder="Select Gender" v-model:value="formState.gender">
                <a-select-option value="Male">Male</a-select-option>
                <a-select-option value="Female">Female</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :xs="24" :md="12">
            <a-form-item name="roleId">
              <a-select ref="select" class="w-100" placeholder="Select Role" v-model:value="formState.roleId">
                <a-select-option v-for="item in roleList" :value="item.id" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col class="gutter-row" :xs="24" :md="12">
            <a-form-item name="password">
              <a-input v-model:value="formState.password" placeholder="Password" class="w-100"/>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :xs="24" :md="12">
            <a-form-item name="confirm_password">
              <a-input v-model:value="formState.confirm_password" placeholder="Confirm Password"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>
