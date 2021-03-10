// 判断用户类型
export const isUserRole = (user_role) => {
    let role = 'tenant'
    switch (user_role) {
        case 1: role = 'roleadmin'; break;
        case 2: role = 'landlord'; break;
        case 3: role = 'tenant'; break;
        default: role = 'tenant';
    }
    return role
}

export const isGender = (user_gender) => {
    let gender = '男'
    switch (user_gender) {
        case 1: gender = '男'; break;
        case 2: gender = '女'; break;
        default: gender = '男';
    }
    return gender
}

