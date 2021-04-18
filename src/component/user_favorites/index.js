import React, { Component, Fragment } from 'react'
import { Table } from 'antd'
import { connect } from 'dva'
import columns from './columns'

class index extends Component {

    componentDidMount() {
        this.fetchFavorites()
    }

    fetchFavorites = () => {
        const { dispatch } = this.props
        dispatch({ type: 'user/fetch_homestay_favorites' })
    }

    render() {
        const { user: { homestay_favorites } } = this.props
        return (
            <Fragment>
                <Table
                    dataSource={homestay_favorites}
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
