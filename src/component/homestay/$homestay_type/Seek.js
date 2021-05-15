import React from 'react'
import { Form, Select, Divider, Checkbox, Button } from 'antd'
import { createForm } from 'rc-form'
import { connect } from 'dva'
import { facilitySource } from '@/constant/homestay'
import Icon from '@/assets/fonts/iconfont.css'
import HomestayStyle from './index.less'

const { Option } = Select
const { Group: CheckboxGroup } = Checkbox

const countyDataSource = [
    { value: 1, label: '海港区' },
    { value: 2, label: '开发区' },
    { value: 3, label: '山海关区' },
    { value: 4, label: '北戴河区' },
    { value: 5, label: '抚宁县' },
    { value: 6, label: '昌黎县' },
    { value: 7, label: '卢龙县' },
    { value: 8, label: '青龙县' },
]

const priceDataSource = [
    { value: 1, label: '1000↓' },
    { value: 2, label: '1000-1500' },
    { value: 3, label: '1500-2000' },
    { value: 4, label: '2000↑' },
]

const Seek = ({
        dispatch,
        form: { getFieldDecorator, validateFields },
        homestay_type
    }) => {

    // 搜索房源
    const onSearchHouse = () => {
        validateFields((error, value) => {
            if (!error) {
                const type = homestay_type.split('/')[2]
                localStorage.setItem('seek', JSON.stringify({ homestay_type: type, ...value }))
                dispatch({ type: 'homestay/fetchHomestay', payload: { homestay_type: type, ...value } })
            }
        });
    }

    return (
        <Form className={HomestayStyle.seek_wrapper}>
            <div className={HomestayStyle.seek_county}>
                <label htmlFor="county">地区（区/县）：</label>
                {
                    getFieldDecorator('county', {
                        initialValue: countyDataSource[0]['value']
                    })(
                        <Select id="county">
                            {countyDataSource.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
                        </Select>
                    )
                }
            </div>
            <Divider type="vertical" />
            <div className={HomestayStyle.seek_price}>
                <label htmlFor="price">价格（元/月）：</label>
                {
                    getFieldDecorator('price', {
                        initialValue: priceDataSource[0]['value']
                    })(
                        <Select id="price">
                            {priceDataSource.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
                        </Select>
                    )
                }
                
            </div>
            <Divider type="vertical" />
            <div className={HomestayStyle.seek_facility}>
                <label htmlFor="facility">设施：</label>
                {
                    getFieldDecorator('facility', {
                        initialValue: [0, 1, 3],
                    })(
                        <CheckboxGroup id="facility" options={facilitySource} />
                    )
                }
            </div>
            <Divider type="vertical" />
            <Button type="primary" onClick={onSearchHouse}>
                搜索房源<span className={`${HomestayStyle.seek_btn} ${Icon.iconfont}`}>&#xe603;</span>
            </Button>
        </Form>
    );
};

export default connect()(createForm()(Seek));