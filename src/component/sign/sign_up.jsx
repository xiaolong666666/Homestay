import React, { Component } from 'react';
import { Form, Input, Radio, Icon, Checkbox, Button, message } from 'antd';
import axios from 'axios'

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                axios.post('/api/user/addUser', {
                    ...values
                })
                    .then(res => {
                        if (res.statusText === 'OK') {
                            message.success('恭喜你，注册成功!');
                        } else {
                            message.error('很遗憾，注册失败！')
                        }
                    })
                    .catch(e => {
                        message.error('很遗憾，注册失败！')
                    })
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 6,
                },
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
                <Form.Item label="密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password prefix={<Icon type="lock" />} />)}
                </Form.Item>
                <Form.Item label="确认密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '请确认你的密码!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password prefix={<Icon type="lock" />} onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item label="姓名">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入你的姓名!', whitespace: true }],
                    })(<Input prefix={<Icon type="smile" />} />)}
                </Form.Item>
                <Form.Item label="性别">
                    {getFieldDecorator('sex', {
                        initialValue: 0
                    })(
                        <Radio.Group>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </Radio.Group>)}
                </Form.Item>
                <Form.Item label="手机号">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入你的手机号!' }],
                    })(<Input prefix={<Icon type="phone" />} style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        rules: [{ required: true, message: '请勾选用户协议和隐私政策!' }],
                    })(
                        <Checkbox>同意遵守“恬逸”小岛<a href="/"> 用户协议 </a>和<a href="/"> 隐私政策 </a></Checkbox>
                    )}
                </Form.Item>
                <Form.Item {...buttonFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{ width: '160px', height: '36px' }}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;