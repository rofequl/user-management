<script setup>
import {computed, h, onMounted, ref} from 'vue';
import store from "@/store";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import {notification} from "ant-design-vue";
import router from "@/router";

const roleList = computed(() => store.getters.roleList)
const tableLoad = ref(false)
onMounted(async () => {
  tableLoad.value = true
  if (!roleList.value.length > 0) await store.dispatch('ROLE_LIST')
  tableLoad.value = false
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
    <!-- Start Page Header -->
    <a-page-header title="All Role List" class="p-0 mb-2">
      <template #extra>
        <router-link :to="{name: 'New Role'}">
          <a-button type="primary">Add New Role</a-button>
        </router-link>
      </template>
      <template #breadcrumb>
        <a-breadcrumb class="fs-7">
          <a-breadcrumb-item>
            <router-link to="/">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>All Role List</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
    </a-page-header>
    <!-- End Page Header -->
    <!-- Datatable -->
    <a-card :bordered="false" :bodyStyle="{padding: 0}">
      <a-table :dataSource="roleList" :columns="columns" :loading="tableLoad" size="small">
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
    </a-card>
    <!-- End Datatable -->
  </div>
</template>
