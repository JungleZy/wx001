<template>
	<div class="w-full h-full bg-white border-radius-6 wechat">
		<div class="top-title layout-side">
			微信池配置
			<a-button type="primary" @click="onAddWechat()">添加版本</a-button>
		</div>
		<div class="wechat-content w-full overflow-auto layout-left-top">
			<div class="layout-right-center table-header w-full">
				<div class="layout-center" style="width: 92px">分类</div>
				<div class="layout-center" style="width: 120px">版本号</div>
				<div class="layout-center" style="flex-grow: 1">构建号</div>
				<div class="layout-center" style="width: 120px">XWEB</div>
				<div class="layout-center" style="width: 120px">MMWEBSDK</div>
				<div class="layout-center" style="width: 80px">是否启用</div>
				<div class="layout-center" style="width: 60px">操作</div>
			</div>
			<div class="w-full overflow-auto" style="height: calc(100% - 42px)">
				<div class="w-full layout-right-center table-item" v-for="(w,index) in wechatList" :key="'wechat_'+index">
					<template v-if="w[1].edit">
						<div class="layout-center" style="width: 92px">
							<a-select class="w-full" v-model:value="w[1].os" :options="osType"></a-select>
						</div>
						<div class="layout-center" style="width: 120px">
							<a-input v-model:value="w[1].version" />
						</div>
						<div class="layout-center" style="flex-grow: 1">
							<a-input v-model:value="w[1].build" />
						</div>
						<div class="layout-center px-1" style="width: 120px">
							<a-input v-model:value="w[1].xweb" />
						</div>
						<div class="layout-center px-1" style="width: 120px">
							<a-input v-model:value="w[1].mmwebsdk" />
						</div>
						<div class="layout-center" style="width: 80px">
							<a-switch @change="onChangeEnable(w[0])" v-model:checked="w[1].enable" checked-children="开"
												un-checked-children="关" />
						</div>
						<div class="layout-center" style="width: 60px;font-size: 20px">
							<CloseOutlined @click="onHandleAddWechat(false)" style="color: red" class="cursor-pointer" />
							<CheckOutlined @click="onHandleAddWechat(true)" style="color: #1676fd" class="cursor-pointer ml-2" />
						</div>
					</template>
					<template v-else>
						<div class="layout-center" style="width: 100px;line-height: 32px">{{ w[1].os }}</div>
						<div class="layout-center" style="width: 120px;line-height: 32px">{{ w[1].version }}</div>
						<div class="layout-center" style="flex-grow: 1;line-height: 32px">{{ w[1].build }}</div>
						<div class="layout-center" style="width: 120px;line-height: 32px">{{ w[1].xweb }}</div>
						<div class="layout-center" style="width: 120px;line-height: 32px">
							{{ w[1].mmwebsdk }}
						</div>
						<div class="layout-center" style="width: 80px;line-height: 32px">
							<a-switch @change="onChangeEnable(w)" v-model:checked="w[1].enable" checked-children="开"
												un-checked-children="关" />
						</div>
						<div class="layout-center" style="width: 60px;line-height: 32px;font-size: 20px">
							<DeleteOutlined @click="onRemove(w[0])" class="cursor-pointer" style="color: red" />
						</div>
					</template>

				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { onMounted, ref } from 'vue'
	import { nanoid } from 'nanoid'
	import { DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
	import { wechatDB } from '@/common/DB.js'

	const wechatList = ref([])
	const osType = ref([
		{
			value: 'iPhone',
			label: 'iPhone',
		},
		{
			value: 'Android',
			label: 'Android',
		},
	])
	onMounted(() => {
		findData()
	})
	const findData = () => {
		wechatList.value = []
		wechatDB.iterate((value, key, iterationNumber) => {
			wechatList.value.push([key, value])

		}).then(res => {
			wechatList.value.sort((a, b) => {
				let nameA = a[1].os.toUpperCase() // 不区分大小写
				let nameB = b[1].os.toUpperCase()
				if (nameA < nameB) {
					return -1
				}
				if (nameA > nameB) {
					return 1
				}
				return 0
			})
		})
	}
	const onAddWechat = () => {
		wechatList.value.unshift([nanoid(8), {
			os: 'iPhone',
			version: '',
			build: '',
			xweb: '',
			mmwebsdk: '',
			enable: true,
			edit: true,
		}])
	}
	const onChangeEnable = (w) => {
		const ww = JSON.parse(JSON.stringify(w))
		wechatDB.setItem(ww[0], ww[1])
	}
	const onRemove = (id) => {
		wechatDB.removeItem(id).then(res => {
			console.log('dddd')
			findData()
		})
	}
	const onHandleAddWechat = (e) => {
		if (e) {
			let data = wechatList.value[0]
			delete data[1].edit

			wechatDB.setItem(data[0], JSON.parse(JSON.stringify(data[1]))).then(res => {
				findData()
			})
		} else {
			wechatList.value.shift()
		}
	}

</script>
<style scoped lang="less">
	.wechat {
		font-size: 13px;

		&-content {
			height: calc(100% - 53px);

			.table-header {
				color: rgba(0, 0, 0, 0.88);
				font-weight: 600;
				text-align: start;
				background: #fafafa;
				border-bottom: 1px solid #f0f0f0;
				transition: background 0.2s ease;
				padding: 12px;
			}

			.table-item {
				border-bottom: 1px solid #f0f0f0;
				transition: background 0.2s ease;
				padding: 12px;
			}
		}
	}
</style>