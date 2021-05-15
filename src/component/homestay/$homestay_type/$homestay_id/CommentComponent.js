import React, { Component, Fragment } from 'react';
import { Tabs, Pagination, Comment, Avatar, Form, Button, Input, message } from 'antd'
import { connect } from 'dva'
import { isEmpty } from 'lodash'
import Icon from '@/assets/fonts/iconfont.css'
import InfoStyle from './index.less'

const { TabPane } = Tabs
const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <Fragment>
        <Form.Item>
            <TextArea
                rows={4}
                placeholder="欢迎留下您的评论，让我们做得更好！让您拥有更舒适的体验！"
                onChange={onChange}
                value={value}
            />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                发表评论
            </Button>
        </Form.Item>
    </Fragment>
)

class CommentComponent extends Component {

    state = {
        value: ''
    }

    onPageChange = (current) => {
        const { dispatch } = this.props
        const comment_start = document.getElementById('comment_start')
        dispatch({ type: 'homestay_detail/dump', payload: { current } })
        comment_start.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    // 发表评论
    handleSubmit = () => {
        const {
            dispatch,
            user: { isLoginFlag },
            match: { params: { homestay_id } }
        } = this.props
        const { value } = this.state
        const comment_content = value.trim()
        if (isLoginFlag) {
            if (comment_content.length > 0) {
                dispatch({
                    type: 'homestay_detail/submitComment',
                    payload: {
                        homestay_id,
                        comment_content,
                    }
                })
                    .then(this.handleSubmitTips)
                    .catch((e) => {
                        message.error(e.message)
                    })
            } else {
                message.warn('请输入评论内容')
            }
        } else {
            message.warn('请登录后进行操作')
        }
    }

    // 发表评论结果
    handleSubmitTips = (res) => {
        const {
            dispatch,
            match: { params: { homestay_id } }
        } = this.props
        const { data: { code, message: tips } } = res
        if (code) {
            message.success(tips)
            this.setState({ value: '' })
            dispatch({ type: 'homestay_detail/fetchHomestayComment', payload: { homestay_id } })
        } else {
            message.error(tips)
        }
    }

    // 房东发表回复
    handleReply = () => {
        const { dispatch, match: { params: { homestay_id } } } = this.props
        const { state: { value: comment_reply } } = this.reply
        if (comment_reply) {
            dispatch({ type: 'homestay_detail/submitReply', payload: { homestay_id, comment_reply } })
                .then(this.handleReplyTips)
                .catch((e) => {
                    message.error(e.message)
                })
        } else {
            message.warn('请输入回复内容！')
        }
    }

    // 房东发表回复结果
    handleReplyTips = (res) => {
        const {
            dispatch,
            match: { params: { homestay_id } }
        } = this.props
        const { data: { code, message: tips } } = res
        if (code) {
            message.success(tips)
            this.setState({ value: '' })
            dispatch({ type: 'homestay_detail/fetchHomestayComment', payload: { homestay_id } })
        } else {
            message.error(tips)
        }
    }

    render() {
        const {
            user: { user: { user_id, user_avatar } },
            homestay_detail: { commentSource, current, pageSize, total, landlord_info: { landlord_id } }
        } = this.props
        const submitting = this.props.loading.global
        const { value } = this.state
        return (
            <Tabs>
                <TabPane tab={<div className={`${InfoStyle.comment} ${Icon.iconfont}`}>{`评论(${total})`}</div>} key="commit">
                    <div className={InfoStyle.comment_container}>
                        {
                            commentSource.filter((item, index) => index >= 5*(current-1) && index <= 5*current-1).map((item, index) => (
                                <section key={`comment${index}`}>
                                    <img title={item.nickName} alt="" className={InfoStyle.user_face} src={item.face} />
                                    <div className={InfoStyle.comment_message}>
                                        <h5>
                                            <span className={InfoStyle.user_nickname}>{item.nickName}</span>
                                            <time>{item.time}</time>
                                        </h5>
                                        <p>{item.content}</p>
                                        {
                                            item.reply
                                                ? <div className={InfoStyle.reply_box}>
                                                    <div className={InfoStyle.arrow_top} />
                                                    <h5>房东回复:</h5>
                                                    <p>{item.reply}</p>
                                                </div>
                                                : (landlord_id === user_id
                                                    ?   <div className={InfoStyle.reply_wrapper}>
                                                        <Input.TextArea ref={(reply) => this.reply = reply} className={InfoStyle.textarea}/>
                                                        <Button type="link" block className={InfoStyle.reply_btn} onClick={this.handleReply}>回复</Button>
                                                    </div>
                                                    : null
                                                )
                                        }
                                    </div>
                                </section>
                            ))
                        }
                        {!isEmpty(commentSource) && <Pagination current={current} pageSize={pageSize} total={total} onChange={this.onPageChange} />}
                        <Comment
                            className={InfoStyle.comment_wrapper}
                            avatar={
                                <Avatar
                                    className={InfoStyle.comment_avatar}
                                    src={user_avatar}
                                    alt="用户头像"
                                />
                            }
                            content={
                                <Editor
                                    onChange={this.handleChange}
                                    onSubmit={this.handleSubmit}
                                    submitting={submitting}
                                    value={value}
                                />
                            }
                        />
                        <a href="/" id="comment" className={InfoStyle.comment_anchor}>_</a>
                    </div>
                </TabPane>
            </Tabs>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        user: state.user,
    }
}

export default connect(mapStateToProps)(CommentComponent);