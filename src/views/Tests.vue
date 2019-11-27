<template>
  <section class="tests">
    <h1>Run Tests</h1>
    <test-route name="Set Cookies" path="/auth/test/cookies" />
  </section>
</template>
<script>
import TestRoute from '@/components/TestRoute.vue'
export default {
  components: {
    TestRoute
  },
  data() {
    return {
      jwtToken: this.$route.query.token || this.$store.getters.getJwtPayload
    }
  }
}
</script>
<style lang="scss">
.tests {
  max-width: 600px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
}
.buttons {
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
}
</style>
