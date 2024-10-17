<template>
  <div class="w-full h-full dashboard">
    <a-row :gutter="[12,12]">
      <a-col :span="8">
        <a-card>
          <a-statistic
            :value="num[0]">
            <template #title>
              <span style="font-weight: bold;color: #000">机型总数</span>
            </template>
            <template #suffix>
              <span style="font-size: 16px">台</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <a-statistic
            :value="num[1]">
            <template #title>
              <span style="font-weight: bold;color: #000">Android机型</span>
            </template>
            <template #suffix>
              <span style="font-size: 16px">台</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <a-statistic
            :value="num[2]">
            <template #title>
              <span style="font-weight: bold;color: #000">iPhone机型</span>
            </template>
            <template #suffix>
              <span style="font-size: 16px">台</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <a-statistic
            :value="num[3]">
            <template #title>
              <span style="font-weight: bold;color: #000">微信版本</span>
            </template>
            <template #suffix>
              <span style="font-size: 16px">个</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <a-statistic
            :value="num[4]">
            <template #title>
              <span style="font-weight: bold;color: #000">浏览器版本</span>
            </template>
            <template #suffix>
              <span style="font-size: 16px">个</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { browserDB, phoneDB, wechatDB } from '@/common/DB.js'

const num = ref([0, 0, 0, 0, 0])
onMounted(() => {
  phoneDB.iterate((value, key) => {
    if (value.os === 'Android') {
      num.value[1] = num.value[1] + 1
    } else if (value.os === 'iPhone') {
      num.value[2] = num.value[2] + 1
    }
    num.value[0] = num.value[0] + 1
  })
  wechatDB.iterate((value, key) => {
    num.value[3] = num.value[3] + 1
  })
  browserDB.iterate((value, key) => {
    num.value[4] = num.value[4] + 1
  })
})
</script>
<style scoped lang="less">
.dashboard {
  font-size: 13px;
  padding: 6px;
}
</style>