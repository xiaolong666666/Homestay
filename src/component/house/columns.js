import { Tag, Button } from 'antd'
import Link from 'umi/link'
import { isHomestayType, isFacility } from '@/utils/homestay'

const columns = (onDelete) => [
    {
        title: '公寓名称',
        width: '15%',
        dataIndex: 'homestay_name',
        key: 'homestay_name',
        render: (homestay_name, { homestay_id, homestay_type }) => 
            <Link to={`/homestay/${isHomestayType(homestay_type)}/${homestay_id}`}>{homestay_name}</Link>,
    },
    {
        title: '价格',
        width: '10%',
        dataIndex: 'homestay_price',
        key: 'homestay_price',
    },
    {
        title: '公寓描述',
        width: '30%',
        dataIndex: 'homestay_recommend',
        key: 'homestay_recommend',
    },
    {
        title: '公寓地址',
        width: '15%',
        dataIndex: 'homestay_address',
        key: 'homestay_address',
    },
    {
        title: '公寓设施',
        width: '20%',
        key: 'homestay_facility',
        dataIndex: 'homestay_facility',
        render: tags => (
            <span>
                {tags.map(tag => {
                    return (
                        <Tag color="green" key={tag}>
                            {isFacility(tag)}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: '操作',
        width: '10%',
        key: 'action',
        render: (text, { homestay_id }) => (
            <Button type="danger" onClick={() => onDelete(homestay_id)}>删除</Button>
        ),
    },
]

export default columns