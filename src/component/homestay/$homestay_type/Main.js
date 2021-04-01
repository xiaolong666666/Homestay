import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'umi'
import { throttling } from '../../../utils'
import HomestayStyle from './index.less'

class Main extends Component {

    state = {
        allowRequest: true,
    }

    componentDidMount() {
        window.addEventListener("scroll", throttling(this.listener, 100))
        // this.dispatchFetchHomestay()
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", throttling(this.listener, 100))
    }

    // 请求公寓数据
    dispatchFetchHomestay = () => {
        const { dispatch } = this.props
        dispatch({ type: 'homestay/fetchHomestay' })
    }

    // 监听滚动条的位置请求数据
    listener = () => {
        const { allowRequest } = this.state
        const clientH = document.documentElement.clientHeight;
        const scrollT = document.documentElement.scrollTop;
        const scrollH = document.documentElement.scrollHeight;
        const fetchFlag = clientH + scrollT > scrollH - 200
        if (fetchFlag && allowRequest) {
            this.setState({ allowRequest: false }, this.dispatchFetchHomestay)
            setTimeout(() => this.setState({ allowRequest: true }), 2000)
        }
    }

    render() {
        const { homestay_type, homestay: { homestayDataSource } } = this.props
        return (
            <div className={HomestayStyle.main_wrapper}>
                {
                    homestayDataSource.map(homestay => (<Link
                        to={`${homestay_type}/${homestay.id}`}
                        key={homestay.id}
                        className={HomestayStyle.homestay_wrapper}>
                        <div className={HomestayStyle.homestay_pic}><img src={homestay.propagandaPicture} alt="" /></div>
                        <div className={HomestayStyle.homestay_pirce_wrapper} />
                        <div className={HomestayStyle.homestay_pirce}>{`￥${homestay.pirce}`}</div>
                        <div className={HomestayStyle.homestay_landlord}>
                            <div className={HomestayStyle.homestay_location}>
                                <h3 title={homestay.homestayName}>{homestay.homestayName}</h3>
                                <p title={homestay.homestayRecommend}>{homestay.homestayRecommend}</p>
                            </div>
                            <div className={HomestayStyle.landlord_avatar}><img src={homestay.landlordAvatar} alt="" /></div>
                        </div>
                    </Link>))
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        homestay: state.homestay
    }
}

export default connect(mapStateToProps)(Main);