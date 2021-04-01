import React, { Component, Fragment } from 'react'
import { Table, Button, message } from 'antd'
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

    onSelectRow = (record) => {
        const { homestay_id } = record
        this.setState({ selectedRowKeys: [homestay_id] })
    }

    // 发布房源点击操作
    issueHouse = () => {
        this.setState({
            visible: true,
            behaviorType: 'issue'
        })
    }

    // 编辑房源点击操作
    modifyHouse = () => {
        const { selectedRowKeys } = this.state
        if (!isEmpty(selectedRowKeys)) {
            this.setState({
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
    onIssue = (homestay) => {
        const { dispatch } = this.props
        dispatch({ type: 'user/homestay_issue', payload: homestay })
            .then(this.onIssueTips)
            .catch(this.onIssueTips)
    }

    // 发布房源后提示
    onIssueTips = (result) => {
        const { data: { code, message: home_message } } = result
        code ? message.success(home_message) : message.error(home_message)
        this.onClose()
    }

    // 编辑房源
    onModify = () => {
        console.log('')
    }

    render() {
        const { user: { homestay } } = this.props
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
                    columns={columns}
                    rowSelection={rowSelection}
                    onRow={record => ({
                        onClick: () => this.onSelectRow(record)
                    })}
                    rowKey='homestay_id'
                />
                <Behavior
                    visible={visible}
                    behaviorType={behaviorType}
                    onIssue={this.onIssue}
                    onClose={this.onClose}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(index)
