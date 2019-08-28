<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <a href="http://localhost:3000/" target="_blank">点击回到主页</a>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Welcome to Moviepoint - Online Movie,Vedio and TV Show HTML Template',
  data () {
    return {
      msg: '登录成功',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
