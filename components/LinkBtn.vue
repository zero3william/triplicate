<template>
  <nuxt-link exact active-class="el-button--primary" :to="to" tag="el-button">{{text}}</nuxt-link>
</template>

<script>
export default {
  name: 'LinkBtn',
  props: {
    to: String,
    text: String
  }
}
</script>