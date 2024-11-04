<template>
	<div class="w-full h-full bg-white border-radius-6 workspace">
		<div class="top-title layout-side">
			<div class="layout-left-center">工作台 -
				<div style="font-size: 13px">
					<a-dropdown>
						<a class="ant-dropdown-link" @click.prevent>
							{{ nowDay }}
							<DownOutlined />
						</a>
						<template #overlay>
							<a-menu>
								<a-menu-item v-for="(d,index) in days" :key="'day_'+index">
									<a href="javascript:" @click="onChangeNowDay(d.value)">{{ d.value }}</a>
								</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</div>
			</div>
			<div class="h-full layout-right-center">
				<a-input placeholder="请在此输入工作链接" v-model:value="workUrl" style="width: 320px;margin-right: 0.25rem"
								 @blur="onChangeWorkUrl"
								 addon-before="工作链接" />
				<a-switch v-model:checked="isWifi" checked-children="wifi" un-checked-children="无限制" />
				<a-button type="primary" @click="onAddWorkspace('Android')">
					<AndroidOutlined />
				</a-button>
				<a-button class="ml-1" type="primary" @click="onAddWorkspace('iPhone')">
					<AppleOutlined />
				</a-button>
				<a-button class="ml-1 layout-center" type="primary" @click="onAddWorkspace(getRandomType())">
					<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
						<path
							d="M768.863 325.733c-48.775 0-170.409 121.182-259.229 207.077-134.661 130.244-261.862 256.802-363.67 256.802h-62.62C57.75 789.612 37 768.828 37 743.223c0-25.604 20.749-46.387 46.342-46.387h62.622c64.335 0 194.592-129.518 299.256-230.745 127.382-123.198 237.392-233.135 323.643-233.135h59.769l-63.418-61.55c-18.113-18.088-18.142-45.665-0.062-63.788 18.08-18.128 47.422-18.164 65.535-0.07l142.708 142.495A46.306 46.306 0 0 1 987 282.83c0 12.308-4.893 24.06-13.604 32.759l-142.71 142.4c-9.043 9.032-20.89 13.328-32.735 13.328-11.875 0-23.749-4.977-32.799-14.05-18.08-18.121-18.05-48.358 0.062-66.445l63.417-65.09h-59.768z m61.824 238.627c-18.113-18.095-47.456-18.066-65.535 0.062-18.08 18.121-18.05 49.237 0.062 67.323l63.417 65.09h-59.768c-38.06 0-101.643-56.357-164.685-115.353-18.69-17.493-48.021-17.394-65.495 1.306-17.486 18.7-16.507 49.382 2.183 66.87 96.042 89.898 160.826 139.952 227.997 139.952h59.769l-63.418 61.549c-18.113 18.087-18.142 46.552-0.062 64.674 9.051 9.072 20.924 13.167 32.799 13.167 11.845 0 23.692-4.74 32.736-13.773l142.708-142.619c8.71-8.7 13.604-20.56 13.604-32.87a46.44 46.44 0 0 0-13.604-32.842L830.687 564.36zM83.342 325.733h62.622c48.84 0 121.646 62.22 179.612 114.893 8.88 8.065 20.026 12.923 31.147 12.923 12.604 0 25.172-4.677 34.315-14.75 17.208-18.954 15.8-49.839-3.146-67.055-90.646-82.365-166.477-138.787-241.928-138.787H83.342C57.749 232.957 37 253.743 37 279.346s20.75 46.387 46.342 46.387z"
							fill="#ffffff" data-spm-anchor-id="a313x.search_index.0.i3.61453a81Vy8RmH"
							class="selected"></path>
					</svg>
				</a-button>
			</div>
		</div>
		<div class="w-full workspace-statistics p-2 layout-center" style="font-weight: bold">
			<a-row class="w-full">
				<a-col :span="12" class="layout-left-center pl-6">
					<svg class="icon" viewBox="0 0 1024 1024"
							 xmlns="http://www.w3.org/2000/svg" width="19"
							 height="19">
						<path
							d="M887.004 321.256c-34.334 0-62.18 28.273-62.18 63.15v246.79c0 34.876 27.846 63.149 62.18 63.149 34.346 0 62.186-28.273 62.186-63.149v-246.79c-0.001-34.876-27.84-63.15-62.186-63.15z m-750.011 0c-34.34 0-62.183 28.273-62.183 63.15v246.79c0 34.876 27.842 63.149 62.183 63.149 34.34 0 62.18-28.273 62.18-63.149v-246.79c-0.001-34.876-27.84-63.15-62.18-63.15z m99.598 452.797c0 26.778 21.71 48.488 48.491 48.488h55.396v137.303c0 34.883 27.843 63.156 62.183 63.156 34.343 0 62.183-28.273 62.183-63.156V822.541h96.777v137.303c0 34.883 27.846 63.156 62.18 63.156 34.346 0 62.186-28.273 62.186-63.156V822.541h55.395c26.789 0 48.492-21.71 48.492-48.488V323.168H236.591v450.885zM643.148 89.528l51.113-74.19c3.031-4.409 2.277-10.196-1.689-12.93-3.967-2.728-9.645-1.373-12.676 3.036l-53.094 77.067C591.818 68.728 552.945 61.046 512 61.046c-40.949 0-79.821 7.682-114.806 21.465l-53.09-77.067c-3.034-4.409-8.709-5.764-12.676-3.036-3.966 2.734-4.72 8.523-1.684 12.93l51.108 74.19c-81.256 37.801-138.242 109.626-145.493 193.459h553.282c-7.254-83.833-64.241-155.658-145.493-193.459z m-247.86 116.929c-16.908 0-30.613-13.703-30.613-30.613 0-16.905 13.706-30.613 30.613-30.613s30.61 13.706 30.61 30.613c0 16.906-13.702 30.613-30.61 30.613z m237.251 0c-16.904 0-30.607-13.703-30.607-30.613 0-16.905 13.697-30.613 30.607-30.613s30.613 13.706 30.613 30.613c0 16.906-13.703 30.613-30.613 30.613z"
							fill="#31C37C"></path>
					</svg>&nbsp;&nbsp;
					总数：{{ statistics[0] }}，占比：{{ statistics[2] }}%，成功：{{ statistics[4] }}，失败：{{ statistics[6] }}
				</a-col>
				<a-col :span="12" class="layout-right-center pr-6">
					总数：{{ statistics[1] }}，占比：{{ statistics[3] }}%，成功：{{ statistics[5] }}，失败：{{ statistics[7] }}
					&nbsp;&nbsp;<svg class="icon" viewBox="0 0 1024 1024"
													 xmlns="http://www.w3.org/2000/svg" width="19" height="19">
					<path d="M0 0h1024v1024H0z" fill="#FFFFFF" fill-opacity="0"></path>
					<path
						d="M512.213333 250.752c1.877333-49.92 16.469333-93.696 43.434667-130.304 27.050667-36.821333 71.808-62.976 133.12-77.781333 0.384 1.792 0.810667 3.626667 1.28 5.418666v9.472c0 21.504-5.461333 46.122667-16.213333 73.258667-11.178667 26.24-28.757333 50.901333-52.053334 73.216-21.802667 19.626667-41.984 32.64-59.818666 38.528-5.888 1.706667-13.952 3.328-23.68 4.821333-8.661333 1.28-17.365333 2.432-26.069334 3.370667zM522.410667 324.736c-69.205333 0-117.248-58.752-185.514667-58.752C268.629333 265.984 128 326.229333 128 534.186667s124.885333 341.930667 138.837333 357.546666c13.994667 15.658667 46.293333 55.893333 96.341334 55.893334s104.832-38.186667 159.232-38.186667c54.4 0 122.88 38.186667 167.594666 38.186667s63.104-17.493333 93.525334-47.701334c30.421333-30.165333 88.448-122.24 108.714666-177.493333-33.365333-19.114667-121.856-70.912-121.856-188.245333 0-78.250667 29.781333-143.232 89.344-194.986667-39.082667-48.810667-84.394667-73.216-135.936-73.216-77.354667 0-132.181333 58.752-201.386666 58.752z"
						fill="#275EFE" data-spm-anchor-id="a313x.search_index.0.i4.380d3a81d2UrGQ"
						class="selected"></path>
				</svg>
				</a-col>
				<a-col :span="24" class="layout-left-center pl-6 pt-1">
					自动执行：{{ statistics[8] + statistics[9] }}，手动执行：{{ statistics[12] + statistics[13]
					}}，苹果：{{ statistics[10] }}%，安卓：{{ statistics[11] }}%
				</a-col>
			</a-row>
		</div>
		<div class="workspace-content w-full overflow-auto pr-2 pb-2 pl-2">
			<div class="w-full workspace-content-box" v-for="(w,index) in workspace" :key="'workspace_'+index">
				<div class="w-full workspace-content-box-item layout-center" v-if="w.loading">
					数据生成中{{ w.type === 0 ? '，获取IP中...' : '，获取IP成功，正在校验IP中...' }}
				</div>
				<div class="w-full workspace-content-box-item layout-side relative" v-else>
					<div class="left">
						<a-row class="item w-full">
							<a-col class="layout-left-center" :span="8">
								<div class="label layout-right-center">系统：</div>
								<svg v-if="w.os==='Android'" class="icon" viewBox="0 0 1024 1024"
										 xmlns="http://www.w3.org/2000/svg" width="19"
										 height="19">
									<path
										d="M887.004 321.256c-34.334 0-62.18 28.273-62.18 63.15v246.79c0 34.876 27.846 63.149 62.18 63.149 34.346 0 62.186-28.273 62.186-63.149v-246.79c-0.001-34.876-27.84-63.15-62.186-63.15z m-750.011 0c-34.34 0-62.183 28.273-62.183 63.15v246.79c0 34.876 27.842 63.149 62.183 63.149 34.34 0 62.18-28.273 62.18-63.149v-246.79c-0.001-34.876-27.84-63.15-62.18-63.15z m99.598 452.797c0 26.778 21.71 48.488 48.491 48.488h55.396v137.303c0 34.883 27.843 63.156 62.183 63.156 34.343 0 62.183-28.273 62.183-63.156V822.541h96.777v137.303c0 34.883 27.846 63.156 62.18 63.156 34.346 0 62.186-28.273 62.186-63.156V822.541h55.395c26.789 0 48.492-21.71 48.492-48.488V323.168H236.591v450.885zM643.148 89.528l51.113-74.19c3.031-4.409 2.277-10.196-1.689-12.93-3.967-2.728-9.645-1.373-12.676 3.036l-53.094 77.067C591.818 68.728 552.945 61.046 512 61.046c-40.949 0-79.821 7.682-114.806 21.465l-53.09-77.067c-3.034-4.409-8.709-5.764-12.676-3.036-3.966 2.734-4.72 8.523-1.684 12.93l51.108 74.19c-81.256 37.801-138.242 109.626-145.493 193.459h553.282c-7.254-83.833-64.241-155.658-145.493-193.459z m-247.86 116.929c-16.908 0-30.613-13.703-30.613-30.613 0-16.905 13.706-30.613 30.613-30.613s30.61 13.706 30.61 30.613c0 16.906-13.702 30.613-30.61 30.613z m237.251 0c-16.904 0-30.607-13.703-30.607-30.613 0-16.905 13.697-30.613 30.607-30.613s30.613 13.706 30.613 30.613c0 16.906-13.703 30.613-30.613 30.613z"
										fill="#31C37C"></path>
								</svg>
								<svg v-if="w.os==='iPhone'" class="icon" viewBox="0 0 1024 1024"
										 xmlns="http://www.w3.org/2000/svg" width="19" height="19">
									<path d="M0 0h1024v1024H0z" fill="#FFFFFF" fill-opacity="0"></path>
									<path
										d="M512.213333 250.752c1.877333-49.92 16.469333-93.696 43.434667-130.304 27.050667-36.821333 71.808-62.976 133.12-77.781333 0.384 1.792 0.810667 3.626667 1.28 5.418666v9.472c0 21.504-5.461333 46.122667-16.213333 73.258667-11.178667 26.24-28.757333 50.901333-52.053334 73.216-21.802667 19.626667-41.984 32.64-59.818666 38.528-5.888 1.706667-13.952 3.328-23.68 4.821333-8.661333 1.28-17.365333 2.432-26.069334 3.370667zM522.410667 324.736c-69.205333 0-117.248-58.752-185.514667-58.752C268.629333 265.984 128 326.229333 128 534.186667s124.885333 341.930667 138.837333 357.546666c13.994667 15.658667 46.293333 55.893333 96.341334 55.893334s104.832-38.186667 159.232-38.186667c54.4 0 122.88 38.186667 167.594666 38.186667s63.104-17.493333 93.525334-47.701334c30.421333-30.165333 88.448-122.24 108.714666-177.493333-33.365333-19.114667-121.856-70.912-121.856-188.245333 0-78.250667 29.781333-143.232 89.344-194.986667-39.082667-48.810667-84.394667-73.216-135.936-73.216-77.354667 0-132.181333 58.752-201.386666 58.752z"
										fill="#275EFE" data-spm-anchor-id="a313x.search_index.0.i4.380d3a81d2UrGQ"
										class="selected"></path>
								</svg>
							</a-col>
							<a-col class="layout-left-center" :span="9">
								<div class="label layout-right-center">机型：</div>
								{{ w.type }}
							</a-col>
							<a-col class="layout-left-center" :span="7">
								<div class="label layout-right-center">屏幕尺寸：</div>
								{{ w.size[0] }}*{{ w.size[1] }}
							</a-col>
						</a-row>
						<a-row class="item w-full">
							<a-col class="layout-left-center" :span="8">
								<div class="label layout-right-center">微信：</div>
								{{ w.version }}
							</a-col>
							<a-col class="layout-left-center" :span="8">
								<div class="label layout-right-center">构建版本：</div>
								{{ w.build }}
							</a-col>
						</a-row>
						<a-row class="item w-full" v-if="w.os === 'Android'">
							<a-col class="layout-left-center" :span="8">
								<div class="label layout-right-center">浏览器：</div>
								{{ w.browser.version }}
							</a-col>
							<a-col class="layout-left-center" :span="9">
								<div class="label layout-right-center">XWEB：</div>
								{{ w.wechat.xweb }}
							</a-col>
							<a-col class="layout-left-center" :span="7">
								<div class="label layout-right-center">mmwebsdk：</div>
								{{ w.wechat.mmwebsdk }}
							</a-col>
						</a-row>
						<a-row class="item w-full">
							<a-col class="layout-left-center" :span="8">
								<div class="label layout-right-center">IP地址：</div>
								{{ w.rip ? w.rip : w.ip }}:{{ w.port }}
							</a-col>
							<a-col class="layout-left-center" :span="9">
								<div class="label layout-right-center">IP类型：</div>
								{{ w.ipType ? w.ipType.toString() : '暂无' }}
							</a-col>
							<a-col class="layout-left-center" :span="7">
								<div class="label layout-right-center">有效时长：</div>
								{{ ipDuration }}分钟
							</a-col>
						</a-row>
						<a-row class="item w-full">
							<!--							<a-col class="layout-left-center" :span="8">-->
							<!--								<div class="label layout-right-center">IP商家：</div>-->
							<!--								{{ w.ipAddress ? w.isp : '暂无' }}-->
							<!--							</a-col>-->
							<a-col class="layout-left-center" :span="8">
								<div class="label layout-right-center">头次数：</div>
								{{ w.coIp ? w.coIp : 0 }}
							</a-col>
							<a-col class="layout-left-center" :span="9">
								<div class="label layout-right-center">IP位置：</div>
								{{ w.ipAddress ? w.ipAddress : '暂无' }}
							</a-col>
							<a-col class="layout-left-center" :span="7">
								<div class="label layout-right-center">剩余时长：</div>
								<template v-if="Date.now() - w.time >= 0">
									<span style="color: red">已失效</span>
								</template>
								<template v-else>
									<a-statistic-countdown :value="w.time" style="line-height: normal"
																				 :value-style="{ color: '#1676fd',fontSize:'14px' }"
																				 @finish="onWorkTimeFinish(w)">
									</a-statistic-countdown>
								</template>
							</a-col>
						</a-row>
						<div class="item w-full layout-left-top">
							<div class="label layout-right-center">UA：</div>
							<div class="item-ua">{{ w.ua }}</div>
						</div>
						<div class="item w-full layout-left-top">
							<div class="label layout-right-center">工作链接：</div>
							<div style="width: calc(100% - 70px)">{{ w.url }}</div>
						</div>
					</div>
					<div class="right layout-left-top">
						<div @click="onRefreshIp(w,index)" class="w-full h-1/4 layout-center cursor-pointer"
								 style="background-color: #64a3ff;color: #ffffff;border-radius: 6px 6px 0 0;border-bottom: 1px solid #ccc">
							刷新IP
						</div>
						<div @click="onRefreshUA(w,index)" class="w-full h-1/4 layout-center cursor-pointer"
								 style="background-color: #64a3ff;color: #ffffff;border-bottom: 1px solid #ccc">
							刷新UA
						</div>
						<div @click="onDeleteWork(w,index)" class="w-full h-1/4 layout-center cursor-pointer"
								 style="background-color: #64a3ff;color: #ffffff;border-bottom: 1px solid #ccc">
							删除任务
						</div>
						<template v-if="w.status === 0">
							<template v-if="w.ipType[0] === '家庭宽带' && w.ipType[1] === '城域网' && w.coIp<2">
								<div class="w-full h-1/4 layout-center cursor-pointer"
										 style="color: #ffffff;border-radius: 0 0 6px 6px;"
										 :style="{ backgroundColor: '#64a3ff'}">
									<a-statistic-countdown :value="w.countdown" style="line-height: normal"
																				 :value-style="{ color: '#ffffff',fontSize:'14px' }"
																				 @finish="onRun(w,index)">
									</a-statistic-countdown>
								</div>
							</template>
							<template v-else>
								<div @click="onRun(w,index)" class="w-full h-1/4 layout-center cursor-pointer"
										 style="color: #ffffff;border-radius: 0 0 6px 6px;"
										 :style="{ backgroundColor: '#64a3ff'}">
									执行任务
								</div>
							</template>
						</template>
						<div v-else @click="onRun(w,index)" class="w-full h-1/4 layout-center cursor-pointer"
								 :class="[(w.status === 1 || w.status === 2)?'horse_run':'']"
								 style="color: #ffffff;border-radius: 0 0 6px 6px;"
								 :style="{backgroundColor: w.status === 1 ? '#FF9800' : w.status === 2 ? '#4CAF50' : '#9E9E9E'}">
							{{ w.status === 1 ? '任务启动中' : w.status === 2 ? '任务执行中' : w.status === 3 ? '任务完成' : '任务失败'
							}}
						</div>
					</div>
					<div class="absolute layout-center" v-if="w.refresh"
							 style="top: 0;left: 0;right: 0;bottom: -1px; background-color: rgb(255 255 255 / 80%)">
						<LoadingOutlined style="font-size: 24px;margin-right: 12px" />
						数据刷新中...
					</div>
					<div class="absolute tips" :style="{backgroundColor: w.os==='Android'?'rgb(49,193,123)':'rgb(22, 119, 255)'}">
						{{ workspace.length - index }}
					</div>
				</div>
			</div>
		</div>
		<div @click="onClearWorkspace()" style="position: fixed;bottom: 12px;left: 12px;cursor: pointer">
			<svg t="1729923225849" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					 p-id="4176" width="32" height="32">
				<path d="M1024 512c0 282.8-229.2 512-512 512S0 794.8 0 512 229.2 0 512 0s512 229.2 512 512" fill="#FF0000"
							p-id="4177"></path>
				<path d="M428 424h48v208h-48zM548 424h48v208h-48z" fill="#FFFFFF" p-id="4178"></path>
				<path
					d="M736.96 240H646.8l-41.68-82.8A24.064 24.064 0 0 0 583.68 144H441.36c-8.96 0-17.2 5.04-21.36 13.04L377.36 240H212v48h51.04v520c0 13.28 10.72 24 24 24h450c13.28 0 24-10.72 24-24V288h51.04v-48h-75.12zM456 192h112.88l24.16 48H431.36L456 192z m256.96 592H311.04V288H712.96v496z"
					fill="#FFFFFF" p-id="4179"></path>
			</svg>
		</div>
	</div>
