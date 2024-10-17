<template>
	<a-config-provider :locale="locale" :theme="th">
		<router-view />
	</a-config-provider>
</template>

<script setup>
	import { ref } from 'vue'
	import { theme } from 'ant-design-vue'
	import zhCN from 'ant-design-vue/es/locale/zh_CN'
	import dayjs from 'dayjs'
	import 'dayjs/locale/zh-cn'
	import { useRouter } from 'vue-router'
	import { ipc } from '@/utils/ipcRenderer.js'
	import { networkApiRoute, phoneApiRoute, wechatApiRoute, browserApiRoute } from '@/api/main.js'

	dayjs.locale('zh-cn')
	const locale = ref(zhCN)
	const th = ref({
		algorithm: theme.defaultAlgorithm,
	})
	const router = useRouter()
	router.replace('/')
	document.getElementById('loadingPage').remove()
	ipc.invoke(networkApiRoute.checkNetwork)
	ipc.invoke(phoneApiRoute.checkPhone)
	ipc.invoke(wechatApiRoute.checkWechat)
	ipc.invoke(browserApiRoute.checkBrowser)
</script>
<style lang="less"></style>
