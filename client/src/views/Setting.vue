<template>
  <div class="setting">
    <h1>This is the setting page</h1>
    <BlackList/>
  </div>
</template>
<script>
import BlackList from '@/components/BlackList.vue'

export default {
  name: 'home',
  components: {
    BlackList
  }
}
</script>
