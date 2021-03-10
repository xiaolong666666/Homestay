import { Fragment, useEffect } from 'react'
import { connect } from 'dva'
import { startsWith } from 'lodash'
import Header from './header'
import Footer from './footer'

function BasicLayout(props) {
  const { location: { pathname } } = props
  const signFlag = startsWith(pathname, '/sign_in') || startsWith(pathname, '/sign_up')
  useEffect(() => {
    fetchUser()
  })
  const fetchUser = () => {
    const { dispatch } = props
    if (!!localStorage.getItem('token')) {
      console.log()
      dispatch({ type: 'user/user_sign_check' })
    }
  }
  return (
    signFlag
      ? <Fragment>
          {props.children}
        </Fragment>
      : <Fragment>
          <Header />
          {props.children}
          <Footer />
        </Fragment>
  )
}

export default connect()(BasicLayout)
