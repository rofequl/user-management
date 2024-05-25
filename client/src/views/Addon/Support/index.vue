<script setup>
import SupportAddEdit from "@/components/Addon/Support/SupportAddEdit.vue";
import apiService from "@/core/services/api.service";
import {usePagination} from "vue-request";
import {computed, h} from "vue";
import {format} from "date-fns";
import {EditOutlined, EyeOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import store from "@/store";
import {notification} from "ant-design-vue";

const getSupportList = params => apiService.get('call-support', {params})
const {data, run, current, total, loading, pageSize} = usePagination(getSupportList, {
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
    title: 'Date & Time',
    dataIndex: 'callingTime',
    align: 'center',
    key: 'callingTime',
  },
  {
    title: 'Agent',
    dataIndex: 'userId',
    align: 'center',
    key: 'userId',
  },
  {
    title: 'Customer Number',
    dataIndex: 'customerNumber',
    align: 'center',
    key: 'customerNumber',
  },
  {
    title: 'Category',
    dataIndex: 'categoryId',
    align: 'center',
    key: 'categoryId',
  },
  {
    title: 'Problem',
    dataIndex: 'problem',
    align: 'center',
    key: 'problem',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    key: 'status',
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

const onDelete = key => {
  store.dispatch('CALL_SUPPORT_DELETE', key).then(res => {
    run()
    notification.success({
      message: 'Congratulations',
      description: (res.data || {}).message || 'Request Successfully Done',
    });
  })
    .catch(e => {
      notification.error({
        message: e.message,
        description: ((e.response || {}).data || {}).message || 'Something Wrong',
      });
    });
};

const updateTable = () => {
  run()
}
</script>
<template>
  <div>
    <!-- Start Page Header -->
    <a-page-header title="Support Manager" class="p-0 mb-2">
      <template #extra>
        <a-button type="primary" @click="$refs.childRef.modal()">New Support</a-button>
      </template>
      <template #breadcrumb>
        <a-breadcrumb class="fs-7">
          <a-breadcrumb-item>
            <router-link to="/">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>Support & Training</a-breadcrumb-item>
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
            <template v-if="column.dataIndex === 'callingTime'">
              {{ format(record.callingTime, 'dd MMM, yyyy') }}<br>
              {{ format(record.callingTime, 'h:mm:ss a') }}
            </template>
            <template v-if="column.dataIndex === 'userId'">
              {{ record.User.name }}
            </template>
            <template v-if="column.dataIndex === 'categoryId'">
              {{ record.SupportCategory.name }}
            </template>
            <template v-if="column.dataIndex === 'action'">
              <a-button-group>
                <a-tooltip placement="bottomLeft" title="Support Details">
                  <a-button :icon="h(EyeOutlined)"/>
                </a-tooltip>
                <a-tooltip placement="topLeft" title="Edit Support" @click="$refs.childRef.modal(record)">
                  <a-button :icon="h(EditOutlined)"/>
                </a-tooltip>
                <a-popconfirm placement="topRight"
                              title="Are you sure delete this Support?"
                              ok-text="Yes"
                              cancel-text="No"
                              @confirm="onDelete(record.id)">
                  <a-tooltip placement="bottomLeft" title="Delete Support">
                    <a-button :icon="h(DeleteOutlined)"/>
                  </a-tooltip>
                </a-popconfirm>
              </a-button-group>
            </template>
          </template>
        </a-table>
      </div>
    </a-card>
    <!-- End Datatable -->
    <SupportAddEdit ref="childRef" @update="updateTable"/>
  </div>
</template>
