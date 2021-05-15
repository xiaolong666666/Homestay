import React, { Component, Fragment } from 'react'
import { Modal, Form, Input, message } from 'antd'
import Public from '@/pages/public.less'

const formItemLayout = {
    labelCol: {
        sm: { span: 6 },
    },
    wrapperCol: {
        sm: { span: 16 },
    },
};

class Review extends Component {

    state = {
        visible: false,
    }

    onShowReview = () => this.setState({ visible: true })

    onClose = () => this.setState({ visible: false })

    onOk = () => {
        const {
            dispatch,
            form: { validateFields }
        } = this.props
        validateFields((error, result) => {
            if (!error) {
                const date = new Date()
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const review_date = `${year}.${month < 9 ? `0${month}` : month}`
                dispatch({ type: 'public/publish_review', payload: { ...result, review_date } })
                .then(this.publishReviewTips)
                .catch(this.publishReviewTips)
            }
        })
    }

    publishReviewTips = result => {
        const { dispatch } = this.props
        const { data: { code, message: review_message } } = result
        if (code) {
            message.success(review_message)
            this.onClose()
            dispatch({ type: 'public/fetch_review' })
        } else {
            message.error(review_message)
        }
    }

    render() {
        const {
            user: { isLoginFlag },
            form: { getFieldDecorator },
        } = this.props
        const { visible } = this.state

        return (
            <Fragment>
                {visible && <Modal
                    title="用户点评"
                    visible={visible}
                    cancelText="取消"
                    okText="发表点评"
                    onCancel={this.onClose}
                    onOk={this.onOk}
                >
                    <Form {...formItemLayout}>
                        <Form.Item label="点评内容">
                            {getFieldDecorator('review_content', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入点评内容!',
                                    },
                                ],
                            })(<Input.TextArea placeholder="请留下您对我们的点评哟！" rows={6} />)}
                        </Form.Item>
                    </Form>
                </Modal>}
                {isLoginFlag && <div className={Public.review} title="用户点评" onClick={this.onShowReview}>点评</div>}
            </Fragment>
        )
    }
}

const WrappedReview = Form.create({ name: 'review' })(Review);

export default WrappedReview