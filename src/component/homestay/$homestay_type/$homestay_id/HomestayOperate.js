import React, { useState } from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Select, message, DatePicker } from 'antd'
import moment from 'moment'
import { Staytime } from '@/constant/reserve'
import Icon from '@/assets/fonts/iconfont.css'
import InfoStyle from './index.less'

const formItemLayout = {
    labelCol: {
        sm: { span: 8 },
    },
    wrapperCol: {
        sm: { span: 16 },
    },
};

const style = { 
    width: '63%'
}

const Order = ({
    visible,
    setVisible,
    handleReserve,
    form: { getFieldDecorator, validateFields },
}) => {
    const range = () => {
        const array = [ ...new Array(24).keys() ]
        return array.slice(0, 8).concat(array.slice(22))
    }

    const disabledDate = current => current && current < moment().endOf('day')

    const disabledTime = () => ({ disabledHours: range })

    const onOk = () => {
        validateFields((error, result) => {
            if (!error) {
                result = {
                    ...result,
                    reserve_check_time: result.reserve_check_time.format('YYYY-MM-DD HH:mm'),
                }
                handleReserve(result)
            }
        })
    }

    return (
        <Modal
            title="房源预约"
            visible={visible}
            cancelText="取消"
            okText="预约"
            onCancel={() => setVisible(false)}
            onOk={onOk}
        >
            <Form {...formItemLayout}>
                <Form.Item label="看房时间">
                    {getFieldDecorator('reserve_check_time', {
                        rules: [
                            {
                                required: true,
                                message: '请输入预约时间!',
                            },
                        ],
                    })(<DatePicker style={style} placeholder="请选择看房时间" showToday={false} format="YYYY-MM-DD HH:mm" disabledDate={disabledDate} disabledTime={disabledTime} showTime={{ defaultValue: moment("8:00", "HH:mm") }} />)}
                </Form.Item>
                <Form.Item label="入住时间">
                    {getFieldDecorator('reserve_stay_time', {
                        rules: [
                            {
                                required: true,
                                message: '请输入入住时间!',
                            },
                        ],
                    })(<Select placeholder="请选择入住时间" style={style}>
                        { Staytime.map(({ value, label }) => <Select.Option key={value} value={value}>{label}</Select.Option>) }
                    </Select>)}
                </Form.Item>
                <Form.Item label="备注">
                    {getFieldDecorator('reserve_note')(<Input.TextArea style={style} placeholder="请输入备注" autoComplete="off" />)}
                </Form.Item>
            </Form>
        </Modal>
    )
}


const WrappedOrder = Form.create({ name: 'order' })(Order);

const HomestayOperate = (props) => {
    const { user: { isLoginFlag }, homestay_detail: { price, like, like_count, favorites } } = props
    const [visible, setVisible] = useState(false)

    // 处理点赞或取赞
    const handleLike = () => {
        const {
            dispatch,
            match: { params: { homestay_id } },
            user: { isLoginFlag },
            homestay_detail: { like },
        } = props
        if (isLoginFlag) {
            dispatch({ type: 'homestay_detail/submitlike', payload: { homestay_id, behavior: like ? 'sub' : 'add' } })
                .then(handleLikeTips)
                .catch(handleLikeTips)
        } else {
            message.warn('请登录后进行操作')
        }
    }

    // 处理收藏或取藏
    const handleFavorites = () => {
        const {
            dispatch,
            match: { params: { homestay_id } },
            user: { isLoginFlag },
            homestay_detail: { favorites },
        } = props
        if (isLoginFlag) {
            dispatch({ type: 'homestay_detail/submitfavorites', payload: { homestay_id, behavior: favorites ? 'sub' : 'add' } })
                .then(handleFavoritesTips)
                .catch(handleFavoritesTips)
        } else {
            message.warn('请登录后进行操作')
        }
    }

    // 处理点赞或取赞提示
    const handleLikeTips = (res) => {
        const {
            dispatch,
            match: { params: { homestay_id } },
            user: { user: { user_id } },
        } = props
        const { data: { code, message: tips } } = res
        if (code) {
            message.success(tips)
            dispatch({ type: 'homestay_detail/fetchHomestayDetail', payload: { homestay_id, user_id } })
        } else {
            message.error(tips)
        }                                         
    }

    // 处理收藏或取藏提示
    const handleFavoritesTips = (res) => {
        const {
            dispatch,
            match: { params: { homestay_id } },
            user: { user: { user_id } },
        } = props
        const { data: { code, message: tips } } = res
        if (code) {
            message.success(tips)
            dispatch({ type: 'homestay_detail/fetchHomestayDetail', payload: { homestay_id, user_id } })
        } else {
            message.error(tips)
        }
    }

    // 处理评论
    const handleAnchor = (anchor) => {
        if (anchor) {
            let anchorElement = document.getElementById(anchor)
            if (anchorElement) {
                anchorElement.scrollIntoView({ block: 'end', behavior: 'smooth' })
            }
        }
    }

    // 处理预约
    const handleReserve = (result) => {
        const {
            dispatch,
            match: { params: { homestay_id } },
        } = props
        dispatch({ type: 'homestay_detail/submitReserve', payload: { ...result, homestay_id } })
            .then(handleReserveTips)
            .catch(handleReserveTips)
    }

    // 处理预约提示
    const handleReserveTips = (res) => {
        const { data: { code, message: tips } } = res
        if (code) {
            message.success(tips)
            setVisible(false)
        } else {
            message.error(tips)
        }
    }
    return (
        <div className={InfoStyle.homestay_operate}>
            <div className={`${InfoStyle.reserve} ${Icon.iconfont}`} onClick={() => isLoginFlag ? setVisible(true) : message.warn('请登录后进行操作')}>立即预约</div>
            <div className={`${InfoStyle.comment} ${Icon.iconfont}`} onClick={() => handleAnchor('comment')}>评论</div>
            <div className={`${favorites ? InfoStyle.favorites : InfoStyle.unfavorites} ${Icon.iconfont}`} onClick={handleFavorites}>收藏</div>
            <div className={`${like ? InfoStyle.liked : InfoStyle.unlike} ${Icon.iconfont}`} onClick={handleLike}><span>{like_count}</span>点赞</div>
            <div className={InfoStyle.price}>￥&nbsp;{price}</div>
            <div id="comment_start"/>
            { visible && <WrappedOrder visible={visible} setVisible={setVisible} handleReserve={handleReserve} /> }
        </div>
    );
};

export default connect()(HomestayOperate);