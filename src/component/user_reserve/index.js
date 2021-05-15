import React, { Component, Fragment } from 'react'
import { Table, Modal, message } from 'antd'
import { connect } from 'dva'
import columns from './columns'

class index extends Component {

    componentDidMount() {
        this.fetchReserve()
    }

    fetchReserve = () => {
        const { dispatch } = this.props
        dispatch({ type: 'user/fetch_homestay_reserve' })
    }

    // 删除房源确认框
    onCancelBefore = reserve_id => {
        Modal.confirm({
            title: "您确定取消该预约吗?",
            okText: "确定",
            cancelText: "取消",
            onOk: () => this.onCancel(reserve_id),
        });
    }

    // 删除房源
    onCancel = reserve_id => {
        const { dispatch } = this.props
        dispatch({ type: 'user/reserve_delete', payload: reserve_id })
            .then(this.onCancelTips)
            .catch(this.onCancelTips)
    }

    // 删除房源提示
    onCancelTips = result => {
        const { data: { code, message: comment_message } } = result
        code ? message.success(comment_message) : message.error(comment_message)
        code && this.fetchReserve()
    }

    render() {
        const { user: { homestay_reserve } } = this.props
        return (
            <Fragment>
                <Table
                    dataSource={homestay_reserve}
                    columns={columns(this.onCancelBefore)}
                    rowKey='reserve_id'
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(index)
