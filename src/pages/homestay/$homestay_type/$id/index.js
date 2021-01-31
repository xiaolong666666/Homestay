import React, { Component } from 'react'
import { connect } from 'dva'
import Info from '@/component/homestay/$homestay_type/$id/Info.js'
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
        const { dispatch } = this.props
        dispatch({ type: 'homestay_detail/fetchHomestayDetail' })
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
        homestay_detail: state.homestay_detail,
    }
}

export default connect(mapStateToProps)(HomestayDetail)
