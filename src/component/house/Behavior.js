import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Icon, Checkbox, Cascader, Upload } from 'antd'
import { addressSource, facilitySource } from '@/constant/homestay'
import behaviorStyle from './index.less'

const formItemLayout = {
    labelCol: {
        sm: { span: 6 },
    },
    wrapperCol: {
        sm: { span: 16 },
    },
};

const uploadButton = (
    <Fragment>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
    </Fragment>
);

class Behavior extends Component {

    state = {
        homestay_picture: []
    }

    addressRef = ref => this.addressDetail = ref

    // 上传图片
    handleChange = (info) => {
        if (info.file.status === 'done') {
            const { homestay_picture } = this.state
            const { file: { xhr: { response } } } = info
            const pictureUrl = JSON.parse(response).pictureUrl
            this.setState({ homestay_picture: [ ...homestay_picture, pictureUrl ] })
        }
    }

    onOk = () => {
        const { form: { validateFields }, onIssue } = this.props
        const { homestay_picture } = this.state
        validateFields((error, result) => {
            if (!error) {
                result.homestay_address = result.homestay_address.join('')
                result.homestay_address = result.homestay_address + (this.addressDetail.state.value || '')
                result.homestay_picture = homestay_picture
                onIssue(result)
            }
        })
    }

    render() {
        const { form: { getFieldDecorator }, visible, behaviorType, onClose } = this.props
        const token = localStorage.getItem('token')
        return (
            <Modal
                title={behaviorType === 'issue' ? '发布房源' : '编辑房源'}
                visible={visible}
                cancelText="取消"
                okText="发布"
                onCancel={onClose}
                onOk={this.onOk}
            >
                <Form {...formItemLayout}>
                    <Form.Item label="公寓名称">
                        {getFieldDecorator('homestay_name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入公寓名称!',
                                },
                            ],
                        })(<Input autoComplete="off" />)}
                    </Form.Item>
                    <Form.Item label="价格">
                        {getFieldDecorator('homestay_pirce', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入价格!',
                                },
                            ],
                        })(<Input addonAfter="/ 月" className={behaviorStyle.price} />)}
                    </Form.Item>
                    <Form.Item label="公寓地址">
                        {getFieldDecorator('homestay_address', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入公寓地址!',
                                },
                            ],
                        })(<Cascader
                            placeholder=""
                            options={addressSource}
                            className={behaviorStyle.address_cascader}
                        />)}
                        <Input ref={this.addressRef} className={behaviorStyle.address_input} />
                    </Form.Item>
                    <Form.Item label="公寓设施">
                        {getFieldDecorator('homestay_facility', {
                            initialValue: [0, 3]
                        })(<Checkbox.Group options={facilitySource} />)}
                    </Form.Item>
                    <Form.Item label="公寓描述">
                        {getFieldDecorator('homestay_recommend')(<Input.TextArea />)}
                    </Form.Item>
                    <Form.Item label="公寓图片">
                        {getFieldDecorator('homestay_picture')(<Upload
                            name="picture"
                            headers={{ Authorization: token }}
                            action={`http://localhost:3000/user/homestay/picture`}
                            listType="picture-card"
                            // fileList={fileList}
                            onChange={this.handleChange}
                            multiple
                        >
                            {uploadButton}
                        </Upload>)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedBehavior = Form.create({ name: 'house' })(Behavior);

export default WrappedBehavior;