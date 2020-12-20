
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    { path: '/sign_in', title: '登录 - 恬逸小岛', component: '../pages/sign' },
    { path: '/sign_up', title: '注册 - 恬逸小岛', component: '../pages/sign' },
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', title: '恬逸小岛 - 小岛出租房源_小岛优质房源_小岛安家信息', component: '../pages/index' }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      links: [{ rel: 'icon', href: '<%= PUBLIC_PATH %>assets/imgs/favicon.ico' }],
      title: '恬逸小岛 - 小岛出租房源_小岛优质房源_小岛安家信息',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
