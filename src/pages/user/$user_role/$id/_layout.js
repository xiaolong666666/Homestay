import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import { isEmpty } from 'lodash'
import IconStyle from '@/assets/fonts/iconfont.css'
import Public from '@/pages/public.less'
import LayoutStyle from './index.less'

class UserBasicLayout extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (isEmpty(token)) {
            router.push('/sign_in')
        }
    }

    RouteToJump = (route = 'information') => {
        const { match: { params: { user_role, id } } } = this.props
        localStorage.setItem('itemKey', [route])
        router.push(`/user/${user_role}/${id}/${route}`)
    }

    componentWillUnmount() {
        localStorage.removeItem('itemKey')
    }

    onSelect = (item) => {
        const { key } = item
        this.RouteToJump(key)
    }

    render() {
        const { user: { user: { user_avatar } } } = this.props
        const itemKey = localStorage.getItem('itemKey')
        return (
            <div className={Public.normal}>
                <div className={`${Public.container} ${LayoutStyle.personal}`}>
                    <div className={LayoutStyle.personal_menu}>
                        <div className={LayoutStyle.face_wrapper}><img src={user_avatar} alt="" /></div>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={itemKey || ["information"]}
                            onSelect={this.onSelect}
                        >
                            <Menu.Item key="information"><Icon type="user" />个人资料</Menu.Item>
                            <Menu.Item key="like"><Icon type="heart" />我的点赞</Menu.Item>
                            <Menu.Item key="favorites"><Icon type="star" />我的收藏</Menu.Item>
                            <Menu.Item key="reserve"><Icon type="dashboard" />我的预约</Menu.Item>
                            <Menu.Item key="appraisal"><span className={`${LayoutStyle.appraisal} ${IconStyle.iconfont}`}>&#xe61a;</span>我的评价</Menu.Item>
                            <Menu.Item key="home"><Icon type="home" />我的房源</Menu.Item>
                        </Menu>
                    </div>
                    <div className={LayoutStyle.personal_main}>{this.props.children}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(UserBasicLayout)
