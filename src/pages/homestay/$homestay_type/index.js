import React from 'react'
import Seek from '../../../component/homestay/$homestay_type/Seek'
import Main from '../../../component/homestay/$homestay_type/Main'
import { homestayTitle } from '../../../utils'
import Public from '../../public.less'

const Homestay = ({ location: { pathname } }) => {
    document.title = homestayTitle(pathname)[0]['homestay_title']
    return (
        <div className={Public.normal}>
            <div className={Public.container}>
                <Seek />
                <Main homestay_type={pathname} />
            </div>
        </div>
    );
};

export default Homestay;