import React, { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale';
import Home from '@/component/home'
import { throttling } from '../utils'
import Icon from '@/assets/fonts/iconfont.css'
import Public from './public.less';
import './../reset.css'
class Index extends Component {

  componentDidMount() {
    window.addEventListener("scroll", throttling(this.listener, 100))
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", throttling(this.listener, 100))
  }

  // 监听滚动条位置改变showBackTop
  listener = () => {
    const { dispatch, public: { showBackTop } } = this.props
    const scrollT = document.documentElement.scrollTop
    const showFlag = scrollT > 600
    const dispatchSwitchBackTop = () =>  dispatch({ type: 'public/dump_showBackTop', showBackTop: !showBackTop })
    showFlag ? !showBackTop && dispatchSwitchBackTop() : showBackTop && dispatchSwitchBackTop()
  }

  // 缓动滚动到顶部
  handdleTop = () => {
    let nowposition = document.documentElement.scrollTop;
    let cut = 10;
    let goTop = setInterval(() => {
      if (nowposition > cut) {
        nowposition -= cut;
        window.scrollTo(0, nowposition);
      } else {
        window.scrollTo(0, 0);
        clearInterval(goTop);
      }
    }, 1);
  }

  render() {
    const { public: { showBackTop } } = this.props
    return (
      <div className={Public.normal}>
        <Home />
        <ul>
          <li>
            <a href="https://umijs.org/guide/getting-started.html">
              {formatMessage({ id: 'index.start' })}
            </a>
          </li>
        </ul>
        {showBackTop && <div className={`${Public.back_top} ${Icon.iconfont}`} title="回到顶部" onClick={this.handdleTop}/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    public: state.public,
  }
}

export default connect(mapStateToProps)(Index)
