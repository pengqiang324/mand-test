const APPLYCARD_NAMESPACE = 'applyCard'

// 发送验证码
export function SEND_VALIDCODE(payload) {
    return {
        type: `${APPLYCARD_NAMESPACE}/validCodeSend`,
        payload
    }
}
