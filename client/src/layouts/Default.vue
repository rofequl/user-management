<script setup>
import {CContainer} from "@coreui/vue";
import Header from "@/layouts/inc/Header.vue";
import Sidebar from "@/layouts/inc/Sidebar.vue";
</script>
<template>
  <div>
    <Sidebar/>
    <div class="wrapper d-flex flex-column min-vh-100">
      <Header/>
      <div class="body flex-grow-1">
        <CContainer class="px-4" lg>
          <router-view/>
        </CContainer>
      </div>
    </div>
  </div>
</template>
