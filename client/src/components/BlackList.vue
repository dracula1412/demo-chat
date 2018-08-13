<template>
  <div>
    <BlackListForm/>
    <BlackListItems/>
  </div>
</template>
<script>
import BlackListForm from '@/components/BlackList/Form.vue'
import BlackListItems from '@/components/BlackList/Items.vue'

export default {
  name: 'blackList',
  components: {
    BlackListForm,
    BlackListItems,
  }
}
</script>
