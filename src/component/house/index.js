import React, { Component } from 'react'
import { Table } from 'antd'
import { connect } from 'dva'
import columns from './columns'

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

class index extends Component {

    componentDidMount() {
        this.fetchHomestay()
    }

    fetchHomestay = () => {
        const { dispatch } = this.props
        dispatch({ type: 'user/fetch_homestay' })
    }
    render() {
        const { user: { homestay } } = this.props
        console.log('homestay', homestay)
        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(index)
