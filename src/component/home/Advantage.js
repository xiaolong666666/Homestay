import React, { Fragment, useState } from 'react'
import { Modal } from 'antd'
import Advantage_yz from '@/assets/imgs/advantage/advantage_yz.png'
import Advantage_bz from '@/assets/imgs/advantage/advantage_bz.png'
import Advantage_aq from '@/assets/imgs/advantage/advantage_aq.png'
import Advantage_dz from '@/assets/imgs/advantage/advantage_dz.png'
import Advantage_jz from '@/assets/imgs/advantage/advantage_jz.png'
import Advantage_yz_tip from '@/assets/imgs/advantage/advantage_yz_tip.jpg'
import Advantage_bz_tip from '@/assets/imgs/advantage/advantage_bz_tip.jpg'
import Advantage_aq_tip from '@/assets/imgs/advantage/advantage_aq_tip.jpg'
import Advantage_dz_tip from '@/assets/imgs/advantage/advantage_dz_tip.jpg'
import Advantage_jz_tip from '@/assets/imgs/advantage/advantage_jz_tip.jpg'
import HomeStyle from './index.less'

const advantageMessage = [
    {
        identification: Advantage_yz,
        explain: '房源100%人工审核',
    },
    {
        identification: Advantage_bz,
        explain: '恬逸小岛 资金保障',
    },
    {
        identification: Advantage_aq,
        explain: '保障入住人身安全',
    },
    {
        identification: Advantage_dz,
        explain: '地主之谊 出行无忧',
    },
    {
        identification: Advantage_jz,
        explain: '家政服务 应你需求',
    },
]

const advantageTipMessage = [
    {
        pic: Advantage_yz_tip,
        content: <Fragment>
            <p>1、我们的每一个房东，每一间房间都是由恬逸小岛员工线上人工审核。</p>
            <p>2、我们每一个房东都经过身份验证系统进行真实身份验证。</p>
        </Fragment>,
    },
    {
        pic: Advantage_bz_tip,
        content: <Fragment>
            <p>1、在恬逸小岛平台预订的房间，房款都是由恬逸小岛代为保管，当您入住结束后房款才会转给房东。</p>
            <p>2、如您在入住过程中遇到任何不满意，恬逸小岛将全力帮您解决问题。</p>
        </Fragment>,
    },
    {
        pic: Advantage_aq_tip,
        content: <Fragment>
            <p>1、恬逸小岛上线以来服务了数千万房客，我们做了大量工作来保障您的交易和入住安全。</p>
            <p>2、您在恬逸小岛pc端、app产生的订单我们将免费赠送您一份保险，保障您在入住过程中的人身安全。入住人数较多时，建议您自行为其购买住宿意外险。</p>
        </Fragment>,
    },
    {
        pic: Advantage_dz_tip,
        content: <Fragment>
            <p>我们的房东大都是不折不扣的当地人，他们愿为远道而来的您尽一尽地主之谊。</p>
            <p>1、房东会告诉您当地哪里是最好玩的，让您能够真正的体验家乡般的恬逸生活。</p>
            <p>2、房东会告诉您去哪里吃能吃到当地特色美食，哪怕是胡同里的一个小摊位，他还会告诉您哪里的美食价格合理不会被宰，有他拒绝宰客。</p>
            <p>3、房东会告诉您出行的最佳路线，不走冤枉路，不打黑车，享受高品质的生活。</p>
        </Fragment>,
    },
    {
        pic: Advantage_jz_tip,
        content: <Fragment>
            <p>1、年轻人快节奏的生活方式可能没有时间做清洁工作，为此恬逸小岛提供了家政服务。</p>
            <p>2、恬逸小岛以绿洁全心全意为生活创造品质为平台使命，对租客服务的同时进行不定时的抽查回访，为推进现代家政服务社会而努力。</p>
        </Fragment>,
    },
]

const Advantage = () => {
    const [showTips, setShowTips] = useState(false)
    const [key, setKey] = useState(0)
    return (
        <Fragment>
            <div className={HomeStyle.advantage}>
                <div className={HomeStyle.advantage_title}>为什么在“恬逸小岛”订房？</div>
                <div className={HomeStyle.advantage_boxs}>
                    {
                        advantageMessage.map((item, index) => (
                            <div
                                key={`key${index}`}
                                className={HomeStyle.advantage_box}
                                onClick={() => { setKey(index); setShowTips(true) }}
                            >
                                <div className={HomeStyle.advantage_identification}>
                                    <img src={item.identification} alt="" />
                                </div>
                                <h3>{item.explain}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Modal
                width={700}
                visible={showTips}
                footer={null}
                onCancel={() => setShowTips(false)}
            >
                <div className={HomeStyle.advantage_tip}>
                    <div className={HomeStyle.advantage_tip_title}>为什么在恬逸小岛订房</div>
                    <img src={Advantage_yz_tip} alt=""/>
                    <div className={HomeStyle.advantage_tip_main}>
                        <h4>{advantageMessage[key].explain}</h4>
                        {advantageTipMessage[key].content}
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

export default Advantage;