</template>
<script setup>
	import { AndroidOutlined, AppleOutlined, LoadingOutlined, DownOutlined } from '@ant-design/icons-vue'
	import { phoneDB, wechatDB, browserDB, networkDB, workspaceDB, workspaceBaseDB, configDB } from '@/common/DB.js'
	import { onMounted, ref, watch, computed } from 'vue'
	import { getRandomInt, getRandomNumber, getRandomType, getUrlParams } from '@/utils/Utlis.js'
	import { IpPool } from '@/utils/IpPool.js'
	import dayjs from 'dayjs'
	import { ipc } from '@/utils/ipcRenderer.js'
	import { workspaceApiRoute } from '@/api/main.js'
	import { nanoid } from 'nanoid'
	import { message, Modal } from 'ant-design-vue'

	const phoneData = ref(new Map([['Android', []], ['iPhone', []]]))
	const wechatData = ref(new Map([['Android', []], ['iPhone', []]]))
	const browserData = ref([])
	const networkData = ref(new Map([['api-pool', {}], ['api-verify', {}], ['api-verify-66', {}], ['api-verify-138', {}]]))
	const workspace = ref([])
	const ipPool = ref(null)
	const ipDuration = ref(3)
	const nowDay = ref(dayjs().format('YYYYMMDD'))
	const days = ref([])
	const workUrl = ref('')
	const webIds = ref([])
	const ips = ref(new Map())
	const autoWork = ref(0)
	const isWifi = ref(true)
	const core = ref(true)

	watch(workUrl, () => {
		webIds.value = []
		ips.value = new Map()
	})
	const statistics = computed(() => {
		let a = 0
		let as = 0
		let ae = 0
		let i = 0
		let is = 0
		let ie = 0
		let c = 0
		let auto_a = 0
		let auto_i = 0
		let auto_no_a = 0
		let auto_no_i = 0
		workspace.value.forEach((value, index) => {
			if (value.os === 'Android') {
				if (value.status === 3) {
					if (value.ipType[0] === '家庭宽带' && value.ipType[1] === '城域网' && value.coIp < 2) {
						auto_a++
					} else {
						auto_no_a++
					}
					as++
				} else if (value.status === 4) {
					ae++
				}
				a++
				c++
			} else if (value.os === 'iPhone') {
				if (value.status === 3) {
					if (value.ipType[0] === '家庭宽带' && value.ipType[1] === '城域网' && value.coIp < 2) {
						auto_i++
					} else {
						auto_no_i++
					}
					is++
				} else if (value.status === 4) {
					ie++
				}
				i++
				c++
			}

		})
		const ab = (a / c * 100)
		const ib = (i / c * 100)
		const aa = ((auto_a + auto_no_a) / (auto_a + auto_i + auto_no_a + auto_no_i) * 100)
		const ia = ((auto_i + auto_no_i) / (auto_a + auto_i + auto_no_a + auto_no_i) * 100)
		return [a, i, !isNaN(ab) ? ab.toFixed(2) : 0, !isNaN(ib) ? ib.toFixed(2) : 0, as, is, ae, ie,
			auto_a, auto_i, !isNaN(aa) ? aa.toFixed(2) : 0, !isNaN(ia) ? ia.toFixed(2) : 0,
			auto_no_a, auto_no_i]
	})

	ipc.on(workspaceApiRoute.workMsg, (event, result) => {
		if (result.type === 'running') {
			workspace.value.filter(item => {
				if (result.id === item.id) {
					item.status = 2
					workspaceDB(nowDay.value).setItem(result.id, JSON.parse(JSON.stringify(item)))
				}
			})
		} else if (result.type === 'error') {
			// let msg = ''
			// if (result.message.includes('ERR_TUNNEL_CONNECTION_FAILED')) {
			// 	msg = '代理IP连接失败，请检测当前IP是否已过期！'
			// } else if (result.message.includes('net::ERR_ABORTED')) {
			// 	msg = '任务由于网络原因被异常中止！'
			// } else if (result.message.includes('Most likely the page has been closed')) {
			// 	msg = '任务会话已关闭！'
			// } else {
			// 	msg = result.message
			// }
			// message.error(`任务【${result.id}】执行失败:` + msg)
			workspace.value.filter(item => {
				if (result.id === item.id) {
					item.status = 4
					workspaceDB(nowDay.value).setItem(result.id, JSON.parse(JSON.stringify(item)))
				}
			})
		} else if (result.type === 'success') {
			// message.success(`任务【${result.id}】执行成功`)
			workspace.value.filter(item => {
				if (result.id === item.id) {
					item.status = 3
					workspaceDB(nowDay.value).setItem(result.id, JSON.parse(JSON.stringify(item)))
				}
			})
		}
	})
	watch(nowDay, () => {
		workspace.value = []
		workspaceDB(nowDay.value).iterate((value, key) => {
			workspace.value.push(value)
		}).then(res => {
			workspace.value.sort((a, b) => b.createTime - a.createTime)
		})
	})
	onMounted(async () => {
		const res = await configDB.getItem('workspaceUrl')
		if (res) {
			workUrl.value = res
		}
		workspaceBaseDB.setItem(`${nowDay.value}`, nowDay.value)
		workspaceBaseDB.iterate((value, key) => {
			days.value.push({ key, value })
		}).then(res => {
			days.value.sort((a, b) => b.value - a.value)
		})
		workspaceDB(nowDay.value).iterate((value, key) => {
			workspace.value.push(value)
			if (value.url === workUrl.value) {
				const ip3 = getFirstThreeSegmentsOfIP(value.rip ? value.rip : value.ip)
				let newVar = ips.value.get(ip3)
				if (newVar) {
					newVar = newVar + 1
				} else {
					newVar = 1
				}
				ips.value.set(ip3, newVar)
			}
		}).then(res => {
			workspace.value.sort((a, b) => b.createTime - a.createTime)
		})
		phoneData.value = new Map([['Android', []], ['iPhone', []]])
		wechatData.value = new Map([['Android', []], ['iPhone', []]])
		browserData.value = []
		networkData.value = new Map([['api-pool', {}], ['api-verify-66', {}], ['api-verify-138', {}]])
		phoneDB.iterate((value, key) => {
			if (value.enable) {
				phoneData.value.get(value.os).push(value)
			}
		})
		wechatDB.iterate((value, key) => {
			if (value.enable) {
				wechatData.value.get(value.os).push(value)
			}
		})
		browserDB.iterate((value, key) => {
			if (value.enable) {
				browserData.value.push(value)
			}
		})
		networkDB.iterate((value, key) => {
			if (networkData.value.get(key)) {
				networkData.value.get(key).value = value
			} else if (key === 'core') {
				core.value = value !== null ? value : true
			}
		}).then(() => {
			const urlParams = getUrlParams(new URL(networkData.value.get('api-pool').value.url))
			ipDuration.value = urlParams.time
			ipPool.value = new IpPool({
				ipUrl: networkData.value.get('api-pool').value.url,
				verifyUrl66: networkData.value.get('api-verify-66').value.verifyUrl,
				verifyUrl138: networkData.value.get('api-verify-138').value.verifyUrl,
			})
		})
		autoWork.value = await networkDB.getItem('autoWork')

	})
	const onChangeWorkUrl = () => {
		configDB.setItem('workspaceUrl', workUrl.value)
	}
	const onChangeNowDay = (e) => {
		nowDay.value = e
	}
	const onWorkTimeFinish = (w) => {
		w.time = 0
	}
	const getFirstThreeSegmentsOfIP = (ipAddress) => {
		return ipAddress.split('.').slice(0, 3).join('.')
	}
	const onAddWorkspace = (e) => {
		if (!workUrl.value) {
			message.error('添加失败，工作链接不能为空！')
			return
		}
		const id = nanoid(8)
		workspace.value.unshift({ id: id, loading: true, type: 0 })
		let phoneList = phoneData.value.get(e)
		let wechatList = wechatData.value.get(e)
		let phone = phoneList[getRandomInt(phoneList.length)]
		let wechat = wechatList[getRandomInt(wechatList.length)]
		getIp(id, (time, d, res1, res2) => {
			const ip3 = getFirstThreeSegmentsOfIP(d.rip ? d.rip : d.ip)
			let newVar = ips.value.get(ip3)
			if (newVar) {
				newVar = newVar + 1
			} else {
				newVar = 1
			}
			ips.value.set(ip3, newVar)
			const { ua, browser } = getUserAgent(e, phone, wechat, res2.data.data[7])
			const number = workspace.value.findIndex(item => item.id === id)
			const item = {
				id,
				os: e,
				type: phone.type,
				size: phone.size,
				wr: phone.webGLRenderer,
				wv: phone.webGLVendor,
				version: wechat.version,
				build: wechat.build,
				browser: browser,
				wechat: wechat,
				ua: ua,
				ip: d.ip,
				rip: d.rip,
				port: d.port,
				coIp: newVar,
				ipType: [res1.data.data.scenes.usage_type, res2.data.data[7] ? res2.data.data[7] : '未知'],
				isp: res2.data.data[4],
				ipAddress: res2.data.data[1] + res2.data.data[2] + res2.data.data[3],
				time: time,
				status: 0,
				url: workUrl.value,
				createTime: dayjs().valueOf(),
				countdown: Date.now() + 1000 * autoWork.value,
				refresh: false,
			}
			workspaceDB(nowDay.value).setItem(id, JSON.parse(JSON.stringify(item)))
			workspace.value[number] = item
		})
	}
	const getIp = (id, callback) => {
		ipPool.value.acquireIP().then(res => {
			workspace.value.forEach(item => {
				if (item.id === id) {
					item.type = 1
				}
			})
			const time = Date.now() + 1000 * 60 * ipDuration.value
			const d = res.data.data[0]
			ipPool.value.verifyIP66(d.rip ? d.rip : d.ip).then(res1 => {
				if (res1.data.code === 200) {
					if (isWifi.value && res1.data.data.scenes.usage_type !== '家庭宽带') {
						getIp(id, callback)
					} else {
						ipPool.value.verifyIP138(d.rip ? d.rip : d.ip).then(res2 => {
							if (res2.status === 200) {
								if (isWifi.value && res2.data.data[7] !== '城域网') {
									getIp(id, callback)
								} else {
									callback(time, d, res1, res2)
								}
							} else {
								workspace.value.shift()
								message.error({ content: 'IP136:' + res2.data.msg, key: 'work' })
							}
						}).catch(error => {
							workspace.value.shift()
							message.error({ content: 'IP136错误', key: 'work' })
						})
					}
				} else {
					workspace.value.shift()
					message.error({ content: 'IP66:' + res1.data.msg, key: 'work' })
				}
			}).catch(error => {
				workspace.value.shift()
				message.error({ content: 'IP66错误', key: 'work' })
			})
		}).catch(error => {
			workspace.value.shift()
			message.error({ content: error.response.data.msg, key: 'work' })
		})
	}
	const getUserAgent = (e, phone, wechat, netType) => {
		let HEAD = ''
		let MAC = ''
		let TAI = ''
		let WXV = ''
		let browserSelect = null
		if (e === 'Android') {
			browserSelect = browserData.value[getRandomInt(browserData.value.length)]
			HEAD = 'Linux'
			MAC = phone.code + '; wv'
			WXV = ` Version/4.0 Chrome/${browserSelect.version} Mobile Safari/${phone.webkit} XWEB/${wechat.xweb} MMWEBSDK/${wechat.mmwebsdk} MMWEBID/${getWEBID()} MicroMessenger/${wechat.version}(${wechat.build}) WeChat/arm64 Weixin`
			TAI = ' ABI/arm64'
		} else if (e === 'iPhone') {
			HEAD = 'iPhone'
			MAC = phone.code
			WXV = ` Mobile/15E148 MicroMessenger/${wechat.version}(${wechat.build})`
		}
		return {
			ua: `Mozilla/5.0 (${HEAD}; ${MAC}) AppleWebKit/${phone.webkit} (KHTML, like Gecko)${WXV} NetType/${netType === '城域网' ? 'WIFI' : '4G'} Language/zh_CN${TAI}`,
			browser: browserSelect,
		}
	}
	const getWEBID = () => {
		const id = getRandomNumber(1, 9999)
		if (webIds.value.findIndex(i => i === id) === -1) {
			return id
		} else {
			return getWEBID()
		}
	}
	const onRefreshIp = (w, index) => {
		w.refresh = true
		ipPool.value.acquireIP().then(res => {
			w.time = Date.now() + 1000 * 60 * ipDuration.value
			const d = res.data.data[0]
			ipPool.value.verifyIP66(d.rip ? d.rip : d.ip).then(res1 => {
				if (res1.data.code === 200) {
					ipPool.value.verifyIP138(d.rip ? d.rip : d.ip).then(res2 => {
						if (res2.status === 200) {
							const ip3 = getFirstThreeSegmentsOfIP(d.rip ? d.rip : d.ip)
							let newVar = ips.value.get(ip3)
							if (newVar) {
								newVar = newVar + 1
							} else {
								newVar = 1
							}
							ips.value.set(ip3, newVar)
							w.ip = d.ip
							w.rip = d.rip
							w.port = d.port
							w.coIp = newVar
							w.ipType = [res.data.data.netWorkType, res1.data.data.scenes.usage_type, res2.data.data[7] ? res2.data.data[7] : '未知']
							w.isp = res.data.data.isp
							w.ipAddress = d.prov + d.city
							w.refresh = false
							w.countdown = Date.now() + 1000 * autoWork.value
							workspaceDB(nowDay.value).setItem(w.id, JSON.parse(JSON.stringify(w)))
						} else {
							w.refresh = false
							message.error({ content: 'IP136:' + res2.data.msg, key: 'work' })
						}
					}).catch(error => {
						w.refresh = false
						message.error({ content: 'IP136错误', key: 'work' })
					})
				} else {
					w.refresh = false
					message.error({ content: 'IP66:' + res1.data.msg, key: 'work' })
				}
			}).catch(error => {
				w.refresh = false
				message.error({ content: 'IP66错误', key: 'work' })
			})
		}).catch(error => {
			w.refresh = false
			message.error({ content: error.response.data.msg, key: 'work' })
		})
	}
	const onRefreshUA = (w, index) => {
		let phoneList = phoneData.value.get(w.os)
		let wechatList = wechatData.value.get(w.os)
		let phone = phoneList[getRandomInt(phoneList.length)]
		let wechat = wechatList[getRandomInt(wechatList.length)]
		const { ua, browser } = getUserAgent(w.os, phone, wechat, w.ipType)
		w.type = phone.type
		w.size = phone.size
		w.version = wechat.version
		w.build = wechat.build
		w.browser = browser
		w.ua = ua
		workspaceDB(nowDay.value).setItem(w.id, JSON.parse(JSON.stringify(w)))
	}
	const onRun = (w, index) => {
		if (w.status === 0 || w.status === 3 || w.status === 4) {
			// if (w.ipType !== '普通宽带' && w.ipType !== '移动数据') {
			// 	message.error('执行任务失败：当前IP类型错误，请刷新IP后重试')
			// 	return
			// }
			if (Date.now() - w.time >= 0) {
				message.error({ content: '执行任务失败：当前IP已失效，请刷新IP后重试', key: 'work' })
				return
			}
			if (w.status === 3) {
				Modal.confirm({
					title: '当前任务已执行，是否再次执行?',
					okText: '确认执行',
					okType: 'danger',
					cancelText: '取消执行',
					onOk() {
						handleRun(w, index)
					},
					onCancel() {
						console.log('Cancel')
					},
				})
				return
			}
			handleRun(w, index)
		}
	}
	const handleRun = (w, index) => {
		w.status = 1
		ipc.invoke(workspaceApiRoute.run, {
			id: w.id,
			ip: w.ip,
			port: w.port,
			ua: w.ua,
			size: {
				innerWidth: w.size[4],
				innerHeight: w.size[5],
				xviews: {
					innerWidth: w.size[4],
					innerHeight: w.size[5],
					outerWidth: w.size[6],
					outerHeight: w.size[7],
					screen: {
						width: w.size[0],
						height: w.size[1],
						availWidth: w.size[2],
						availHeight: w.size[3],
					},
					screenLeft: 0,
					screenTop: 0,
				},
			},
			wr: w.wr,
			wv: w.wv,
			url: w.url,
			username: networkData.value.get('api-pool').value.username,
			password: networkData.value.get('api-pool').value.password,
			core: core.value,
		})
	}
	const onDeleteWork = (w, index) => {
		Modal.confirm({
			title: '是否删除当前任务?',
			okText: '确认删除',
			okType: 'danger',
			cancelText: '取消删除',
			onOk() {
				workspaceDB(nowDay.value).removeItem(w.id).then(() => {
					message.success(`任务【${w.id}】删除成功`)
					workspace.value = []
					workspaceDB(nowDay.value).iterate((value, key) => {
						workspace.value.push(value)
					}).then(res => {
						workspace.value.sort((a, b) => b.createTime - a.createTime)
					})
				})
			},
			onCancel() {
				console.log('Cancel')
			},
		})

	}
	const onClearWorkspace = () => {
		Modal.confirm({
			title: '是否清空当前任务?',
			okText: '确认清空',
			okType: 'danger',
			cancelText: '取消清空',
			onOk() {
				handleClearWorkspace()
			},
			onCancel() {
				console.log('Cancel')
			},
		})
	}
	const handleClearWorkspace = () => {
		workspaceDB(nowDay.value).clear().then(() => {
			workspace.value = []
			workspaceDB(nowDay.value).iterate((value, key) => {
				workspace.value.push(value)
				if (value.url === workUrl.value) {
					const ip3 = getFirstThreeSegmentsOfIP(value.rip ? value.rip : value.ip)
					let newVar = ips.value.get(ip3)
					if (newVar) {
						newVar = newVar + 1
					} else {
						newVar = 1
					}
					ips.value.set(ip3, newVar)
				}
			}).then(res => {
				workspace.value.sort((a, b) => b.createTime - a.createTime)
			})
		})
	}
