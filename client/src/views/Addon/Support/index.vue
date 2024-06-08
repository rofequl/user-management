<script setup>
import SupportAddEdit from "@/components/Addon/Support/SupportAddEdit.vue";
import apiService from "@/core/services/api.service";
import {usePagination} from "vue-request";
import {computed, onMounted, ref, watch} from "vue";
import {format} from "date-fns";
import SupportDetails from "@/components/Addon/Support/SupportDetails.vue";
import router from "@/router";
import {useRoute} from "vue-router";

const getSupportList = params => apiService.get('support', {params})
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
    title: 'Tracking ID',
    dataIndex: 'trackingId',
    align: 'center',
    key: 'trackingId',
  },
  {
    title: 'Agent',
    dataIndex: 'userId',
    align: 'center',
    key: 'userId',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    align: 'center',
    key: 'type',
  },
  {
    title: 'Medium',
    dataIndex: 'medium',
    align: 'center',
    key: 'medium',
  },
  {
    title: 'Office',
    dataIndex: 'office',
    align: 'center',
    key: 'office',
  },
  {
    title: 'Requested By',
    dataIndex: 'requestedBy',
    align: 'center',
    key: 'requestedBy',
  },
  {
    title: 'Category',
    dataIndex: 'categoryId',
    align: 'center',
    key: 'categoryId',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    key: 'status',
  },
  {
    title: 'Date & Time',
    dataIndex: 'supportTime',
    align: 'center',
    key: 'supportTime',
  },
]

const handleTableChange = (pag) => {
  run({
    limit: pag.pageSize,
    page: pag?.current,
  });
};

const onRowClick = (record) => {
  return {
    onClick: () => {
      const trackingId = record.trackingId;
      router.push({name: 'Support Manager', params: {'slug': trackingId}})
    },
  }
}
const route = useRoute();
const supportDetailsRef = ref(null);
watch(() => route.params.slug, (newVal) => {
    if (newVal && supportDetailsRef.value) supportDetailsRef.value.modal(newVal)
  }, {immediate: true}
);
onMounted(() => {
  let trackingId = route.params.slug
  if (trackingId && supportDetailsRef.value) supportDetailsRef.value.modal(trackingId)
})

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
                 @change="handleTableChange" size="small" rowClassName="cursor-pointer" :customRow="onRowClick">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'supportTime'">
              {{ format(record.supportTime, 'dd MMM, yyyy') }} at
              {{ format(record.supportTime, 'h:mm a') }}
            </template>
            <template v-if="column.dataIndex === 'userId'">
              {{ record.User.name }}
            </template>
            <template v-if="column.dataIndex === 'categoryId'">
              {{ record.SupportCategory.name }}
            </template>
          </template>
        </a-table>
      </div>
    </a-card>
    <!-- End Datatable -->
    <SupportAddEdit ref="childRef" @update="updateTable"/>
    <support-details ref="supportDetailsRef" @update="updateTable" @edit="e=>$refs.childRef.modal(e)"/>
  </div>
</template>
