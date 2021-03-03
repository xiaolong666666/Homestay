import React, { Component, Fragment } from 'react'
import { Menu, Icon } from 'antd'
import router from 'umi/router'
import Default from '@/assets/imgs/default.jpg'
import IconStyle from '@/assets/fonts/iconfont.css'
import Public from '@/pages/public.less'
import LayoutStyle from './index.less'

const { SubMenu } = Menu

class UserBasicLayout extends Component {

    componentDidMount() {
        const { match: { params: { user_type, id } } } = this.props
        router.push(`/user/${user_type}/${id}/information`)
    }

    RouteToJump = (route = 'information') => {
        const { match: { params: { user_type, id } } } = this.props
        router.push(`/user/${user_type}/${id}/${route}`)
    }

    onSelect = (item) => {
        const { key } = item
        this.RouteToJump(key)
    }

    render() {
        return (
            <div className={Public.normal}>
                <div className={`${Public.container} ${LayoutStyle.personal}`}>
                    <div className={LayoutStyle.personal_menu}>
                        <div className={LayoutStyle.face_wrapper}><img src={Default} alt=""/></div>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["information"]}
                            onSelect={this.onSelect}
                        >
                            <Menu.Item key="information"><Icon type="user" />个人资料</Menu.Item>
                            <Menu.Item key="like"><Icon type="heart" />我的点赞</Menu.Item>
                            <Menu.Item key="favorites"><Icon type="star" />我的收藏</Menu.Item>
                            <Menu.Item key="reserve"><Icon type="dashboard" />我的预约</Menu.Item>
                            <Menu.Item key="appraisal"><span className={`${LayoutStyle.appraisal} ${IconStyle.iconfont}`}>&#xe61a;</span>我的评价</Menu.Item>
                            <SubMenu
                                key="home"
                                title={
                                    <Fragment>
                                        <Icon type="home" />
                                        <span>我的房源</span>
                                    </Fragment>
                                }
                            >
                                <Menu.Item key="home-already"><Icon type="file-done" />已租出</Menu.Item>
                                <Menu.Item key="home-not"><Icon type="file-sync" />未租出</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                    <div className={LayoutStyle.personal_main}>{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default UserBasicLayout
