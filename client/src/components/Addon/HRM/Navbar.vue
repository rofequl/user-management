<script setup>
import {onMounted, ref} from 'vue';
import {CCol, CRow, CWidgetStatsF} from "@coreui/vue"

const activeKey = ref('1');

// Calculate and set the dynamic padding value based on the screen size
const calculatePadding = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 600) return '16px 16px 0';
  else if (screenWidth < 900) return '24px 24px 0';
  else return '32px 32px 0';
}
const cardBodyStyle = ref(calculatePadding())
onMounted(() => {
  window.addEventListener('resize', () => {
    cardBodyStyle.value = calculatePadding();
  })
})
</script>
<template>
  <!-- ========== Start Navbar ========== -->
  <a-card :style="{width: '100%'}" :body-style="{ padding: cardBodyStyle, overflow: 'hidden' }">
    <a-row :gutter="16">
      <a-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4" class="d-none d-sm-block">
        <!-- ========== Start Navbar Side Logo ========== -->
        <div class="p-4 bg-light rounded">
          <img alt="avatar" :style="{display: 'block', width: '100%'}"
               src="https://preview.keenthemes.com/metronic8/demo1/assets/media/svg/brand-logos/volicity-9.svg"/>
        </div>
        <!-- ========== End Navbar Side Logo ========== -->
      </a-col>
      <a-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
        <a-row :gutter="16">
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <a-typography-title :level="3">HRM Dashboard</a-typography-title>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"
                 class="d-flex justify-content-start justify-content-md-end gap-2">
            <a-button type="primary" href="https://antdv.com" target="_blank">Add Employee</a-button>
            <a-button type="default" href="https://antdv.com" target="_blank">Add Shift</a-button>
          </a-col>
          <a-col :span="24">
            <!-- ========== Start Today total countdown ========== -->
            <CRow class="my-3">
              <CCol :sm="6" :md="4" :lg="4" class="mb-2 mb-md-0">
                <CWidgetStatsF color="primary" title="Today Date" value="12 June, 2024" :padding="false">
                  <template #icon>
                    <CIcon icon="cil-settings" size="xl"/>
                  </template>
                </CWidgetStatsF>
              </CCol>
              <CCol :sm="6" :md="4" :lg="4" class="mb-2 mb-md-0">
                <CWidgetStatsF color="info" title="Today Present" value="22" :padding="false">
                  <template #icon>
                    <CIcon icon="cil-settings" size="xl"/>
                  </template>
                </CWidgetStatsF>
              </CCol>
              <CCol :sm="12" :md="4" :lg="4">
                <CWidgetStatsF color="info" title="Today Absent" value="23" :padding="false">
                  <template #icon>
                    <CIcon icon="cil-settings" size="xl"/>
                  </template>
                </CWidgetStatsF>
              </CCol>
            </CRow>
            <!-- ========== End Today total countdown ========== -->
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-divider :style="{marginBottom: 0}"/>
    <!-- ========== Start Tabs Menu ========== -->
    <a-tabs v-model:activeKey="activeKey" :tabBarStyle="{marginBottom: 0}">
      <a-tab-pane key="1" tab="Employee Manage"></a-tab-pane>
      <a-tab-pane key="2" tab="Shift Manage" force-render></a-tab-pane>
      <a-tab-pane key="3" tab="Leave Manage"></a-tab-pane>
    </a-tabs>
    <!-- ========== End Tabs Menu ========== -->
  </a-card>
  <!-- ========== End Navbar ========== -->
</template>
