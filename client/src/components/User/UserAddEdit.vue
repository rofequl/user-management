<script setup>
import {reactive, ref, toRaw} from 'vue';

//  <--- Variable ---> //
// Data value declaration::::
const formRef = ref();
const visible = ref(true);
const formState = reactive({
  title: '',
  description: '',
  modifier: 'public',
});
const rules = {
  name: [
    {required: true, message: 'Please enter your role name'},
    {max: 100, message: 'Name maximum 100 character'}
  ],
}
const onSubmit = () => {
  formRef.value
    .validateFields()
    .then(values => {
      console.log('Received values of form: ', values);
      console.log('formState: ', toRaw(formState));
      visible.value = false;
      formRef.value.resetFields();
      console.log('reset formState: ', toRaw(formState));
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
};
</script>
<template>
  <div>
    <a-modal v-model:open="visible" title="Create a new user" ok-text="Create"
             cancel-text="Cancel" autocomplete="off" @ok="onSubmit">
      <a-form ref="formRef" :model="formState" name="user_create_edit">
        <a-flex gap="middle" align="start" vertical>
          <a-form-item name="title" class="w-50">
            <a-input v-model:value="formState.title" class="w-100"/>
          </a-form-item>

          <a-form-item name="title" class="w-50">
            <a-input v-model:value="formState.title"/>
          </a-form-item>
        </a-flex>
      </a-form>
    </a-modal>
  </div>
</template>
