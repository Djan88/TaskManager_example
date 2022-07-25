<template>
  <nav class="navigation">
    <router-link to="/">To-do</router-link>
    <!-- <router-link to="/about">Еще что-то</router-link> |
    <router-link to="/else">Вторичное</router-link> -->
  </nav>
  <router-view v-slot="{Component}">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: rgba(237,242,249,0.96);
}

nav {
  padding: 15px;
  /* background: #fff; */
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  /* box-shadow: 0 .5rem .5rem -.5rem rgba(0,0,0,.2)!important */
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-size: 1.2rem;
}

nav a.router-link-exact-active, nav a:hover {
  color: rgb(44,123,229);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
