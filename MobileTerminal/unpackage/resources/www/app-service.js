(this["webpackJsonp"]=this["webpackJsonp"]||[]).push([["app-service"],{"0397":function(t,e,n){t.exports=n.p+"static/image/ad3.jpg"},"0de9":function(t,e,n){"use strict";function i(t){var e=Object.prototype.toString.call(t);return e.substring(8,e.length-1)}function a(){return"string"===typeof __channelId__&&__channelId__}function s(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];var s=e.shift();if(a())return e.push(e.pop().replace("at ","uni-app:///")),console[s]["apply"](console,e);var r=e.map(function(t){var e=Object.prototype.toString.call(t);if("[object object]"===e.toLowerCase())try{t="---BEGIN:JSON---"+JSON.stringify(t)+"---END:JSON---"}catch(a){t="[object object]"}else if(null===t)t="---NULL---";else if(void 0===t)t="---UNDEFINED---";else{var n=i(t).toUpperCase();t="NUMBER"===n||"BOOLEAN"===n?"---BEGIN:"+n+"---"+t+"---END:"+n+"---":String(t)}return t}),o="";if(r.length>1){var u=r.pop();o=r.join("---COMMA---"),0===u.indexOf(" at ")?o+=u:o+="---COMMA---"+u}else o=r[0];console[s](o)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=s},"1a52":function(t,e,n){"use strict";n("cb87"),n("921b");var i=s(n("8bbf")),a=s(n("38ed"));function s(t){return t&&t.__esModule?t:{default:t}}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){o(t,e,n[e])})}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}i.default.config.productionTip=!1,a.default.mpType="app";var u=new i.default(r({},a.default));u.$mount()},"2e95":function(t,e,n){"use strict";n.r(e);var i=n("f6f3"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e["default"]=a.a},"2f0b":function(t,e,n){t.exports=n.p+"static/image/nav2.jpg"},"38ed":function(t,e,n){"use strict";n.r(e);var i=n("2e95");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);var s,r,o,u,c=n("f0c5"),l=Object(c["a"])(i["default"],s,r,!1,null,null,null,!1,o,u);e["default"]=l.exports},"3a80":function(t,e,n){t.exports=n.p+"static/image/ad1.jpg"},"4fae":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={pages:{},globalStyle:{}};e.default=i},6643:function(t,e,n){"use strict";n.r(e);var i=n("bf5e"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e["default"]=a.a},8189:function(t){t.exports={_from:"@dcloudio/uni-stat@alpha",_id:"@dcloudio/uni-stat@2.0.0-alpha-25720200116005",_inBundle:!1,_integrity:"sha512-RZFw3WAaS/CZTzzv9JPaWvmoNitojD/06vPdHSzlqZi8GbuE222lFuyochEjrGkG8rPPrWHAnwfoPBuQVtkfdg==",_location:"/@dcloudio/uni-stat",_phantomChildren:{},_requested:{type:"tag",registry:!0,raw:"@dcloudio/uni-stat@alpha",name:"@dcloudio/uni-stat",escapedName:"@dcloudio%2funi-stat",scope:"@dcloudio",rawSpec:"alpha",saveSpec:null,fetchSpec:"alpha"},_requiredBy:["#USER","/","/@dcloudio/vue-cli-plugin-uni"],_resolved:"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-alpha-25720200116005.tgz",_shasum:"08bb17aba91c84a981f33d74153aa3dd07b578ad",_spec:"@dcloudio/uni-stat@alpha",_where:"/Users/guoshengqiang/Documents/dcloud-plugins/alpha/uniapp-cli",author:"",bugs:{url:"https://github.com/dcloudio/uni-app/issues"},bundleDependencies:!1,deprecated:!1,description:"",devDependencies:{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5",eslint:"^6.1.0",rollup:"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},files:["dist","package.json","LICENSE"],gitHead:"a129bde60de35f7ef497f43d5a45b4556231995c",homepage:"https://github.com/dcloudio/uni-app#readme",license:"Apache-2.0",main:"dist/index.js",name:"@dcloudio/uni-stat",repository:{type:"git",url:"git+https://github.com/dcloudio/uni-app.git",directory:"packages/uni-stat"},scripts:{build:"NODE_ENV=production rollup -c rollup.config.js",dev:"NODE_ENV=development rollup -w -c rollup.config.js"},version:"2.0.0-alpha-25720200116005"}},"8bbf":function(t,e){t.exports=Vue},"921b":function(t,e,n){"use strict";var i=n("8189");function a(t,e){return!e||"object"!==typeof e&&"function"!==typeof e?s(t):e}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function r(t){return r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},r(t)}function o(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}function u(t,e){return u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},u(t,e)}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function p(t,e,n){return e&&l(t.prototype,e),n&&l(t,n),t}var f=i.version,d="https://tongji.dcloud.io/uni/stat",h="https://tongji.dcloud.io/uni/stat.gif",g=1800,_=300,v=10,y="__DC_STAT_UUID",m="__DC_UUID_VALUE";function b(){var t="";if("n"===k()){try{t=plus.runtime.getDCloudId()}catch(e){t=""}return t}try{t=uni.getStorageSync(y)}catch(e){t=m}if(!t){t=Date.now()+""+Math.floor(1e7*Math.random());try{uni.setStorageSync(y,t)}catch(e){uni.setStorageSync(y,m)}}return t}var S=function(t){var e=Object.keys(t),n=e.sort(),i={},a="";for(var s in n)i[n[s]]=t[n[s]],a+=n[s]+"="+t[n[s]]+"&";return{sign:"",options:a.substr(0,a.length-1)}},w=function(t){var e="";for(var n in t)e+=n+"="+t[n]+"&";return e.substr(0,e.length-1)},D=function(){return parseInt((new Date).getTime()/1e3)},k=function(){var t={"app-plus":"n",h5:"h5","mp-weixin":"wx","mp-alipay":"ali","mp-baidu":"bd","mp-toutiao":"tt","mp-qq":"qq"};return t["app-plus"]},$=function(){var t="";return"wx"!==k()&&"qq"!==k()||uni.canIUse("getAccountInfoSync")&&(t=uni.getAccountInfoSync().miniProgram.appId||""),t},T=function(){return"n"===k()?plus.runtime.version:""},x=function(){var t=k(),e="";return"n"===t&&(e=plus.runtime.channel),e},O=function(t){var e=k(),n="";return t||("wx"===e&&(n=uni.getLaunchOptionsSync().scene),n)},q="First__Visit__Time",j="Last__Visit__Time",R=function(){var t=uni.getStorageSync(q),e=0;return t?e=t:(e=D(),uni.setStorageSync(q,e),uni.removeStorageSync(j)),e},I=function(){var t=uni.getStorageSync(j),e=0;return e=t||"",uni.setStorageSync(j,D()),e},N="__page__residence__time",C=0,P=0,E=function(){return C=D(),"n"===k()&&uni.setStorageSync(N,D()),C},A=function(){return P=D(),"n"===k()&&(C=uni.getStorageSync(N)),P-C},L="Total__Visit__Count",H=function(){var t=uni.getStorageSync(L),e=1;return t&&(e=t,e++),uni.setStorageSync(L,e),e},U=function(t){var e={};for(var n in t)e[n]=encodeURIComponent(t[n]);return e},M=0,B=0,J=function(){var t=(new Date).getTime();return M=t,B=0,t},V=function(){var t=(new Date).getTime();return B=t,t},G=function(t){var e=0;if(0!==M&&(e=B-M),e=parseInt(e/1e3),e=e<1?1:e,"app"===t){var n=e>_;return{residenceTime:e,overtime:n}}if("page"===t){var i=e>g;return{residenceTime:e,overtime:i}}return{residenceTime:e}},z=function(){var t=getCurrentPages(),e=t[t.length-1],n=e.$vm;return"bd"===k()?n.$mp&&n.$mp.page.is:n.$scope&&n.$scope.route||n.$mp&&n.$mp.page.route},F=function(t){var e=getCurrentPages(),n=e[e.length-1],i=n.$vm,a=t._query,s=a&&"{}"!==JSON.stringify(a)?"?"+JSON.stringify(a):"";return t._query="","bd"===k()?i.$mp&&i.$mp.page.is+s:i.$scope&&i.$scope.route+s||i.$mp&&i.$mp.page.route+s},W=function(t){return!!("page"===t.mpType||t.$mp&&"page"===t.$mp.mpType||"page"===t.$options.mpType)},Z=function(t,e){return t?"string"!==typeof t?(console.error("uni.report [eventName] 参数类型错误,只能为 String 类型"),!0):t.length>255?(console.error("uni.report [eventName] 参数长度不能大于 255"),!0):"string"!==typeof e&&"object"!==typeof e?(console.error("uni.report [options] 参数类型错误,只能为 String 或 Object 类型"),!0):"string"===typeof e&&e.length>255?(console.error("uni.report [options] 参数长度不能大于 255"),!0):"title"===t&&"string"!==typeof e?(console.error("uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型"),!0):void 0:(console.error("uni.report 缺少 [eventName] 参数"),!0)},X=n("4fae").default,K=n("b7c4").default||n("b7c4"),Q=uni.getSystemInfoSync(),Y=function(){function t(){c(this,t),this.self="",this._retry=0,this._platform="",this._query={},this._navigationBarTitle={config:"",page:"",report:"",lt:""},this._operatingTime=0,this._reportingRequestData={1:[],11:[]},this.__prevent_triggering=!1,this.__licationHide=!1,this.__licationShow=!1,this._lastPageRoute="",this.statData={uuid:b(),ut:k(),mpn:$(),ak:K.appid,usv:f,v:T(),ch:x(),cn:"",pn:"",ct:"",t:D(),tt:"",p:"android"===Q.platform?"a":"i",brand:Q.brand||"",md:Q.model,sv:Q.system.replace(/(Android|iOS)\s/,""),mpsdk:Q.SDKVersion||"",mpv:Q.version||"",lang:Q.language,pr:Q.pixelRatio,ww:Q.windowWidth,wh:Q.windowHeight,sw:Q.screenWidth,sh:Q.screenHeight}}return p(t,[{key:"_applicationShow",value:function(){if(this.__licationHide){V();var t=G("app");if(t.overtime){var e={path:this._lastPageRoute,scene:this.statData.sc};this._sendReportRequest(e)}this.__licationHide=!1}}},{key:"_applicationHide",value:function(t,e){this.__licationHide=!0,V();var n=G();J();var i=F(this);this._sendHideRequest({urlref:i,urlref_ts:n.residenceTime},e)}},{key:"_pageShow",value:function(){var t=F(this),e=z();if(this._navigationBarTitle.config=X&&X.pages[e]&&X.pages[e].titleNView&&X.pages[e].titleNView.titleText||X&&X.pages[e]&&X.pages[e].navigationBarTitleText||"",this.__licationShow)return J(),this.__licationShow=!1,void(this._lastPageRoute=t);V(),this._lastPageRoute=t;var n=G("page");if(n.overtime){var i={path:this._lastPageRoute,scene:this.statData.sc};this._sendReportRequest(i)}J()}},{key:"_pageHide",value:function(){if(!this.__licationHide){V();var t=G("page");return this._sendPageRequest({url:this._lastPageRoute,urlref:this._lastPageRoute,urlref_ts:t.residenceTime}),void(this._navigationBarTitle={config:"",page:"",report:"",lt:""})}}},{key:"_login",value:function(){this._sendEventRequest({key:"login"},0)}},{key:"_share",value:function(){this._sendEventRequest({key:"share"},0)}},{key:"_payment",value:function(t){this._sendEventRequest({key:t},0)}},{key:"_sendReportRequest",value:function(t){this._navigationBarTitle.lt="1";var e=t.query&&"{}"!==JSON.stringify(t.query)?"?"+JSON.stringify(t.query):"";this.statData.lt="1",this.statData.url=t.path+e||"",this.statData.t=D(),this.statData.sc=O(t.scene),this.statData.fvts=R(),this.statData.lvts=I(),this.statData.tvc=H(),"n"===k()?this.getProperty():this.getNetworkInfo()}},{key:"_sendPageRequest",value:function(t){var e=t.url,n=t.urlref,i=t.urlref_ts;this._navigationBarTitle.lt="11";var a={ak:this.statData.ak,uuid:this.statData.uuid,lt:"11",ut:this.statData.ut,url:e,tt:this.statData.tt,urlref:n,urlref_ts:i,ch:this.statData.ch,usv:this.statData.usv,t:D(),p:this.statData.p};this.request(a)}},{key:"_sendHideRequest",value:function(t,e){var n=t.urlref,i=t.urlref_ts,a={ak:this.statData.ak,uuid:this.statData.uuid,lt:"3",ut:this.statData.ut,urlref:n,urlref_ts:i,ch:this.statData.ch,usv:this.statData.usv,t:D(),p:this.statData.p};this.request(a,e)}},{key:"_sendEventRequest",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.key,n=void 0===e?"":e,i=t.value,a=void 0===i?"":i,s=this._lastPageRoute,r={ak:this.statData.ak,uuid:this.statData.uuid,lt:"21",ut:this.statData.ut,url:s,ch:this.statData.ch,e_n:n,e_v:"object"===typeof a?JSON.stringify(a):a.toString(),usv:this.statData.usv,t:D(),p:this.statData.p};this.request(r)}},{key:"getNetworkInfo",value:function(){var t=this;uni.getNetworkType({success:function(e){t.statData.net=e.networkType,t.getLocation()}})}},{key:"getProperty",value:function(){var t=this;plus.runtime.getProperty(plus.runtime.appid,function(e){t.statData.v=e.version||"",t.getNetworkInfo()})}},{key:"getLocation",value:function(){var t=this;K.getLocation?uni.getLocation({type:"wgs84",geocode:!0,success:function(e){e.address&&(t.statData.cn=e.address.country,t.statData.pn=e.address.province,t.statData.ct=e.address.city),t.statData.lat=e.latitude,t.statData.lng=e.longitude,t.request(t.statData)}}):(this.statData.lat=0,this.statData.lng=0,this.request(this.statData))}},{key:"request",value:function(t,e){var n=this,i=D(),a=this._navigationBarTitle;t.ttn=a.page,t.ttpj=a.config,t.ttc=a.report;var s=this._reportingRequestData;if("n"===k()&&(s=uni.getStorageSync("__UNI__STAT__DATA")||{}),s[t.lt]||(s[t.lt]=[]),s[t.lt].push(t),"n"===k()&&uni.setStorageSync("__UNI__STAT__DATA",s),!(A()<v)||e){var r=this._reportingRequestData;"n"===k()&&(r=uni.getStorageSync("__UNI__STAT__DATA")),E();var o=[],u=[],c=[],l=function(t){var e=r[t];e.forEach(function(e){var n=w(e);0===t?o.push(n):3===t?c.push(n):u.push(n)})};for(var p in r)l(p);o.push.apply(o,u.concat(c));var d={usv:f,t:i,requests:JSON.stringify(o)};this._reportingRequestData={},"n"===k()&&uni.removeStorageSync("__UNI__STAT__DATA"),"h5"!==t.ut?"n"!==k()||"a"!==this.statData.p?this._sendRequest(d):setTimeout(function(){n._sendRequest(d)},200):this.imageRequest(d)}}},{key:"_sendRequest",value:function(t){var e=this;uni.request({url:d,method:"POST",data:t,success:function(){},fail:function(n){++e._retry<3&&setTimeout(function(){e._sendRequest(t)},1e3)}})}},{key:"imageRequest",value:function(t){var e=new Image,n=S(U(t)).options;e.src=h+"?"+n}},{key:"sendEvent",value:function(t,e){Z(t,e)||("title"!==t?this._sendEventRequest({key:t,value:"object"===typeof e?JSON.stringify(e):e},1):this._navigationBarTitle.report=e)}}]),t}(),tt=function(t){function e(){var t;return c(this,e),t=a(this,r(e).call(this)),t.instance=null,"function"===typeof uni.addInterceptor&&(t.addInterceptorInit(),t.interceptLogin(),t.interceptShare(!0),t.interceptRequestPayment()),t}return o(e,t),p(e,null,[{key:"getInstance",value:function(){return this.instance||(this.instance=new e),this.instance}}]),p(e,[{key:"addInterceptorInit",value:function(){var t=this;uni.addInterceptor("setNavigationBarTitle",{invoke:function(e){t._navigationBarTitle.page=e.title}})}},{key:"interceptLogin",value:function(){var t=this;uni.addInterceptor("login",{complete:function(){t._login()}})}},{key:"interceptShare",value:function(t){var e=this;t?uni.addInterceptor("share",{success:function(){e._share()},fail:function(){e._share()}}):e._share()}},{key:"interceptRequestPayment",value:function(){var t=this;uni.addInterceptor("requestPayment",{success:function(){t._payment("pay_success")},fail:function(){t._payment("pay_fail")}})}},{key:"report",value:function(t,e){this.self=e,E(),this.__licationShow=!0,this._sendReportRequest(t,!0)}},{key:"load",value:function(t,e){if(!e.$scope&&!e.$mp){var n=getCurrentPages();e.$scope=n[n.length-1]}this.self=e,this._query=t}},{key:"show",value:function(t){this.self=t,W(t)?this._pageShow(t):this._applicationShow(t)}},{key:"ready",value:function(t){}},{key:"hide",value:function(t){this.self=t,W(t)?this._pageHide(t):this._applicationHide(t,!0)}},{key:"error",value:function(t){this._platform;var e="";e=t.message?t.stack:JSON.stringify(t);var n={ak:this.statData.ak,uuid:this.statData.uuid,lt:"31",ut:this.statData.ut,ch:this.statData.ch,mpsdk:this.statData.mpsdk,mpv:this.statData.mpv,v:this.statData.v,em:e,usv:this.statData.usv,t:D(),p:this.statData.p};this.request(n)}}]),e}(Y),et=tt.getInstance(),nt=!1,it={onLaunch:function(t){et.report(t,this)},onReady:function(){et.ready(this)},onLoad:function(t){if(et.load(t,this),this.$scope&&this.$scope.onShareAppMessage){var e=this.$scope.onShareAppMessage;this.$scope.onShareAppMessage=function(t){return et.interceptShare(!1),e.call(this,t)}}},onShow:function(){nt=!1,et.show(this)},onHide:function(){nt=!0,et.hide(this)},onUnload:function(){nt?nt=!1:et.hide(this)},onError:function(t){et.error(t)}};function at(){var t=n("8bbf");(t.default||t).mixin(it),uni.report=function(t,e){et.sendEvent(t,e)}}at()},9506:function(t,e,n){t.exports=n.p+"static/image/nav1.jpg"},b770:function(t,e,n){"use strict";n.r(e);var i=n("f8c0"),a=n("6643");for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);var r,o=n("f0c5"),u=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=u.exports},b7c4:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={appid:""};e.default=i},bf5e:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{title:"Hello",secondTitle:"推荐",background:["color1","color2","color3"],indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,bannerList:[{bg:n("3a80")},{bg:n("f51b")},{bg:n("0397")}],imgList:[{bg:n("9506"),text:"不一样的清新BGM"},{bg:n("2f0b"),text:"【纯音乐】萦绕的忧伤"},{bg:n("f01e"),text:"加油，武汉！"}],contentList:[{color:"red",text:"red"},{color:"blue",text:"blue"},{color:"green",text:"green"}]}},onLoad:function(){},methods:{changeIndicatorDots:function(t){this.indicatorDots=!this.indicatorDots},changeAutoplay:function(t){this.autoplay=!this.autoplay},intervalChange:function(t){this.interval=t.target.value},durationChange:function(t){this.duration=t.target.value},scroll:function(e){t("log",e," at pages\\index\\index.vue:88")},getMore:function(){this.contentList.push({color:"red",text:"red"},{color:"blue",text:"blue"},{color:"green",text:"green"})}}};e.default=i}).call(this,n("0de9")["default"])},cb87:function(t,e,n){"use strict";uni.restoreGlobal&&uni.restoreGlobal(weex,plus,setTimeout,clearTimeout,setInterval,clearInterval),__definePage("pages/index/index",function(){return Vue.extend(n("b770").default)})},f01e:function(t,e,n){t.exports=n.p+"static/image/nav3.jpg"},f0c5:function(t,e,n){"use strict";function i(t,e,n,i,a,s,r,o,u,c){var l,p="function"===typeof t?t.options:t;if(u&&(p.components=Object.assign(u,p.components||{})),c&&((c.beforeCreate||(c.beforeCreate=[])).unshift(function(){this[c.__module]=this}),(p.mixins||(p.mixins=[])).push(c)),e&&(p.render=e,p.staticRenderFns=n,p._compiled=!0),i&&(p.functional=!0),s&&(p._scopeId="data-v-"+s),r?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},p._ssrRegister=l):a&&(l=o?function(){a.call(this,this.$root.$options.shadowRoot)}:a),l)if(p.functional){p._injectStyles=l;var f=p.render;p.render=function(t,e){return l.call(e),f(t,e)}}else{var d=p.beforeCreate;p.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:p}}n.d(e,"a",function(){return i})},f51b:function(t,e,n){t.exports=n.p+"static/image/ad2.jpg"},f6f3:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={onLaunch:function(){t("log","App Launch"," at App.vue:4")},onShow:function(){t("log","App Show"," at App.vue:7")},onHide:function(){t("log","App Hide"," at App.vue:10")}};e.default=n}).call(this,n("0de9")["default"])},f8c0:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:t._$s(0,"sc","content"),attrs:{_i:0}},[n("view",{staticClass:t._$s(1,"sc","uni-padding-wrap"),attrs:{_i:1}},[n("view",{staticClass:t._$s(2,"sc","page-section swiper"),attrs:{_i:2}},[n("view",{staticClass:t._$s(3,"sc","page-section-spacing"),attrs:{_i:3}},[n("swiper",{staticClass:t._$s(4,"sc","swiper"),attrs:{"indicator-dots":t._$s(4,"a-indicator-dots",t.indicatorDots),autoplay:t._$s(4,"a-autoplay",t.autoplay),interval:t._$s(4,"a-interval",t.interval),duration:t._$s(4,"a-duration",t.duration),_i:4}},t._l(t._$s(5,"f",{forItems:t.bannerList}),function(e,i,a,s){return n("swiper-item",{key:t._$s(5,"f",{forIndex:a,key:"5-"+s})},[n("view",{style:t._$s("6-"+s,"s",{backgroundImage:"url("+e.bg+")","background-size":"100% 100%",width:"100%",height:"100%"}),attrs:{_i:"6-"+s}})])}),0)])])]),n("view",{staticClass:t._$s(7,"sc","text-area"),attrs:{_i:7}},[n("text",{staticClass:t._$s(8,"sc","title"),attrs:{_i:8}},[t._v(t._$s(8,"t0",t._s(t.title)))])]),n("view",{staticClass:t._$s(9,"sc","box-tp"),attrs:{_i:9}}),n("scroll-view",{staticClass:t._$s(10,"sc","bookshelf-content"),attrs:{_i:10},on:{scroll:t.scroll}},t._l(t._$s(11,"f",{forItems:t.imgList}),function(e,i,a,s){return n("view",{key:t._$s(11,"f",{forIndex:a,key:"11-"+s})},[n("view",{style:t._$s("12-"+s,"s",{backgroundImage:"url("+e.bg+")",width:"100%",height:"100%"}),attrs:{_i:"12-"+s}}),n("text",[t._v(t._$s("13-"+s,"t0",t._s(e.text)))])])}),0),n("view",[n("text",{staticClass:t._$s(15,"sc","second-title"),attrs:{_i:15}},[t._v(t._$s(15,"t0",t._s(t.secondTitle)))])]),n("view",{staticClass:t._$s(16,"sc","box-tp"),attrs:{_i:16}}),t._l(t._$s(17,"f",{forItems:t.contentList}),function(e,i,a,s){return n("view",{key:t._$s(17,"f",{forIndex:a,key:"17-"+s}),staticClass:t._$s("17-"+s,"sc","main-content"),attrs:{_i:"17-"+s}},[n("view",{staticClass:t._$s("18-"+s,"sc","nav-style"),style:t._$s("18-"+s,"s",{backgroundColor:e.color}),attrs:{_i:"18-"+s}})])}),n("button",{attrs:{_i:19},on:{click:t.getMore}}),n("view",{staticClass:t._$s(20,"sc","box-tp"),attrs:{_i:20}}),n("text")],2)},s=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return s}),n.d(e,"a",function(){return i})}},[["1a52","app-config"]]]);