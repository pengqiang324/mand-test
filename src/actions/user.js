const USER_NAMESPACE = 'user'

// 用户登录信息
export function USER_LOGIN(payload) {
    return {
        type: `${USER_NAMESPACE}/login`,
        payload
    }
}

// 获取用户微信信息
export function USER_USERWXINFO(payload) {
    return {
        type: `${USER_NAMESPACE}/getUserWxInfo`,
        payload
    }
}

// 刷新用户信息
export function USER_REFRESHUSERINFO() {
    return {
      type: `${USER_NAMESPACE}/refreshUserInfo`
    }
}
