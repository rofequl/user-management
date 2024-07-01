<script setup>
import {ref} from "vue";
import {
  DownOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import router from "@/router";
import store from "@/store";
import {format} from "date-fns";
import {createVNode} from 'vue';
import {Modal, notification} from 'ant-design-vue';
import Upload from "@/components/Addon/Support/include/Upload.vue";

//  <--- Variable ---> //
// Data value declaration::::
const visible = ref(false);
const loading = ref(false);
const support = ref({});
const emit = defineEmits(['update', 'edit']);

// Parent component model pen action
const modal = async (e) => {
  visible.value = true
  loading.value = true
  let supportCheck = await store.getters.supportByTrackingId(e)
  if (supportCheck) support.value = supportCheck
  else await store.dispatch('SINGLE_SUPPORT', e).then(() => support.value = store.getters.supportByTrackingId(e))
  loading.value = false
}

// Function to handle the closing of the modal and redirect.
const handleModalClose = () => {
  visible.value = false
  router.push({name: 'Support Manager'})
}

// Function to confirm deletion of support, dispatch deletion action, and handle success/error notifications.
const deleteSupport = () => {
  Modal.confirm({
    title: 'Do you want to delete these support?',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'When clicked the OK button, this support data will be deleted',
    onOk() {
      return new Promise((resolve, reject) => {
        store.dispatch('SUPPORT_DELETE', support.value.id).then(res => {
          notification.success({
            message: 'Congratulations',
            description: (res.data || {}).message || 'Request Successfully Done',
          });
          handleModalClose()
          emit('update')
          resolve()
        }).catch(e => reject(e));
      }).catch(e => {
        notification.error({
          message: e.message,
          description: ((e.response || {}).data || {}).message || 'Something Wrong',
        });
      });
    }
  });
}

const attachmentUpload = (data) => {
  store.commit('SUPPORT_ATTACHMENT_ADD', {id: support.value.id, value: data.data})
}

// Function to handle edit support
const handleEditSupport = () => {
  emit('edit', support.value)
}

defineExpose({
  modal
})
</script>
<template>
  <a-modal v-model:open="visible" width="100%" height="100vh" :footer="null" :closable="false"
           wrap-class-name="full-modal" :onCancel="handleModalClose">
    <div class="d-flex justify-content-between" style="min-height: 22px">
      <div></div>
      <div class="d-flex align-items-center" v-if="!loading">
        <span style="font-size: 12px; color: #759c9c">Created on {{ format(support.createdAt, 'dd MMM, yyyy') }}</span>
        <a-divider type="vertical" class="mx-4" style="height: 20px;background-color: #e8e8e8"/>
        <a-space :size="20">
          <a-tooltip placement="left" title="Edit Support">
            <EditOutlined :style="{fontSize: '18px', color: '#5b7373'}" @click="handleEditSupport"/>
          </a-tooltip>
          <a-tooltip placement="left" title="Delete Support">
            <DeleteOutlined :style="{fontSize: '18px', color: '#5b7373'}" @click="deleteSupport"/>
          </a-tooltip>
          <a-tooltip placement="left" title="Close Window">
            <CloseOutlined :style="{fontSize: '18px', color: '#5b7373'}" @click="handleModalClose"/>
          </a-tooltip>
        </a-space>
      </div>
    </div>
    <a-divider class="mt-2 mb-3" style="height: 1px;background-color: #e8e8e8"/>
    <a-row :gutter="[16, 16]">
      <a-col :xs="{span: 24, order: 2}" :lg="{span: 14, order: 1}" class="custom-scrollbar"
             :style="{maxHeight: 'calc(100vh - 120px)', overflow: 'hidden',overflowY:'auto'}">
        <a-skeleton :loading="loading" active :paragraph="{ rows: 10 }" :title="false">
          <!--begin::Support Overview Details-->
          <div class="row fs-7 mb-3">
            <div class="col-md-6">
              <!--begin::TrackingId-->
              <div class="row mb-2">
                <!--begin::Label-->
                <label class="col-5 text-muted">
                  <CIcon icon="cil-barcode" size="sm" class="me-1"/>
                  Tracking Id</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-7">
                  <span>{{ support.trackingId }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::TrackingId-->
              <!--begin::Status-->
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
              <!--end::Status-->
              <!--begin::Dates-->
              <div class="row mb-2">
                <!--begin::Label-->
                <label class="col-5 text-muted">
                  <CIcon icon="cil-calendar" size="sm" class="me-1"/>
                  Dates</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-7">
                  <span>{{ format(support.supportTime, "dd MMM, yyyy 'at' h:mm a") }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Dates-->
              <!--begin::Type-->
              <div class="row mb-2">
                <!--begin::Label-->
                <label class="col-5 text-muted">
                  <CIcon icon="cil-life-ring" size="sm" class="me-1"/>
                  Type</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-7">
                  <span>{{ support.type }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Type-->
              <!--begin::Ministry/Office-->
              <div class="row mb-2">
                <!--begin::Label-->
                <label class="col-5 text-muted">
                  <CIcon icon="cil-building" size="sm" class="me-1"/>
                  Ministry/Office</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-7">
                  <span>{{ support.office }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Ministry/Office-->
            </div>
            <div class="col-md-6">
              <!--begin::Category-->
              <div class="row mb-2">
                <!--begin::Label-->
                <label class="col-5 text-muted">
                  <CIcon icon="cil-tag" size="sm" class="me-1"/>
                  Category</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-7">
                  <span>{{ support.SupportCategory.name }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Category-->
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
              <div class="row mb-2">
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
              <div class="row mb-2">
                <!--begin::Label-->
                <label class="col-5 text-muted">
                  <CIcon icon="cil-map" size="sm" class="me-1"/>
                  Medium</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-7">
                  <span>{{ support.medium }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::medium-->
              <!--begin::Requested by-->
              <div class="row mb-2">
                <!--begin::Label-->
                <label class="col-5 text-muted">
                  <CIcon icon="cil-smile-plus" size="sm" class="me-1"/>
                  Requested by</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-7">
                  <span>{{ support.requestedBy }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Requested by-->
            </div>
          </div>
          <a-card style="width: 100%" size="small" class="mb-5">
            {{ support.description }}
          </a-card>
          <!--end::Support Overview Details-->
          <h5>Attachments</h5>
          <Upload :upload-url="`support/upload/${support.id}`" :attachment-list="support.AttachmentUploads"
                  @upload="attachmentUpload"/>
        </a-skeleton>
      </a-col>
      <a-col :xs="{span: 24, order: 2}" :lg="{span: 10, order: 1}" class="d-flex">
        <a-divider type="vertical" class="ms-0" style="height: 100%; border-color: #ced3cc"/>
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
