import React, { Component, Fragment } from 'react'
import { Table, Modal, message } from 'antd'
import { connect } from 'dva'
import columns from './columns'

class index extends Component {

    componentDidMount() {
        this.fetchAppraisal()
    }

    fetchAppraisal = () => {
        const { dispatch } = this.props
        dispatch({ type: 'user/fetch_homestay_appraisal' })
    }

    // 删除房源确认框
    onDeleteBefore = comment_id => {
        Modal.confirm({
            title: "您确定删除该评论吗?",
            okText: "确定",
            cancelText: "取消",
            onOk: () => this.onDelete(comment_id),
        });
    }

    // 删除房源
    onDelete = comment_id => {
        const { dispatch } = this.props
        dispatch({ type: 'user/comment_delete', payload: comment_id })
            .then(this.onDeleteTips)
            .catch(this.onDeleteTips)
    }

    // 删除房源提示
    onDeleteTips = result => {
        const { data: { code, message: comment_message } } = result
        code ? message.success(comment_message) : message.error(comment_message)
        code && this.fetchAppraisal()
    }

    render() {

        const { user: { homestay_appraisal } } = this.props
        console.log('homestay_appraisal', homestay_appraisal)
        return (
            <Fragment>
                <Table
                    dataSource={homestay_appraisal}
                    columns={columns(this.onDeleteBefore)}
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
