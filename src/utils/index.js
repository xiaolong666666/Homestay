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