(window.webpackJsonp=window.webpackJsonp||[]).push([["register"],{"0bff":function(e,t,s){e.exports=s.p+"img/ry_logo@2x.c0201fe6.png"},"7c9c":function(e,t,s){"use strict";s.r(t);var n=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"logo-header"},[t("img",{attrs:{src:s("0bff"),alt:""}})])}],r=(s("a4d3"),s("99af"),s("4de4"),s("b0c0"),s("e439"),s("dbb4"),s("b64b"),s("d3b7"),s("841c"),s("1276"),s("159b"),s("96cf"),s("ade3")),i=(s("3c32"),s("417e")),o=(s("498a"),s("ff18")),a={methods:{onBlur:function(){if(Object(o.a)()){var e,t;t=setInterval((function(){e=document.documentElement.scrollTop||document.body.scrollTop,e-=1,window.scrollTo(0,e),e+=1,window.scrollTo(0,e),clearInterval(t)}),100)}}}},c=s("4328"),u=s.n(c),d=s("2f62"),h=s("f7b0");function l(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,n)}return s}var p={name:"ry-register",mixins:[a],components:Object(r.a)({},i.a.name,i.a),data:function(){return{checked:!1,disabled:!1,show:!1,btnShow:!1,tips_show:!1,tips_idCard:!1,changeColor:!1,isKeyBoardShow:[],userName:"",idCard:"",invidCode:"",phoneNumber:"",indtyCode:"",idcardMessage:"",smsCode:"",btnTitle:"获取验证码",index:0}},computed:function(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?l(Object(s),!0).forEach((function(t){Object(r.a)(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):l(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}({isClick:function(){return this.phoneNumber&&this.indtyCode?this.checked?{isClick:!0,message:""}:{isClick:!1,message:"请同意用户注册、隐私保护协议"}:{isClick:!1,message:"手机号或验证码不能为空"}}},Object(d.b)({userWxInfo:function(e){return e.user.userWxInfo}})),methods:{onCheck:function(){this.checked=!this.checked},toggleKeyboard:function(e){switch(this.index=e,document.activeElement.blur(),e){case 0:this.isKeyBoardShow[1]&&(this.isKeyBoardShow[1]=!1);break;default:this.isKeyBoardShow[0]&&(this.isKeyBoardShow[0]=!1)}this.$set(this.isKeyBoardShow,e,!this.isKeyBoardShow[e])},onNumberEnter:function(e){switch(this.index){case 0:this.phoneNumber+=e;break;default:this.indtyCode+=e}},onNumberDelete:function(){switch(this.index){case 0:if(""===this.phoneNumber)return;this.phoneNumber=this.phoneNumber.substr(0,this.phoneNumber.length-1);break;default:if(""===this.indtyCode)return;this.indtyCode=this.indtyCode.substr(0,this.indtyCode.length-1)}},getCode:function(){var e,t,s,n;return regeneratorRuntime.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(i=this.phoneNumber,e=""==i||null==i||null==i?{success:!1,message:"手机号不能为空"}:/^[1][3,4,5,7,8][0-9]{9}$/.test(i)||""==i?{success:!0,message:"通过"}:{success:!1,message:"请输入正确的手机号"},t=e.message,e.success){r.next=5;break}this.$toast({message:t,duration:3e3,position:"bottom"}),r.next=18;break;case 5:if(s="验证码已发送至 ".concat(this.phoneNumber.substr(0,3),"****").concat(this.phoneNumber.substr(7,4)),this.$notify({message:s,color:"#fff",background:"rgba(0,0,0,.7)"}),this.isKeyBoardShow[1]=!0,this.index=1,"获取验证码"!=this.btnTitle){r.next=17;break}return r.next=12,regeneratorRuntime.awrap(this.$store.dispatch(Object(h.a)({tel:this.phoneNumber})));case 12:n=r.sent,this.smsCode=n.data.data.smsCode,this.validateBtn(),r.next=18;break;case 17:return r.abrupt("return");case 18:case"end":return r.stop()}var i}),null,this)},validateBtn:function(){var e=this,t=60,s=setInterval((function(){0==t?(clearInterval(s),e.disabled=!1,e.btnTitle="获取验证码"):(e.btnTitle=t+"秒后重试",e.disabled=!0,t--)}),1e3)},onLogin:function(){var e,t,s,n;return regeneratorRuntime.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(this.btnShow=!1,e=this.isClick,t=e.isClick,s=e.message,t){r.next=5;break}return this.$toast({message:s,duration:3e3,position:"bottom"}),r.abrupt("return");case 5:return r.next=7,regeneratorRuntime.awrap(this.$store.dispatch(Object(h.f)({smsCode:this.smsCode,validCode:this.indtyCode})));case 7:(n=r.sent).data&&n.data.success?this.submit():this.$toast({message:n.data.message,duration:3e3,position:"bottom"});case 9:case"end":return r.stop()}}),null,this)},submit:function(){return regeneratorRuntime.async((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.userWxInfo.openId){e.next=2;break}return e.abrupt("return",this.getUserInfo());case 2:return e.next=4,regeneratorRuntime.awrap(this.$store.dispatch(Object(h.d)({tel:this.phoneNumber,nickName:this.userWxInfo.nickname,wxOpen:this.userWxInfo.openId,headImage:this.userWxInfo.headImgUrl})));case 4:e.sent.data.success&&this.login();case 6:case"end":return e.stop()}}),null,this)},login:function(){var e;return regeneratorRuntime.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(this.$store.dispatch(Object(h.b)({username:this.phoneNumber})));case 2:(e=t.sent).data.success&&(e.data.data.isCert?(this.show=!1,this.$router.push("/")):this.show=!0);case 4:case"end":return t.stop()}}),null,this)},getUserInfo:function(){var e;return regeneratorRuntime.async((function(t){for(;;)switch(t.prev=t.next){case 0:(e=u.a.parse(location.search.split("?")[1])).code&&this.$store.dispatch(Object(h.e)({code:e.code}));case 2:case"end":return t.stop()}}),null,this)},onReAgree:function(){this.$router.push("/reagree")},onReProtocol:function(){this.$router.push("/reprotocol")},onInput1:function(){this.onBlur(),this.validateName()},onInput2:function(){this.onBlur(),this.validateIdCard()},touchbefore:function(){this.btnShow=!0},touchafter:function(){this.btnShow=!1;this.validateName(),this.validateIdCard()},validateName:function(){return""==this.userName?(this.tips_show=!0,!1):(this.tips_show=!1,!0)},validateIdCard:function(){if(""==this.idCard)return this.idcardMessage="身份证号码不能为空",this.tips_idCard=!0,!1;var e=function(e){if(e){var t=e.trim();return t&&(!/\d{17}[\d|x]|\d{15}/.test(t)||15!==t.length&&18!==t.length)?{success:!1,message:"身份证号码不符合规范"}:{success:!0,message:""}}}(this.idCard),t=e.success,s=e.message;return t?(this.tips_idCard=!1,!0):(this.idcardMessage=s,this.tips_idCard=!0,!1)}}},m=(s("bf6e"),s("2877")),b=Object(m.a)(p,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"register-box"},[e._m(0),s("div",{staticClass:"user-info"},[s("div",{staticClass:"user-name border-1px"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.phoneNumber,expression:"phoneNumber"}],ref:"input0",attrs:{type:"text",placeholder:"请输入手机号码",readonly:"readonly"},domProps:{value:e.phoneNumber},on:{focus:function(t){return e.toggleKeyboard(0)},input:function(t){t.target.composing||(e.phoneNumber=t.target.value)}}})]),s("div",{staticClass:"user-number border-1px"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.indtyCode,expression:"indtyCode"}],ref:"input1",attrs:{type:"text",placeholder:"请输入6位验证码",readonly:"readonly"},domProps:{value:e.indtyCode},on:{focus:function(t){return e.toggleKeyboard(1)},input:function(t){t.target.composing||(e.indtyCode=t.target.value)}}}),s("span",{staticClass:"getcode",attrs:{disabled:e.disabled},on:{click:function(t){return t.stopPropagation(),e.getCode(t)}}},[e._v(" "+e._s(e.btnTitle)+" ")])]),s("p",{staticClass:"register-tips"},[e._v("若您未注册，验证后自动注册并登陆")]),s("div",{staticClass:"register-agree"},[s("van-checkbox",{staticClass:"register-checkbox",attrs:{"checked-color":"#ff4300",shape:"square","icon-size":"15px","label-disabled":!0},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[s("span",{staticClass:"login-agree",on:{click:e.onCheck}},[e._v("登录即同意")]),s("span",{staticClass:"register-span",on:{click:e.onReAgree}},[e._v("《用户注册协议》")]),s("span",{staticClass:"register-span register-icon",on:{click:e.onReProtocol}},[e._v("《用户隐私保护协议》")])])],1)]),s("div",{staticClass:"register-login"},[s("ry-button",{attrs:{"btn-title":"登录","btn-show":e.btnShow},on:{touchbefore:e.touchbefore,touchafter:e.onLogin}})],1),s("div",{staticClass:"keyboard"},[s("md-number-keyboard",{attrs:{"hide-dot":""},on:{enter:e.onNumberEnter,delete:e.onNumberDelete},model:{value:e.isKeyBoardShow[0],callback:function(t){e.$set(e.isKeyBoardShow,0,t)},expression:"isKeyBoardShow[0]"}}),s("md-number-keyboard",{attrs:{"hide-dot":""},on:{enter:e.onNumberEnter,delete:e.onNumberDelete},model:{value:e.isKeyBoardShow[1],callback:function(t){e.$set(e.isKeyBoardShow,1,t)},expression:"isKeyBoardShow[1]"}})],1),s("van-overlay",{attrs:{show:e.show},on:{click:function(t){e.show=!1}}},[s("div",{staticClass:"perfect",on:{click:function(e){e.stopPropagation()}}},[s("div",{staticClass:"perfect-info"},[s("h1",[e._v("完善申请人信息")]),s("p",{staticClass:"perfect-ms"},[e._v("本平台需实名认证，请"),s("span",[e._v("完善以下本人信息")])]),s("p",{staticClass:"perfect-input"},[s("span",[e._v("*")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.userName,expression:"userName"}],attrs:{type:"text",placeholder:"请输入本人姓名"},domProps:{value:e.userName},on:{blur:e.onInput1,input:function(t){t.target.composing||(e.userName=t.target.value)}}}),s("span",{directives:[{name:"show",rawName:"v-show",value:e.tips_show,expression:"tips_show"}],staticClass:"tips"},[e._v("姓名不能为空")])]),s("p",{staticClass:"perfect-input"},[s("span",[e._v("*")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.idCard,expression:"idCard"}],attrs:{type:"text",placeholder:"请输入身份证号码"},domProps:{value:e.idCard},on:{blur:e.onInput2,input:function(t){t.target.composing||(e.idCard=t.target.value)}}}),s("span",{directives:[{name:"show",rawName:"v-show",value:e.tips_idCard,expression:"tips_idCard"}],staticClass:"tips"},[e._v(e._s(e.idcardMessage))])]),s("p",{staticClass:"perfect-input",staticStyle:{"margin-bottom":"0"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.invidCode,expression:"invidCode"}],attrs:{type:"number",placeholder:"请输入邀请码"},domProps:{value:e.invidCode},on:{blur:e.onBlur,input:function(t){t.target.composing||(e.invidCode=t.target.value)}}})]),s("ry-button",{staticClass:"ry-button",attrs:{"btn-show":e.btnShow},on:{touchbefore:e.touchbefore,touchafter:e.touchafter}})],1)])])],1)}),n,!1,null,null,null);t.default=b.exports},9524:function(e,t,s){},bf6e:function(e,t,s){"use strict";var n=s("9524");s.n(n).a}}]);