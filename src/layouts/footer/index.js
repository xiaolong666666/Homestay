import React from 'react';
import { Link } from 'dva/router'
import { Divider  } from 'antd'
import { linkDataSource } from '@/utils'
import FooterStyle from './index.less'

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