</script>
<style scoped lang="less">
	.workspace {
		font-size: 13px;
		user-select: text;

		&-statistics {
			height: 53px;
			font-size: 14px;
		}

		&-content {
			height: calc(100% - 106px);

			&-box {
				border-radius: 6px;
				border: 1px solid #f1f1f1;
				padding: 12px 8px;

				&:hover {
					box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
				}

				& + & {
					margin-top: 12px;
				}

				&-item {
					height: 100%;

					.tips {
						top: -12px;
						left: -8px;
						padding: 4px 12px;
						border-radius: 6px 0;
						color: #fff;
					}

					.left {
						width: calc(100% - 90px);
						padding-right: 12px;

						.item {
							padding: 6px 0;

							.label {
								width: 70px;
							}

							.item-ua {
								width: calc(100% - 70px);
							}
						}
					}

					.right {
						width: 90px;
						position: absolute;
						right: 0;
						top: 0;
						bottom: 0;
					}
				}
			}
		}
	}

	.horse_run {
		background-image: linear-gradient(90deg,
		rgba(5, 241, 5, 0.8) 0% 100%),
		linear-gradient(0deg,
		rgba(5, 241, 5, 0.8) 0% 100%),
		linear-gradient(-90deg,
		rgba(5, 241, 5, 0.8) 0% 100%),
		linear-gradient(0deg,
		rgba(5, 241, 5, 0.8) 0% 100%);
		background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
		background-size: 30px 4px, 4px 30px, 30px 4px, 4px 30px;
		background-position: -30px 0, calc(100% - 0px) -30px, calc(100% + 30px) calc(100% - 0px), 0px 0px;
		animation: moveLine 3s infinite linear;
		background-clip: content-box;
	}

	@keyframes moveLine {
		0% {
			background-position: -30px 0, calc(100% - 0px) -30px, calc(100% + 30px) calc(100% - 0px), 0px 0px;
		}

		5% {
			background-position: 0 0, calc(100% - 0px) -30px, calc(100% + 30px) calc(100% - 0px), 0px -30px;
		}

		30% {
			background-position: 100% 0, calc(100% - 0px) -30px, calc(100% + 30px) calc(100% - 0px), 0px -30px;
		}

		35% {
			background-position: calc(100% + 30px) 0, calc(100% - 0px) 0, calc(100% + 30px) calc(100% - 0px), 0px -30px;
		}

		50% {
			background-position: calc(100% + 30px) 0, calc(100% - 0px) 100%, calc(100% + 30px) calc(100% - 0px), -30px -30px;
		}

		55% {
			background-position: calc(100% + 30px) 0, calc(100% - 0px) calc(100% + 30px), 100% calc(100% - 0px), -30px calc(100% + 30px);
		}

		80% {
			background-position: calc(100% + 30px) 0, calc(100% - 0px) calc(100% + 30px), 0 calc(100% - 0px), 0 calc(100% + 30px);
		}

		85% {
			background-position: calc(100% + 30px) 0, calc(100% - 0px) calc(100% + 30px), -30px calc(100% - 0px), 0 100%;
		}

		100% {
			background-position: calc(100% + 30px) 0, calc(100% - 0px) calc(100% + 30px), -30px calc(100% - 0px), 0 0;
		}
	}
</style>
