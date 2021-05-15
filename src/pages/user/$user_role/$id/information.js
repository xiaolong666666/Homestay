import React, { Component } from 'react'
import { Upload, Form, Input, Radio, Icon, Button, message } from 'antd'
import { connect } from 'dva'
import Style from './information.less'

const formItemLayout = {
    labelCol: {
        sm: { span: 3 },
    },
    wrapperCol: {
        sm: { span: 12 },
    },
};

class Information extends Component {

    state = {
        avatarUrl: ''
    }

    // 更改头像前判断传入的图片是否符合规则
    beforeUpload = (file) =>  {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        if (!isJpgOrPng) {
            message.error('您仅可以上传JPG/PNG/GIF格式的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不超过2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    // 更改头像
    handleChange = (info) => {
        if (info.file.status === 'done') {
            const { file: { xhr: { response } } } = info
            const avatarUrl = JSON.parse(response).avatarUrl
            this.setState({ avatarUrl })
        }
    }

    // 验证手机号
    validateIDcard = (rule, value, callback) => {
        if (value && !(/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value))) {
            callback('请输入正确的身份证号！')
        } else {
            callback()
        }
    }

    // 更改个人信息--发送数据
    handleSubmit = e => {
        const { dispatch, form: { validateFieldsAndScroll, setFieldsValue } } = this.props
        const { avatarUrl } = this.state
        e.preventDefault()
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.avatar = avatarUrl
                dispatch({ type: 'user/user_modify_personal_information', payload: values })
                    .then(res => {
                        const { code, message: tips } = res
                        if (code === 200) {
                            message.success(tips)
                        } else {
                            message.error(tips)
                        }
                        setFieldsValue({ password: '', newpassword: '' })
                    })
                    .catch(e => {
                        message.error('很遗憾，修改个人信息失败！')
                    })
            }
        });
    }

    render() {
        const { 
            user: { user: { user_nickname, user_name, user_idcard, user_phone, user_gender, user_avatar } },
            form: { getFieldDecorator }
        } = this.props
        const { avatarUrl } = this.state
        const token = localStorage.getItem('token')
        const url =  avatarUrl.split('/')
        const flag = url[url.length - 1]

        return (
            <div className={Style.information}>
                <img src={avatarUrl || user_avatar} className={Style.face} alt="" />
                <Upload
                    name="avatar"
                    headers={{ Authorization: token }}
                    action={`http://localhost:3000/user/avatar?flag=${flag}`}
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    <Button type="primary">更换头像</Button>
                </Upload>
                <Form
                    {...formItemLayout}
                    onSubmit={this.handleSubmit}
                    className={Style.info_form}
                >
                    <Form.Item label="昵称">
                        {getFieldDecorator('nickName', {
                            initialValue: user_nickname,
                        })(<Input prefix={<Icon type="smile" />} />)}
                    </Form.Item>
                    <Form.Item label="姓名">
                        {getFieldDecorator('name', {
                            initialValue: user_name,
                        })(<Input prefix={<Icon type="user" />} />)}
                    </Form.Item>
                    <Form.Item label="身份证号">
                        {getFieldDecorator('idcard', {
                            rules: [
                                {
                                    validator: this.validateIDcard,
                                }
                            ],
                            initialValue: user_idcard,
                        })(<Input prefix={<Icon type="credit-card" />} />)}
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                    >
                        {getFieldDecorator('phone', {
                            initialValue: user_phone
                        })(<Input
                            prefix={<Icon type="phone" />}
                            disabled
                            autoComplete="off"
                        />)}
                    </Form.Item>
                    <Form.Item label="旧密码" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password prefix={<Icon type="lock" />} />)}
                    </Form.Item>
                    <Form.Item label="新密码" hasFeedback>
                        {getFieldDecorator('newpassword', {
                            rules: [
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password prefix={<Icon type="lock" />} onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item label="性别">
                        {getFieldDecorator('gender', {
                            initialValue: user_gender
                        })(
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedInformation = Form.create({ name: 'information' })(Information)

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(WrappedInformation)
