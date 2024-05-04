<template>
  <router-view/>
</template>
<script setup>
import {onBeforeMount, onBeforeUnmount, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useColorModes} from '@coreui/vue'

const {isColorModeSet, setColorMode} = useColorModes('coreui-free-vue-admin-template-theme')
const store = useStore()
onBeforeMount(() => {
  const urlParams = new URLSearchParams(window.location.href.split('?')[1])
  const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
  if (theme) {
    setColorMode(theme)
    return
  }
  if (isColorModeSet()) return
  setColorMode(store.state.theme)
})

// To identify whether a device is a laptop or a mobile
const checkDeviceType = () => store.commit('TOGGLE_MOBILE_TYPE', window.innerWidth <= 768);
onMounted(() => {
  checkDeviceType();
  window.addEventListener('resize', checkDeviceType);
});
onBeforeUnmount(() => window.removeEventListener('resize', checkDeviceType));
</script>

<style lang="scss">
@import 'styles/style';
@import 'styles/examples';
</style>
