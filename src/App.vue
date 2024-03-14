<template>
  <div style="width: 100%; height:100%; text-align: center;">
    <div class="navi">
      <router-link :to="{ name:'im', query: { 'appkey': appkey, 'token': token }}" class="navi-item" style="margin-right: 10px;">IM</router-link>
      <router-link to="/home" class="navi-item">HOME</router-link>
    </div>
    <router-view ></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data(){
    return {
      appkey: window.APPKEY,
      token: window.TOKEN,
    }
  }
};
</script>
<style scoped>
.navi{
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  z-index: 10;
}
</style>