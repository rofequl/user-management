<!--suppress ALL -->
<script setup>
import {SettingFilled, MailFilled, PhoneFilled} from "@ant-design/icons-vue";
import {computed, ref} from "vue";
import store from "@/store";
import {format} from 'date-fns';

const user = computed(() => store.getters.currentUser)
const hideTooltipStr = ref('Hide Edit tooltip.');
const activeKey = ref('1');

</script>
<template>
  <div>
    <!-- Start Page Header -->
    <a-page-header title="Account Overview" class="p-0 mb-2">
      <template #breadcrumb>
        <a-breadcrumb class="fs-7">
          <a-breadcrumb-item>
            <router-link to="/">Home</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>User Profile</a-breadcrumb-item>
        </a-breadcrumb>
      </template>
    </a-page-header>
    <!-- End Page Header -->

    <a-card class="w-100 mb-5" :bordered="false" size="default">
      <div class="d-flex flex-column flex-md-row gap-3 gap-md-0 justify-content-between mb-4">
        <a-flex gap="middle">
          <a-avatar shape="square" :src="user.profilePicture" :size="84"/>
          <a-flex vertical justify="space-between">
            <a-typography-title :level="4" class="mb-0">{{ user.name }}</a-typography-title>
            <a-typography-paragraph>{{ user.bio }}</a-typography-paragraph>
            <router-link :to="{name: 'Basic Setting'}" class="gap-1 text-success text-decoration-none fw-semibold"
                         style="text-decoration: underline">
              <SettingFilled/>
              Edit Profile
            </router-link>
          </a-flex>
        </a-flex>
        <div class="d-flex flex-row flex-md-column gap-1 justify-content-between justify-content-md-start">
          <a-typography-text class="text-info-emphasis fw-semibold">
            <MailFilled class="me-2 text-success"/>
            {{ user.email }}
          </a-typography-text>
          <a-typography-text class="text-info-emphasis fw-semibold" v-if="user.mobile">
            <PhoneFilled class="me-2 text-success"/>
            {{ user.mobile }}
          </a-typography-text>
        </div>
      </div>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Overview">
          <!--begin::Overview Detals-->
          <div class="row">
            <div class="col-6">
              <!--begin::Full Name-->
              <div class="row mb-3">
                <!--begin::Label-->
                <label class="col-lg-4 fw-semibold text-muted">Full Name:</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-semibold" style="color: #504b4b">{{ user.name }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Full Name-->

              <!--begin::Username-->
              <div class="row mb-3">
                <!--begin::Label-->
                <label class="col-lg-4 fw-semibold text-muted">Username:</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-semibold" style="color: #504b4b">{{ user.username }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Username-->

              <!--begin::Date of Birth-->
              <div class="row mb-3">
                <!--begin::Label-->
                <label class="col-lg-4 fw-semibold text-muted">Date of Birth:</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-semibold" style="color: #504b4b">{{
                      user.dob ? format(user.dob, 'dd MMM, yyyy') : ''
                      }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Date of Birth-->

              <!--begin::Registered Email-->
              <div class="row mb-3">
                <!--begin::Label-->
                <label class="col-lg-4 fw-semibold text-muted">Registered Email:</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-semibold" style="color: #504b4b">{{ user.email }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Registered Email-->

              <!--begin::Address-->
              <div class="row mb-3">
                <!--begin::Label-->
                <label class="col-lg-4 fw-semibold text-muted">Address:</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-semibold" style="color: #504b4b">{{ user.address }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Address-->
            </div>
            <div class="col-6">
              <!--begin::Gender-->
              <div class="row mb-3">
                <!--begin::Label-->
                <label class="col-lg-4 fw-semibold text-muted">Gender</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-semibold" style="color: #504b4b">{{ user.gender }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Gender-->

              <!--begin::Joining Date-->
              <div class="row mb-3">
                <!--begin::Label-->
                <label class="col-lg-4 fw-semibold text-muted">Joining Date</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-semibold" style="color: #504b4b">{{ format(user.createdAt, 'dd MMM, yyyy') }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Joining Date-->

              <!--begin::Position-->
              <div class="row mb-3">
                <!--begin::Label-->
                <label class="col-lg-4 fw-semibold text-muted">Position</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-semibold" style="color: #504b4b">{{ user.position }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Position-->

              <!--begin::Position-->
              <div class="row mb-3">
                <!--begin::Label-->
                <label class="col-lg-4 fw-semibold text-muted">Number</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-semibold" style="color: #504b4b">{{ user.mobile }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Position-->

              <!--begin::Role-->
              <div class="row mb-3">
                <!--begin::Label-->
                <label class="col-lg-4 fw-semibold text-muted">Role:</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8">
                  <span class="fw-semibold" style="color: #504b4b">{{ user.Role.name }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Role-->
            </div>
          </div>
          <!--end::Overview Detals-->
        </a-tab-pane>
        <a-tab-pane key="2" tab="Activity Log" force-render>Comming Soon</a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
