<template>
  <button id="child" @mouseover="$emit('onmouseover', rule)" @click="$emit('onmouseclick', rule)">Btn</button>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      rule : {
        "ruleMatchValue": "Interest",
        "ruleMatchType": "contains",
        "ruleFlag": "Yellow",
        "ruleCategory": "Interest"
      }
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
