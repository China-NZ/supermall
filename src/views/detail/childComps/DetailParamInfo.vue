<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length!==0">
    <div class="rules">
      <table v-if="paramInfo.rule && paramInfo.rule.tables.length">
        <tr v-for="(itemtr,indextr) in paramInfo.rule.tables[0]" :key="indextr">
          <td v-for="(itemtd,indextd) in itemtr" :key="indextd">{{itemtd}}</td>
        </tr>
      </table>
    </div>
    <div class="params" v-if="Object.keys(paramInfo.info).length && paramInfo.info.set.length">
      <table>
        <tr v-for="(tr,trx) in paramInfo.info.set" :key="trx">
          <td class="key">{{tr.key}}</td>
          <td class="value">{{tr.value}}</td>
        </tr>
      </table>
    </div>
  </div>  
</template>
<script>
  export default {
    name: 'DetailParamInfo',
  props:{
    paramInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  }
  };
</script>
<style scoped>
.param-info{
    width: 100%;
    padding: 8px 8px 20px;
    border-bottom: solid 4px rgba(100, 100, 100, .1);
}
.rules table {
    width: 100%;
}
.rules table tr td, .params table tr td {
    padding: 8px 16px;
    border-bottom: 1px solid rgba(100,100,100, .1);
}
.params table {
    width: 100%;
}
.params table tr .key {
    width: 30%;
}
.params table tr .value {
    width: 70%;
    color: var(--color-high-text);
}
</style>