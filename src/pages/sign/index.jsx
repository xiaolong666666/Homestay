import React from 'react'
import { Tabs, Icon } from 'antd'
import Link from 'umi/link'
import router from 'umi/router'
import Signin from './sign_in'
import Signup from './sign_up'
import Sign from './index.less'

const { TabPane } = Tabs;

const index = props => {
    
    const handleSwitchRouter = key => {
        router.push(key)
    }

    return (
        <div className={Sign.sign}>
            <Link to='/'><div className={Sign.sign_logo}/></Link>
            <div className={Sign.sign_form}>
                <Tabs
                    defaultActiveKey={props.location.pathname}
                    onChange={handleSwitchRouter}
                >
                    <TabPane
                        tab={
                            <span>
                                <Icon type="login" />
                                登录
                            </span>
                        }
                        key="/sign_in"
                    >
                        <Signin />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <Icon type="edit" />
                                注册
                            </span>
                        }
                        key="/sign_up"
                    >
                        <Signup />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default index;