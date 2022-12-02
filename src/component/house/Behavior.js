import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Icon, Radio, Checkbox, Upload } from 'antd'
import { typeSource, facilitySource } from '@/constant/homestay'
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
        homestay_picture: [],
        pictured: [],
    }

    componentDidMount() {
        const { form: { setFieldsValue }, behaviorType, homestay_detail } = this.props
        behaviorType === 'modify' ? setFieldsValue(homestay_detail) : setFieldsValue({ homestay_type: 1, homestay_facility: [0, 3] })
        behaviorType === 'modify' && this.setState({ pictured: homestay_detail.homestay_picture })
    }

    // 上传图片
    handleChange = (info) => {
        if (info.file.status === 'done') {
            const { homestay_picture } = this.state
            const { file: { xhr: { response } } } = info
            const pictureUrl = JSON.parse(response).pictureUrl
            this.setState({ homestay_picture: [...homestay_picture, pictureUrl] })
        }
    }

    onOk = () => {
        const { form: { validateFields }, behaviorType, onIssue, onModify } = this.props
        const { homestay_picture, pictured } = this.state
        validateFields((error, result) => {
            if (!error) {
                result.homestay_picture = behaviorType === 'issue' ? homestay_picture : pictured.concat(homestay_picture)
                behaviorType === 'issue' ? onIssue(result) : onModify(result)
            }
        })
    }

    onDeletePictured = (url) => {
        const { pictured } = this.state
        const pictured_handle = pictured.filter(item => (url !== item ? true : false))
        this.setState({ pictured: pictured_handle })
    }

    render() {
        const {
            visible,
            behaviorType,
            onClose,
            form: { getFieldDecorator },
        } = this.props
        const { homestay_picture, pictured } = this.state
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
                    <Form.Item label="公寓类型">
                        {getFieldDecorator('homestay_type', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入公寓类型!',
                                },
                            ],
                        })(<Radio.Group options={typeSource} />)}
                    </Form.Item>
                    <Form.Item label="价格">
                        {getFieldDecorator('homestay_price', {
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
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="公寓设施">
                        {getFieldDecorator('homestay_facility')(<Checkbox.Group options={facilitySource} />)}
                    </Form.Item>
                    <Form.Item label="公寓描述">
                        {getFieldDecorator('homestay_recommend', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入公寓描述!',
                                },
                            ],
                        })(<Input.TextArea />)}
                    </Form.Item>
                    {behaviorType === 'modify' && <Form.Item label="已上传">
                        {pictured.map((item, index) => <div key={`key${index}`} className={behaviorStyle.picture_wrapper}>
                            <img src={item} alt="图片加载错误" />
                            <span onClick={() => this.onDeletePictured(item)}>x</span>
                        </div>)}
                    </Form.Item>}
                    <Form.Item label="公寓图片">
                        {getFieldDecorator('homestay_picture')(<Upload
                            name="picture"
                            headers={{ Authorization: token }}
                            action={`http://localhost:3000/user/homestay/picture`}
                            listType="picture-card"
                            onChange={this.handleChange}
                            multiple
                        >
                            {
                                (pictured.length + homestay_picture.length) >= 8 ? null : uploadButton
                            }
                        </Upload>)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedBehavior = Form.create({ name: 'house' })(Behavior);

export default WrappedBehavior;