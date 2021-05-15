import React, { Component } from 'react'
import { connect } from 'dva'
import LandlordInfo from '@/component/landlord_homestay/landlord_info'
import LandlordHomestay from '@/component/landlord_homestay/landlord_homestay'
import Public from '@/pages/public.less'

class homestay extends Component {

    componentDidMount() {
        this.fetchLandlordHomestay()
    }

    fetchLandlordHomestay = () => {
        const {
            dispatch,
            match: { params: { landlord_id } },
        } = this.props
        dispatch({ type: 'landlord_homestay/fetch_homestay', payload: { landlord_id } })
    }

    render() {
        const { landlord_homestay: { Landlord, HomestaySource } } = this.props
        return (
            <div className={Public.normal}>
                <div className={Public.container}>
                    <LandlordInfo landlord={Landlord} />
                    <LandlordHomestay landlord={Landlord} homestaySource={HomestaySource} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    landlord_homestay: state.landlord_homestay,
})

export default connect(mapStateToProps)(homestay)