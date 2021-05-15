import React, { Fragment } from 'react'
import Link from 'umi/link'
import Icon from '@/assets/fonts/iconfont.css'
import HomeStyle from './index.less'

const entranceMessage = [
    {
        title: '单人公寓',
        link: '/homestay/solo',
        icon: <>&#xe973;</>,
        style: 'li0'
    },
    {
        title: '双人合租',
        link: '/homestay/double',
        icon: <>&#xe9ed;</>,
        style: 'li1'
    },
    {
        title: '多人合租',
        link: '/homestay/multiplayer',
        icon: <>&#xe770;</>,
        style: 'li2'
    }
]

const TenantEntrance = () => {
    return (
        <Fragment>
            <div className={HomeStyle.frame_title_class}>房源分类</div>
            <ul className={HomeStyle.tenant_entrance}>
                {
                    entranceMessage.map(item => {
                        return <Link key={item.title} to={item.link} className={HomeStyle[item.style]}>
                            <div className={HomeStyle.entrance_title}>{item.title}<span>&gt;</span></div>
                            <span className={`${Icon.iconfont} ${HomeStyle.icon_tenant}`}>{item.icon}</span>
                        </Link>
                    })
                }
            </ul>
        </Fragment>
    );
};

export default TenantEntrance;