import React, { Component } from 'react'
import PicShowStyle from './index.less'

class PicShow extends Component {

    state = {
        selectPicIndex: 1,
    }

    picFilter = (index) => {
        const { homestay_detail: { picDataSource } } = this.props
        const { selectPicIndex } = this.state
        const maxIndex = picDataSource.length - 1
        if (selectPicIndex === maxIndex) {
            return index === (maxIndex - 4) || index === (maxIndex - 3) || index === (maxIndex - 2) || index === (maxIndex - 1) || index === maxIndex
        }
        if (selectPicIndex === maxIndex - 1 && maxIndex >= 5) {
            return index === (maxIndex - 5) || index === (maxIndex - 4) || index === (maxIndex - 3) || index === (maxIndex - 2) || index === (maxIndex - 1)
        }
        if (selectPicIndex === maxIndex - 2 && maxIndex >= 6) {
            return index === (maxIndex - 6) || index === (maxIndex - 5) || index === (maxIndex - 4) || index === (maxIndex - 3) || index === (maxIndex - 2)
        }
        return index === 0 || index === 1 || index === 2 || index === 3 || index === 4
    }

    onSwitchPic = (index) => this.setState({ selectPicIndex: index })

    onSwitchTop = () => {
        const { homestay_detail: { picDataSource } } = this.props
        const { selectPicIndex } = this.state
        const prevFlag = selectPicIndex === 0
        this.setState({ selectPicIndex: prevFlag ? picDataSource.length - 1 : selectPicIndex - 1 })
    }

    onSwitchBottom = () => {
        const { homestay_detail: { picDataSource } } = this.props
        const { selectPicIndex } = this.state
        const nextFlag = selectPicIndex === picDataSource.length - 1
        this.setState({ selectPicIndex: nextFlag ? 0 : selectPicIndex + 1 })
    }

    render() {
        const { homestay_detail: { picDataSource } } = this.props
        const { selectPicIndex } = this.state

        return (
            <div className={PicShowStyle.pic_container}>
                <div className={PicShowStyle.pic_show}>
                    <img src={picDataSource[selectPicIndex]} alt=""/>
                </div>
                <div className={PicShowStyle.top_wrapper} onClick={this.onSwitchTop}/>
                <div className={PicShowStyle.top} onClick={this.onSwitchTop}/>
                <ul className={PicShowStyle.pic_list}>
                    {
                        picDataSource
                        .map((pic, index) => (
                            this.picFilter(index) && <li
                                key={`pic${index}`}
                                className={index === selectPicIndex ? PicShowStyle.selected : ''}
                                onClick={() => this.onSwitchPic(index)}
                            >
                                <img src={pic} alt=""/>
                            </li>
                        ))
                    }
                </ul>
                <div className={PicShowStyle.bottom_wrapper} onClick={this.onSwitchBottom}/>
                <div className={PicShowStyle.bottom} onClick={this.onSwitchBottom}/>
            </div>
        );
    }
}

export default PicShow
