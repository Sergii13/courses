<script setup>
import {RouterLink, RouterView} from 'vue-router'
</script>
<template>
  <header class="header">
    <div class="container">
      <RouterLink :to="{name:'home'}" class="header__logo">My<span>Logo</span></RouterLink>
    </div>
  </header>
  <main class="page">
    <RouterView/>
  </main>
  <footer class="footer">
    <div class="container">
      <div class="footer__copy">
        Copyright © 2023
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">


.page {
  flex: 1 1 auto;
  padding: 50px 0;
  @media (max-width: 768px) {
    padding: 40px 0;
  }
}

.header {
  padding: 20px 0;
  background: var(--color-border-hover);
  @media (max-width: 768px) {
    padding: 10px 0;
  }

  &__logo {
    display: inline-block;
    font-size: 30px;
    font-weight: 700;
    @media (max-width: 768px) {
      font-size: 20px;
    }

    span {
      color: var(--color-heading);
    }
  }
}

.footer {
  padding: 20px 0;
  border-top: 1px solid var(--color-border);

  &__copy {
    opacity: 0.7;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
}

.container {
}
</style>
