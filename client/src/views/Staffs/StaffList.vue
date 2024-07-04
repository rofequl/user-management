<!--suppress JSCheckFunctionSignatures -->
<script setup>
import apiService from "@/core/services/api.service";
import {usePagination} from "vue-request";
import {computed, h} from "vue";
import StaffAddEdit from "@/components/Staffs/StaffAddEdit.vue";
import {format} from 'date-fns';
import {EditOutlined, EyeOutlined} from "@ant-design/icons-vue";
import store from "@/store";

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
    title: 'Staff Info',
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
  ...(store.getters.userPermissionCheck([3, 4]) ? [{
    title: 'Action',
    dataIndex: 'action',
    align: 'center',
  }] : [])
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
    <!-- Start Page Header -->
    <a-page-header title="All Staffs" class="p-0 mb-2">
      <template #extra>
        <a-button type="primary" @click="$refs.childRef.modal()" v-if="store.getters.userPermissionCheck([2])">New Staff
          Add
        </a-button>
      </template>
      <template #breadcrumb>
        <a-breadcrumb class="fs-7">
          <a-breadcrumb-item>
            <router-link to="/">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>All Staffs</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
    </a-page-header>
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
                <a-tooltip placement="topLeft" title="Edit User" @click="$refs.childRef.modal(record)" v-if="store.getters.userPermissionCheck([3])">
                  <a-button :icon="h(EditOutlined)"/>
                </a-tooltip>
                <a-tooltip placement="bottomLeft" title="User Details" v-if="store.getters.userPermissionCheck([4])">
                  <a-button :icon="h(EyeOutlined)"/>
                </a-tooltip>
              </a-button-group>
            </template>
          </template>
        </a-table>
      </div>
    </a-card>
    <!-- End Datatable -->
    <StaffAddEdit ref="childRef" @update="updateTable"/>
  </div>
</template>
