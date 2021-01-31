
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  // routes: [
  //   { path: '/sign_in', title: '登录 - 恬逸小岛', component: '../pages/sign' },
  //   { path: '/sign_up', title: '注册 - 恬逸小岛', component: '../pages/sign' },
  //   {
  //     path: '/',
  //     component: '../layouts/index',
  //     routes: [
  //       { path: '/', title: '恬逸小岛 - 小岛出租房源_小岛优质房源_小岛安家信息', component: '../pages/index' },
  //       { path: '/solo', title: '恬逸小岛 - 单人公寓', component: '../pages/Homestay',
  //         routes: [
  //           { path: '/solo/:homestay_id', title: '恬逸小岛 - 单人公寓 - 公寓详情', component: '../pages/Homestay/Pages' },
  //         ]
  //       },
  //       { path: '/solo/:homestay_id', title: '恬逸小岛 - 单人公寓 - 公寓详情', component: '../pages/Homestay/Pages' },
  //       { path: '/double', title: '恬逸小岛 - 双人合租', component: '../pages/Homestay',
  //         routes: [
  //           { path: '/double/:homestay_id', title: '恬逸小岛 - 双人合租 - 公寓详情', component: '../pages/Homestay/Pages' },
  //         ]
  //       },
  //       { path: '/multiplayer', title: '恬逸小岛 - 多人合租', component: '../pages/Homestay',
  //         routes: [
  //           { path: '/multiplayer/:homestay_id', title: '恬逸小岛 - 多人合租 - 公寓详情', component: '../pages/Homestay/Pages' },
  //         ]  
  //       },
  //     ]
  //   }
  // ],
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
  theme: {
    'primary-color': '#FF6C5C',
  },
  proxy: {
    '/api': {
      target: 'https://www.fastmock.site/mock/c4e4f9a346dbbead6705cac769ce92c2/homestay',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  }
}
