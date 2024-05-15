<script setup>
import {
  CHeader, CContainer, CHeaderToggler, CHeaderNav, CDropdown, CDropdownToggle, CDropdownMenu,
  CDropdownDivider, CDropdownItem, CAvatar
} from "@coreui/vue";
import {ref} from "vue";
import store from "@/store";
import avatar from '@/assets/images/avatars/8.jpg'

const headerClassNames = ref('mb-4 p-0')
</script>

<template>
  <CHeader position="sticky" :class="headerClassNames">
    <CContainer class="border-bottom px-4" fluid>
      <CHeaderToggler @click="store.commit('toggleSidebar')" style="margin-inline-start: -14px">
        <CIcon icon="cil-menu" size="lg"/>
      </CHeaderToggler>
      <CHeaderNav>
        <CDropdown placement="bottom-end" variant="nav-item">
          <CDropdownToggle class="py-0 pe-0" :caret="false">
            <CAvatar :src="store.getters.currentUser.profilePicture" size="md"/>
          </CDropdownToggle>
          <CDropdownMenu class="pt-0">
            <router-link :to="{name: 'Profile'}" class="text-decoration-none">
              <CDropdownItem>
                <CIcon icon="cil-user"/>
                Profile
              </CDropdownItem>
            </router-link>
            <router-link :to="{name: 'Basic Setting'}" class="text-decoration-none">
              <CDropdownItem>
                <CIcon icon="cil-settings"/>
                Settings
              </CDropdownItem>
            </router-link>
            <CDropdownDivider/>
            <CDropdownItem>
              <CIcon icon="cil-lock-locked"/>
              Logout
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>
