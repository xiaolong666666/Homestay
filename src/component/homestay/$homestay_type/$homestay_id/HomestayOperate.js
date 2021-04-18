import React from 'react'
import { connect } from 'dva'
import { message } from 'antd'
import Icon from '@/assets/fonts/iconfont.css'
import InfoStyle from './index.less'

const HomestayOperate = (props) => {
    const { homestay_detail: { like, like_count, favorites } } = props

    // 处理点赞或取赞
    const handleLike = () => {
        const {
            dispatch,
            match: { params: { homestay_id } },
            homestay_detail: { like },
        } = props
        dispatch({ type: 'homestay_detail/submitlike', payload: { homestay_id, behavior: like ? 'sub' : 'add' } })
        .then(handleLikeTips)
        .catch(handleLikeTips)
    }

    // 处理收藏或取藏
    const handleFavorites = () => {
        const {
            dispatch,
            match: { params: { homestay_id } },
            homestay_detail: { favorites },
        } = props
        dispatch({ type: 'homestay_detail/submitfavorites', payload: { homestay_id, behavior: favorites ? 'sub' : 'add' } })
        .then(handleFavoritesTips)
        .catch(handleFavoritesTips)
    }

    // 处理点赞或取赞提示
    const handleLikeTips = (res) => {
        const {
            dispatch,
            match: { params: { homestay_id } },
            user: { user: { user_id } },
        } = props
        const { data: { code, message: tips } } = res
        if (code) {
            message.success(tips)
            dispatch({ type: 'homestay_detail/fetchHomestayDetail', payload: { homestay_id, user_id } })
        } else {
            message.error(tips)
        }                                         
    }

    // 处理收藏或取藏提示
    const handleFavoritesTips = (res) => {
        const {
            dispatch,
            match: { params: { homestay_id } },
            user: { user: { user_id } },
        } = props
        const { data: { code, message: tips } } = res
        if (code) {
            message.success(tips)
            dispatch({ type: 'homestay_detail/fetchHomestayDetail', payload: { homestay_id, user_id } })
        } else {
            message.error(tips)
        }
    }

    const handleAnchor = (anchor) => {
        if (anchor) {
            let anchorElement = document.getElementById(anchor)
            if (anchorElement) {
                anchorElement.scrollIntoView({ block: 'end', behavior: 'smooth' })
            }
        }
    }
    return (
        <div className={InfoStyle.homestay_operate}>
            <div className={`${InfoStyle.reserve} ${Icon.iconfont}`}>立即预约</div>
            <div className={`${InfoStyle.comment} ${Icon.iconfont}`} onClick={() => handleAnchor('comment')}>评论</div>
            <div className={`${favorites ? InfoStyle.favorites : InfoStyle.unfavorites} ${Icon.iconfont}`} onClick={handleFavorites}>收藏</div>
            <div className={`${like ? InfoStyle.liked : InfoStyle.unlike} ${Icon.iconfont}`} onClick={handleLike}><span>{like_count}</span>点赞</div>
            <div id="comment_start"/>
        </div>
    );
};

export default connect()(HomestayOperate);