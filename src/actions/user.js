const USER_NAMESPACE = 'user'

// 用户登录
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

// 获取验证码
export function USER_GETVALIDATECODE(payload) {
    return {
      type: `${USER_NAMESPACE}/validCodeSend`,
      payload
    }
}

// 校验验证码
export function USER_VALIDATESMSCODE(payload) {
    return {
      type: `${USER_NAMESPACE}/validateSmsCode`,
      payload
    }
}

// 注册用户信息
export function USER_REGISTE(payload) {
    return {
      type: `${USER_NAMESPACE}/registe`,
      payload
    }
}