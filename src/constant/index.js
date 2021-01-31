import { formatMessage } from 'umi-plugin-locale';

// 网站标题（不同页面显示不同标题）
export const title = [
    {
        homestay_type: 'solo',
        homestay_title: formatMessage({ id: 'homestay_solo' }),
        homestay_title_detail: formatMessage({ id: 'homestay_solo_detail' }),
    },
    {
        homestay_type: 'double',
        homestay_title: formatMessage({ id: 'homestay_double' }),
        homestay_title_detail: formatMessage({ id: 'homestay_double_detail' }),
    },
    {
        homestay_type: 'multiplayer',
        homestay_title: formatMessage({ id: 'homestay_multiplayer' }),
        homestay_title_detail: formatMessage({ id: 'homestay_multiplayer_detail' }),
    },
]