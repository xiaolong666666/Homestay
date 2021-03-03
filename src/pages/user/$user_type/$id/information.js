import React, { Component } from 'react'
import { Upload, Form, Input, Radio, Icon, Button, message } from 'antd'
import Default from '@/assets/imgs/default.jpg'
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
        imageUrl: ''
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) =>  {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    handleChange = info => {
        console.log('info', info)
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => { console.log( imageUrl ) }
                // this.setState({
                //     imageUrl,
                //     loading: false,
                // }),
            );
        }
    }

    render() {
        const { form: { getFieldDecorator } } = this.props
        const { imageUrl } = this.state
        console.log('imageUrl', imageUrl)
        return (
            <div className={Style.information}>
                <img src={Default} className={Style.face} alt=""/>
                <Upload
                    name="avatar"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    <Button type="primary">更换头像</Button>
                </Upload>
                <Form
                    {...formItemLayout}
                    onSubmit={this.handleSubmit}
                    className={Style.info_form
                    }
                >
                    <Form.Item
                        label="手机号"
                    >
                        {getFieldDecorator('phone')(<Input
                            prefix={<Icon type="phone" />}
                            disabled
                            autoComplete="off"
                        />)}
                    </Form.Item>
                    <Form.Item label="修改密码" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
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
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password prefix={<Icon type="lock" />} onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item label="昵称">
                        {getFieldDecorator('nickName')(<Input prefix={<Icon type="smile" />} />)}
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

const WrappedInformation = Form.create({ name: 'information' })(Information);

export default WrappedInformation;