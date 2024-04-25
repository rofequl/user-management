<script setup>
import {CRow, CCol, CButton} from "@coreui/vue";
import {computed} from 'vue';
import {usePagination} from 'vue-request';
import apiService from "../../../core/services/api.service";

const getRoleList = params => apiService.get('role', {params})

const {data, run, current, total, loading, pageSize} = usePagination(getRoleList, {
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
    <CRow>
      <CCol sm="6" xs="12" class="mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle fs-6">Manage User</span>
        <h4 class="page-title">User Permission</h4>
      </CCol>
      <CCol sm="6" xs="12" class="d-flex justify-content-end">
        <a-button type="primary">
          <router-link to="/user/role/create" style="text-decoration: none">Add New Role</router-link>
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
