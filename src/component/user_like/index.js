import React, { Component, Fragment } from 'react'
import { Table } from 'antd'
import { connect } from 'dva'
import columns from './columns'

class index extends Component {

    componentDidMount() {
        this.fetchHomestay()
    }

    fetchHomestay = () => {
        const { dispatch } = this.props
        dispatch({ type: 'user/fetch_homestay_like' })
    }

    render() {
        const { user: { homestay_like } } = this.props
        return (
            <Fragment>
                <Table
                    dataSource={homestay_like}
                    columns={columns}
                    rowKey='homestay_id'
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(index)
