import React, { Component } from 'react'
import { Form, Input, Radio, Icon, Checkbox, Button, message } from 'antd'
import { connect } from 'dva'
import router from 'umi/router'
import SignupStyle from './index.less'

const formItemLayout = {
    labelCol: {
        sm: { span: 6 },
    },
    wrapperCol: {
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        sm: {
            span: 16,
            offset: 6,
        },
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
class RegistrationForm extends Component {

    state = {
        confirmDirty: false
    }

    // 验证手机号
    validatePhoneNumber = (rule, value, callback) => {
        if (value && !(/^1[345678]\d{9}$/.test(value))) {
            callback('请输入正确的手机号！')
        } else {
            callback()
        }
    }

    // 校验密码
    validateToNextPassword = (rule, value, callback) => {
        const { form: { validateFields } } = this.props
        const { confirmDirty } = this.state
        if (value && confirmDirty) {
            validateFields(['confirm'], { force: true })
        }
        callback();
    }

    // 验证密码是否一致
    compareToFirstPassword = (rule, value, callback) => {
        const { form: { getFieldValue } } = this.props
        if (value && value !== getFieldValue('password')) {
            callback('两个密码输入不一致，请重新输入')
        } else {
            callback()
        }
    }
    
    // 设置标志
    handleConfirmBlur = e => {
        const { target: { value } } = e
        const { confirmDirty } = this.state
        this.setState({ confirmDirty: confirmDirty || !!value })
    }

    // 注册--发送数据
    handleSubmit = e => {
        const { dispatch, form: { validateFieldsAndScroll } } = this.props
        e.preventDefault();
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({ type: 'user/user_sign_up', payload: values })
                .then(res => {
                    const { data: { code, message: tips } } = res
                    if (code === 200) {
                        message.success(tips)
                        router.push('/sign_in')
                    } else {
                        if (code === 304) {
                            message.warning(tips)
                        } else {
                            message.error(tips)
                        }
                    }
                })
                .catch(e => {
                    message.error('很遗憾，注册失败！')
                })
            }
        });
    }

    render() {
        const { form: { getFieldDecorator } } = this.props
        
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
                                message: '请确认密码!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password prefix={<Icon type="lock" />} onBlur={this.handleConfirmBlur} />)}
                </Form.Item>             
                <Form.Item label="性别">
                    {getFieldDecorator('gender', {
                        rules: [{ required: true }],
                        initialValue: 1,
                    })(
                        <Radio.Group>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </Radio.Group>)}
                </Form.Item>
                <Form.Item label="角色">
                    {getFieldDecorator('role', {
                        rules: [{ required: true }],
                        initialValue: 2,
                    })(
                        <Radio.Group>
                            <Radio value={2}>房东</Radio>
                            <Radio value={3}>租客</Radio>
                        </Radio.Group>)}
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
                    <Button type="primary" htmlType="submit" className={SignupStyle.register_btn}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default connect()(WrappedRegistrationForm)
