<script setup>
import {MailOutlined, UserOutlined, LinkOutlined, UploadOutlined, CloseOutlined} from "@ant-design/icons-vue";
import {ref} from "vue";
import {message} from 'ant-design-vue';

const fileList = ref([]);
const imageUrl = ref('');

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) message.error('You can only upload JPG file!');
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) message.error('Image must smaller than 2MB!');
  if (isJpgOrPng && isLt2M) {
    fileList.value = [...(fileList.value || []), file];
    imageUrl.value = URL.createObjectURL(file)
  }
  return false;
};
const handleRemove = () => {
  fileList.value = [];
  imageUrl.value = ''
};
</script>
<template>
  <div>
    <a-typography>
      <a-typography-title :level="4" class="mb-0">General Details</a-typography-title>
      <a-typography-paragraph class="mb-0">
        Update your photo & personal details here.
      </a-typography-paragraph>
    </a-typography>
    <a-divider class="mt-2 mb-3" style="height: 1px;background-color: #e8e8e8"/>
    <a-row :gutter="[16, 16]">
      <!--begin::Profile details edit-->
      <a-col :xs="{span: 24, order: 2}" :md="{span: 16, order: 1}">
        <a-card title="Personal information update" size="small">
          <a-form layout="vertical">
            <!--begin::Profile Name & Email-->
            <a-row :gutter="16">
              <a-col :xs="{span: 24}" :md="{span: 12}">
                <a-form-item label="Full Name">
                  <a-input placeholder="Enter user fullname">
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon"/>
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :xs="{span: 24}" :md="{span: 12}">
                <a-form-item label="Email">
                  <a-input placeholder="Enter user email">
                    <template #prefix>
                      <MailOutlined class="site-form-item-icon"/>
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <!--end::Profile Name & Email-->

            <!--begin::Bio-->
            <a-form-item label="Bio" class="mb-0">
              <a-textarea show-count :maxlength="100" placeholder="Enter your bio..."/>
            </a-form-item>
            <!--end::Bio-->

            <!--begin::Username-->
            <a-form-item label="Username">
              <a-input>
                <template #addonBefore>
                  <LinkOutlined class="site-form-item-icon mr-2"/>
                  Http://localhost:3000/
                </template>
              </a-input>
            </a-form-item>
            <!--end::Username-->

            <!--begin::Date of Birth & Gender-->
            <a-row :gutter="16">
              <a-col :xs="{span: 24}" :md="{span: 12}">
                <a-form-item label="Date of Birth">
                  <a-date-picker placeholder="Date of Birth" class="w-100"/>
                </a-form-item>
              </a-col>
              <a-col :xs="{span: 24}" :md="{span: 12}">
                <a-form-item label="Gender">
                  <a-select ref="select" class="w-100" placeholder="Select Gender">
                    <a-select-option value="Male">Male</a-select-option>
                    <a-select-option value="Female">Female</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <!--end::Date of Birth & Gender-->

            <!--begin::Position & Phone Number-->
            <a-row :gutter="16">
              <a-col :xs="{span: 24}" :md="{span: 12}">
                <a-form-item label="Position">
                  <a-input placeholder="Enter user position">
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon"/>
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :xs="{span: 24}" :md="{span: 12}">
                <a-form-item label="Phone Number">
                  <a-input placeholder="Enter user Phone Number">
                    <template #prefix>
                      <MailOutlined class="site-form-item-icon"/>
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <!--end::Position & Phone Number-->

            <!--begin::Address-->
            <a-form-item label="Address">
              <a-textarea placeholder="Enter your present address..." allow-clear/>
            </a-form-item>
            <!--end::Address-->
          </a-form>
        </a-card>
      </a-col>
      <!--end::Profile details edit-->
      <!--begin::Profile picture change-->
      <a-col :xs="{span: 24, order: 1}" :md="{span: 8, order: 2}">
        <a-card title="Change profile picture" size="small">
          <div v-if="imageUrl" class="position-relative" style="width: 104px;">
            <CloseOutlined class="close-button position-absolute rounded-5 p-1" @click="handleRemove"/>
            <a-avatar class="border" shape="square" :size="104" :src="imageUrl"/>
          </div>
          <a-upload-dragger v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader"
                            :show-upload-list="false" :before-upload="beforeUpload">
              <upload-outlined class="fs-5"/>
              <div class="ant-upload-text">
                <p><span class="text-primary">Click to upload</span> or drag and drop</p>
                JPEG or PNG<br>
                (Max: 2MB)
              </div>
          </a-upload-dragger>
        </a-card>
      </a-col>
      <!--end::Profile picture change-->
    </a-row>
  </div>
</template>
<style scoped>
.position-relative .close-button {
  background-color: rgba(203, 183, 183, 0.52);
  right: 4px;
  top: 4px;
  width: 18px;
  font-size: 10px;
  z-index: 2;
  cursor: pointer;
}

.avatar-uploader .ant-upload-text {
  margin-top: 8px;
  color: #666;
  font-size: 12px;
}
</style>
