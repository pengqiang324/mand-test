const IsIOS = function () {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
}

const IsAndroid = function () {
    if (/(Android|Adr)/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
}

export {
    IsIOS,
    IsAndroid,
}