<template>
	<div class="tools-bar layout-side">
		<div class="tools-button h-full layout-left-center pl-2.5">
			<img :src="logo" alt="" />{{ config.app_title }}
		</div>
		<div class="h-full layout-right-center">
			<a-tooltip placement="bottom">
				<template #title>
					<span>锁屏</span>
				</template>
				<div class="right-button reload layout-center" @click="onLock(true)">
					<LockOutlined />
				</div>
			</a-tooltip>
			<a-tooltip placement="bottom">
				<template #title>
					<span>最小化</span>
				</template>
				<div class="right-button reload layout-center" @click="onMinApp">
					<MinusOutlined />
				</div>
			</a-tooltip>
			<a-tooltip placement="bottom">
				<template #title>
					<span>关闭</span>
				</template>
				<div class="right-button close layout-center" @click="onCloseApp">
					<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
						<path
							d="M960 154.24L869.76 64 512 421.76 154.24 64 64 154.24 421.76 512 64 869.76 154.24 960 512 602.24 869.76 960 960 869.76 602.24 512z"
							fill="#000000"
						></path>
					</svg>
				</div>
			</a-tooltip>
		</div>
		<div class="w-full h-full lock-modal" v-if="locked">
			<div class="w-full h-full ">
				<div class="w-full layout-right-center" style="height: 40px">
					<a-tooltip placement="bottom">
						<template #title>
							<span>最小化</span>
						</template>
						<div class="right-button-lock reload layout-center" @click="onMinApp">
							<MinusOutlined />
						</div>
					</a-tooltip>
					<a-tooltip placement="bottom">
						<template #title>
							<span>关闭</span>
						</template>
						<div class="right-button close layout-center" @click="onCloseApp">
							<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
								<path
									d="M960 154.24L869.76 64 512 421.76 154.24 64 64 154.24 421.76 512 64 869.76 154.24 960 512 602.24 869.76 960 960 869.76 602.24 512z"
									fill="#f1f1f1"
								></path>
							</svg>
						</div>
					</a-tooltip>
				</div>
				<div class="w-full layout-center" style="height: calc(100% - 40px);color: #f1f1f1">
					<div class="layout-center">
						<div class="mb-2 w-full layout-center">请输入锁屏密码</div>
						<div class="layout-center">
							<a-input-group compact size="large" :class="{ 'shake-animation': isError }">
								<a-input-password v-model:value="lockPassword" size="large"
																	placeholder="请输入锁屏密码" style="width: 260px" />
								<a-button @click="onLock(false)">
									<template #icon>
										<svg class="icon" viewBox="0 0 1024 1024"
												 xmlns="http://www.w3.org/2000/svg" width="26" height="26">
											<path
												d="M706.206897 494.344828a35.310345 35.310345 0 0 1-35.310345-35.310345V240.128C670.896552 156.389517 595.650207 88.275862 503.172414 88.275862S335.448276 156.389517 335.448276 240.128v56.849655a35.310345 35.310345 0 0 1-70.62069 0v-56.849655C264.827586 117.442207 371.74731 17.655172 503.172414 17.655172S741.517241 117.442207 741.517241 240.128V459.034483a35.310345 35.310345 0 0 1-35.310344 35.310345z"
												fill="#C7CAC7"></path>
											<path d="M141.241379 459.034483h741.517242v564.965517H141.241379z" fill="#7383BF"
											></path>
											<path d="M512 459.034483h370.758621v564.965517H512z" fill="#6879AF"></path>
											<path
												d="M751.863172 1006.344828L865.103448 893.104552V829.793103h-98.621793l-176.551724 176.551725z"
												fill="#EBBA16"></path>
											<path d="M158.896552 829.793103v133.932138L292.82869 829.793103z" fill="#4F5970"
											></path>
											<path d="M540.001103 1006.344828l176.551725-176.551725h-161.933242l-176.551724 176.551725z"
														fill="#424A60"></path>
											<path
												d="M504.690759 829.793103h-161.933242l-171.378758 171.378759A17.602207 17.602207 0 0 1 158.896552 1006.344828h169.242482l176.551725-176.551725z"
												fill="#EACC18"></path>
											<path d="M865.103448 1006.344828v-63.311449L801.792 1006.344828z" fill="#424A60"
											></path>
											<path d="M512 872.41269L378.067862 1006.344828H512z" fill="#4F5970"></path>
										</svg>
									</template>
								</a-button>
							</a-input-group>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, ref, watch } from 'vue'
	import logo from '@/assets/logo.png'
	import {
		MinusOutlined, LockOutlined,
	} from '@ant-design/icons-vue'
	import { Empty, message, Modal } from 'ant-design-vue'
	import { ipc } from '@/utils/ipcRenderer.js'
	import { ipcApiRoute } from '@/api/main.js'
	import { networkDB } from '@/common/DB.js'
	import { useMagicKeys } from '@vueuse/core'

	const config = ref({ app_title: '工作中心' })
	const locked = ref(false)
	const lockPassword = ref('')
	const { enter } = useMagicKeys()
	const isError = ref(false)
	const currentTime = ref(0)
	const durationOfStay = ref(6* 1000)   //自定义的无操作时长5分钟
	const intervalTime = ref(null)

	watch(enter, () => {
		if (locked.value && enter.value === false) {
			onLock(false)
		}
	})
	onMounted(() => {
		networkDB.getItem('lock-screen').then(res => {
			locked.value = !!res
		})
		// currentTime.value = new Date().getTime()
		// checkouttime()
		// document.addEventListener('keydown', resetStartTime)
		// document.addEventListener('touchstart', resetStartTime)
	})

	const resetStartTime=()=>{
		console.log("dddd")
		currentTime.value = new Date().getTime();
	}
	const checkouttime=()=>{
		intervalTime.value= setInterval(()=>{
			let nowtime = new Date().getTime();
			if(nowtime - currentTime.value > durationOfStay.value){
				//特别注意：在这里要用自己独有的弹窗，不要跟项目的其他弹窗一直，否则会影响页面中别的弹窗弹起的bug
				console.log("looooong")
				return false;
			}
		},3000)
	}
	const onMinApp = () => {
		ipc.invoke(ipcApiRoute.min)
	}
	const onCloseApp = () => {
		Modal.confirm({
			title: '是否确定退出软件?',
			okText: '退出',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				ipc.invoke(ipcApiRoute.close)
			},
			onCancel() {
				console.log('Cancel')
			},
		})
	}
	const onLock = async (e) => {
		const p = await networkDB.getItem('lock-password')
		console.log(p)
		if (p) {
			if (e === false) {
				if (p !== lockPassword.value) {
					isError.value = true
					message.error({ content: '密码错误，解锁失败！', key: 'lock-screen' })
					lockPassword.value = ''
					setTimeout(() => {
						isError.value = false
					}, 1000)
					return
				}
			}
			lockPassword.value = ''
			networkDB.setItem('lock-screen', e).then(res => {
				locked.value = e
				if (res) {
					message.success({ content: '锁屏成功！', key: 'lock-screen' })
				} else {
					message.success({ content: '解锁成功！', key: 'lock-screen' })
				}
			})
		} else {
			message.info({ content: '暂未不支持锁屏，未设置锁屏密码！', key: 'lock-screen' })
		}
	}
