import React, { Fragment, useEffect } from 'react'
import { Tabs } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'
import router from 'umi/router'
import { isEmpty } from 'lodash'
import { CSSTransition } from 'react-transition-group'
import ReserveNotice from './ReserveNotice'
import SystemNotice from './SystemNotice'
import Icon from '@/assets/fonts/iconfont.css'
import HeaderStyle from './index.less'

const { TabPane } = Tabs

const Header = ({
    pathname,
    dispatch,
    header: { isNoticeFlag, isMobileFlag },
    user: { isLoginFlag, isUserTips, user: { user_id, user_role, user_phone, user_nickname, user_avatar }, reserveSource, systemSource },
}) => {
    const solo = pathname.includes('solo')
    const double = pathname.includes('double')
    const multiplayer = pathname.includes('multiplayer')
    const pathnameArr = pathname.split('/')
    const type = pathnameArr[pathnameArr.length - 1]
    const isLandlord = user_role === 'landlord'

    useEffect(() => {
        if (!isEmpty(user_id)) {
            dispatch({ type: 'user/user_system_inform' })
        }
    }, [dispatch, user_id])

    useEffect(() => {
        if (type === 'solo' || type === 'double' || type === 'multiplayer') {
            dispatch({ type: 'homestay/fetchHomestay', payload: { homestay_type: type } })
        }
    }, [dispatch, type])

    useEffect(() => {
        document.addEventListener('click', () => {
            if (isUserTips) {
                dispatch({ type: 'user/dump', payload: { isUserTips: false } })
            } else if (isNoticeFlag) {
                dispatch({ type: 'header/dump', payload: { isNoticeFlag: false } })
            } else if (isMobileFlag) {
                dispatch({ type: 'header/dump', payload: { isMobileFlag: false } })
            }
        })
        return () => {
            if (isUserTips) {
                dispatch({ type: 'user/dump', payload: { isUserTips: !isUserTips } })
            }
        }
    }, [dispatch, isUserTips, isNoticeFlag, isMobileFlag])

    useEffect(() => {
        const animated = document.getElementsByClassName('ant-tabs-ink-bar-animated')[0]
        if (animated) animated.style.width = "88px"
    }, [isNoticeFlag])
    
    // 获取itemKey
    const activeKey = () => {
        if (!!localStorage.getItem('itemKey')) {
            return JSON.parse(localStorage.getItem('itemKey'))[0]
        } else {
            return 'information'
        }
    }

    // 处理手机号显示
    const phone = user_phone && user_phone.replace(user_phone.substr(2,7), '****')

    // 处理头像提示框
    const slideFace = (e, isUserTips) => {
        e.nativeEvent.stopImmediatePropagation();   // 阻止原生事件与最外层document上的事件间的冒泡
        dispatch({ type: 'user/dump', payload: { isUserTips }  })
    }

    // 处理通知框
    const slideNotice = (e, isNoticeFlag) => {
        e.nativeEvent.stopImmediatePropagation();   // 阻止原生事件与最外层document上的事件间的冒泡
        dispatch({ type: 'header/dump', payload: { isNoticeFlag } })
    }

    // 处理手机端
    const slideMobile = (e, isMobileFlag) => {
        e.nativeEvent.stopImmediatePropagation();   // 阻止原生事件与最外层document上的事件间的冒泡
        dispatch({ type: 'header/dump', payload: { isMobileFlag } })
    }

    // 处理通知事件
    const handleNotice = (e) => {
        e.nativeEvent.stopImmediatePropagation();   // 阻止原生事件与最外层document上的事件间的冒泡
    }

    // 退出登录
    const handdleSignout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        dispatch({
            type: 'user/dump',
            payload: {
                isLoginFlag: false,
                user: {},
            },
        })
        router.push('/sign_in')
    }

    return (
        <header className={HeaderStyle.header}>
            <div className={HeaderStyle.main}>
                {/* logo */}
                <Link to='/'><div className={HeaderStyle.logo} /></Link>
                <Link to='/homestay/solo'><div className={`${HeaderStyle.homestay_type} ${solo && HeaderStyle.homestay_type_selected}`}>单人公寓</div></Link>
                <Link to='/homestay/double'><div className={`${HeaderStyle.homestay_type} ${double && HeaderStyle.homestay_type_selected}`}>双人合租</div></Link>
                <Link to='/homestay/multiplayer'><div className={`${HeaderStyle.homestay_type} ${multiplayer && HeaderStyle.homestay_type_selected}`}>多人合租</div></Link>

                {/* 手机端 */}
                <div
                    className={HeaderStyle.mobile}
                    onClick={(e) => slideMobile(e, !isMobileFlag)}
                >
                    手机端
                    <span className={`${Icon.iconfont} ${HeaderStyle.icon_mobile}`}>&#xe600;</span>
                </div>

                {/* 用户是否登录 */}
                {
                    isLoginFlag
                    ? (
                        <Fragment>
                            <div
                                className={HeaderStyle.notice}
                                onClick={(e) => slideNotice(e, !isNoticeFlag)}
                            >
                                通知
                                <span className={`${Icon.iconfont} ${HeaderStyle.icon_notice}`}>&#xe60a;</span>
                            </div>
                            <div className={HeaderStyle.nickname}>{user_nickname || phone }</div>
                            <div
                                className={HeaderStyle.user_avatar}
                                onClick={(e) => slideFace(e, !isUserTips)}
                            >
                                <img src={user_avatar} alt="" />
                                <CSSTransition
                                    in={isUserTips}
                                    timeout={600}
                                    classNames={{
                                        enter: HeaderStyle['avatar-enter'],
                                        enterActive: HeaderStyle['avatar-enter-active'],
                                        enterDone: HeaderStyle['avatar-enter-done'],
                                        exit: HeaderStyle['avatar-exit'],
                                        exitActive: HeaderStyle['avatar-exit-active'],
                                        exitDone: HeaderStyle['avatar-exit-done'],
                                    }}
                                >
                                    <div
                                        className={HeaderStyle.user_avatar_operate}
                                    >
                                        <ul>
                                            <li><Link to={`/user/${user_role}/${user_id}/${activeKey()}`}>个人中心</Link></li>
                                            <li onClick={handdleSignout}>退出登录</li>
                                        </ul>
                                    </div>
                                </CSSTransition>
                            </div>
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <Link to='/sign_up'><div className={HeaderStyle.register}>注册</div></Link>
                            <Link to='/sign_in'><div className={HeaderStyle.login}>登录</div></Link>
                        </Fragment>
                    )
                }

                {/* 是否显示通知内容 */}
                {
                    <CSSTransition
                        in={isNoticeFlag}
                        timeout={600}
                        classNames={{
                            enter: HeaderStyle['notice-enter'],
                            enterActive: HeaderStyle['notice-enter-active'],
                            enterDone: HeaderStyle['notice-enter-done'],
                            exit: HeaderStyle['notice-exit'],
                            exitActive: HeaderStyle['notice-exit-active'],
                            exitDone: HeaderStyle['notice-exit-done']
                        }}
                    >
                        <div className={HeaderStyle.notice_box} onClick={(e) => handleNotice(e)}>
                            <Tabs defaultActiveKey="system" centered>
                                <TabPane tab="系统通知" key="system">
                                    {
                                        !isEmpty(systemSource)
                                        ? <SystemNotice dataSource={systemSource} />
                                        : <div className={HeaderStyle.notice_discounts_null}>
                                            暂无系统通知
                                        </div>
                                    }
                                </TabPane>
                                <TabPane tab="房源预约" key="homestay" disabled={!isLandlord}>
                                    {
                                        !isEmpty(reserveSource)
                                            ? <ReserveNotice dataSource={reserveSource} />
                                            : <div className={HeaderStyle.notice_system_null}>
                                                暂无房源预约
                                        </div>
                                    }
                                </TabPane>
                            </Tabs>
                            <div className={HeaderStyle.notice_box_divider} />
                            <div className={HeaderStyle.notice_box_tips}>如需查看所有通知，请前往恬逸小岛客户端操作</div>
                        </div>
                    </CSSTransition>
                }

                {/* 是否显示App和小程序 */}
                {
                    <CSSTransition
                        in={isMobileFlag}
                        timeout={600}
                        classNames={{
                            enter: HeaderStyle['mobile-enter'],
                            enterActive: HeaderStyle['mobile-enter-active'],
                            enterDone: HeaderStyle['mobile-enter-done'],
                            exit: HeaderStyle['mobile-exit'],
                            exitActive: HeaderStyle['mobile-exit-active'],
                            exitDone: HeaderStyle['mobile-exit-done']
                        }}
                    >
                        <div className={HeaderStyle.mobile_box}>
                            <ul>
                                <li>
                                    <div className={HeaderStyle.mobile_mask_app} />
                                    <h4>恬逸小岛App</h4>
                                    <p>预订更便捷</p>
                                </li>
                                <li>
                                    <div className={HeaderStyle.mobile_mask_smaller} />
                                    <h4>恬逸小岛小程序</h4>
                                    <p>微信扫码即可预订</p>
                                </li>
                            </ul>
                        </div>
                    </CSSTransition>
                }
            </div>
        </header>
    );
};

const mapStateToProps = state => ({
    user: state.user,
    header: state.header
})

export default connect(mapStateToProps)(Header);