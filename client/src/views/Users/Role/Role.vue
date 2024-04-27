<script setup>
import {CRow, CCol} from "@coreui/vue";
import {computed, h, onMounted} from 'vue';
import store from "@/store";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import {notification} from "ant-design-vue";
import router from "@/router";

const roleList = computed(() => store.getters.roleList)
onMounted(() => {
  if (!roleList.value.length > 0) store.dispatch('ROLE_LIST')
});

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: '10%',
  },
]

const onDelete = key => {
  store.dispatch('ROLE_DELETE', key).then(res => {
    console.log(res)
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

const onEdit = id => {
  router.push({name: 'Edit Role', params: {id}})
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
          <a-breadcrumb-item>All Role List</a-breadcrumb-item>
        </a-breadcrumb>
      </CCol>
      <CCol sm="6" xs="6" class="d-flex justify-content-end align-items-center">
        <a-button type="primary">
          <router-link to="/user/role/create" style="text-decoration: none">Add New Role</router-link>
        </a-button>
      </CCol>
    </CRow>
    <!-- End Page Header -->
    <!-- Datatable -->
    <a-table :dataSource="roleList" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button-group>
            <a-tooltip placement="topLeft" title="Edit Role">
              <a-button :icon="h(EditOutlined)" @click="onEdit(record.id)"/>
            </a-tooltip>
            <a-popconfirm placement="topRight"
                          title="Are you sure delete this role?"
                          ok-text="Yes"
                          cancel-text="No"
                          @confirm="onDelete(record.id)">
              <a-tooltip placement="bottomLeft" title="Delete Role">
                <a-button :icon="h(DeleteOutlined)"/>
              </a-tooltip>
            </a-popconfirm>
          </a-button-group>
        </template>
      </template>
    </a-table>
    <!-- End Datatable -->
  </div>
</template>
