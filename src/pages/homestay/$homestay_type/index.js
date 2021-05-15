import React, { useEffect } from 'react'
import { connect } from 'dva'
import Seek from '@/component/homestay/$homestay_type/Seek'
import Main from '@/component/homestay/$homestay_type/Main'
import { homestayTitle, throttling } from '../../../utils'
import Icon from '@/assets/fonts/iconfont.css'
import Public from '../../public.less'

const Homestay = ({
    dispatch,
    location: { pathname },
    public: { showBackTop },
}) => {
    document.title = homestayTitle(pathname)[0]['homestay_title']

    useEffect(() => {
        // 监听滚动条位置改变showBackTop
        const listener = () => {
            const scrollT = document.documentElement.scrollTop
            const showFlag = scrollT > 600
            const dispatchSwitchBackTop = () => dispatch({ type: 'public/dump', payload: { showBackTop: !showBackTop } })
            showFlag ? !showBackTop && dispatchSwitchBackTop() : showBackTop && dispatchSwitchBackTop()
        }
        window.addEventListener("scroll", throttling(listener, 100))
        return () => {
            window.removeEventListener("scroll", throttling(listener, 100))
        }
    }, [dispatch, showBackTop])

    // 缓动滚动到顶部
    const handdleTop = () => {
        let nowposition = document.documentElement.scrollTop;
        let cut = 10;
        let goTop = setInterval(() => {
            if (nowposition > cut) {
                nowposition -= cut;
                window.scrollTo(0, nowposition);
            } else {
                window.scrollTo(0, 0);
                clearInterval(goTop);
            }
        }, 1);
    }
    return (
        <div className={Public.normal}>
            <div className={Public.container}>
                <Seek homestay_type={pathname}/>
                <Main homestay_type={pathname} />
            </div>
            {showBackTop && <div className={`${Public.back_top} ${Icon.iconfont}`} title="回到顶部" onClick={handdleTop} />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        public: state.public,
    }
}

export default connect(mapStateToProps)(Homestay)