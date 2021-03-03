import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { connect } from 'dva'
import router from 'umi/router'
import SigninStyle from './index.less'

const formItemLayout = {
    labelCol: {
        sm: { span: 6 },
    },
    wrapperCol: {
        sm: { span: 16 },
    },
};
const buttonFormItemLayout = {
    wrapperCol: {
        sm: {
            span: 14,
            offset: 8,
        },
    },
};
class LoginForm extends Component {

    // 验证手机号
    validatePhoneNumber = (rule, value, callback) => {
        if (value && !(/^1[345678]\d{9}$/.test(value))) {
            callback('请输入正确的手机号！')
        } else {
            callback()
        }
    }

    // 登录--发送数据
    handleSubmit = e => {
        const { dispatch, form: { validateFieldsAndScroll } } = this.props
        e.preventDefault();
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                const params = new URLSearchParams();
                params.append('phone', values.phone);
                params.append('password', values.password);
                dispatch({ type: 'user/user_sign_in', payload: params }).then(res => {
                    const { code, message: tips } = res
                    code ? message.success(tips) : message.error(tips)
                    code && router.push('/')
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="手机号">
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                required: true,
                                message: '请输入手机号!',
                            },
                            {
                                validator: this.validatePhoneNumber,
                            }
                        ],
                    })(<Input prefix={<Icon type="phone" />} autoComplete="off" />)}
                </Form.Item>
                <Form.Item label="密码">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ],
                    })(<Input.Password prefix={<Icon type="lock" />} />)}
                </Form.Item>
                <Form.Item {...buttonFormItemLayout}>
                    <Button type="primary" htmlType="submit" className={SigninStyle.login_btn}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm);

export default connect()(WrappedLoginForm);