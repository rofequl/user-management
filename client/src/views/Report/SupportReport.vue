<script setup>

import {h} from "vue";
import {ArrowLeftOutlined} from "@ant-design/icons-vue";
import {CRow} from "@coreui/vue";
import {CCol} from "@coreui/vue/dist/esm/components/grid";
import {CCard, CCardBody, CCardFooter} from "@coreui/vue/dist/esm/components/card";
import {CButton} from "@coreui/vue/dist/esm/components/button";
import {CButtonGroup} from "@coreui/vue/dist/esm/components/button-group";
import {CProgress} from "@coreui/vue/dist/esm/components/progress";
import MainChart from "@/components/Report/Support/MainChart.vue";
</script>
<template>
  <div>
    <!-- Start Page Header -->
    <a-page-header title="Support Report" class="p-0 mb-2">
      <template #extra>
        <router-link :to="{name: 'Support Manager'}">
          <a-button type="primary" :icon="h(ArrowLeftOutlined)">Back</a-button>
        </router-link>
      </template>
      <template #breadcrumb>
        <a-breadcrumb class="fs-7">
          <a-breadcrumb-item>
            <router-link to="/">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>Support & Training</a-breadcrumb-item>
          <a-breadcrumb-item>Support Report</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
    </a-page-header>
    <!-- End Page Header -->

    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
            <CRow>
              <CCol :sm="5">
                <h4 id="traffic" class="card-title mb-0">Support & Training Status Report</h4>
                <div class="small text-body-secondary">All Time</div>
              </CCol>
              <CCol :sm="7" class="d-none d-md-block">
                <CButtonGroup
                  class="float-end me-3"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <CButton color="secondary" variant="outline">Day</CButton>
                  <CButton color="secondary" variant="outline">Month</CButton>
                  <CButton color="secondary" variant="outline">Year</CButton>
                </CButtonGroup>
              </CCol>
            </CRow>
            <CRow>
              <MainChart style="height: 300px; max-height: 300px; margin-top: 40px"/>
            </CRow>
          </CCardBody>

        </CCard>
      </CCol>
    </CRow>

  </div>
</template>
