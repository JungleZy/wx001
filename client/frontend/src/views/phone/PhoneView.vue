<template>
	<div class="w-full h-full bg-white border-radius-6 phone">
		<div class="top-title layout-side">
			机型池配置
			<a-button type="primary" @click="onAddPhone()">添加机型</a-button>
		</div>
		<div class="phone-content w-full overflow-auto layout-left-top">
			<div class="layout-right-center table-header w-full">
				<div class="layout-center" style="width: 92px">分类</div>
				<div class="layout-center" style="width: 130px">机型</div>
				<div class="layout-center" style="flex-grow: 1" ref="typeWidthRef">机型代码</div>
				<div class="layout-center" style="width: 100px">webGLVendor</div>
				<div class="layout-center" style="width: 100px">webGLRenderer</div>
				<div class="layout-center" style="width: 120px">分辨率</div>
				<div class="layout-center" style="width: 80px">webkit</div>
				<div class="layout-center" style="width: 80px">是否启用</div>
				<div class="layout-center" style="width: 60px">操作</div>
			</div>
			<div class="w-full overflow-auto" style="height: calc(100% - 42px)">
				<div class="w-full layout-left-center table-item" v-for="(w,index) in phoneList" :key="'phone_'+index">
					<template v-if="w[1].edit">
						<div class="layout-center" style="width: 92px">
							<a-select class="w-full" v-model:value="w[1].os" :options="osType"></a-select>
						</div>
						<div class="layout-center px-1" style="width: 130px">
							<a-input v-model:value="w[1].type" />
						</div>
						<div class="layout-center px-1" style="flex-grow: 1">
							<a-input v-model:value="w[1].code" />
						</div>
						<div class="layout-center px-1" style="width: 100px">
							<a-input v-model:value="w[1].webGLVendor" />
						</div>
						<div class="layout-center px-1" style="width: 100px">
							<a-input v-model:value="w[1].webGLRenderer" />
						</div>
						<div class="layout-center px-1" style="width: 120px">
							<a-input-group compact>
								<a-input-number v-model:value="w[1].size[0]" style="width: 50%" />
								<a-input-number v-model:value="w[1].size[1]" style="width: 50%" />
								<a-input-number v-model:value="w[1].size[2]" style="width: 50%" />
								<a-input-number v-model:value="w[1].size[3]" style="width: 50%" />
								<a-input-number v-model:value="w[1].size[4]" style="width: 50%" />
								<a-input-number v-model:value="w[1].size[5]" style="width: 50%" />
								<a-input-number v-model:value="w[1].size[6]" style="width: 50%" />
								<a-input-number v-model:value="w[1].size[7]" style="width: 50%" />
							</a-input-group>
						</div>
						<div class="layout-center px-1" style="width: 80px">
							<a-input v-model:value="w[1].webkit" />
						</div>
						<div class="layout-center" style="width: 80px">
							<a-switch @change="onChangeEnable(w[0])" v-model:checked="w[1].enable" checked-children="开"
												un-checked-children="关" />
						</div>
						<div class="layout-center" style="width: 60px;font-size: 20px">
							<CloseOutlined @click="onHandleAddPhone(false)" style="color: red" class="cursor-pointer" />
							<CheckOutlined @click="onHandleAddPhone(true)" style="color: #1676fd" class="cursor-pointer ml-2" />
						</div>
					</template>
					<template v-else>
						<div class="layout-center" style="width: 92px;line-height: 32px">{{ w[1].os }}</div>
						<div class="layout-center" style="width: 130px;line-height: 32px">{{ w[1].type }}</div>
						<div class="layout-left-center"
								 style="flex-grow: 1;line-height: 32px; ">
							<div style="width: 280px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
									 :style="{width: (width-10)+'px'}">
								{{ w[1].code }}
							</div>
						</div>

						<div class="layout-center" style="width: 100px;line-height: 32px">{{ w[1].webGLVendor }}</div>
						<div class="layout-center" style="width: 100px;line-height: 32px">{{ w[1].webGLRenderer }}</div>
						<div class="layout-center" style="width: 120px;line-height: 32px">{{ w[1].size[0] }}X{{ w[1].size[1] }}
						</div>
						<div class="layout-center" style="width: 80px;line-height: 32px">{{ w[1].webkit }}</div>
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
	import { phoneDB } from '@/common/DB.js'
	import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons-vue'
	import { nanoid } from 'nanoid'
	import { useElementSize } from '@vueuse/core'

	const typeWidthRef = ref(null)
	const phoneList = ref([])
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

	const { width } = useElementSize(typeWidthRef)

	onMounted(() => {
		findData()
	})
	const findData = () => {
		phoneList.value = []
		phoneDB.iterate((value, key, iterationNumber) => {
			phoneList.value.push([key, value])
		}).then(res => {
			phoneList.value.sort((a, b) => {
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
	const onAddPhone = () => {
		phoneList.value.unshift([nanoid(8), {
			os: 'iPhone',
			type: '',
			code: '',
			webGLVendor:'',
			webGLRenderer:'',
			size: [0, 0],
			webkit: '',
			enable: true,
			edit: true,
		}])
	}
	const onChangeEnable = (w) => {
		const ww = JSON.parse(JSON.stringify(w))
		phoneDB.setItem(ww[0], ww[1])
	}
	const onRemove = (id) => {
		phoneDB.removeItem(id).then(res => {
			findData()
		})
	}
	const onHandleAddPhone = (e) => {
		if (e) {
			let data = phoneList.value[0]
			delete data[1].edit

			phoneDB.setItem(data[0], JSON.parse(JSON.stringify(data[1]))).then(res => {
				findData()
			})
		} else {
			phoneList.value.shift()
		}
	}
</script>
<style scoped lang="less">
	.phone {
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