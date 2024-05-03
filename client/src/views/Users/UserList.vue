<!--suppress JSCheckFunctionSignatures -->
<script setup>
import {CCol, CRow} from "@coreui/vue";
import apiService from "@/core/services/api.service";
import {usePagination} from "vue-request";
import {computed, h} from "vue";
import UserAddEdit from "@/components/User/UserAddEdit.vue";
import {format} from 'date-fns';
import {EditOutlined, EyeOutlined} from "@ant-design/icons-vue";

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
    align: 'center',
    key: 'phone',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'email',
    align: 'center',
    filters: [
      {
        text: 'Male',
        value: 'Male',
      },
      {
        text: 'Female',
        value: 'Female',
      },
    ],
  },
  {
    title: 'Role',
    dataIndex: 'roleId',
    key: 'email',
    align: 'center',
  },
  {
    title: 'Joining Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    align: 'center',
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
      <div class="table-responsive">
        <a-table :dataSource="dataSource" :columns="columns" :loading="loading" :pagination="pagination"
                 @change="handleTableChange" size="small">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'user_info'">
              <a-flex gap="middle" horizontal>
                <a-avatar shape="square" :src="record.profilePicture" :size="54"/>
                <div>
                  <a-typography-title :level="5" class="mb-0">{{ record.name }}</a-typography-title>
                  <a :href="`mailto:${record.email}`"
                     class="text-decoration-none text-info-emphasis">{{ record.email }}</a>
                </div>
              </a-flex>
            </template>
            <template v-if="column.dataIndex === 'createdAt'">
              {{ format(record.createdAt, 'dd MMM, yyyy') }}
            </template>
            <template v-if="column.dataIndex === 'roleId'">
              {{ record.Role.name }}
            </template>
            <template v-if="column.dataIndex === 'action'">
              <a-button-group>
                <a-tooltip placement="topLeft" title="Edit User" @click="$refs.childRef.modal(record)">
                  <a-button :icon="h(EditOutlined)"/>
                </a-tooltip>
                <a-tooltip placement="bottomLeft" title="User Details">
                  <a-button :icon="h(EyeOutlined)"/>
                </a-tooltip>
              </a-button-group>
            </template>
          </template>
        </a-table>
      </div>
    </a-card>
    <!-- End Datatable -->
    <UserAddEdit ref="childRef" @update="updateTable"/>
  </div>
</template>
