import { Button } from 'antd'
import Link from 'umi/link'
import { isHomestayType } from '@/utils/homestay'
import { Staytime } from '@/constant/reserve'

const columns = onCancel => [
    {
        title: '公寓名称',
        width: '30%',
        dataIndex: 'homestay_name',
        key: 'homestay_name',
        render: (homestay_name, { homestay_id, homestay_type }) =>
            <Link to={`/homestay/${isHomestayType(homestay_type)}/${homestay_id}`}>{homestay_name}</Link>,
    },
    {
        title: '预计看房时间',
        width: '20%',
        dataIndex: 'reserve_check_time',
        key: 'reserve_check_time',
        render: (reserve_check_time) => <p style={{ fontFamily: 'sans-serif' }}>{reserve_check_time}</p>
    },
    {
        title: '预计入住时间',
        width: '20%',
        dataIndex: 'reserve_stay_time',
        key: 'reserve_stay_time',
        render: (reserve_stay_time) => {
            const arr = Staytime.filter(({ value }) => value === reserve_stay_time)
            return <p style={{ fontFamily: 'sans-serif' }}>{arr[0]['label']}</p>
        }
    },
    {
        title: '备注',
        width: '20%',
        dataIndex: 'reserve_note',
        key: 'reserve_note',
        render: (reserve_note) => reserve_note || '暂无备注'
    },
    {
        title: '操作',
        width: '10%',
        key: 'action',
        render: (_, { reserve_id }) => (
            <Button type="danger" onClick={() => onCancel(reserve_id)}>取消</Button>
        ),
    },
]

export default columns