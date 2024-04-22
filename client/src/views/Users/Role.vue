<script setup>
import {CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell} from "@coreui/vue";
import axios from 'axios';
import {computed, defineComponent} from 'vue';
import {usePagination} from 'vue-request';

const testService = params => {
  return axios.get('https://61273138c2e8920017bc0b3c.mockapi.io/api/users', {params});
}

const {data, run, current, total, loading, pageSize} = usePagination(testService, {
  defaultParams: [
    {
      limit: 10,
    },
  ],
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'limit',
    totalKey: 'data.total',
  },
});

const list = computed(() => data.value?.data.data || []);

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

const handleTableChange = (pag, filters, sorter) => {
  run({
    limit: pag.pageSize,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
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
    </CRow>
    <!-- End Page Header -->
    <!-- Datatable -->
    <a-table :dataSource="list" :columns="columns" :loading="loading" :pagination="pagination"
             @change="handleTableChange"/>
    <!-- End Datatable -->
  </div>
</template>
