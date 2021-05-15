import { endsWith } from 'lodash'
import { title } from '../constant'

// 节流
export const throttling = (event, interval) => {
    let previous = 0;
    return () => {
        let now = + new Date();
        if ((now - previous) > interval) {
            event();
            previous = now;
        }
    }
}

// 公寓总览标题
export const homestayTitle = (pathname) => {
    return title.filter(item => endsWith(pathname, item.homestay_type))
}

// 公寓详情标题
export const homestayDetailTitle = (pathname) => {
    return title.filter(item => pathname.indexOf(item.homestay_type) > -1)
}

// 底部链接源
export const linkDataSource = [
    { label: '隐私协议', link: '/' },
    { label: '用户协议', link: '/' },
    { label: '关于我们', link: '/' },
    { label: '我是房客', link: '/' },
    { label: '加入小岛', link: '/' },
    { label: '帮助中心', link: '/' },
    { label: '联系我们', link: '/' },
]