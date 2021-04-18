import { Button } from 'antd'
import Link from 'umi/link'
import { isHomestayType } from '@/utils/homestay'

const columns = onDelete => [
    {
        title: '公寓名称',
        width: '20%',
        dataIndex: 'homestay_name',
        key: 'homestay_name',
        render: (homestay_name, { homestay_id, homestay_type }) =>
            <Link to={`/homestay/${isHomestayType(homestay_type)}/${homestay_id}`}>{homestay_name}</Link>,
    },
    {
        title: '评价',
        width: '50%',
        dataIndex: 'comment_content',
        key: 'comment_content',
    },
    {
        title: '回复',
        width: '20%',
        dataIndex: 'comment_reply',
        key: 'comment_reply',
        render: (comment_reply) => comment_reply ? comment_reply : '暂无房东回复' 
    },
    {
        title: '操作',
        width: '10%',
        key: 'action',
        render: (text, { comment_id }) => (
            <Button type="danger" onClick={() => onDelete(comment_id)}>删除</Button>
        ),
    },
]

export default columns