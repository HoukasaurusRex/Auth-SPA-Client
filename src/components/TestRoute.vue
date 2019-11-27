<template>
  <div>
    <form class="form">
      <legend>POST {{ url }}</legend>
      <hr />
      <label for="origin">Origin</label>
      <input name="origin" type="url" v-model="origin" />
      <label for="domain">Domain</label>
      <input name="domain" type="text" v-model="domain" />
      <label for="maxAge">Max Age</label>
      <input name="maxAge" type="number" v-model="maxAge" />
      <div class="group">
        <div>
          <label for="httpOnly">HTTP Only</label>
          <input name="httpOnly" type="checkbox" v-model="httpOnly" />
        </div>
        <div>
          <label for="sameSite">Same Site</label>
          <input name="sameSite" type="checkbox" v-model="sameSite" />
        </div>
        <div>
          <label for="secure">Secure</label>
          <input name="secure" type="checkbox" v-model="secure" />
        </div>
      </div>
      <button
        type="submit"
        @click="authEmail"
        :style="buttonColor"
        :disabled="loading"
      >
        {{ status }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TestRoute',
  props: {},
  data() {
    return {
      email: '',
      loading: false,
      origin: process.env.VUE_APP_API_ORIGIN,
      domain: window.location.host,
      maxAge: 0,
      httpOnly: false,
      sameSite: false,
      secure: false,
      payload: {
        id: 'test',
        email: 'me@example.com'
      }
    }
  },
  computed: {
    url() {
      return `${this.origin}/auth/test/cookies?${this.query}`
    },
    query() {
      return new URLSearchParams({
        domain: this.domain,
        maxAge: this.maxAge,
        httpOnly: this.httpOnly,
        sameSite: this.sameSite,
        secure: this.secure
      })
    },
    buttonColor() {
      return this.isAuthenticated
        ? '--button-color: hsla(163, 100%, 50%, 1);'
        : '--button-color: hsla(323, 100%, 50%, 1);'
    },
    status() {
      return this.loading ? 'Loading...' : 'Test Route'
    }
  },
  methods: {
    async authEmail(e) {
      e.preventDefault()
      this.loading = true
      const res = await this.$store.dispatch('TEST_ROUTE', {
        url: this.url,
        payload: this.payload
      })
      this.loading = false
      console.log(this.url, { res })
      return res
    }
  }
}
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    font-size: 1em;
    text-align: center;
  }

  input {
    border: none;
    width: 100%;
    max-width: 20rem;
    min-width: 10rem;
    padding: 0.5rem;
    margin: 1rem auto;
    border-bottom: 1px solid #666;
  }

  button {
    height: 3rem;
    width: 100%;
    max-width: 20rem;
    min-width: 10rem;
    padding: 0.5rem;
    margin: 1rem auto;
    background-color: var(--button-color);
    border: none;
    border-radius: 0.75rem;
    color: #eee;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:disabled {
      filter: opacity(0.75);
      cursor: not-allowed;
    }

    &:hover {
      filter: opacity(0.75);
    }
  }

  .group {
    display: flex;
    padding: 2rem 4rem;
  }
}
</style>
