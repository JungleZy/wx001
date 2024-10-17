/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
	{
		path: '/',
		name: 'Index',
		component: () => import('@/views/Index.vue'),
		children: [
			{
				path: '/',
				name: 'Dashboard',
				component: () => import('@/views/dashboard/DashboardView.vue'),
			},
			{
				path: '/workspace',
				name: 'Workspace',
				component: () => import('@/views/workspace/WorkspaceView.vue'),
			},
			{
				path: 'phone',
				name: 'Manage',
				component: () => import('@/views/phone/PhoneView.vue'),
			},
			{
				path: 'wechat',
				name: 'Wechat',
				component: () => import('@/views/wechat/WechatView.vue'),
			},
			{
				path: 'browser',
				name: 'Browser',
				component: () => import('@/views/browser/BrowserView.vue'),
			},
			{
				path: 'network',
				name: 'Network',
				component: () => import('@/views/network/NetworkView.vue'),
			},
		],
	},
]

export default constantRouterMap