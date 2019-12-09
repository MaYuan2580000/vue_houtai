<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },

};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app {
  color: #2c3e50;
  display: flex;
  height: 100vh;
  flex-direction: column;
  width: 100vw;
  overflow: auto;
}
html {
  height: 100%;
}

body {
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.el-picker-panel {
  width: 17%;
}
.el-date-picker table {
  width: 145%;
}

</style>
