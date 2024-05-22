<script setup>
import {CCol, CRow} from "@coreui/vue";
import {computed, onMounted, reactive, ref, watch} from "vue";
import store from "@/store";
import router from "@/router";
import {notification} from "ant-design-vue";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  },
  roleId: {
    type: Number,
    default: 0
  },
})

// Get List of all permission and role and updated it
const allPermissions = computed(() => store.getters.permissionList)
const roleDetails = computed(() => store.getters.roleDetails)
const roleList = computed(() => store.getters.roleList)
const cardLoading = ref(false);

onMounted(async () => {
  cardLoading.value = true
  !allPermissions.value.length > 0 ? await store.dispatch('PERMISSION_LIST') : permissionValueSet()
  props.isEdit ? await store.dispatch('ROLE_DETAILS', props.roleId) : ''
  if (!roleList.value.length > 0) await store.dispatch('ROLE_LIST')
  cardLoading.value = false
});
const updatedAllPermissions = ref([])
watch(allPermissions, () => permissionValueSet());
const permissionValueSet = () => {
  updatedAllPermissions.value = allPermissions.value.map(row => ({
    section: row.section,
    permission_list: row.permission_list.map(item => {
      return {id: item.id, name: item.name, value: false};
    })
  }))
}

//  <--- Variable ---> //
// Data value declaration::::
const formRef = ref()
const submitBtn = ref(false)
const formState = reactive({
  id: '',
  name: '',
  permission: []
});
const rules = {
  name: [
    {required: true, message: 'Please enter your role name'},
    {max: 100, message: 'Name maximum 100 character'}
  ],
}
watch(roleDetails, () => {
  formState.id = roleDetails.value.id
  formState.name = roleDetails.value.name
  formState.permission = roleDetails.value.permissionIds
  updatedAllPermissions.value.forEach(obj => {
    obj.permission_list.forEach(perm => {
      if (roleDetails.value.permissionIds.includes(perm.id)) perm.value = true;
    });
  });
});

const newPermissionUpdate = (data) => {
  let index = formState.permission.findIndex(value => value === data);
  index < 0 ? formState.permission.push(data) : formState.permission.splice(index, 1)
}
// Form submit method::::
const onSubmit = () => {
  submitBtn.value = true
  store.dispatch('ROLE_CREATE', formState)
    .then(() => {
      notification.success({
        message: 'Congratulations',
        description: 'New role create successfully',
      });
      router.push({name: 'User Permission'})
    })
    .catch(err => requestFailed(err))
    .finally(() => submitBtn.value = false)
}
// Form update method::::
const onUpdate = () => {
  submitBtn.value = true
  store.dispatch('ROLE_UPDATE', {id: formState.id, data: formState})
    .then(() => {
      notification.success({
        message: 'Congratulations',
        description: 'Role update successfully',
      });
      router.push({name: 'User Permission'})
    })
    .catch(err => requestFailed(err))
    .finally(() => submitBtn.value = false)
}
// Form submit error notify::::
const requestFailed = (err) => {
  notification.error({
    message: err.message,
    description: ((err.response || {}).data || {}).message || ((err.response || {}).data || {}).errors.name.msg,
  });
}
</script>
<template>
  <div>
    <!-- Start Page Header -->
    <a-page-header title="Add new role" class="p-0 mb-2">
      <template #breadcrumb>
        <a-breadcrumb class="fs-7">
          <a-breadcrumb-item>
            <router-link to="/">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link :to="{name: 'Staffs Permission'}">All Role List</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>Add new role</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
    </a-page-header>
    <!-- End Page Header -->
    <a-card :title="isEdit? 'Edit Role':'Create New Role'" :bordered="false" :loading="cardLoading">
      <a-form ref="formRef" :model="formState" autocomplete="off" @finish="isEdit? onUpdate(): onSubmit()"
              :rules="rules">
        <a-form-item label="Role Name" name="name" :labelCol="{span: 0}" :wrapperCol="{span: 6}">
          <a-input v-model:value="formState.name"/>
        </a-form-item>

        <a-divider>Permissions</a-divider>
        <a-card :title="allPermission.section" :headStyle="{backgroundColor: '#ececed',minHeight: '40px'}" size="small"
                v-for="allPermission in updatedAllPermissions" :key="allPermission.section">
          <a-flex gap="small" wrap="wrap">
            <a-card size="small" v-for="permission in allPermission.permission_list" :key="permission.id">
              <p>{{ permission.name }}</p>
              <a-switch size="small" v-model:checked="permission.value" @change="newPermissionUpdate(permission.id)"/>
            </a-card>
          </a-flex>
        </a-card>
        <a-row class="mt-4">
          <a-col :span="24" class="d-flex gap-2 justify-content-end">
            <router-link :to="{name: 'Staffs Permission'}">
              <a-button>Cancel</a-button>
            </router-link>
            <a-button type="primary" html-type="submit" :loading="submitBtn" :disabled="submitBtn" v-if="isEdit">
              Update
            </a-button>
            <a-button type="primary" html-type="submit" :loading="submitBtn" :disabled="submitBtn" v-else>Submit
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>
