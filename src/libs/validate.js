/* 是否手机号码*/
export const validatePhone = function(value) {
    const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
    let result = {}
    if(value==''||value==undefined||value==null){
      result = {
          success: false,
          message: '手机号不能为空'
      }
      return result
    } else {
      if ((!reg.test(value)) && value != '') {
        result = {
            success: false,
            message: '请输入正确的手机号'
        }
        return result
      } else {
        result = {
            success: true,
            message: '通过'
        }
        return result
      }
    }
}



// 校验身份证号
export const idCard = function(value) {
  if (!value) return
  const id = value.trim()
  if (id && (!(/\d{17}[\d|x]|\d{15}/).test(id) || (id.length !== 15 && id.length !== 18))) {
    return {
      success: false,
      message: '身份证号码不符合规范'
    }
  }

  return {
    success: true,
    message: ''
  }
}


export const weiXin = function(value) {
  if (!value) return
  const weixin = value.trim()
  const reg= /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/
  let result = {}
  if (weixin && !reg.test(weixin)) {
    result = {
        success: false,
        message: '微信号有误，请重新输入'
    }
    return result
  } else {
    result = {
        success: true,
        message: '通过'
    }
    return result
  }
}
