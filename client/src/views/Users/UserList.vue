<script setup>
import {CCol, CRow} from "@coreui/vue";
import apiService from "@/core/services/api.service";
import {usePagination} from "vue-request";
import {computed} from "vue";

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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }
]

const handleTableChange = (pag) => {
  run({
    limit: pag.pageSize,
    page: pag?.current,
  });
};
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
        <a-button type="primary">
          <router-link to="/user/role/create" style="text-decoration: none">New User Add</router-link>
        </a-button>
      </CCol>
    </CRow>
    <!-- End Page Header -->
    <!-- Datatable -->
    <a-table :dataSource="dataSource" :columns="columns" :loading="loading" :pagination="pagination"
             @change="handleTableChange" bordered/>
    <!-- End Datatable -->
  </div>
</template>
