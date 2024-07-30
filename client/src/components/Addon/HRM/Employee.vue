<script setup>
import {PhoneTwoTone, MailTwoTone} from "@ant-design/icons-vue";
</script>
<template>
  <a-card class="w-100 my-4" :body-style="{padding: 0, overflow: 'hidden'}">
    <div class="custom-tabs">
      <a-tabs :tabBarStyle="{float: 'right'}">
        <a-tab-pane key="1" tab="Week"></a-tab-pane>
        <a-tab-pane key="2" tab="Month"></a-tab-pane>
        <a-tab-pane key="3" tab="Year"></a-tab-pane>
      </a-tabs>
    </div>
    <div class="p-3">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="4" :md="4" :lg="4" :xl="6">
          <a-card hoverable class="w-100 custom-card" :body-style="{padding: '5px', overflow: 'hidden'}">
            <template #actions>
                <span style="font-size: 12px"><span class="text-info-emphasis fw-semibold">20</span><br>
                  Total Present
                </span>
              <span style="font-size: 12px"><span class="text-info-emphasis fw-semibold">20</span><br>
                  Total Absent
                </span>
            </template>
            <a-flex align="center" gap="small">
              <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" shape="square"
                        :size="44" class="bg-light"></a-avatar>
              <div>
                <p class="fw-bold mb-0" style="font-size: 15px">Md. Nayem</p>
                <p class="fw-semibold mb-0" style="font-size: 12px">Software Engineer</p>
              </div>
            </a-flex>
            <div class="mt-3">
              <p class="d-flex align-items-center gap-2 mb-0" style="font-size: 13px">
                <PhoneTwoTone two-tone-color="#FD5CA8"/>
                <span>01966634890</span>
              </p>
              <p class="d-flex align-items-center gap-2 mb-0" style="font-size: 13px">
                <MailTwoTone two-tone-color="#FD5CA8"/>
                nayem@uysys.com
              </p>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>

  </a-card>
</template>

<style scoped>
.custom-tabs :deep(.ant-tabs-nav-wrap) {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  margin-left: 20px;
}

.custom-card :deep(.ant-card-actions li) {
  margin: 0;
}
</style>
