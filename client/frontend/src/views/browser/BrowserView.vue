<template>
	<div class="w-full h-full bg-white border-radius-6 browser">
		<div class="top-title layout-side">
			浏览器池配置
			<a-button type="primary" @click="onAddBrowser()">添加版本</a-button>
		</div>
		<div class="browser-content w-full overflow-auto layout-left-top">
			<div class="layout-right-center table-header w-full">
				<div class="layout-center" style="flex-grow: 1">浏览器版本</div>
				<div class="layout-center" style="width: 80px">是否启用</div>
				<div class="layout-center" style="width: 60px">操作</div>
			</div>
			<div class="w-full overflow-auto" style="height: calc(100% - 42px)">
				<div class="w-full layout-left-center table-item" v-for="(w,index) in browserList" :key="'Browser_'+index">
					<template v-if="w[1].edit">
						<div class="layout-center px-1" style="flex-grow: 1">
							<a-input v-model:value="w[1].version" />
						</div>
						<div class="layout-center" style="width: 80px">
							<a-switch @change="onChangeEnable(w)" v-model:checked="w[1].enable" checked-children="开"
												un-checked-children="关" />
						</div>
						<div class="layout-center" style="width: 60px;font-size: 20px">
							<CloseOutlined @click="onHandleAddBrowser(false)" style="color: red" class="cursor-pointer" />
							<CheckOutlined @click="onHandleAddBrowser(true)" style="color: #1676fd" class="cursor-pointer ml-2" />
						</div>
					</template>
					<template v-else>
						<div class="layout-center" style="flex-grow: 1;line-height: 32px">{{ w[1].version }}</div>
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
	import { browserDB } from '@/common/DB.js'
	import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons-vue'
	import { nanoid } from 'nanoid'

	const browserList = ref([])

	onMounted(() => {
		findData()
	})
	const findData = () => {
		browserList.value = []
		browserDB.iterate((value, key, iterationNumber) => {
			browserList.value.push([key, value])
		}).then(res => {
			browserList.value.sort((a, b) => {
				let nameA = a[1].version.toUpperCase() // 不区分大小写
				let nameB = b[1].version.toUpperCase()
				if (nameA < nameB) {
					return 1
				}
				if (nameA > nameB) {
					return -1
				}
				return 0
			})
		})
	}
	const onAddBrowser = () => {
		browserList.value.unshift([nanoid(8), {
			version: '',
			enable: true,
			edit: true,
		}])
	}
	const onChangeEnable = (w) => {
		const ww = JSON.parse(JSON.stringify(w))
		console.log(ww)
		browserDB.setItem(ww[0], ww[1])
	}
	const onRemove = (id) => {
		browserDB.removeItem(id).then(res => {
			findData()
		})
	}
	const onHandleAddBrowser = (e) => {
		if (e) {
			let data = browserList.value[0]
			delete data[1].edit

			browserDB.setItem(data[0], JSON.parse(JSON.stringify(data[1]))).then(res => {
				findData()
			})
		} else {
			browserList.value.shift()
		}
	}
</script>
<style scoped lang="less">
	.browser {
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