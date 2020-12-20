import React from 'react';
import { Link } from 'dva/router'
import { Divider  } from 'antd'
import FooterStyle from './index.less'

const linkDataSource = [
    { label: '隐私协议', link: '/' },
    { label: '用户协议', link: '/' },
    { label: '关于我们', link: '/' },
    { label: '我是房客', link: '/' },
    { label: '加入小岛', link: '/' },
    { label: '帮助中心', link: '/' },
    { label: '联系我们', link: '/' },
]

const Footer = () => {
    return (
        <footer className={FooterStyle.footer}>
            <div className={FooterStyle.links}>
                {
                    linkDataSource.map((item, index) => (
                        <div key={item.label} className={FooterStyle.link}>
                            <Link
                                to={item.link}
                            >
                                {item.label}
                            </Link>
                            {
                                (linkDataSource.length - 1 !== index) && <Divider
                                    type='vertical'
                                    className={FooterStyle.divider}
                                />
                            }
                        </div>
                    ))
                }
            </div>
            <div className={FooterStyle.copy}>
                &copy; Copyright 
                <Divider
                    type='vertical'
                />
                &copy; 2020-2021
                <Divider
                    type='vertical'
                />
                &copy; Little Dragon
            </div>
            <div className={FooterStyle.security}>
                京公网安备 11013081862537号 营业执照 小岛保障计划
            </div> 
        </footer>
    );
};

export default Footer;