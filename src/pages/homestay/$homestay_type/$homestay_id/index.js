import React, { Component } from 'react'
import { connect } from 'dva'
import Info from '@/component/homestay/$homestay_type/$homestay_id/Info.js'
import { homestayDetailTitle } from '../../../../utils'
import Public from '../../../public.less'

class HomestayDetail extends Component {

    componentDidMount() {
        const { location: { pathname } } = this.props
        document.title = homestayDetailTitle(pathname)[0]['homestay_title_detail']
        this.dispatchFetchHomestayDetail()
    }

    // 请求公寓详情数据
    dispatchFetchHomestayDetail = () => {
        const {
            dispatch,
            match: { params: { homestay_id } },
            user: { user: { user_id } },
        } = this.props
        dispatch({ type: 'homestay_detail/fetchHomestayDetail', payload: { homestay_id, user_id } })
        dispatch({ type: 'homestay_detail/fetchHomestayComment', payload: { homestay_id } })
    }

    render() {
        return (
            <div className={Public.normal}>
                <div className={Public.container}>
                    <Info {...this.props}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        homestay_detail: state.homestay_detail,
    }
}

export default connect(mapStateToProps)(HomestayDetail)
