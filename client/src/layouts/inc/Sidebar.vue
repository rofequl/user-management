<script setup>
import {computed} from 'vue'
import {RouterLink} from 'vue-router'
import {useStore} from 'vuex'
import {AppSidebarNav} from './AppSidebarNav'
import {logo} from '@/assets/brand/logo'
import {sygnet} from "@/assets/brand/sygnet"
import {CSidebar, CSidebarHeader, CSidebarBrand, CCloseButton} from '@coreui/vue'

const store = useStore()
const sidebarUnfoldable = computed(() => store.state.sidebarUnfoldable),
  sidebarVisible = computed(() => store.state.sidebarVisible);
const updateSidebarVisible = (event) => {
  store.commit({
    type: 'updateSidebarVisible',
    value: event,
  })
}
</script>
<template>
  <CSidebar class="border-end" colorScheme="dark" position="fixed"
            :unfoldable="sidebarUnfoldable" :visible="sidebarVisible"
            @visible-change="event => updateSidebarVisible(event)">
    <CSidebarHeader class="border-bottom">
      <RouterLink custom to="/" v-slot="{ href, navigate }">
        <CSidebarBrand v-bind="$attrs" as="a" :href="href" @click="navigate">
          <CIcon custom-class-name="sidebar-brand-full" :icon="logo" :height="32"/>
          <CIcon custom-class-name="sidebar-brand-narrow" :icon="sygnet" :height="32"/>
        </CSidebarBrand>
      </RouterLink>
      <CCloseButton class="d-lg-none" dark @click="store.commit('toggleSidebar')"/>
    </CSidebarHeader>
    <AppSidebarNav/>
  </CSidebar>
</template>
