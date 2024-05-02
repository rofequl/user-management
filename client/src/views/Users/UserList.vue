<!--suppress JSCheckFunctionSignatures -->
<script setup>
import {CCol, CRow} from "@coreui/vue";
import apiService from "@/core/services/api.service";
import {usePagination} from "vue-request";
import {computed} from "vue";
import UserAddEdit from "@/components/User/UserAddEdit.vue";

const getUserList = params => apiService.get('user', {params})
const {data, run, current, total, loading, pageSize} = usePagination(getUserList, {
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'limit',
    totalKey: 'data.total',
  },
});

const dataSource = computed(() => data.value?.data.data || []);
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
}));

const columns = [
  {
    title: 'User Info',
    dataIndex: 'user_info',
    key: 'user_info',
  },
  {
    title: 'Phone',
    dataIndex: 'mobile',
    key: 'phone',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'roleId',
    key: 'email',
  },
  {
    title: 'Joining Date',
    dataIndex: 'createdAt',
    key: 'email',
  },
  {
    title: 'Action',
    key: 'action',
  }
]

const handleTableChange = (pag) => {
  run({
    limit: pag.pageSize,
    page: pag?.current,
  });
};

const updateTable = () => {
  run()
}
</script>
<template>
  <div>
    <!-- Page Header -->
    <CRow class="mb-4">
      <CCol sm="6" xs="6">
        <span class="text-uppercase page-subtitle fs-6">Manage User</span>
        <a-breadcrumb>
          <a-breadcrumb-item>
            <router-link to="/">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>All User List</a-breadcrumb-item>
        </a-breadcrumb>
      </CCol>
      <CCol sm="6" xs="6" class="d-flex justify-content-end align-items-center">
        <a-button type="primary" @click="$refs.childRef.modal()">New User Add</a-button>
      </CCol>
    </CRow>
    <!-- End Page Header -->
    <!-- Datatable -->
    <a-card :bordered="false" :bodyStyle="{padding: 0}">
      <a-table :dataSource="dataSource" :columns="columns" :loading="loading" :pagination="pagination"
               @change="handleTableChange">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'user_info'">
            <a-flex gap="middle" horizontal>
              <a-avatar shape="square"
                        src="https://demos.creative-tim.com/muse-vue-ant-design-dashboard/images/face-1.jpg"
                        :size="54"/>
              <div>
                <a-typography-title :level="5" class="mb-0">Admin</a-typography-title>
                <a href="mailto:admin@email.com" class="text-decoration-none text-info-emphasis">admin@email.com</a>
              </div>
            </a-flex>
          </template>
        </template>
      </a-table>
    </a-card>
    <!-- End Datatable -->
    <UserAddEdit ref="childRef" @update="updateTable"/>
  </div>
</template>