</script>
<style scoped lang="less">
	.progress-box {
		width: 200px;
		top: 41px;
		right: 80px;
		z-index: 99;
		background-color: #fff;
		color: #666;
		border-radius: 6px;
		-webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
		box-shadow: 0 1px 6px rgba(0, 0, 0, .2);


		.progress-box-item {
			font-size: 12px;
			padding: 6px 6px;
		}

		.progress-box-item-bottom {
			border-bottom: 1px solid #f7f8fa;
		}

		.progress-box-main {
			height: 134px;
			overflow: auto;
			padding: 0 6px;
		}
	}

	.progress-box-arrow {
		top: 29px;
		right: 171px;
		color: rgba(0, 0, 0, .2);
	}

	.tools-bar {
		-webkit-app-region: drag;
		width: 100%;
		height: 40px;

		.tools-button {
			img {
				height: 24px;
				margin-right: 10px;
				margin-left: 2px;
				-webkit-app-region: drag;
			}

			a {
				-webkit-app-region: no-drag;
				font-size: 13px;
				color: #1890ff;
			}
		}

		.right-button, .right-button-lock {
			-webkit-app-region: no-drag;
			width: 40px;
			height: 40px;
			cursor: pointer;
			font-weight: 500;
			border-top-right-radius: 6px;
		}

		.right-button-lock {
			color: #ffffff;
			border-radius: 0;
		}

		.right-button:hover {
			background-color: #ffffff;
		}

		.right-button-lock:hover {
			background-color: #ffffff;
			color: #000;
		}

		.close {
			color: red;
		}

		.close:hover {
			background-color: red;
			color: white;
		}
	}

	.lock-modal {
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 99;
		left: 0;
		right: 0;
		border-radius: 6px;
		background: url("../../assets/lockbg.png") no-repeat center;
		background-size: cover;
	}

	.shake-animation {
		animation: shake-animation 1s cubic-bezier(.36, .07, .19, .97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
	}

	@keyframes shake-animation {
		10%, 90% {
			transform: translate3d(-1px, 0, 0);
		}
		20%, 80% {
			transform: translate3d(2px, 0, 0);
		}
		30%, 50%, 70% {
			transform: translate3d(-4px, 0, 0);
		}
		40%, 60% {
			transform: translate3d(4px, 0, 0);
		}
	}
</style>
