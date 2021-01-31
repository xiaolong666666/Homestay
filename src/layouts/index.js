import { Fragment } from 'react'
import { startsWith } from 'lodash'
import Header from './header'
import Footer from './footer'

function BasicLayout(props) {
  const { location: { pathname } } = props
  const signFlag = startsWith(pathname, '/sign_in') || startsWith(pathname, '/sign_up')
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

export default BasicLayout;
