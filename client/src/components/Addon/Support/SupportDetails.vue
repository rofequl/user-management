<script setup>
import {h, ref} from "vue";
import {DownOutlined, FlagOutlined, SearchOutlined} from '@ant-design/icons-vue';

//  <--- Variable ---> //
// Data value declaration::::
const visible = ref(false);

// Parent component model pen action
const modal = (e) => {
  visible.value = true
}

defineExpose({
  modal
})
</script>
<template>
  <a-modal v-model:open="visible" width="100%" height="100vh" :footer="null" :closable="false"
           wrap-class-name="full-modal">
    <div class="d-flex">
      <div></div>
      <div>
        Created on 7 Feb

      </div>
    </div>
    <a-divider class="mt-2 mb-3" style="height: 1px;background-color: #e8e8e8"/>
    <a-row :gutter="[16, 16]">
      <a-col :xs="{span: 24, order: 2}" :lg="{span: 14, order: 1}">
        <!--begin::Overview Details-->
        <div class="row fs-6">
          <div class="col-md-6">
            <!--begin::Resolve-->
            <div class="row mb-2">
              <!--begin::Label-->
              <label class="col-5 text-muted ">
                <CIcon icon="cil-scrubber" size="sm" class="me-1"/>
                Status</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-7">
                <a-dropdown :trigger="['click']">
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1">1st item</a-menu-item>
                      <a-menu-item key="2">2nd item</a-menu-item>
                      <a-menu-item key="3">3rd item</a-menu-item>
                    </a-menu>
                  </template>
                  <a-button size="small" type="primary">
                    Resolve
                    <DownOutlined/>
                  </a-button>
                </a-dropdown>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Resolve-->

            <!--begin::Dates-->
            <div class="row mb-2">
              <!--begin::Label-->
              <label class="col-5 text-muted">
                <CIcon icon="cil-calendar" size="sm" class="me-1"/>
                Dates</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-7">
                <span>07 May, 2024 at 12:00 PM</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Dates-->
            <!--begin::Type-->
            <div class="row mb-2">
              <!--begin::Label-->
              <label class="col-5 text-muted">
                <CIcon icon="cil-calendar" size="sm" class="me-1"/>
                Type</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-7">
                <span>Training</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Type-->
          </div>
          <div class="col-md-6">
            <!--begin::Assignees-->
            <div class="row mb-2">
              <!--begin::Label-->
              <label class="col-5 text-muted">
                <CIcon icon="cil-user" size="sm" class="me-1"/>
                Assignees</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-7">
                <span></span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Assignees-->

            <!--begin::Priority-->
            <div class="row mb-1">
              <!--begin::Label-->
              <label class="col-5 text-muted">
                <CIcon icon="cil-flag-alt" size="sm" class="me-1"/>
                Priority</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-7">
                <a-dropdown :trigger="['click']">
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1">
                        <CIcon icon="cil-flag-alt" size="sm" class="me-1" style="color: red"/>
                        Urgent
                      </a-menu-item>
                      <a-menu-item key="2">
                        <CIcon icon="cil-flag-alt" size="sm" class="me-1" style="color: orangered"/>
                        High
                      </a-menu-item>
                      <a-menu-item key="3">
                        <CIcon icon="cil-flag-alt" size="sm" class="me-1" style="color: blueviolet"/>
                        Normal
                      </a-menu-item>
                      <a-menu-item key="4">
                        <CIcon icon="cil-flag-alt" size="sm" class="me-1" style="color: gray"/>
                        Low
                      </a-menu-item>
                    </a-menu>
                  </template>
                  <div size="small" type="text" class="w-100 text-start rounded cursor-pointer">
                    <CIcon icon="cil-flag-alt" size="sm" class="me-1" style="color: gray"/>
                    Low
                  </div>
                </a-dropdown>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Priority-->
            <!--begin::medium-->
            <div class="row mb-1">
              <!--begin::Label-->
              <label class="col-5 text-muted">
                <CIcon icon="cil-flag-alt" size="sm" class="me-1"/>
                Medium</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-7">
                <span>Physical</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::medium-->
          </div>
        </div>
        <!--end::Overview Details-->
      </a-col>
      <a-col :xs="{span: 24, order: 2}" :lg="{span: 10, order: 1}">
        h
      </a-col>
    </a-row>
  </a-modal>
</template>
<style lang="scss">
.full-modal {
  .ant-modal {
    max-width: 98%;
    padding-bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 0;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(95vh);
  }

  .ant-modal-body {
    flex: 1;
  }
}
</style>
