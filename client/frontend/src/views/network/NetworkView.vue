<template>
	<div class="w-full h-full network overflow-auto">
		<div class="w-full p-2  bg-white border-radius-6 relative">
			<div class="top-title">IP池配置</div>
			<div class="w-full ">
				<div class="w-full py-2 layout-left-center">
					<div class="label layout-right-center">提取密钥：</div>
					<div class="right">
						<a-input v-model:value="secret" placeholder="提取密钥" />
					</div>
				</div>
				<div class="w-full py-2 layout-left-center">
					<div class="label layout-right-center">提取数量：</div>
					<div class="right">
						<a-input-number v-model:value="num" :min="1" :max="200" />
					</div>
				</div>
				<div class="w-full py-2 layout-left-center">
					<div class="label layout-right-center">有效时长：</div>
					<div class="right">
						<a-radio-group v-model:value="time" button-style="solid">
							<a-radio-button v-for="(t,index) in timeList" :key="'type_'+index" :value="t.value">{{ t.name }}
							</a-radio-button>
						</a-radio-group>
					</div>
				</div>
				<div class="w-full py-2 layout-left-center">
					<div class="label layout-right-center">链接地址1：</div>
					<div class="right layout-left-center">
						<a-input v-model:value="url" @change="onChangeUrl" placeholder="链接地址" />
					</div>
				</div>
        <div class="w-full py-2 layout-left-center">
          <div class="label layout-right-center">链接地址2：</div>
          <div class="right layout-left-center">
            <a-input v-model:value="url1" placeholder="链接地址" />
          </div>
        </div>
				<div class="w-full layout-side">
					<div class="w-1/2 py-2 layout-left-center">
						<div class="label layout-right-center">账号：</div>
						<div class="right layout-left-center">
							<a-input v-model:value="username" placeholder="账号" />
						</div>
					</div>
					<div class="w-1/2 py-2 layout-left-center">
						<div class="label layout-right-center">密码：</div>
						<div class="right layout-left-center">
							<a-input v-model:value="password" placeholder="密码" />
						</div>
					</div>
				</div>
			</div>
			<div class="w-full py-2 layout-right-center">
				<a-button type="primary" @click="onUpdateIPPool">
					<CloudSyncOutlined />
					更新
				</a-button>
			</div>
		</div>
		<div class="w-full p-2 mt-2 bg-white border-radius-6">
			<div class="top-title">IP校验配置-IP66</div>
			<div class="w-full">
				<div class="w-full py-2 layout-left-center">
					<div class="label layout-right-center">校验地址：</div>
					<div class="right layout-left-center">
						<a-input v-model:value="verifyUrl66" placeholder="校验地址" />
					</div>
				</div>
			</div>
			<div class="w-full py-2 layout-right-center">
				<a-button type="primary" @click="onUpdateIPVerify66">
					<CloudSyncOutlined />
					更新
				</a-button>
			</div>
		</div>
		<div class="w-full p-2 mt-2 bg-white border-radius-6">
			<div class="top-title">IP校验配置-IP138</div>
			<div class="w-full">
				<div class="w-full py-2 layout-left-center">
					<div class="label layout-right-center">校验地址：</div>
					<div class="right layout-left-center">
						<a-input v-model:value="verifyUrl138" placeholder="校验地址" />
					</div>
				</div>
			</div>
			<div class="w-full py-2 layout-right-center">
				<a-button type="primary" @click="onUpdateIPVerify138">
					<CloudSyncOutlined />
					更新
				</a-button>
			</div>
		</div>
    <div class="w-full p-2 mt-2 bg-white border-radius-6">
        <div class="top-title">VPN校验配置</div>
      <div class="w-full">
        <div class="w-full py-2 layout-left-center">
          <div class="label layout-right-center">校验地址：</div>
          <div class="right layout-left-center">
            <a-input v-model:value="verifyVPNUrl" placeholder="校验地址" />
          </div>
        </div>
      </div>
      <div class="w-full py-2 layout-right-center">
        <a-button type="primary" @click="onUpdateVerifyVPNUrl">
          <CloudSyncOutlined />
          更新
        </a-button>
      </div>
    </div>
		<div class="w-full p-2 mt-2 bg-white border-radius-6">
			<div class="top-title">隐私设置</div>
			<div class="w-full">
				<div class="w-full/2 py-2 layout-left-center">
					<div class="label layout-right-center">锁屏密码：</div>
					<div class="right layout-left-center">
						<a-input v-model:value="lockPassword" placeholder="锁屏密码" />
					</div>
				</div>
			</div>
			<div class="w-full py-2 layout-right-center">
				<a-button type="primary" @click="onUpdateLockPassword">
					<LockOutlined />
					设置
				</a-button>
			</div>
		</div>
		<div class="w-full p-2 mt-2 bg-white border-radius-6">
			<div class="top-title">自动执行设置</div>
			<div class="w-full">
				<div class="w-full/2 py-2 layout-left-center">
					<div class="label layout-right-center">倒计时长：</div>
					<div class="right layout-left-center">
						<a-input-number v-model:value="autoWork" />
					</div>
				</div>
			</div>
			<div class="w-full py-2 layout-right-center">
				<a-button type="primary" @click="onUpdateAutoWork">
					<LockOutlined />
					设置
				</a-button>
			</div>
		</div>
		<div class="w-full p-2 mt-2 bg-white border-radius-6">
			<div class="top-title">浏览器设置</div>
			<div class="w-full">
				<div class="w-full/2 py-2 layout-left-center">
					<div class="label layout-right-center">倒计时长：</div>
					<div class="right layout-left-center">
						<a-switch v-model:checked="core" checked-children="默认浏览器" un-checked-children="自编译浏览器" />
					</div>
				</div>
			</div>
			<div class="w-full py-2 layout-right-center">
				<a-button type="primary" @click="onUpdateCore">
					<LockOutlined />
					设置
				</a-button>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { onMounted, ref, watch } from 'vue'
	import { CloudSyncOutlined, LockOutlined } from '@ant-design/icons-vue'
	import { getUrlParams, replaceUrlParam } from '@/utils/Utlis.js'
	import { message } from 'ant-design-vue'
	import { networkDB } from '@/common/DB.js'

	const secret = ref('')
	const num = ref(1)
	const time = ref(3)
	const timeList = ref([
		{ name: '3分钟', value: 3 },
		{ name: '5分钟', value: 5 },
		{ name: '10分钟', value: 10 },
		{ name: '15分钟', value: 15 },
		{ name: '1小时', value: 60 },
		{ name: '2小时', value: 120 },
		{ name: '4小时', value: 240 },
		{ name: '8小时', value: 480 },
		{ name: '12小时', value: 720 },
		{ name: '24小时', value: 1440 },
	])
	const url = ref('')
  const url1 = ref('')
	const username = ref('')
	const password = ref('')
	const appCode = ref('')
	const verifyUrl66 = ref('')
	const verifyUrl138 = ref('')
	const lockPassword = ref('')
	const autoWork = ref(0)
	const core = ref(true)
  const verifyVPNUrl = ref('')

	onMounted(async () => {
		const ip = await networkDB.getItem('api-pool')
    const ip1 = await networkDB.getItem('api-pool1')
		const verify66 = await networkDB.getItem('api-verify-66')
		const verify138 = await networkDB.getItem('api-verify-138')
    const verifyVPN = await networkDB.getItem('api-verify-vpn')
		lockPassword.value = await networkDB.getItem('lock-password')
		autoWork.value = await networkDB.getItem('autoWork')
		const c = await networkDB.getItem('core')
		core.value = c !== null ? c : true
		if (!autoWork.value) {
			autoWork.value = 0
		}
		if (ip) {
			url.value = ip.url
			username.value = ip.username
			password.value = ip.password
			const urlParams = getUrlParams(new URL(url.value))
			secret.value = urlParams.secret
			time.value = parseInt(urlParams.time)
			num.value = parseInt(urlParams.num)
		}
    url1.value = ip1.url
		if (verify66) {
			verifyUrl66.value = verify66.verifyUrl
		}
		if (verify138) {
			verifyUrl138.value = verify138.verifyUrl
		}
    if (verifyVPN) {
      verifyVPNUrl.value = verifyVPN.verifyUrl
    }
	})
	// watch(secret, () => {
	// 	url.value = replaceUrlParam(url.value, 'secret', secret.value)
	// })
	// watch(time, () => {
	// 	url.value = replaceUrlParam(url.value, 'time', time.value)
	// })
	// watch(num, () => {
	// 	url.value = replaceUrlParam(url.value, 'num', num.value)
	// })
	watch(appCode, () => {
		// verifyUrl.value = replaceUrlParam(verifyUrl.value, 'AppCode', appCode.value)
	})
	const onChangeUrl = () => {
		const urlParams = getUrlParams(new URL(url.value))
		secret.value = urlParams.secret
		time.value = parseInt(urlParams.time)
		num.value = parseInt(urlParams.num)
	}
	const onUpdateIPPool = () => {
		networkDB.setItem('api-pool', {
			url: url.value,
			username: username.value,
			password: password.value,
		}).then(res => {
			message.success('IP池配置更新成功！')
		})
    networkDB.setItem('api-pool1', {
      url: url1.value,
      username: username.value,
      password: password.value,
    }).then()
	}
	const onUpdateIPVerify66 = (() => {
		networkDB.setItem('api-verify-66', {
			verifyUrl: verifyUrl66.value,
		}).then(res => {
			message.success('IP校验配置更新成功！')
		})
	})
	const onUpdateIPVerify138 = (() => {
		networkDB.setItem('api-verify-138', {
			verifyUrl: verifyUrl138.value,
		}).then(res => {
			message.success('IP校验配置更新成功！')
		})
	})
  const onUpdateVerifyVPNUrl = (() => {
    networkDB.setItem('api-verify-vpn', {
      verifyUrl: verifyVPNUrl.value,
    }).then(res => {
      message.success('IP VPN校验配置更新成功！')
    })
  })
	const onUpdateLockPassword = () => {
		networkDB.setItem('lock-password', lockPassword.value).then(() => {
			message.success('锁屏密码设置成功！')
		})
	}
	const onUpdateAutoWork = () => {
		networkDB.setItem('autoWork', autoWork.value).then(() => {
			message.success('锁屏密码设置成功！')
		})
	}
	const onUpdateCore = () => {
		networkDB.setItem('core', core.value).then(() => {
			message.success('浏览器设置成功！')
		})
	}
</script>
<style scoped lang="less">
	.network {
		font-size: 13px;

		.jy {
		}

		.label {
			width: 100px;
		}

		.right {
			width: calc(100% - 100px);
		}
	}

</style>