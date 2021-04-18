import React, { Component, Fragment } from 'react'
import { Table, Button, message, Modal } from 'antd'
import { connect } from 'dva'
import { isEmpty } from 'lodash'
import columns from './columns'
import Behavior from './Behavior'
import HouseStyle from './index.less'
class index extends Component {

    state = {
        selectedRowKeys: [],
        visible: false,
        behaviorType: 'issue',
    }

    componentDidMount() {
        this.fetchHomestay()
    }

    fetchHomestay = () => {
        const { dispatch } = this.props
        dispatch({ type: 'user/fetch_homestay' })
    }

    onSelectRow = record => {
        const { homestay_id } = record
        this.setState({ selectedRowKeys: [homestay_id] })
    }

    // 发布房源点击操作
    issueHouse = () => {
        this.setState({
            behaviorType: 'issue',
            visible: true,
        })
    }

    // 编辑房源点击操作
    modifyHouse = async () => {
        const { dispatch } = this.props
        const { selectedRowKeys } = this.state
        const homestay_id = selectedRowKeys.join()
        if (!isEmpty(selectedRowKeys)) {
            await dispatch({ type: 'user/homestay_detail_fetch', payload: homestay_id })
            this.setState({
                behaviorType: 'modify',
                visible: true,
            })
        } else {
            message.warning({
                content: '请先选择操作房源',
            })
        }
    }

    // 关闭Modal
    onClose = () => {
        this.setState({
            visible: false,
        })
    }

    // 发布房源
    onIssue = homestay => {
        const { dispatch } = this.props
        dispatch({ type: 'user/homestay_issue', payload: homestay })
            .then(this.onIssueTips)
            .catch(this.onIssueTips)
    }

    // 发布房源提示
    onIssueTips = result => {
        const { data: { code, message: home_message } } = result
        code ? message.success(home_message) : message.error(home_message)
        code && this.fetchHomestay()
        this.onClose()
    }

    // 编辑房源
    onModify = homestay => {
        const { dispatch } = this.props
        const { selectedRowKeys } = this.state
        dispatch({ type: 'user/homestay_modify', payload: { homestay_id: selectedRowKeys[0], ...homestay } })
            .then(this.onModifyTips)
            .catch(this.onModifyTips)
    }

    // 编辑房源提示
    onModifyTips = result => {
        const { data: { code, message: home_message } } = result
        code ? message.success(home_message) : message.error(home_message)
        code && this.fetchHomestay()
        this.onClose()
    }

    // 删除房源确认框
    onDeleteBefore = homestay_id => {
        Modal.confirm({
            title: "您确定删除该房源吗?",
            okText: "确定",
            cancelText: "取消",
            onOk: () => this.onDelete(homestay_id),
        });
    }

    // 删除房源
    onDelete = homestay_id => {
        const { dispatch } = this.props
        dispatch({ type: 'user/homestay_delete', payload: homestay_id })
            .then(this.onDeleteTips)
            .catch(this.onDeleteTips)
    }

    // 删除房源提示
    onDeleteTips = result => {
        const { data: { code, message: home_message } } = result
        code ? message.success(home_message) : message.error(home_message)
        code && this.fetchHomestay()
    }

    render() {
        const { user: { homestay, homestay_detail } } = this.props
        const { selectedRowKeys, visible, behaviorType } = this.state
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                const { homestay_id } = selectedRows[0]
                this.setState({ selectedRowKeys: [homestay_id] })
            },
        }
        return (
            <Fragment>
                <div className={HouseStyle.header}>
                    <Button type="primary" onClick={this.issueHouse}>发布房源</Button>
                    <Button type="primary" onClick={this.modifyHouse}>编辑房源</Button>
                </div>
                <Table
                    dataSource={homestay}
                    columns={columns(this.onDeleteBefore)}
                    rowSelection={rowSelection}
                    onRow={record => ({
                        onClick: () => this.onSelectRow(record)
                    })}
                    rowKey='homestay_id'
                />
                {visible && <Behavior
                    visible={visible}
                    behaviorType={behaviorType}
                    homestay_detail={homestay_detail}
                    onIssue={this.onIssue}
                    onModify={this.onModify}
                    onClose={this.onClose}
                />}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(index)
