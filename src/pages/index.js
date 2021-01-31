import React, { Component } from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale';
import Home from '@/component/home'
import { throttling } from '../utils'
import Public from './public.less';
import './../reset.css'
class Index extends Component {

  componentDidMount() {
    window.addEventListener("scroll", throttling(this.listener, 100))
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", throttling(this.listener, 100))
  }

  listener = () => {
    const { dispatch, public: { showBackTop } } = this.props
    const scrollT = document.documentElement.scrollTop
    const showFlag = scrollT > 300
    const dispatchSwitchBackTop = () =>  dispatch({ type: 'public/dump_showBackTop', showBackTop: !showBackTop })
    showFlag ? !showBackTop && dispatchSwitchBackTop() : showBackTop && dispatchSwitchBackTop()
  }

  render() {
    console.log(this.props.public.showBackTop)
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
