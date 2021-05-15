import React, { Fragment, memo, useEffect } from 'react'
import { connect } from 'dva'
import Banner from './Banner'
import Main from './Main'
import Advantage from './Advantage'

const Home = props => {
    const { dispatch } = props
    useEffect(() => {
        dispatch({ type: 'public/fetch_review' })
    }, [dispatch])

    return (
        <Fragment>
            <Banner />
            <Main { ...props }/>
            <Advantage />
        </Fragment>
    );
}

const mapStateToProps = state => ({
    public: state.public,
})

export default connect(mapStateToProps)(memo(Home))