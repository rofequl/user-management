<script setup>
import CategoryAddEdit from "@/components/CallSupport/CategoryAddEdit.vue";
import {computed, h, onMounted, ref} from "vue";
import store from "@/store";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import {notification} from "ant-design-vue";

const categoryList = computed(() => store.getters.supportCategoryList)
const tableLoad = ref(false)
onMounted(async () => {
  tableLoad.value = true
  if (!categoryList.value.length > 0) await store.dispatch('SUPPORT_CATEGORY_LIST')
  tableLoad.value = false
});

const columns = [
  {
    title: 'Support Category Name',
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
  store.dispatch('SUPPORT_CATEGORY_DELETE', key).then(res => {
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

</script>
<template>
  <div>
    <!-- Start Page Header -->
    <a-page-header title="Call Support Category" class="p-0 mb-2">
      <template #extra>
        <a-button type="primary" @click="$refs.childRef.showModal()">New Category</a-button>
      </template>
      <template #breadcrumb>
        <a-breadcrumb class="fs-7">
          <a-breadcrumb-item>
            <router-link to="/">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>Call Support Category</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
    </a-page-header>
    <!-- End Page Header -->
    <!-- Datatable -->
    <a-card :bordered="false" :bodyStyle="{padding: 0}">
      <a-table :dataSource="categoryList" :columns="columns" :loading="tableLoad">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <a-button-group>
              <a-tooltip placement="topLeft" title="Edit Category">
                <a-button :icon="h(EditOutlined)" @click="$refs.childRef.showModal(record)"/>
              </a-tooltip>
              <a-popconfirm placement="topRight"
                            title="Are you sure delete this Category?"
                            ok-text="Yes"
                            cancel-text="No"
                            @confirm="onDelete(record.id)">
                <a-tooltip placement="bottomLeft" title="Delete Category">
                  <a-button :icon="h(DeleteOutlined)"/>
                </a-tooltip>
              </a-popconfirm>
            </a-button-group>
          </template>
        </template>
      </a-table>
    </a-card>
    <!-- End Datatable -->
    <CategoryAddEdit ref="childRef"/>
  </div>
</template>
