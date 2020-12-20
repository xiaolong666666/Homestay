import React, { Fragment, useEffect } from 'react'
import { Tabs } from 'antd'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'dva'
import Link from 'umi/link'
import HeaderStyle from './index.less'
import Icon from '@/assets/fonts/iconfont.css'

const { TabPane } = Tabs

const Header = ({ user: { isLoginFlag, isUserTips }, header: { isNoticeFlag, isMobileFlag }, dispatch }) => {

    useEffect(() => {
        document.addEventListener('click', () => {
            if (isUserTips) {
                dispatch({ type: 'user/userTips', isUserTips: false })
            } else if (isNoticeFlag) {
                dispatch({ type: 'header/isNoticeBox', isNoticeFlag: false })
            } else if (isMobileFlag) {
                dispatch({ type: 'header/isMobileBox', isMobileFlag: false })
            }
        })
        return () => {
            if (isUserTips) {
                dispatch({ type: 'user/userTips', isUserTips: !isUserTips })
            }
        }
    }, [dispatch, isUserTips, isNoticeFlag, isMobileFlag])

    // 处理头像提示框
    const slideFace = (e, isUserTips) => {
        e.nativeEvent.stopImmediatePropagation();   // 阻止原生事件与最外层document上的事件间的冒泡
        dispatch({ type: 'user/userTips', isUserTips  })
    }

    // 处理通知框
    const slideNotice = (e, isNoticeFlag) => {
        e.nativeEvent.stopImmediatePropagation();   // 阻止原生事件与最外层document上的事件间的冒泡
        dispatch({ type: 'header/isNoticeBox', isNoticeFlag })
    }

    // 处理手机端
    const slideMobile = (e, isMobileFlag) => {
        e.nativeEvent.stopImmediatePropagation();   // 阻止原生事件与最外层document上的事件间的冒泡
        dispatch({ type: 'header/isMobileBox', isMobileFlag })
    }

    return (
        <header className={HeaderStyle.header}>
            <div className={HeaderStyle.main}>
                {/* logo */}
                <Link to='/'><div className={HeaderStyle.logo} /></Link>

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
                            <div
                                className={HeaderStyle.user_avatar}
                                onClick={(e) => slideFace(e, !isUserTips)}
                            >
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
                                            <li>个人中心</li>
                                            <li>退出登录</li>
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
                        <div className={HeaderStyle.notice_box}>
                            <Tabs defaultActiveKey="1" centered>
                                <TabPane tab="系统通知" key="1">
                                    <div className={HeaderStyle.notice_system_null}>
                                        暂无系统通知
                                    </div>
                                </TabPane>
                                <TabPane tab="优惠促销" key="2">
                                    <div className={HeaderStyle.notice_discounts_null}>
                                        暂无优惠促销
                                    </div>
                                </TabPane>
                            </Tabs>
                            <div className={HeaderStyle.notice_box_divider} />
                            <div className={HeaderStyle.notice_box_tips}>如需查看所有通知，请前往途家民宿客户端操作</div>
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

const mapStateToProps = state => {
    return {
        user: state.user,
        header: state.header
    }
}

export default connect(mapStateToProps)(Header);