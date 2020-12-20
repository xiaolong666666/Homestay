import { Fragment } from 'react'
import Header from './header'
import Footer from './footer'

function BasicLayout(props) {
  return (
    <Fragment>
      <Header />
      {props.children}
      <Footer />
    </Fragment>
  )
}

export default BasicLayout;
