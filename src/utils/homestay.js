// 判断公寓类型
export const isHomestayType = (homestay_type) => {
    let type = 'solo'
    switch (homestay_type) {
        case 1: type = 'solo'; break;
        case 2: type = 'double'; break;
        case 3: type = 'multiplayer'; break;
        default: type = 'solo';
    }
    return type
}

// 判断公寓设施
export const isFacility = (homestay_facility) => {
    let facility = '淋浴'
    switch (homestay_facility) {
        case 0: facility = '淋浴'; break;
        case 1: facility = '空调'; break;
        case 2: facility = '电视'; break;
        case 3: facility = '网络'; break;
        case 4: facility = '允许做饭'; break;
        case 5: facility = '暖气'; break;
        case 6: facility = '独卫'; break;
        default: facility = '淋浴';
    }
    return facility
}