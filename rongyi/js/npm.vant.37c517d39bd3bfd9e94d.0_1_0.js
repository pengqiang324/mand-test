(window.webpackJsonp=window.webpackJsonp||[]).push([["npm.vant"],{"09fe":function(t,n,e){},"0ae8":function(t,n,e){},"66b9":function(t,n,e){"use strict";e("68ef"),e("09fe")},"68ef":function(t,n,e){},b650:function(t,n,e){"use strict";var r=e("c31d"),o=e("2638"),m=e.n(o),i="__",a="--";function s(t,n,e){return n?t+e+n:t}function l(e){return function(t,n){return t&&"string"!=typeof t&&(n=t,t=""),t=s(e,t,i),n?[t,function n(e,r){if("string"==typeof r)return s(e,r,a);if(Array.isArray(r))return r.map(function(t){return n(e,t)});var o={};return r&&Object.keys(r).forEach(function(t){o[e+a+t]=r[t]}),o}(t,n)]:t}}var c=/-(\w)/g;function u(t){return t.replace(c,function(t,n){return n.toUpperCase()})}var d=e("2b0e"),f=d.a.extend({methods:{slots:function(t,n){void 0===t&&(t="default");var e=this.$slots,r=this.$scopedSlots[t];return r?r(n):e[t]}}});function p(t){var n=this.name;t.component(n,this),t.component(u("-"+n),this)}function h(i){return{functional:!0,props:i.props,model:i.model,render:function(t,n){return i(t,n.props,(r=(e=n).scopedSlots||e.data.scopedSlots||{},o=e.slots(),Object.keys(o).forEach(function(t){r[t]||(r[t]=function(){return o[t]})}),r),n);var e,r,o}}}d.a.prototype.$isServer;function g(t){return null!=t}function v(t,n){var e=n.split("."),r=t;return e.forEach(function(t){r=g(r[t])?r[t]:""}),r}var y=Object.prototype.hasOwnProperty;function S(s,l){return Object.keys(l).forEach(function(t){var n,e,r,o,i,a;n=s,g(a=(e=l)[r=t])&&(!y.call(n,r)||(i=typeof(o=a),null===o||"object"!=i&&"function"!=i)||"function"==typeof a?n[r]=a:n[r]=S(Object(n[r]),e[r]))}),s}var b=d.a.prototype,z=d.a.util.defineReactive;z(b,"$vantLang","zh-CN"),z(b,"$vantMessages",{"zh-CN":{name:"姓名",tel:"电话",save:"保存",confirm:"确认",cancel:"取消",delete:"删除",complete:"完成",loading:"加载中...",telEmpty:"请填写电话",nameEmpty:"请填写姓名",confirmDelete:"确定要删除么",telInvalid:"请填写正确的电话",vanContactCard:{addText:"添加联系人"},vanContactList:{addText:"新建联系人"},vanPagination:{prev:"上一页",next:"下一页"},vanPullRefresh:{pulling:"下拉即可刷新...",loosing:"释放即可刷新..."},vanSubmitBar:{label:"合计："},vanCoupon:{valid:"有效期",unlimited:"无使用门槛",discount:function(t){return t+"折"},condition:function(t){return"满"+t+"元可用"}},vanCouponCell:{title:"优惠券",tips:"使用优惠",count:function(t){return t+"张可用"}},vanCouponList:{empty:"暂无优惠券",exchange:"兑换",close:"不使用优惠",enable:"可使用优惠券",disabled:"不可使用优惠券",placeholder:"请输入优惠码"},vanAddressEdit:{area:"地区",postal:"邮政编码",areaEmpty:"请选择地区",addressEmpty:"请填写详细地址",postalEmpty:"邮政编码格式不正确",defaultAddress:"设为默认收货地址",telPlaceholder:"收货人手机号",namePlaceholder:"收货人姓名",areaPlaceholder:"选择省 / 市 / 区"},vanAddressEditDetail:{label:"详细地址",placeholder:"街道门牌、楼层房间号等信息"},vanAddressList:{add:"新增地址"}}});var L={messages:function(){return b.$vantMessages[b.$vantLang]},use:function(t,n){var e;b.$vantLang=t,this.add(((e={})[t]=n,e))},add:function(t){void 0===t&&(t={}),S(b.$vantMessages,t)}};function x(t){return[function(t){return"function"==typeof t&&(t=h(t)),t.functional||(t.mixins=t.mixins||[],t.mixins.push(f)),t.name=n,t.install=p,t},l(n=t="van-"+t),(i=u(t)+".",function(t){for(var n=v(L.messages(),i+t)||v(L.messages(),t),e=arguments.length,r=new Array(1<e?e-1:0),o=1;o<e;o++)r[o-1]=arguments[o];return"function"==typeof n?n.apply(void 0,r):n})];var i,n}var w=["ref","style","class","attrs","nativeOn","directives","staticClass","staticStyle"],$={nativeOn:"on"};function E(e,t){var n=w.reduce(function(t,n){return e.data[n]&&(t[$[n]||n]=e.data[n]),t},{});return t&&(n.on=n.on||{},Object(r.a)(n.on,e.data.on)),n}function B(t,n){for(var e=arguments.length,r=new Array(2<e?e-2:0),o=2;o<e;o++)r[o-2]=arguments[o];var i=t.listeners[n];i&&(Array.isArray(i)?i.forEach(function(t){t.apply(void 0,r)}):i.apply(void 0,r))}function k(t){!function(t,n){var e=n.to,r=n.url,o=n.replace;if(e&&t){var i=t[o?"replace":"push"](e);i&&i.catch&&i.catch(function(t){if(t&&"NavigationDuplicated"!==t.name)throw t})}else r&&(o?location.replace(r):location.href=r)}(t.parent&&t.parent.$router,t.props)}var C={url:String,replace:Boolean,to:[String,Object]};function O(t){if(g(t))return t=String(t),/^\d+(\.\d+)?$/.test(t)?t+"px":t}var N=x("info"),P=N[0],j=N[1];function A(t,n,e,r){var o=n.dot,i=n.info,a=g(i)&&""!==i;if(o||a)return t("div",m()([{class:j({dot:o})},E(r,!0)]),[o?"":n.info])}A.props={dot:Boolean,info:[Number,String]};var T=P(A),D=x("image"),q=D[0],I=D[1],M=q({props:{src:String,fit:String,alt:String,round:Boolean,width:[Number,String],height:[Number,String],radius:[Number,String],lazyLoad:Boolean,showError:{type:Boolean,default:!0},showLoading:{type:Boolean,default:!0}},data:function(){return{loading:!0,error:!1}},watch:{src:function(){this.loading=!0,this.error=!1}},computed:{style:function(){var t={};return g(this.width)&&(t.width=O(this.width)),g(this.height)&&(t.height=O(this.height)),g(this.radius)&&(t.overflow="hidden",t.borderRadius=O(this.radius)),t}},created:function(){var t=this.$Lazyload;t&&(t.$on("loaded",this.onLazyLoaded),t.$on("error",this.onLazyLoadError))},beforeDestroy:function(){var t=this.$Lazyload;t&&(t.$off("loaded",this.onLazyLoaded),t.$off("error",this.onLazyLoadError))},methods:{onLoad:function(t){this.loading=!1,this.$emit("load",t)},onLazyLoaded:function(t){t.el===this.$refs.image&&this.loading&&this.onLoad()},onLazyLoadError:function(t){t.el!==this.$refs.image||this.error||this.onError()},onError:function(t){this.error=!0,this.loading=!1,this.$emit("error",t)},onClick:function(t){this.$emit("click",t)},genPlaceholder:function(){var t=this.$createElement;return this.loading&&this.showLoading?t("div",{class:I("loading")},[this.slots("loading")||t(U,{attrs:{name:"photo-o",size:"22"}})]):this.error&&this.showError?t("div",{class:I("error")},[this.slots("error")||t(U,{attrs:{name:"warning-o",size:"22"}})]):void 0},genImage:function(){var t=this.$createElement,n={class:I("img"),attrs:{alt:this.alt},style:{objectFit:this.fit}};if(!this.error)return this.lazyLoad?t("img",m()([{ref:"image",directives:[{name:"lazy",value:this.src}]},n])):t("img",m()([{attrs:{src:this.src},on:{load:this.onLoad,error:this.onError}},n]))}},render:function(t){return t("div",{class:I({round:this.round}),style:this.style,on:{click:this.onClick}},[this.genImage(),this.genPlaceholder()])}}),R=x("icon"),J=R[0],_=R[1];function F(t,n,e,r){var o,i=!!(o=n.name)&&-1!==o.indexOf("/");return t(n.tag,m()([{class:[n.classPrefix,i?"":n.classPrefix+"-"+n.name],style:{color:n.color,fontSize:O(n.size)}},E(r,!0)]),[e.default&&e.default(),i&&t(M,{class:_("image"),attrs:{fit:"contain",src:n.name,showLoading:!1}}),t(T,{attrs:{dot:n.dot,info:n.info}})])}F.props={dot:Boolean,name:String,size:[Number,String],info:[Number,String],color:String,tag:{type:String,default:"i"},classPrefix:{type:String,default:_()}};var U=J(F),G=x("loading"),H=G[0],K=G[1];function Q(t,n,e,r){var o=n.color,i=n.size,a=n.type,s={color:o};if(i){var l=O(i);s.width=l,s.height=l}return t("div",m()([{class:K([a,{vertical:n.vertical}])},E(r,!0)]),[t("span",{class:K("spinner",a),style:s},[function(t,n){if("spinner"!==n.type)return t("svg",{class:K("circular"),attrs:{viewBox:"25 25 50 50"}},[t("circle",{attrs:{cx:"50",cy:"50",r:"20",fill:"none"}})]);for(var e=[],r=0;r<12;r++)e.push(t("i"));return e}(t,n)]),function(t,n,e){if(e.default){var r=n.textSize&&{fontSize:O(n.textSize)};return t("span",{class:K("text"),style:r},[e.default()])}}(t,n,e)])}Q.props={color:String,size:[Number,String],vertical:Boolean,textSize:[Number,String],type:{type:String,default:"circular"}};var V=H(Q),W=x("button"),X=W[0],Y=W[1];function Z(t,n,e,r){var o,i=n.tag,a=n.icon,s=n.type,l=n.color,c=n.plain,u=n.disabled,d=n.loading,f=n.hairline,p=n.loadingText,h={};l&&(h.color=c?l:"#fff",c||(h.background=l),-1!==l.indexOf("gradient")?h.border=0:h.borderColor=l);var g,v,y=[Y([s,n.size,{plain:c,disabled:u,hairline:f,block:n.block,round:n.round,square:n.square}]),((o={})["van-hairline--surround"]=f,o)];return t(i,m()([{style:h,class:y,attrs:{type:n.nativeType,disabled:u},on:{click:function(t){d||u||(B(r,"click",t),k(r))},touchstart:function(t){B(r,"touchstart",t)}}},E(r)]),[(v=[],d?v.push(t(V,{class:Y("loading"),attrs:{size:n.loadingSize,type:n.loadingType,color:"currentColor"}})):a&&v.push(t(U,{attrs:{name:a},class:Y("icon")})),(g=d?p:e.default?e.default():n.text)&&v.push(t("span",{class:Y("text")},[g])),v)])}Z.props=Object(r.a)({},C,{text:String,icon:String,color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,nativeType:String,loadingText:String,loadingType:String,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"},loadingSize:{type:String,default:"20px"}});n.a=X(Z)}}]);