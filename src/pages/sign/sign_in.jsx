import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { connect } from 'dva'
import router from 'umi/router'
import axios from 'axios'

class LoginForm extends Component {
    state = {
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const params = new URLSearchParams();
                params.append('username', values.username);
                params.append('password', values.password);
                axios.post('/api/user/login', params)
                    .then(res => {
                        if (res.statusText === 'OK') {
                            const { dispatch } = this.props
                            message.success('恭喜你，登录成功!');
                            dispatch({ type: 'user/onLine', user: res.data })
                            localStorage.setItem('user', JSON.stringify(res.data))
                            router.push('/apparel')
                        } else {
                            message.error('很遗憾，登录失败！')
                        }
                    })
                    .catch(e => {
                        message.error('很遗憾，登录失败！')
                    })
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const buttonFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="用户名">
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ],
                    })(<Input prefix={<Icon type="user" />} autoComplete="off" />)}
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
                    <Button type="primary" htmlType="submit" style={{ width: '160px', height: '36px' }}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm);

export default connect()(WrappedLoginForm);