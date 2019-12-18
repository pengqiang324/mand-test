/* 是否手机号码*/
export function validatePhone(value) {
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