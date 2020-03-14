(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = {
    multipleSlots: true,
    addGlobalClass: true };


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 111:
/*!***************************************************************************!*\
  !*** F:/projectWeb/YcYsItem/MobileTerminal/components/uni-icons/icons.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    options.components = Object.assign(components, options.components || {})
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 15:
/*!*******************************************************************!*\
  !*** F:/projectWeb/YcYsItem/MobileTerminal/static/image/nav1.jpg ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEwAfQDASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAMFAgQGBwH/xABLEAABAwIEAwQGBwQFCwUBAAABAAIDBBEFEiExBkFRExQiYTI1cYGRsQcVQnJzodEjM1LBFlRjk/AkQ1NVYoKSssLS4Rclg5Si8f/EABoBAQEBAQEBAQAAAAAAAAAAAAABAgMEBQb/xAAyEQEBAAEDAwIDBwEJAAAAAAAAAQIDETEEEiEFQRNRkQYUIjJhccGxFRYjQmKBodHw/9oADAMBAAIRAxEAPwDzhERex5BERAREQEREBERAREQEREBERAREQEREBERARFLUU09JUPgqYZIZmWzRyNLXC4uLg+RCCJERAREQEREBERAREQEREBERAREQEUlPTzVdRHT00L5ppHZWRxtu5x6AKNAREQEREBERAREQERTCdoo3U/YQlxkD+2IOcAAjKDe2U3vtuEEKIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIimnljlbCI6dkJjjDHlrie0dc+I32OoFhpoghREQEREBfXOc9xc5xcTuSblfEQEREBERAREQEREBERAX1ozPa0uDbkC52HmV8RBJURCCplhbNHM2N5aJYiSx9ju24BsVGiICIiD61zmODmuLXDUEGxC+IiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIJqY0zZSapkr48jrCJwac1jlNyDpe1/JQoiAiIgIiICIiAiKaBkDxN28z4i2MuiDY82d+lmnUWB1112QQoiICIiAiIg+gXIFwLnmpKmA0tVLTmSKUxuLS+F+djrc2uG481EiAiIgIiICIiAppjTGKAQslbIGHti9wIc65sWgDQWtvfW6hRAREQEREBERAREQEREBEOgupqulmoqp9NO1rZWWzBrw4agHcEg6FBCiIgIiICIiAiIgIiICIiAiIgIiIC2a2Cnp52spaxtXGY2PL2xuZlcRq0g8wdL7FayICIiAiIgIiICIso43yyCONjnvds1ouSgxRbJoywkS1FPGRuC/MR7m3WJpgdI6iF56XLf+YBBAiyfG+M2e0tPmuiw3g2rxTB4q+KqijMpJZHI02LQbA5h1seSM5544TfKubRb8+C4lBUVEJo5ZHQECR0LTI0X21C0HDI7K4Frv4XCx+BTdqWUREuDexGiAiIgIiICIiAiIgIiICIiAiKWmljhqopZYGVEbHhzoXuIDx0JGov5IIkX0kFxIFgTt0XxAREQEREBERAREQEREBERATbZEQEREBERAREQEREBEU0NLPURTyQxOeynZ2krh9htwLn3kD3oIUREBERAREQEREBERAREQERZxRSTSNjiY573bNaNSgwW9USPo4RRxkseW3qCNCXHXKT0Atp1umePD/3Tmy1f+kBu2L7vV3nsOXVaJJJJJJJ5lAREQZslkj0a8gdOXwWzS4nWULS2kqZqcF2YiGQtHw25dFpoiWSzax0+E8ZVmHlzJmtqoyb55CWyX6XAsRvy5qwxTi7DsXw91NNRVDWyOySSEMd2bf4gRc9Nhe11xCJt42croYXP4nu744LwbVxHsK1kRa25LKqxAA1OV3x2XH1sdIyENgeDkeezBILy0n7Vudtb9Vp9o42zWfbbOA75rNj4b/tIBbn2bsv6hVynTZby3O3a7okWx2dM+5ZUOj00ErL397f0XzukxF2Bsg6xuDvy3UetAiEFpsQQeh3RAREQEREBERAREQEREBERAREQEREBFmYpBC2YxvETnFoeWnKSNwDtfUaeawQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBETcgDc7DqgIpRS1BIAp5iT/Zu/RTChMYDquQU7f4SMzz7Gj+dkGsxj5JGsY1znuNmtaLklbcz20cLqWFwdK8Wnkabj7g8up5nyCxdWNjY6KjjMLHCznk3keOhPIeQ/NaiAi26GEydqTQy1TTG5rCxxaGP5OuN7dOa+/VdUPSETT0dM0H5oNNFPJRVMTS58L8o3cNR8QoEBERAREQEREBNjfmOaIgmFXNbK5/aN/hkGYfmvolp3fvKct84n2/I3UCIJ7UZ+3UN9rGn+YX3sac7VdvvROHyutdfW5c7c5IbcZi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VarKuOfC6GTm0dkf90XH5OUvMWcK1ERVFhgfryi/FHyK9HPpE9QDbpovOMD9eUX4o+RXo53130v7VZyXh8REXRkREQEREBERAREQEREBERAREQEREBERAREQEREBERBTcU+oZfvs+a4Jd7xT6hl++z5rgljLlYIiLKiIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIC+5nZcuY5b3tfS/VfEQEREBWde7LhVBDcZgDIdNsw0/IKsVlXHPhlDJzDeyP8Aui4/JwUvMWK1ERVFhgfryi/FHyK9GPpH2D5LznA/XlF+KPkV6Md78zYkdFZyXgREXRkREQEREBERAREQEREBERAREQEREBERAREQEREBERBTcU+oZfvs+a4Jd7xT6hl++z5rgljLlYIiLKiIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgK0rjlwfD2aXOaTTz0/6VVqyxC3cKC58fZNu0chrb3nUqXmLFaiIqiwwP15Rfij5FejHf3DXr5rznA/XlF+KPkV6MfSNttLfBWcl4ERF0ZEREBERAREQEREBERAREQEREBERAREQEREBERAREQU3FPqGX77PmuCXe8U+oZfvs+a4JYy5WCIiyoiIgclNUzMnm7SOnip25Wt7OK9rgAE6km5tc+ZUKICIiAiIgIizZFJIyR7I3ubGMz3NaSGi9rnoLkBBgiIgIiICIiAiIgIiICIiAiIgIiICIiArKv8AHhlDLbZvZH/dH6OCrVZYjcUVAzXIIWPHmXAkn+XuUvMWcK1ERVFhgfryi/FHyK9HO9+ZAJHRecYH68ovxR8ivRz6R66X9tlZyXh8REXRkREQEREBERAREQEREBERAREQEREBERAREQEREBERBTcU+oZfvs+a4Jd7xT6hl++z5rgljLlYIiLKiIiAiIgIiICIiAs2SyRskYyR7WyDK9rXEBwvex6i4BWCICIiAiIgIiICIiAiIgIiICIiAiKbvMhohSWZ2QkMt8gzZrW9Le1uWyCFERAVnWgnB6F5GuZzB5gAH5uKrFZ4gcuH0EVjYRiS99y4f+AFLzFisREVRYYH68ovxR8ivRjvboBr1XnGB+vKL8UfIr0c+keul/grOS8CIi6MiIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIKbin1DL99nzXBLveKfUMv32fNcEsZcrBERZUREQTVMDaeRrG1EM4LGvzREkAkXym4Go2PmoURAREQEREBERAREQEREBERAREQEU1NCyeYskqI6duRzs8l7XAJA0BNzsPMqFAREQEREBERAREQFZVt3YRQvN7gujF+YAB/wCoqtVniBthWHxgn0C/3uuP+kKXmLFYimqpop6gyQ0zKdhDQImOc4CwAJuTfU6+9QqosMD9eUX4o+RXox38wBc9V5zgfryi/FHyK9G5+Vhp0VnJeBERdGRERAREQEREBERAREQEREBERAREQEREBERAREQEREFNxT6hl++z5rgl3vFPqGX77PmuCWMuVgiIsqIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiArLEbChoWWOYQtcXHmCDYewfqq1WVbd2EULzfQujF+gAI/5ipeYsVqIiqN/A/XlF+KPkV6OfTN99L/Bec4H68ovxR8ivRjv52FyrOS8CIi6MiIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIKbin1DL99nzXBLveKfUMv32fNcEsZcrBERZUREQEREBERAREQEREBERAREQEREH/2Q=="

/***/ }),

/***/ 16:
/*!*******************************************************************!*\
  !*** F:/projectWeb/YcYsItem/MobileTerminal/static/image/nav2.jpg ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEsAgYDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAwQBAgUABgf/xABBEAACAgEDAgUCBAUDAgUEAQUBAgMRAAQSITFBBRMiUWFxgQYUMpEjQqGxwdHh8BVSJGJygvEHM0OSJTREU4Oi/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAKREAAgICAQQBBQEBAQEBAAAAAAECEQMhEhMxQVFSBBQiYZEyQnEFgf/aAAwDAQACEQMRAD8A+Fru6qDY5sDp/pnC2azzfXHvD/FZPDU1KCFJDMu0l+2IAkr8Z3iRbcQ+5et2DkqA0nqI5NknKlWu2/rhKNAV0yo/sZUqRVVyOOcGRz0w6oW3kAekWecpt9uMloYPoK7ZbpfGdVGsqW5rJqgDExtDGqx7ZBe5rvd7cdqwZ4HT74TRQHV6yHTCWKIyuEEkzhEW+7Meg+cqwpiODRIsdMd2BQZdcisJFIYnVtqt8MLByo6Ao3B64NyCT/TCORyRxguL54HTCTAgf1yeGAA65W8IWG1QKte4HX5yY15EHl08uklEcwKtV0fnnKOlWSenf/GVaV5WuRixHS85iK28cZrNwt8O37Aq1fOVPGTZJN98uEYoX2naDtLVxfteZgUyxJArmuv3yOmTQ+vvhQHAKY2JYhhW0Adfe/bKD5/bCttu1uqHXKFe/v0wcRnLtujfTih3y8YLNW2z2F4IiiPp3wrRPG+x1KtQNH2644gV79CfgZUqQxFc9Dfvl6sfXI3MyqjE7Vuh7YmBXoSD3yaG0gCzX7ZHb2OQDWSB18BRyL5GQehqgMsvU80ch2LsxsWTz84mBXdeT1XIA5y20ngYkBQg3lqpQf6Xk0Cec6gehwoCOovKnCbftlSuDQEox2lRXJybOUFDLFhQoducadICxrbuvm/vlXG01Y4NUMr1753F4N2BPS/T++dddMKFL27m76knOkj2DrftiAEKsdaye1jgjg85W87vjAkdOvGRfa+DljtCqALauTf+MIsrIsscLFY5VCuGqyAQf7jCnQHRAVuFh155PByN5VRt4IN2MkMFHB7dMjg9c0q0Ax+aE04afc+5gzEGmJ+uETVmKUPCSjFCj83uvg17CuMWhVXlVWdY17s10P2yrPRD3zi4tbRSZqrNSAcdLJPP2yNSsscuySrIDABgQARx0zPhkYEljY71jMbAjg8ZDKuyQPfpksPLam3KQ1EEUQfvjOi0eo1WoijiVlkl3eQxFB3UXQY0L+b4wuokqQ+IQNKRKGV/PlWWRiUG8mx0JY0SL+bF5NjBKoXSyPNp5d86g6eXdtXhqfivV7fBwLK+wbux98qCE2kKORdH2xtEdwCV5PbAaEQazqvnjDzaaSKKOZ02pMW8virCmjX34wFdAOpP74CCOjwSbWoNV+lgeo+MBJI21RsBC9CR/fGNRpZ9FqZNNq4JIJ4zTxSqVZT15B+DggwbgDv36jCxHMr+RKYk4r1EfPvik8gAXY1gjt2xiUlYmK9QOMziPjr0ySZMY02jn1e7yIy23rnYOKaaK/KkZb67TnZVkFtpB/qfjLwymMbvY2OL5xloo5N5ETqwFUrXZu7PsKyj6c+VbMLHYc5ttbQ6Ys8jO7MSLY38YRTQUkj1c1fOVkiZEBr64HoeuLnTtiGmK/T2yjHaL6j3waEnJaNkNMCLF84OQExRSaiZIol3PIwVVvqTlCpAJ469O+cay3Xp098juMoPb3y7SuXYud7E8tfXIA3GiQPrlawTaAYhaN9wfcGPCVQAPuT7ZRxtYg1x7d8oqq24s4BAsCuuTRCXVgHnLTA5j0yhNtwOcIOCGoEDmjlSBZbiu1dMTtgHC6T8iSWb8xfA7YHyT5Am3JtLbNu4brq7r2+cpxfIzjx0xCJBAHIyLs8nOJGyiBY5vI/b64ATzkix3ywS4y25eDVXz9a9sgcWP75QHAWMtdHK5fb6A1jk1V8jKSsCwKiM2pLfym+mVvLujJQdSt8gEZEUUk0qxxRvJIxpURSSfoBjYwRBu6y4BIuiB75G0kDCWfL2Wdt3t7XiSYHRxPK4SNGdz0CiyftlCAb4o98JG7xMHR2Vh0KtRGVWV43LKeSCCa9+uGvIwJ611ziL6X/tk1ZoDLBSvxeRQgZ6CrvI+MMoUyL5hYJY3FRZAvkgZEixrNIImLwq52M67Sy3wSL447Xk0ANemTk1++T0HOOgKhSxoCzkVXXCzQzQbBNFJGXQSKHUi1PQi+oPvg8AIJrnI6/XJOcOOmICuSACPbO43Z14kBFVWF0+nk1MgSFNzUWNsAKAvqeO2VClwaUmhZoXQ98qws4UBpeDeJv4V4rp/EI44JJdO4dY9RHvRj0or3wOsnE+pklVQgdi1AcC+TQHQf2xVNpcbiVX3q8qbrnvgl5Ai+19Mn2yKvpkg40BIXuMfgbUw6k+IeHRSxflWR/MQFxE10pJqhZ6XiaBNha23g8CuKzt5VCoZgD1APXNK0BDK0bsrgqwNEEcg5EkzSbbr0qFFADgf3PzkGmemar79cHkSewCK2Wb1DBg9ay6NX0yoytUwI5Bsdscia04oULrFkjBeiwC++NIyxdVsXfPf9sllI0pvEtfq/DtJ4ZNqZJNHpC7QQNRWMty1cXzllBMYuvY8dMJHLC8fmrGt9Nt4fzZ5NJ+XiJbTly4iIB8tuLK+xO0X70MmjZRB6bSJOqMZYyxfZ5fO4AAHd0qua63Y6Z7nTfhjWeEeA6f8RoNJ+XkhpVEgLGn2kspN3z/AC30HAzz/hH4d1/iGlm1nh8R1B0u5tQgQ3EoHBs8MTzwORRvFpdWrwqC21wevYDJaa2VRk6+BRO7WCdxJUGhz/bFtJpJ/ENZDo9PGrTTvsTc6qCfYliAPuc0dXPNPFFA7HZGWKKVHp3UTz1N0OuZ02maKTa4G1lDDmwQeRhszaFzyeSTzyScFK20EcDLyMEq+PjKSMrR7brnpiIYvNLu3c8dspHp5JYnkQWqctzl3mcK8YYbWq7A5rInki31p1kjiKIGV23EsANx6dLsgdhjIYN7AUFQOL+vznZQ52Aj0EUUjBpLJbklNvBxaRi7uQAoLWQBQGa6oPyMJM6MZCSUBO5O3P1+Mo3hZ1Pi66PR7XZqVacUzV2ObqEpOkb8b7GJqGLsQood/jEyvQ1xmtrdA2m1DwSJJE0YqQSCiG7jEV0k0kc8kUbMkIDSMP5VJABP3IH3zOUWu5nJNPYut31xyJY5Y2Lu2+xySOn/ACsAqho72/GdH+uibHxziTEc0LU3cKavtkIjWR3Hvh/OJgMAYiPdu29r6YMgjnrmjS8CAMCD98ujFQy7QdwrntkNZbqTkEn3HHfI7MC5UqBYBsbhRybG2ux7ZQGx8Z1errlJgQV5+MmgKpge5+MmyRlhETzYwr0AMgkn4yVQyMFFcnqTlgvqo5B44H9MaQFCCc4dK4yQvJ56Zal29TuvFQEAkdDllW1v56ZDWev0yUvoB1y0B20g1WWVSbIyNlPtvvyfb5y36SVBDUasdDlLvsR0krysDIxYgACz2yUleKRZI3eORTYdGII+4yAATzxkyIqyMocMoNBh0OKtDKgcX/nLxtsKvSmjdNyD9cGCL5++HQK6OXcrSkqauz2X4+vxji/KGDaReRtUEm7Hb4+mX1WmbTMqs6OGG4MhsHAOoJsHOqgRdnFyVNNbA5du4br22LrrWXagCEvYTxfXB8A8/th9OPNlWISRx7m/VIaC/JOSgKOgAXaxNrbWKo+3zgxwb/vl2FEgnK2Rz++DAlaBJPOQT0yV2nqDnbb6c0P2w8AcwkZN5tkWksnp1of3wdXz1w8cSSRzO00UZjXcFe7k5ApaB57810yHjWNI2WRXLCyAP0/ByKEBPJ4GQectxWcgBambaPerwAoR/XGBopDpvPEunrYX2+cu+g22tt3d811rnpnRHTR00yvMGicbUbYY35Cm6NgGiR36YDset5NegNr8P/ijxH8NJ4gmg/L1r9MdNN5sQf0H29jzmTNL5zKSiJSKtKKBoVZ+cF0sZ184wI+OtdMkqaHtkfHzlloijxjSQFe+dkgerpYHb3yHNu20Ut8D2wegCJwLJ4yHpq2iqHPN2ctDsCsGUtY9NHockDcoXaB898t9gAVfTJ8s9cKYivUY2j6QeGuCs7azzBTWvlLHXt1LE/QADvfGdAZ1Z3fJb9WSK5sWMKAaEQRvQyyJfpaqv7HDhT5VPxubri0dsd15o6VAwbdRTqRfSsJJeDSKL6eIRgkWL/bG4WKsAotmPA+co3CMQRdE/GAhkLybWIs/pxUbLWjb0X4n8U8Gj1Wm0GoeNNYNsiLXN/274odnqaInb09VbsEsW6/SWkYbUAFkt2y+moKhcJQNkSWR965r6Y220Fvsc6+ojcHo0NpsV2o+2IahG8hyquwjI3Oqnalngk9uf3zR8Sgfw4IrSq7SRgqV5rEVWF9DJKNSVYSqPy5ViStXu39OvFdeRk0RJ+DP8Q0+p0zxPNpp4op08yEzKRvW63A9x84mHO0ih3x+WZgTIUVt6FB5qbgB0sX3Hb2zOblz/jGovyYvuEDxHR+V5H8bzN3n7zwtVt29OvN9cEwAchbr5yP3rJo7hwcSXEkqc7CoYgrBkLNfBBoVnYgPTPp5LG47jt2ivjOhjkhaKaPVLHJvoMGIMddCc0NTJpzDHsWXzAv8RnHBazwtdqr73mfqbXUMokjcAAhozxZHT6i+c6o6do6uwHWTtqSTMQz2WaQ2Wcn3Pf4zLkALqQCAOw7jNFgFZ1aIPuXaCWI2mxzx17ijxzg1UUpKrf6R84S/N7JkrM+VI+m6lBtq6n6YF1osUDbAeL65r6zw0QQ6aSSVT5qgtHRBjBJrqPVYo2tijg/FNVp5Y9Pp4NLHCIl2u6EnzD7m+mTwXFuzNx8iELxrIhnjZozf6DRP3+uQimTcVViFFmh0HzlB6HFC+emSrtGXCng8Gu+ZrvskvIV2IFRV2iiR1bnvi5s9b+2NlRt45yjx+i6quenXKcbBoXUEnLqM5RRwix7uhHBrriihIqVIPxhFj3ChZJ6AZaiG2mjXBIOEAB6ZrGFsqgYiAT1Hg9gOmCKULrvWaCaOWXSyTigqdbOJyCxuP0y3FA0CIs5KyKiOhVSTXJHIyeKyvlbjYP1GTxfgk6v2yoBHN4ZxzY4444rOEYMLMZFUigE5tr9sbjQAd243X1wqISm7t0wYiIIHFE11wrKwO0EUBzhFPuwRHeiMkRs62osc5fYtkg+odB75aSDZGC6kF1DLfHF9fnLUb7joAiR+TKWlKyKV2R7L3Xd89q4+t5eWWJxEsUXlqiBX9Vl26lj+/HsAOuDoA98nyyOevfMFFoAd0fjOIsgnLMATXT2ypsCwemSwOeIrGkm5DvulDWRXuO2VAIaqo3RGEjgmnBMcbP7kDgfftneSE/XKl+yncf6cf1yRHEEAi74vI22OK9/9s7coFAE/JyysO9VlrYyig3lw7xqwV2UMu1gpqxfQ+44H7ZcbTzd/bBPd42qQzgAzqGalvk10yvfJHIrOojqMXgRUnqPbIojtwctQyDQyWhFSyiwQb+M79Q65xW84cGsnYFo4pJnSKJGd3YKqqLLMeAAMvqtJNodXLpdQoSeFiki2G2kdRYsYMXZINEdOecnyz5ZfigemUoyfYCnfr1yV65FfOTRwXcBnSaJ9Xv2soCCzeLFCxI49Pzl0LAkhiL9j1ytA9RjaAhKRhR598ZT0nkc3zeLADkXyOmFVWIxWhmg+shi0WyPTRvKb3zSruIsEbVF7aog2RuB6HMgk3hXDDi+Dgu2KhEe2WICng334yMui3yemHigC6WVo5EdAu5GDDcAwsG+h4P0OaHmyTyPO6xgvIXKogRQfhQKA+OmZqkK36dy/BrDwSABQW2gG/wDbJ42y4s1FNxsOGsdD75Gm0yana0ZSJ1umlYKvQnr/AExN5Sb2/o7jGdKWdQm6hYN1f2ONGids0NLtkXesqAqhcFrWyB+kfJPTKa7Up58pSARxsAEVSSBxR5Pzz98mNdgCpQAuvrhpo/8AwqeYEJZQQu7kc9cujR3RiWzqN5JIX61hYy86rG1BYTxQ556WR16ZZYfLZ7O4FrUjjjG9OtGtoFjnsMDJIRm05DU3PcAdsWbSyx7yIUbem31C6+R7HPXaXwtdXCZSUG2hRYbuvYdT9sP4z4K2hSJvJnjDoHHnJtJ45IH/AG30+MJNPQnCz58I2B5H1GQyAEWevfN3UeHQwldk3mF0DMCpXy2N2DfXoORxzlNZ4NqdBNJFrNLLA8Zp1lWipoEX9iD98001TMmqMYID1bge5zs1fEPCJ/Dp2hmXZMpAYDmrF9uM7BqKdNBTNgymWEJRO3kXwKvAzJv1BeghZgSEX0j7YaN2lLGSQsERUBY9h0H0GXR4/ODPGGUg2pYj72PbrXfDjZ1VYM6dJNqru9KgWT1PuPj4wjaR9DM2k1Qn07cLPEY6Ycgjg/Y9sorAWbAIb0iv85bV6rUTySaqeRp53Ns8jFiTVX85aWh1oHJphKixqLINCuee2YurjnOvlEwc6gysH8zlt90b+bvNpmnj08DyQ+Wkilke+Xo0T+4zM1LKWdQKHS6yJIiasTaNVYh1IKk7hfSskxxq6mIlkYAncADffKyG3ViL9xVDGEWERLxIZ7O8VwB2r5xJWZgJFZm2Bas8YeSBAishZl2i7HQ/HuMqxF3VD3rrho1EgLLfHbLjGwoQlQAggc1gl9/3x0oXQRlACDd9yP8An98pqEURqqoqmzZF2cfT7smvIJecuCQeAAR04yixleo784XYT+nlbq8cRoJHzBJ/EAAF7Sf1G+mRHGDG7N0rkXhk0yuI1DPTD1en9J+PfNGNCZpNSUjRgdyLGu1R7Uv2zohj5NFJWYIiYD1gjnpWFWPbGWo7Txdd80Gl8oOGu264uwMiil56kjBQUSeNCxF/TKsWKBLG0Ekcd8uy7WKnscgigLHT+uS0I6CebTmTypCgkjMbV3U9R96yDLVBhuUDp/XKgUfvl3EZVaVxxTc/zfHx0yVaVoRVTukIagL5OFkhkSch1NAdz04wYjICiqJ/TXUnNb/pMmnjU6+SPRRkAhZ78xh8Rj1H7gD5xxrsxmPM8jiGJ5LRFqPjoCbOE02i1OttNLBLMw/V5a3t+vYffGJp/D9K22DSvqpAf/uatqX7Rqf7sfpgp/FNXqYvKkmJiHSJQFjH0UUB+2YWuT8AcfD4dOxGs1sav/8A4tOPOf8AcHaP3wT6rTx2NLpFBHR9QfMb9uFH7HK6mKJGPku7pQ2sy7T05xcpRJHOYyg0II802pJM0rN7AngfQdBlo2hSNyy7n48sg9DfcYBD6ThHKtRVVUbQPT3+cvG+PZARLI8rbn22BxtUDvfb65S+Bkknke+VrishgWLUtDLAh2W2oH+Y4KrqsuvpHS8LYySK+vfKk9sK3leTwJPN3mySNu2hXzd38VgyD2wArx/XO741qptLJHp102kOnaOLbMxmL+c9/q5Hp44oYvtv6YLaEVRtjBioaj+luhyD1vjnn6ZINde/WsJ5W6N5FalXna3WsK1YUCri+15XkVhFUtYux1oZxjLyCNF3MTwqjnBqlYEKt8jvhZPLATYSTXqsVRwml0kuvWd9OkKDTafzpA0oW1WgSNx9TG7ofYYqf1XlRkqA48myayPvllUtlmQiPdY/VtqxfT29sGB0SAnNLT6QSQyy71AiFkE0TmYjbQDlmnJ6cZDSTANqjEduwMPSN24j9Xeq7YkecsX3ZVRZwQjhXfrjChGWue9tgQoI54Pv7Y1oY4zqYxK6pGxAZ2BIUE8mhya60MHoaKLCyTASLuX2Bqx9cbmjC6DyRp4zIZA5m53Aba2+1d/e8tqtVAupJgIKr6dwBG6uLo+/XHjr/wA3pNNG8MSvBF5YaOPazLZI3n+Y81eRZSSehLTz6uXS/ky58kVSKAASu6i1D1Ebmon3x3RwOo2GNhZ5OG8P0xefai/+o9K+M2idJFCu3dJKFIkBAC9eNp69Pfvh5NoxoVmZdQ0TLBHEsaBTtH6j7n5xPWMkcpj0oLx2QpkWmI9yMYmYeWzAsKFFPfE1tzdMt8E339s6kloqQOSNRV1ZINVwMvpIXeVQiFienbnDrAj+YxkjUpVIwNyWa4r26856LT+FeGj8P6PVQaiSTxYzyLNp5YwYkjo7SOOT0N+9+2ZZHxeyaEdFr9Rptp0rGN4pBKksYp1NdmHOX12vbVsDqJTK6wgbhHTFzZO49WNkjcbvjNQzpo4pXTSos8sgJLRqUKkEMOo2gEggDj6VmPJ5OmMUmmkmXWwS2zLtaIEMSrIwJ6bV63dk9uWu5QjqNI8cjw62GfTuB6laPa91wKauOmG8H8b1fhUTjTuh3K1eegkAY8bwGsBxQpuoxnxrxfxD8Q619b4rq2mnYBSQgUUOgAHAxfw3w2PxDVxaaTUQaVX/APzTsQqfJIBr6fOaKOtkONmdNJ5rbvVuuyffOzQm0XlCqDBTt3Dofn71nY3Deh8BLTmMxlWamLekY1PoJ4oIpzDIsMm4KxHDUea+ljM8MYnBXhrBB9s2IfD/ABDU+GNqVjDwR2SQenfp9sFXkaZniJ/MG6NgG5FrVjI1ZiSFzbqbUACiD/zjH4Z/zZSPWaxo0ijIiZlL9OiiulnMeR0OoIknPl3djn+mPwDegCOAw5sdwMHMvmeroKw6BZVcxqVIHPPb3yAi2gNtTeo1wMzS8E1YHTwmZkEaMzFgqkjr8YdtLTkC+fSfg3jNQAPt0+0FFCeo8kdWNk8n2HHtneWWG1Wpm6c5tGOgS0ZhiYkAgkA171jMcRjEikkkiwPjNaGZ1gl04kBViN4HF174vDCJZ3Mas8g7AX0HUftlrHRPGjKdZA9oea9WBI3P6zzmvJBvQOgJOQ2lhVvZqB57ZfSbHxEFhDAHiiOvbG/VKUUIZZCKFAsxAHA+wH7DGZ282WXUSvuklYszUKJPfjjM6F181d1lep+mPp00gaoLArTWY6ZAwXaCNxvpS9T07YSWaOVVEYCAHn/5znbTooOnE0c67SsnmAbSAboAe9UbsV3zPn1P8WQQlvLugzimPyeSLObX0+5N0NudyMCf1ckD3xV2KPtPqsX9cCJmLAlvjCFWWRSSrkqCKN//AB9MieSM1oV2U2E8i+eQBnMrKPUpyxbcQkaNuJpa6n4AzWn8Ij8Ojil8VWTTsyBl0asDNJ/5jYqMH5s/GZWkSZWm0s+rmWLTwvLK36Y4xbH6DH00el0BLa/UlmH/APb6Qq7D4Z+VX7bj8ZV/FpPJeCCOPS6VgLggsb//AFt+pj9TXwMzyOgU0AePpktOu4GhN4rLHuHhqLo0bq0VmUj5lPq+w2j4zOdgIzySWJuzfOGMgMRVW3EG/jKpopJoJZwU2xqGYF1U0W2igeW5PQXQ5yXUexVC6Mg3+dGZLQhfVW0+/wA/TAmwf71jEcIZwHYIL5Y9skIqXuJ4Ncd8y42KhdyytVfvlCDu2njDSncApAsEnd3N+5yUheQnaCaFm8lxbYqBJCXFDr7ZZYpGFKtmwAKx7TRUpY2t/wAtYxaRg2kZJU0HFj2uvfNI4lRSiZEiNHIUdSrqSCD1BwZoe93mgdPF5Ye7DWP1WQR8ZnvRbg3meSHHuS1RwAqwOby3B6WTlVNHCtJvAAQLSi67n3+MzQEskawRuJQ0jMweMKbQCqN9DfPTpWBIJa+g+uEABHPHznEeoXz9MdAUrLBtvIHPzznEWOMMzQmLZHEeobzHJ3VVEUOKuz0vKVp6ELHreGgEbygS8IB1uiPpjGnXRpodS2pi1baolPypTaIqs79989Kqu+LJEX9IUknpWJJsCjSQRwRrCJPOBbzGZgVIv07RVji7u8tDrJ4YXj9DRurKQ8atW6rIJHB9I5GAZCOnI98LBCJJKon2HvmdN6YL0VWJrG4D3984qRwRjlEgAcEnqcAAA7B744OXdFUXjjUJ15/5xhjANQjSMY4wqnqa3n/XBcUT7cZRGVmO+xwSKHf/AEyua8lCzKydeMrXfGXj81gB16ADucbl8D1OmD/m3h0pXzBsnen3oAShQeoMbAFgAnvmVkNGYAelfTGYNFNJKigEuxAUDmz2GDWE1yGBIBHHUZq+G6Z9RJGsd+YTtQDAcY2Z88EkEhjcFWBIYEUQR1ByjRtupd3PQHrmnrIXi1EscqHzEJBsd+5yhgLxO+5A3pFE0xv2+MpKx8RJtIwjR+STZG4UCBxxjWigbaOa9mI6jG4dLQTzEtRZAY1Z6DGY09KgdhROJpMuMN2BAlUrtcjiqPQZo6LS6nVTrDGu4mh9ScWczNEsCMa37grdLPB47cZoxaww7jGkgTavEgAa656dr/pWVCF7NEg/jPhOt8J1s2h1aomogba4Rtwur6/fMJmcbboke/vmnqNSdS0jeYqqFZrc1fHT65jomp1Uk3lRS/wV8yTap9CihuPxyM1WRLTJkamklj1DIhaLdseYhZACoW7sGuaFgdT2z1/4W1nhul1+ml8S0c00R2yCIjaHUnqd36h/c5la/wDEPgGo/AkfhcPhW3xEBFWQqB5LA+p93cnnr75iR+JTTzQ/mtRPMsMaxKXe9qDooJ6Ac5hKTyPsUfQPxb4h4Z4z4jLqfDdMNNo6RHCqqnqQzbegJ7fTnPNazXabU+Lzz6iPVPpCpWOH8xTBVFRgsQQa44r3rMyXWnZyrFi3Jvgf898hpGiicI6uhA3Opuwaoc89R2zbFChuipVSjCrbaD+gk8dTx0GNeD6w6DxGDWeTDqPJbd5M67kftTD25zMi1TxSyrGzxsYynpc8qRTD6H2yUkCVZoFhZPYd82q9Emjq5g8hcRogckhUBpeegvsM7EJJoZJmCSExr+ncbIHtnYDsTDlXBCgsD+kjrj8Wtn8kaZtSoikosOaBJqj9MY8f8O8P8L8UWPw7xFdbp9it5yjo3cZkGyxPf475m1Tolpp0aGvgbw7XyQGSKelBVkNr06fX5zN1RlkhjS7RN1dAeTZxoMVUoNtMQT6RfHzmjCqNAf4SDdfDC7+cVBxswYGYPRZtqiwE7nH/AMuUBMvmI3ptCtcEcGvnHYwkGoUxKEZGDK1A84TUxho1l865WJUggmh2Nn7/AEy4KmUo0ZRJKbQentgpA+0EMKvn3rHvy527lN0KojocWmVQNtdrOapWNrRGkaQNIfMSN0BNs3Ujng9znadqJIJF9xxixCMfS1EnCDpQHTKimu5mOREvKVVyEH9fnLalQAu4JxZBA5P1OTpjbba6r73eX1CXE77gpUWBX6vjOiCTKrRmM44SgUBuuxwRYDcwX9XXLMLYjgcYOut/bK1ZDBygvEaJvFWaPyqKfxN12D0HtWNSkqNwA56nFJKLsQDz75z56v8AZmygY1l4v12OO+E/LgoDyDXTKxxMkgLWD2rM3CUWrCj0Xhf4h03g/hJbRaRv+uyStWtcKViioABAb5FE3wOebrMXUrPPO8zu0sj27O7WzfJJ5OL7WBPBrDSNa2ou8cVGnfcKOWqsUKFcYKUUCQfismMFmLFrNWbyxUO4R3WNeTuN8cfGKTuNh4ANTIiRK7OeGHWzfb+mcAwBPqFGiaPB9sgWK2khve8KYZEhQmZNkhLeWsgJBA6so6fq4v5znvYFvKYmJnDU4tSK9SgkEi/ocAaLMUBK2avrXa8MkSPEz3wOOnU5RIWlmWNKtiALNf1xtMdFkWM2jdr9QOSx8qPbGTXc4IqyylSPUDR56Z1rtbcTYHpr3x2BImkUfqyxlLHaCN3e8pPEYtgBY7o1c7kK1fTr1Hz0OC2kgntk8n2FZO4bvTxXfBVd4XYeD98r5dc5DTED6k3eWIKcMtE0euWKj35yZBRPv7XeLjoKIFAGv9sLI7flki2RhQ27eByx9r/xgwG61QIs+2dR5vrjq0BfTauXSO7xbPMdCm4qCUvup7Nx1HPJydKm965peQuAojmwMPBSqrqSxa1ZACSB2P8Az2xLTBdzTEe5AQRdduLxPXaUIwkQsVKgvuoeruB7jHIGoAH7YyPJZXWU7VIrd7ZS7GtJo88hDjbQ5Oaen0hRU3HkrZ++KrDF+apSR8nis0jqHgmDIFlSKlt14P1w7rYoKu4PURVTGjfvme2nVQLLAsbA7Vmk+o8yg7Egfyg9vjKxQtKwobix49zmdFSSfYzhG3AAsngDOMdV14u8020sZbYpYFeowTKYPNiR2KyABgCaNcgH355w4sTiL6dY97KyqwZCtkn0H3HPXj5HOTKwdLepjR2vVNZPVj1b4vNSPTBtqGNeFvoMQ1em/L6i+Cp5oHrzzhQONIV3SSbVlkZzGoRCzE7VHQD2Hxmx4XC7DZFYn3AptajZIAo9sSGjYzXdIwvp0HXDu40iPHE3nUKEgHDD35xNMEqI16TQaqeOWzIHKSEsG9V0RY685SEq2qQRIwVyFCs1nnjrjJieTRR6opGsTsVXkXx8dsWkfyrj43AYtlfsf8T0vkxJbxtyyMFkDFSvB6dvY98XgKxwk/fjtltVMiaSNlkjLlSpUE7o6A5PFc3xyenbFIjYte/znXxiuw21y0a2lgl1EIkSJxZKBtp23XS/eu2PiF9Jp30cujieTViNopXUmRQDwUIPG7obxj8OfiaLQJoBrtMk2h0jSOYKAV3YVvPYkcdewxLxzXafWar83pTDHHqGdlgRrMIDUL+T1HxiutDtUdrvDn09xzI8T8gq6kdDR6/II+owE+kkiI0k080qPt1Cht6qWZRTeqiTQAuunTFhIWFs5Jo0Otn5zd0KCTStqdQysRSFWJLkV1A9hVfcZgkmxdzM1Pg80O2NkKPKqkB2FUeh9sX0qyGU6SHTpLJLSqCu5rBv0nt/pmp4hrAkULb4pd5LFQ1utGqcVxfb3Gef1WuWbUO8iqEc3tReP2OUosLSGpJIzGQz9rFDr7nM99aUWoSDxVkdMmXUq1SKdzjja3Qj5xGNm9Sqo9XN7eRXYHNlREpDMcku7enJHXjqTkmed32lqs0yijhhool8Og1Ca7TySSMwk0qht8W3oWJFertROLIZoGEimjd3WSSN6ZQUuqHSwLs31zsI8o1HqhjXTtxaKTtArt3zsqTV6LQy0YrhrBHWv6ZPlKWSpGbcBuYjofb5+uaH4hl8NbWwnwlWjjKeokEc/TF9OhmAABVyOvt78ZNFrZY6NiHRdpB5G7rjSaeQadIt4Le/wMo+2NFAYk1VnGAqEqQpRhV7ucZaiDZjFJckG07dqkitw7E/bASh3VORV2AMa/LmWiTYqgbvj4y404Rq6ggE3lxL4mU4dFZi1D3xCS3ajyR1o5vahEhV2ALckkn/ADmI1GUlLX69s0iRONCjrtPBwkW4Dnv750gpjdHjj4xjSRAm+vxlpWzJLYzp3YURYS6PthtShlUsvA+MJHGsb2UDBgeCx4Pv9cuyBUCqKA7ZtDRdGHJw1EYF/WzHaFa+KNAY5OjGUgDnk4ptqQ97HfKfczkidVpi0MZXdRHJYUL9hmeyFWKnt1rNRtVNJCNO7WiG1H1xSdC4XbyL5yc2OMlyiRJLwSu6lJN8c5NnzAy0OcuFN3XXKDcrBmFr0Fc8/OaSSUdiKTHcxUXSn++VlBjWN1YFiKalqvjGdtw7945Nbe/1yjoWB44q85pQvaHQFDZ46HtlZgPTwThbDPuu6HTtldSsSSJtmaUFFZrTYQT1XnrXS++ZS1GhAFRmY7VLbQWIroPfHtIdEPDJ0mQGY3tY/wBMW8pG1IWNwIzR3ODSg1d9zXeutcZ0+1PMjRkZd52sgIDC+oB5HvzmNACMpVSnHyR3wVl2AAJPShnEX2+uQAvd6NX07+2Q2xEiRhYUkWKNHqPY5JRl3K45Bo4M4R/LVgInZlofqWqPfEvYF5JJJ3DyyPIwUKGdiSFAoD6AAAZG3nKg5ff7seOmVoZJUdB/Q53DE2ecpfPX9sd8LPhx1D/9SMnl7PRs/wC7thaASNGgOv0wkUYbuOnIPb2x7Q6nwqHR+KR6zw+XUaieELoplk2+RIG5YjuK4/8Am8ShZVZi5oYrdsa7kOqIdlqa7jm8rtY8AGz2rHZIFkkAthddO/1xnyY4Y9iqVcctbdfbKTtD4GK67W2snqvkHg4x4dCzT+Z2jP8AXDaiNXYybR2G0msnQyAKyu3A6H/GTKLe0So1I0WhpW3EURyB2zJhWSecIZWZA1detY9LrIxBII3Pm16dvVcX0WkMupUIrBRxuB5HHsceNa2XLbVGnN4fHDEkwItTYrqMppnjbzEdlHmHow4r5++E8Qh1C6IVyDwL+mJx6f8AKS6qKRI9QVBjSWOQlVYEWykfq4BHPv8AGKT4ukW9OqCtFHNFI6KPMjb+UdfnI0cbNqA6gRMOeBX7Z6HVeC/iKXwnSa/W6c6jRw6QLFOsiELp15HN80X29z27ZMGm0i/9OfSQTRzGNfzH5nlTJu4ZT/2EUfijmLkntDUWZqeHaifUJDEhlnmkoIOrMfbBSQFNytGPMRqNi6INVn0Hx/8ADGj8EngfW6xZ4pBckUSbXYXTBLsdwQTWeHLwHUMApkQWAqnmuauspSspqiI21Y0rxwI2yQrE7BPQf5gu6uDxdZjndJq4W2hhe0bOLN56DRqtRJqNVDp1mAaPexO6zttgt7eLNnmhxiMmngh8Sh08UcTelCDpgHkY8gAG+SbFgi+BjSJkvISfw2bSz+XqIXVwOVb5HB+mAfw4rGoDVfY5rKdmiLjyuW27dw3Diz6etfPuCMVmcLqWKF/LYkjcBYHa64vN8a/HZVCU2ii0zxFJU1CvGHalI2Mb9J+R8cYnGfJ1ayAp5kRtQyhh9x0+2bCxLK1k1Qs/74n43oPyUOm1D6rTMdShfy4JdzIAapwP0nvWZSxuOyJfiYrMzTsvS2Nn74ZgzwCPgBboqKu/f3y8W0JZAYWepxmeKBV0xhmZg8amTzFCCOQmiLs2ve/Y9M3xrVMignhHiU3hmnni0qhNTqQYm1BcECMjlQhHBJH6svt1+qWfzZHkEkgkmYoOXs0Sa45J+uA8NhSWaR3kCMiMVG1m3t2UV0+p44z3Pgug0kWjabxHSSmB3VjOHKLt2MVUUDyxN/RRkOChuhrejzem0IVVtXZgw5r0gUevz0r756LwnwGTxbRak6LWRIIFXf5oN7ipJAHYf+Y9fbPO67x3VRpqNGrqPMZGeSqZgt7V9qB56XeYp1svq9bAsKamIsfOZyg09aKUkdqpCJt4Xci/+br84jrVXTTBY549QrRghgLAsdK7HJmmLKyA8gdMSTn2vNVJcWq2ZNlmZj6Scuh2izW4cCxeW/MOujOnKRFHkEhYxjeCARw3UDnkdDxg2U7VbcKa+P8AXITokdjpGAU8MOB84UIWdgaArizxiUMpAAam29AcOhIhBawC1AnKVF2FVAo6G+h9s7KO9EgEHvx0GdkvuOzTjgnEyGmAv9R7ZqwK7OQrDcLs1YrE9POtUWNgde5GM6PUgagrRUhhYHcZrRvFIPqdKDFv8wtyAaHf3yShYgdD3vi8ZkIBZFY0Tdjoa/3wbygnc3UZKNVEJHtXhnC0CQKuz7ZyyKa3H4JGJs7MWLcfGWA5UK4bi+P7Yy0W1ouEuK68iuuYwi3dxnoTGuogEZ6kV9Myzo3jmMRNMP6j3y4smcPJntGtEBTe7hvjGYogqbgfrlpYdj0D3wun0yySC5K79c2izPjRZJgIyvlqTu3b65rpX0w59a8d8ZGjihYhnUm/TYosPpierk8jaFUlubG4UfauLHe/tmidikqEdbp9xBUEn4zPOxZOQTx/XNeTVrHM6xukkQUEMyspY0LAB7gk9eOMTnWFpyUpFI/QxPHvzlpeTJ0zPOQwYcgdrxx442UsgLAfbBcOwU7EA743ZDQNY+5sKarCiMPDI4kUBCABXLn/AJzkCMNDexuWIZ745HAHzwf3ySsSImxWElVJbAhjZ5XjgVQ785S/zTEVaFhAsm2lsru55PU/3H9MCRuU3WMakQEx+XvICAndX6visXs3ZGZyq6AhIlKNtsHoTfvizExSoyBX2MD6huBrsQev0xgnrQA3cX7ZRghjASIhgCGO6websDtxQ7++cuSKqkJkhVVUnEyFpAS0aitnP/OmAmUhy5AG7kAcDLKRY7g88Hrhp/8AxcQaqKCqHUjIdNaH4M+7ypHPGFKUpsZXbxnOyaK0bIo7h2GQVywsZJArF4CiFBqvfLbckI23eQQhNX85JYlQpApb5rn/AHxrsNIoa3VXHfJNgEdQMa0ek/MTlC42qASymx9M0PENLDBCREjK3RrYksL9sSaui1jbjyMeVBFKyrKssYPDrYDfQEA45DCtROyXtF7SavAwiMSpvUtyK5/vnoIkhYerazEMGDL+kdiPn+2NIqELFIKU2RbAcGsiaJYWMe5W2cblNg/THF0xLkJRUjgnKtp5CgIju+9dO2VxlXY0cRMwmVCvuCAT0zMlhEJdS36RzfGeg1UKwebEVo6eV0d33KxHT9B/TVH5556YrJph5gWRfNetpDjlR7fUZrFaMZRsx4C0jHgLY4pePe83vD9PUslk7rDMzd2OJrpki3oqWo5455/0zS8H1Oni8QhbVRGaEODJEXKb0scbh0sd8c8bUQhGns9j+F/B/D/HPHNHoPEwV0jtbsG2hiASFvtZ4zV/+pP4M8J8O8R8N0ngGnhjm1LHzNOpJLElQvewDyK++ebh1ce5mhBSJmO1GNlVvgX3oVkNqpAxbdGpYH1SRiQ/BAPexwc5KfO32Oh472VfVaib83pdfptINPE7RwaNpWVNJIzVcKg2dtfIF5Q6+eSFY5dQJRBp/JUS9FRTe1LFg3fH1xLxCcwTxSwmRpCAWta2tfUV9AecmbWQ67UaqdXlUu5dUk9TNuNm2AAB6np3xuKSKVXQbxjXfnfCNEsUMy6iESK0zXc3qFbWPYVVdAfriPhnhU+q1cskraeIQxLTlAqNQoAqOp5598oAI43amIu6HJxyPUQzwCNWO0m+vFjrf9MeJCcE3bM7xDRDwvVaiLWaJfKmKzDyTyn/AKZP5QbPW+w7YIaQRw6eWphHLZDuyEllNHpzQBXk1ZvG9d58sKMrSeS67DyQjkHjjvWBj0zeaqJC9AAFj345+ubuDS/9M+NSLTCSBzEJA527QRyCCeovKRzmLUxkxoyg8h+R98ibzXKuXbaoC7yOgHQDAvp6fepJPcHvlKMqHscjcRh+T72T/nMvWbZlclhY6LffGPO/SnbuPbBahg2oEaICG5q+/wA5TjcaZMtoS0sZSFWYA8nj2+MaklE7sWjRAeqotAfQdsIYUhl2iRZE2i6966YSSKFvKKAqdlMQb3NfWu3H9sFFRWiFHQHTag6TULNGSrr+1e2Pf9Zc6eSGSeURrHcUaC13DgCieBRPPzi88CSN6AVH8tm6+uZ8kbRttIvnE3sGmjmm84bmJLc83gwbXgWffKsos0CB7YVI+w7fFZm0Sti0is6Mvc4sFMZNj4BzTEVsCep4r2xbUQEncosdT8ZFUJx8izEbOn3vK0PphY4pShPlt5Z6sRQ/c8ZXcdhQfpJvJ79ySa2/UZcH3P2wdn7984G+mVYDMTHbVCvkXnZbT6lYGLNDHLfFSCwM7KXHyxj0J2ggfqJ/pmn4VKkWpqVd1g7RdckdbzPKhApHcc4zAsJjk3mQSgDy9vS/nNW9G0dD0bPNqW54+DwD7Y2YNw5sH3xTTN5eqjjFCzRGagjtgOQK6ZDOvGrQnsGwsTYusJEqKADXOEeFFiFWQxuxlKrZuAJB74rL4j2nRFO4kAjpfQZVpIGd2Kj08l8lJVdCKFnnAGSKJ6jJVrBq+lYl3NK0J6rQejz/ADLU+/t2wmjRDqEYgKoUn36Yw0rzSFpZAQ/LcAAn6ZzxLGzyRqFAAPpzaL0Q8ZPiE0KaEsijdLtJGwMQAbFGrX5r75gJN5rEUC3JU1jOomn9bAMI39NE12zotLCZD5MpYBVtmTaQa5AFmxdi++awZhJbC63w3RI+nbQ6jUTRGNTO8sOwJIRyBzyPnMnbG8igsQteqRVJr7cXmsrOUcCNgOTRvoOOn/OmKT6EQxlqYKRf6gD9PnNoulTMpR9C3L6alUhAKZj0vrXycHpYo5tTHHK2yMsAWPYHvje+WRgjqAsTbFiqqvsM7VaR9OS7oAH9SkV0PT+2Vaozas7W6XTafVFYNT+YHYha28+/Q2PbE5EDxlVjUU1l6Nj49q75YWSOQPrjI1mog0kmkjnYRTbWkQAckGxz98E9bEkZ6xhurAFarjrg504Cp96xzYQRwLHb3yvlhuvXIasOItp9JLrdTDpoEd5pSFjjA5ZieBlJIggJjLLXUE4wq7pGYnp3GQTztC8VXxmUoi4igjjCEIp3DnjLQIGlAiDk7BuB9+/2w7KqcmulcYbSr5RJUfq4Lf3zJxopR2ZupQBbo8mh2xcDnjPQ6zTLLpS5r9XBxDw7wp/EvFtJoI2ptROsQIFkWeT9hZ+2YTVbCUNmWVr6jOonjNTxvwx/CfG9Z4e4UNppTGStkNX83PPIIP3xJYuOOuZre0RxBhT06jLodpVqB2mwCLH7d82/CNEmp0MqyeUrh96MY7ZiBW2/Y306cZor4Dp55n3eimUFOjEc7qNUKoDnn1D2x2kaxwyatDn4fSGDxHSeOyeJ+GanUa9JRqtPPAVXTyHpYUUOg7CuaBzD1iSOrSk7A57DkHsPj/bPU6Tw6PTzPAismgeUSnTiciwt0NxHLVY3Ed8W8V8Mg8yR4vNfTNL5cbsleqro1xurt98UEuVnQsTUKPMP4RI8ilTRccUpPqzT2avRwQwSuraVrkjC0fX+k2OoND+xzd0/hhiRRGpJv9Vnv3zWXQJ5W541dW9NleAetfXvlOOzWP06Wzz40E7QRSbCSQQQBVqP5v6H9st4YmnedYfEF1TaO7lOmA8yqJFfOell0UWmiXVmURGleJCu/wAzkgk9gAR0I5vpWZc5DF2gHmHczMRGEB57AVx9h1zWPfQ3jXgwtXolqUh2d3JZvMolib5v+597zzo0mpgJZY2KqbLL3rPWPvnMxkj2P/IqnoCegvkj+uZ+sLwupVdqmlJA6gDv85u0krObJBPZlQeV+X3bHJLcNu7fT3+cJp1lhke2ZmIMZBJI2nsfjpx8Z0w1A08utiifyUkCNIE9Cs3IW+lkXxgNJO8rtuBLG2YgcDDLJOKRiqujU086opErtYX07Rdn5w3iE8ggiMYESLsZgLtuAOp55sk9ufgZmmSGPUxJJO0cdfxHEW8oPcLYv6WMc8P1f/UIYYpIfMAHqoXRviv9M5Jo1i7/ABL6PxJ21U0jabTylkVIzPbBDvB/SOGBHBBvi++B8eWDS6lItFBqIkeCMs0pvzCRZdLr0N1AOU8Ti/LagLDvChbKj6885kCSmLdLPRcaj5Jk2tM9AmqhDiWCNdO4kV1j3lwCCOpbryO+QfFPN1hmmBTdK0jNCi3uNngdOvbE4XiKwA2AaD0LNbutE9cfg0Wm1kGsnj1CpFCpEfmABmHa+ePteCxtvTNE32RmR6rfvjVlO31EXwT3zQ0niJjPks6uknA3H9FntfT65iTyPqHaeeXdI1eo0LrjsPjLNqUkk4JK0OD3IzaMe1mPJmnr0fy+ZT+r0jti7PH5TI/KsopmNEYrqZ5XVYy36eaB74sE3Wy2Qo5N981pJkylvQ28kaoSrHcf02OP39sXSSVZC3lliW4qr+BlLqqPTscJpy3mkEsFFG8yk6Yrsaj3owbjdffrhDHtA3Agg/tlN8V72Nr8ZEjSLIVA336lroPgnC9FjChCQjMEBIBY9APc5na2XbqeF3J1C7SP7840QWUBWN/PfBSQK0ZZxbAVd9BkphLaFoWVwxYqvXj2FZpxeGTeRHqZF8jTOLSWY7RJ/wCgdW+oBHzmLIu12W7HfnGU1eonkTzpZJWoIGdiTtHAWz2HYYrM0xiRFDUDY6+2Fi02kbw/UTy6hl1MZHlxAfqyhFGqxfVDdtUbvVyfYc4m92adjNnZjMwZ2cjoWN18ZIhag1UCLGSsP8QqQSLok5IVjCWs7boZmkYUC5Pvzkhdti6Kn+uR0OQqgE8mjh5EEX1MSxPOdlb/AGzsYz1OshiVmERG1eh7184LSIXZvUQK/fJiIkgbzPqvbjHdNCRDJTqGH6Qc0cqOpRvaF23owKufT3HXNHT6wyhY7VWC1R7nM0SEs7OaAFgAc5oxxxrAhtPNbkH4PS/tg+xrjexjlkC7tpByu9nR1fbvH6SMCszAD6VwMGXRVsNz7C+MizcKpYHgkEHnAaiBzKJY3oDlRfI6dMtpJHkcRsPT1DV2zQl8PdUIZLs2tG+nUY+VDjHkgGltpIi4vaOR75sLHGy21UearM/QxJ5yRyNYA5I7YzqZpYzQUsljvR+xx9zaKpAdRo01EgRhXUgjLQ+DlYgscsR3qzHzGC7a9z2+mUbW+ZG20BP/AFZWOWSmR5LBpuDm0W0ZSUWxiNkjCMyIzSRkFXU0hPFg3ye4PYnpmXq1d2ijVVegSzcmq5/YDHS26LYWtQe+AlMiIREwQyKY2K8blJsg/sP2zWD2YTWi+u/DmpTwP/rgeD8s0/lBA9PfvWYIUhUREjPqLElbY8dCfYVx9Tmzs3QOhk4HO09Pr9cVbR+hAnLNZzS0YygIMsPlsAjeZu6k8Af65EO1VZGjRt+2yVsrRvj2vocZlWSQrGxG4E0zNQGLk7WYgg3isza2dqSY9xG0hBxx/pnP5Mkc8wIgFgxQHc5IJ/Tu+B3PXGyqPpvSPUVBb65nSoyoGY8C+fbBy3Y2qBqt37d8gsG5r6AnpgPzDMQoG0A2DeGBYoG20O/1zHmmSiaRj6xYHxeMw6e9xHqRu7D02OeuKhd0gUHaD1Y9sYUEkhA1HoenGZuSbLRZgGiCAWbNA56/8IfhPxTw/VL+INXpfLi08ZeFJDTO7Cga7AAk/t74z+A/A9N/0+XxnxNUaNZh5KSJuBrjcR9TQ659DOri1yPp4nX+MxCi72gJf35v9s876r6jvCJrGFtNrR8N8adfGvxL4rrzGVE8zNGt9B0H9sxjCV2naQCO4rPaeIeGtpvHdbAYbYSuNqAsALJ4rngYofBdZ4nEE0Wjm1TXa+TEWN/6Z0QlFJFSxKrRn/h+ATzNGeNreZx3H/zm9JJqvDzPFG0rx6iEpLIxskE3+rqASBf0x/wL8D+L6QyT69E0isAo3Hew+tcf1zck8A0U7PpDrkk3KFEhXat9+hPT24HOYzzY0+5rjUXD9nkPB9TINfJHMAw28MwuvaiM0poS7JHZEasZNpJrf0uul0avHfE/w3ofA/8A+pTX+WyqyvFElFT0o7iaxfwzV6ZtR+XVpJOfT5gG4D5rjNYSjJcolQeqY1pdLNsZlX9PQe+NLuMShwdg52k8A+/1z0fh+k0up0TqSORSm6AN988541GdJA6admU3RN/q6dOLuwT9M2g09GnIVnI1KBFdFWNSrbEFtzfPue3PbjPOza6RH2mqXgUKsZqfmJpg2oGoYyyUG3VZbqSTz3vnM7WaWSOdpJLLE9hdnN4KtES2tEaaZZpxLIQAvPIxTxd9NOqrGLN8bOCT8nH4otO2jRz5izqTvVlXZt45u7vrYr2wHiPhmo8PniSaIRmSNZUFD1oeh69KytN7MntUeQm0jRqrmxd13F4EiWIMoMihxTc1uHBo+44HGb+pIiZEaECJ7YEqeQT298EZdOfQ0KBWoAhf017f2w4qXY5pYqYhotO+pL0pYkXXwO+bHgmnbTatzRMYUl+30sYKOYqXEYAiKg7itUP+DNbwEj83bwLLDJGUdWcrfPWwe3bJnFRgXjh+SM7xqGDVOuoG6MTAKADzX0zzUsCx2A5JHxV57LxIp538RACDdDkcZhz6dGU7qa2JF9cy42h5cab0Y0MpV7sk1QBzTMwOlKx7d1AHb04xWaBEZmgNgGlBFFh/jD+HNJp9S58qBgY2XbNGHHIqwDwD7HtiVxdGMbWhBlYJ168j5yI16nr7Y1rNrSMUNiuLNdMVeRYmQctft1zTlRnJUwhXceTWVrnLb+oI5yvfnrlNiJoEMdwFdsoDXIOSctKiKiMHBJ6gdsiQERKzK9EgBaoZWOR0fcoFA/pvJiYbipYruFWMM0CF7LlRyTQuhkDS9F4tT5zu1bTfCjsPbCNIXUBRg9PaqVNWAK47HvgJHZmYsLF9MRV6FSGEhPHfDwPEikyxNM/8ql9q181yfoCMqEvk1yavDIB5BjKIfUG8zv8AT6YkiEgw1ss6gGIKFP6UWlA/ufveWaNqJNA5WPULG1baQkWPcDHv4cwklEgIB/SBzWFGi2jMkiDTBGICMOpIsYq4KymOyFvgE5oyxqZgVWvST72cyp2kEtsK3cjE9Gc9FcmvTZIsdskC1sVnMB2Pbn64iCKs52SwoDOwA9Bpj17A8Y/HtAb1EYoqKm0jlCAbqqPtjccZcjbzjkztx9jm0u87kFcd++Mr4efyMmpbcGFBQDx+2HQBdttuYkn2zZhjrSAkAq3YWD065nzaOqOJNWefjV0KMVo7eQexxVAwLFyQSSSM2tkMkzxWSRybPY5m6uMCUtE7FVU9D0rjnKuxSjSs0vDoYwA4/SqirOdKHAUozkCyL4wHhOoV5V07foHXnvWbeo0hGxVXgjv75CdOmdMEpQ0YpjbSuk7EBm68dcciVdSi7h06E9sp4jseJYwPWGBUVZOLRPIsjPFEdqgBh2/5zmsWLtoPq449hu91lgK98U4NkD4rLtKa2kEe/GLh/wCYH5+mbRejGXcvK8itw20N1JHTLqbiNgb/AI6HOAExtRweQPjDoFDAC6Hz0y0zNo54IUlIknUrVhkU8nrX+MDqRFW5Ab5PPb/Q5q6jTjyE2lWZhZ7FczHWMORusH5ylIzoz3j8wgAAluDz0OD1+i8hAY1IZQN9m79804IoWUSuKO42pPUf8GTqRwixbPk9aGDZLhaMRCQ5Qgi+AL4GdqISdGViFuvLWOT8YfX3uBI9XVT0oYFZREHJkNnp8E98V+DJ60ZFD0iqvG1qLTqGXcXJ9NcD2yyxq84kIU9uRxWSzL+aK306XmVVslC3mHkLRB6DNzwbSJ4j4hBpXvY8io5HHBIuvnn98yPywfUIdy/qAKgHnPef/T2CNPH5RqpH0rR6eYrOFso1Cmo9ep4OY5ZOMWyo3tnsNFu0xlhEarppYVEIU+iIqKC/A6c+4+c0tO2l06xvKA0+0AemyK/mPsOeuTqtRH4d4pq11SCJBqWCL1DK3t8Gya+3bG4PybeeECvG7guIRtsV03V3N55U9uzZT/E8L+IvCtW/4naRUkRp/LaEhuWNAbgR0si/cZ7fw+GLQeRpvG9ZDNr3PmSRJaqg/wC5+aP1IFnoDin4o/EA0DKdFX5pIwsTNGP/AA6dOAO5PTPBJ4zPDqgIWMmoXdLJLJ6iXqt7E9avge/0xZZucVBeDaMZZIK9H2M+JaLXSeUmnj/KhvLaWQcH4A6n6D+mOarSeEqukjMSRNO2yGJVC7m2kjp7AE58j/D+n1/iz/mNTLqToYiZNm9hvoe/z/znNHxr8SvL+MPC9ZIW/LQallYg+kjbRofQn9s50vBlLA06i+x9E8R8N0gkgi1THZIfSpN/y7So/oR9M8N+IP8A6bSuJtV4aV/MxnciKaE6V0+G9ux6Zqn8SafX+E6bVGatTo9TG0vuqy2P6ML+2bGo8ZaSLSeIaeQB7fTunbcVLDj6qR98vHkljfKJLjkh3Plvhf4obQeHSaOWIM6j0WSpU3yDXTKya5ddpgu7dIqA9Sec78Wxw6nxjUa0Q+RM21nKLaShhatXYn++Y+mQ+ao5JvpnvYnGUOa8nXAbmg8tqIpb27h0/wDnGIzGNomgLIrC1lei/I446e33zW8O8D1viXh5nCbdMrHYzHYGqyzX2Arlv2zU0vhuqj8LVo9QYZm0/wCZSOKMDal+kkmzuIs++cub66MHS2yrivJ4/WQeInQvpovClSOScTrL+XYSKQCNqsedtHp8ZgaiDxDw971EMsYl9QLL6X4rg59w/C02oklOl1xlnSS2PmSF6NBlYX7gjO8a8D008OpOhSNZerw8GKT2JU2Ofeuvt1zCP/0pXuKowckp0fAppRNMnmyu0aLtUWTtHWgD0FntgZYonNxhqJoDrxnqtd4Vo9RqR5Gmk02pcsv5Zv0sw4pSTwfg5kLpVjIUryp6/OenjzxyRuJbwt9wml08LsGmScxIytqBBw3l2AeapfazxZGG0EKaUWqOfNdypcELGq/yg9HJDAk0CK+cX1NPPGInkK+UDKGXb6rsigTuANcn9hWG0+skjgMLTONNuMhQn07qotXvXGPY+C5WB8T03l6tPLJbfdkf3zFO13qwpHB9V3zmprdZHMjhdqh6HpPFD2+uYqRgC/nj3y1E58rV6IkKtuT/ALuMAIyFkRW7+k3z98I4Ck2ee15UABQ55HSh74OKOdspr9Q8sOmjMcSrDGUtEovyTbEfqPNX1oDE4ADKt36R2GPybGooSaA49sTigZZC7fNZm4/kmZtbC7dz0ODV2ThBCWA9zk+SQ97T80McjKkEkBSeAF9+1ZbHRnNGQRZ75QRu4LKpIH6m7D6ntm14hHpoZmeaHym4rRxSElTX87GyvvXLc9sz31MsymP0pCPUI0FKv0/1NnIbsVCgUc+r/fJ5Ki+NvxhWj7jp2OWg0pnk2KVB9ycQ6KRP5chbkrVD5ywj3csSLyyx9RfQ4V4GSGyaPtgNLQBVBYKEBI4vpecytwL4PT7ZeBSZL69f3w3lkkt/XGgStC8cJkdvTY7k9sEpKNak8exqxeOqTG9rR4ojKrNGsWqjfTK7yKvluXIMRBBJAHBsWKPveJoTQDY8s7na1laFe+A8uMm5ATQ6Dv8A6YcHf+onpxeBYeskDk98aQmgUztK6nYqmgAqisojNG+5SQw7+2MNHdEHnrzkJE+4Hi+uJpt2TTBce952dINjH27Z2SxHttRoYYdQY4Zd8e0EMORZxqILG3mCNGLLSj/tr/OW0YlTWI5j4VvUpHBA7Vjnik0k7vrItOgTyiSsKkKnPf5zGT0epGPFANLp5JZbiAJHVT3zVm1Wo0ehCvEu4ptjXrZ+uYnhPjcR1hjmbYs7KAxO0AdCL9+euT4rrGeaQLGHh6g87rvqfn6Zk7bpm0cq4WgGtkkjGnmVCs7NbuBwRdY4vhDxzvuP8OUDaC/QX0J74bwyJ9Vp1GoZZHAuEp14PP8AbPQ6jQFPDfNjUTNtG4jgG+w4vjrk9Rp8S4QTqRjafwrT6Vo5FjCupJrsx7H9sfRCRtE5ZgTyOCAe2Bj0SiKpGdmZdpBY0D2r24yg3QFVDUeCG7ZcXyN6rsjN1+hki1Esm09ihY89OemIIJoyU2koRYK8/TN+U/xHlkO7ncQT0Ht9MHPqyundtqtsFgbR9l+mbKVGUo3tGE0UqMS3Q8A31yoTc5XoB/XNoTwjTKZVAZ+SoN4q8aeaJAK983i7OeaoHpkZrAJ9PY+2MQxrsLccdBll27eOG9xg1fa9FgNxA5NDKIHEKSxlGBJKkUO2YepKx7wASa4P/PnN4wR7zEZUYEDmJrvPPaqEfmGVWZiODxjiyZdrLIwdkqhuYCh3vHEVXjLlaNkfGZAZomBBpx0x5NaQkakIz3RF81fvg2TFryU1GkLq5N9aCAfPXMqXSFLG8NxbBe3Pzno55F1eoIjiiiDUdkN7UHSuST/XnMuaJoy7MNy2VFf3wsmcU9oV0kQtL3KKPJH/ADjCSRp5u4EcfPUHjOIaJ3cqDG3RQSeuAlR0kDc7R364NkVSphYYo43DKPWh3KL4Iz0XheoWbXqIzwyuHBaty+W1j9gc8/AWc+Wtmzf0zR0wGm1gmF/wFMoN1ZUX/tmOX/DOuEUoNo+l+FeKNqIANQytKtC/+7j9X36/UnNL83/CKqdp67gOmeC8N1CJE7JMCI/SDfUDlf3BGaSeLMyCzTuaAGeYoWxdK1YL8U6kLIzBi7lhRPPQULwf4T/Dp1cEjS7T5ht91m/ZT8dSa9vnA+Ow+YsTxH1NMWPPTihf9Tm/4DBOPDYY9NrFiic+uRB6yOlAngH/AIM58kuK4mji1C0ep034f0saU8uplkbgEysij/0qpCj6Zkfib8KLq/BCumWp4TvUjvViv/1JH2GI+B6rxE/iWMRvqPyZkkVw8ocbFAq/m/p146HPdeZYB5F8g5nCntHFJzxyPikseu0LyNvQxvCscyMtg1R6j6WOM0fDvGdUs58Nn4ZjGUYnpIpNG/lD/Y56PxjxFtNM0Hieg0R0+1pNsEv8WNAbLBW/V0uh17Z5PxyJNB45oihXyQI5EdOhS+P6V+2VDejrU+oqGpF/NHUeHzqU1OlDRKG67QwZQfpZAx/8F+BQeIeKSS6uhotKhkkJNAgc8n275j6LUfnPGvFdeVtZGeYgiwFHS/3XHx4w+k0uo0IZQ2sliXUtwBt3bmFDpdkH4Su+dynKGFpBJS40u59E1eu0s2nTwjQj+FJFtlNUdhUWPjggf/GSkgGpl18ir5ZbY18BVTgfbqPvnn/wqz6uaXXEqY2vc56sxJND/wDYk/UDPVoYlXYtV7ZwJWceRcXxR57XeJw+FjS6rQrOET+E4MTqCg/S1kVY6Z5vxD8SyxeMSayKcx6XUqpU9RCxvmvhrBHcfUZ6zxDVpLJJAPDtTPGDTSABFJ+pNn6jPA+OaFtI08QjqMESp5hshG6j6gqMmMldHXgXJb7m14n4bH+IfCpZmQQzN6krnY4rcL9g10fY5gajRNrtPDqkXzJWXZPY538gMfrRB/8AMt/zZr+B+ISaXwiEu4fyNY6kE3aMqkX9rxDRa2HS6jUQSr/AMjKSOoRj/ghG/wDbnTgm8eTRrC9/o840LK5FBZEXnnqMG0EoO5Aps10og/656Tb5c0sroFUtRX2I4J/pgVhQh5btHYtuqs9xMqaPFamQrK5lTed5Llv1Fj1v75mEFHNGweeM9frdBHqNWJWcBBd993zmVrPDAWLAKtKRw1/TNLs4J42ZUsCLpdPKmpRpH3h4aIaKiAL9wwN39RgngaJnQhgB75o/9KDRmUuabhSSOvcn4y8gJRgjlgFABPVsEY8H5MejW2+hoZKoS3TjH9Rp4o9R5YlilpQS8JJWyAa5A5F0fkHKLANpIYEdrxiosw8qJgrAAgA7u+X100Phs8sPh2qTUAcDXIrKZARzsBooOa9z71xkaqKQoXaRTxfJvgdsz5AGIPau+RJhJFK3rsGR5ZHUffLgeUwYANR5Hb74w5892l2eWWP6V6DIexqNgEoij1I4GMRooHC8D1X2wsMcavQBY2QtdfrmxodLCshSYAgrwADRPz7fbIao1hjsygqw6cS7ACx5J7fGCkku1IokAgDNaaNYf/DbfQpBUSC7I7n98SaJZtX6k2gmqUcAfGKxyg1oz9PSsbHX4w8jLEgZ+/QDvjz6Py5AzoTJtth2+Prius0zpDE6KWIJCr9MOXong4oA+1oViEISRXJMhvcQQKUi6oUT0vk4q8bKVZuA14xAWM7PMxMkhN/BwuqYGRABYAo0euaeDPimrM4KQSDlytlAXUXfXov1wrepAOw4FZYQRvpy5cKyj9JPJwTIaoTAPmGu3U+2EkA3Gl2iv03lBYYjpZF89ayzEu249T1xokE6ggA2f652Foe4++dioKPqsmk1OqIcIsBksSlWsSxXxXa7Hxi8eo1/g0U3gis2qh1ILBQlkD3/ANR9KzVbXBvD41gIM6Co0ccSEAlhfvWeN0/4qn13jWjaQrCqOArKm0kVRBPbrnmR5y//AA9Wbiq5dws/ghj1LCKpYp5PQxShwePpfOB1uhk/hG+UA3DaSL5FZ7LTaqLyoVER82ZdzqDW09/37YnJ5Wr00rQofNBFq3IHz84KcrLWKL0Zn4faXT6Vo5RIZnXZEVXnnoT8dM9fDqUWMpMSeBfHH/OuIwLsk8zy13g2KHQ1XH2wsktoRfJ5JyJbdnRGFKissIldmjI29h7ZkaqN0cNfp7D2zWgBd2FnZXPOA1Ol83cFX7E9c0xumW+1GTqSv5YxDqw5zIdmRd0rkqRtomxt75vT6VhGrutE9R7ZmvoF1L8hhQ4AHXOuLRzyQjOH1DxlDx2o9BjsaMY+TdYXRaR5JCqg+WB34xkw+UWUjkHvml1oykrFRGRVc33yJIQ/WqxkihQGCPuRwPbHZFCnk+WAYyQfg5RY0WS5P1k8ntjDtwQvU4EEkci6++Fj4i2ohTZuKMWvg32zN5MoLcE9SPfNydA0fcX2GJrCGYMqdb698XLRlKOxXRMdPOWDEV3/ANsL+Z3kiUgk9fbDT6ZoUZgLLHk4mUI3NVKO9YchbjoJO0Z05ZmUOJE2qTwbuz9BQ/fA+JahYpZCkAi3sHVUl3oFI4onkgnkEnpxXfJEX5iJ5JJY4gq2ge7kI7LQ68dTXXCabQRtG0ki8hrUdsHshxeSWjN0+rMMxavr0vNw6qAzxMylwVPmKDVoVIYfWuR8gZlOskK6iISHyp2DMo6MVuj/AFOTAqlhywYDqT2wpS0zbHKSTg+w5p9S2g10sLtuVWKk1V0etf1++bGk1HmTrKAbU8f6Z52Rml1aOwXoENDrXT+lftmxppNsQa6pQBnJ02mGKT/y/BtCQSQtGrAmNgzD45uv7/bN/wAFDDRxDoAWBA7c54vS+ZGjyAetiwr7HN78P+Kkn8pLYLcxMTd/B+c58v0yk7NVm1xPd6ERxAsqAFv1H3/0x4zBQSD1zywjLztK88gJPo2ngD2o8f0xv8zNEgRZlkY8hPKG5vj0/wB85q4uqMJY7d2Zv4j8Kj8X1xaURHdGFVnrdGRfKk55n8Ufxdbp9NGLEUKRWO3JJ/oRnudYQkRlbiu3Xn2zz6wwJPB4jP5kkYclii8q4YALR4ND1cnnjJx4pdSonTjcaA6Dwo6TwPxB2NTmBRIh/wDxhpEIvv0HP1Geb8Ud4tRNM3UzKQf/APWx/uc9XrvGJDo59MsySCSV6cA8qx9QAPYmib6ECs8h40XRIFkNMZCWH/tAH+c9HLi4Ya/Y+L22fQPBfFk0ngvheigheWZ9OshCkBRfJZm7ck9uc9JFNuN39ec+feAzf/xsBUc1tY++3gf0/vm/D4qy6hoQhIjAs+5P+M8yN95GeTD8T0c77h1zzn4jhDeGPJVstD7E/wC2Fl1CzW8igsBxXb6YDxLU79NseiK3Nfeh0/fNVjU9k44yg0eL0+oaPSa9CekwW/8A2sB/jFtVqGXVMLrzVW/7HBa91i0etZXN/mUrtfo5/wA4trmZm07DqY1J5+c04o3cqN9Nd52mjdrIkjB/9wsH+oOKmdt3liSlI6ewwGhYjTTJtvZqGUfG4An+oOPJp445EkkG8MvHtnr4ZJwTDlaFUZWRyGO1WNE8XiE3rEYRtq+q6BPGPeICNR5cThIyP0nqp65nJtMbxvdMeQOv2zZPyc8/QtIrtOytQW7IHY/GDdTGrdx0xhAm/oSn+ciSLepLDcQPTlNmDRnJCWdgOAOTjbRqkZpaHWstp0p2FEAcEHucZMVm7yJSCMdCckDI7RSKUdTRHHB9sG+mSrWNSepHvj4hB42/sMhodoyeVhxMN9M8U7IEFXYJ741FGlMrKd4Nm803iOrFtJ/F9weSAOl9skqiaf8ALpErMXDeaT6ulV9MhPY1CtiMKN5qpH2N5qopFe473gdLEDKRVEis0YtMWmVHBB7jvinI2xxFJ9HJO8kyfoq1DHmh/fF9FA66qMkHk21jtnolESqSdqurbBQsm+/xgUX/AMbK7ddoAAHa8w5M26SuzvyzJEFk2m+RXtmF4jpvNl1GrWRHjTaAi9Rm8quJJJDuMZUlAv26+2Yes0s7aidWPkb1DLEvAJBFD/N44snKrRgSo4k3sSdx3c5C8WKqumaT+Hal1WR45AWagCDZ+cCumLDavTuazXkjicGmLugMCMHWxYKgcgfPv1xeTaegIN5pnRrCP4gbcVBA+vTKTxRGFWF77NrX7DKUhOGjJaBpAG4PN8dslUAFDt1565oppmk/X7dBg5IFT9NH4HbHyVmXETAsVX3zsMFviuBnY7FR9k0nhuo00B0YZSrxus5VO12PeiP8Zhy/gyBi0yASyu/migV210+1Z7iOMkM/A4PHcnthFQNAfTsO2qXgjjPB60l2PSk0+6PL6DRnT6ZQ4DvVhgv6R0AvvjWl0WmiDbkaIleWRbs9vtmwNIgl2RgojL6gDY7Ef5wRgYkwbN8qAG+9G66fvlLKbRmqMT+Ygg+xybZSCLBHIPtjhjSJrPWtvPfLxq0bAuAy1fIs/TNbN+egSRbYldhy5sse+Bk/V15+ma4dNQL20nSmHQ5mamNoZTu5B5B9xlQlboiMrYjqoWcKAARfNnFU3r6YyAov1VwfjNHUkqtAWas12wJAEahVWu9fOdCnSE42yPJaLRpqTLAzSrexGt0FkeoVx0zNa2ktjf0zVMccTsiOhQXRUEbuOvPOZrLuUuhW+4Hb6ZpCaZm4uijR7eDzYxfVubs9T1IAH9sK05LAGvtl3hWRS1XXbNLruQo7MzYfM2nrV5ZU9TFW/wBMZOnLTILPPpAxiXRBY0dVAN03NDFyLap0ZrqWY37e2FgiK+oMQaIv4I5+2MFAHJCgXl0jZhQrI5EuOjO1KnY6+4rM4oy+hi1H/lZ6BY5bKFeW4ur3D2H3GC1kMR2qEKuoO9ievPHHahxhyIaMwoJoYIyOVJBo9s1tMQFkCJGhYMCEQBQCOaB4zLYeVJfq6UPjnpmhDpXFyM6q57EWQD3x8ioL8rMXWwKPNsS79w2EAbSObvvfSvveZpDRSMtUvArNiffJOqMeVNhv9cF+XLs3os0WP/pAu80iyJxt2hXRaSSeUttYohUO6kWhY7VJB6jcQPv2w2im8xAjWD1Hz8YULsimRNw81DG1HqDX+QD9hjvjn5OXXwavSyKJJ9JDPqEQemKcrTCxxZrcR2LVg/8ARzT5Qkv2Fb+FFDGP1s4P+Dh9NoXO7YPUrV1+bBGKxSGXWxMw4VQxzU02o8uYD+R+/sR74NGrpu2G0/4jGmLQ61XLoaEkYsMPnGU/E8kke/TaR9hO0PIaBP265mtoUGo810jkWjywBo/TNbSJGWWXUOCqcIjc0foOB9BnJKLujRNPwPwwS69FfVzuxP8AKKUL8CumaB8N1Oo0cuhEkg06AzAKASznoQO54IP1PfO0eoX0uiKqHhSV5PzWeliG2ME9e99cwlJp6MZScXZ8xPh+o05eOSQBRUjEG1oEbW+nq/rnnvxFAVWLaCW81j99t59D/FmlCyQ6ihVkA1Y96P0O77EZ4rX6Z59JvJZpUIkojrXX+hzryN5cPI7eanCwfgHiC6WMeaagkUNdXtI4v6cDPVKY5VEqOGVujIQQc8lDplhKyIy+SW3EVdA9R9D1zRi0rxyMNJKsK0CWj2gG/cd8yhjtbRm5NHoN6RqXJAVRZYnp988/r/Eh4jMmn07fwSfW/dh/gYSfSNLBtm1Esx77ug+ijjElgTR6Kan8x29O4cX8DCUa14Lg13Zh64rLo2DE2zmU1+wxSEPqdfpkVgB8mgK7/vmjr9DNFDCpX+LqGARB27AY74V+G01ni+m8N82hLfnSHpFp0/8Auv8AFm1HznN27mWSVbDNo20vhWldztOqlMzMeSPTY/8A+XX7nKnVbWEC8mu44Az0/wCNtLGo0/iOnjZdGrtCUYbTGT+k/wDpYLXwR9M8QsZ1GpkcWoXuOa9hno/TO8aJxzfFewsm5JWO0FNt7m5rjAz6fyokYPdGlAX+5wzuEYRuoKn+3vWROGlfyUYKAB9/9s6UxyoXhgklV2UClu7OSUK1Y6jNJNKY9Oy7yAwoWOLwM2nKS+o2D+k1icxcKFEiJuls9eMuExhYyD7cYWKAO4AHazmbY0haOEv0oe5yWjjAIdtx6ADHWURx7VUhve8XXTGS9qklRZrIchxgZ6XHMNkXpbgk8374SWOWdRtUWg2dgau83NDCEWRnQV/LfTAR6aSz5qiNjZah0yepbL6dKhDTaUof4m0kj9h9cd8pydwYWD+roc0Y9JD5W8OGFWoNi/rmbMoXd6gdv/OMXO2VwpFd5jayd25eR3HuMNp3WQlPLAFAsb7/ABgirxwoksYG6nViOaP+MLpNGzyiQkBLoN2J9sbSoabsNMxXTzbiF4PPt855/WySzB/NnR23MjKByB9fbPV6mDyNQ0RdHANbl5DZj+K6GMwtqVWyFCqkY+e9fGQqQsitWi+kMbaGERtSkbbPXd3/AM4vqtPDp4g0KBOdte95oaeMRRIm2lCih7XifiknllEChywB2dT9T8ZUdsJL8dmLPpxEiKrer+bpRHv8YkiAyCMCwD17nNbVaaWRmKslHnnjDxeCSJHFqPSy1uN87j9e2XKSRyyg2zPEDNYraq8j2ORLovNi8xTyKF1Qz1CeHrHMss2mZwq1tViAb6YDT+ETTyqgjKof5mFcfGZLKu5DgeSm0ciRrII7UkqSO5GdntpvBRpyFUWT1+c7L6qYdI+gQqYyG3AmuO4wyC7uuepyUhGwbQNxNUOp+cDJIY4FaIqzrwVH7/2/vnmcV6PN62T5MmZWi1IRCtjuGsH04cgiMup27eC/UC+ljMyeH800czsW3knbfQdvv/pj+lBbSFHjKG6uuT7YcY+g62T5MQ1EbFWGqjQNXpA/m/8ANg/UIfUFI3G6FFhmo8MUjASxm0U7dp/Ua4OZ9sGKmwb5BHTK/Q+vl+T/AKLcxsNptT+2TLEJoiGBs8j4ONtCCA1Db/NXvkrGA9HoeMB/cZfk/wCmLNpWKBSxBJohcq2i2qgCkcfv/rm3PCqlHUc3TX/T/OLuV2MWuxYUX0x8n7D7jN8n/TAKsTSj1X1rplPyaeeYwTybrteb8OmT9YXgnge2DGnXzmIKg36SRj5y9h9xl+T/AKee1OiferhVC+2Fi0rVz0zTnTfO/l3tuq7Z0cYvrj6kvYuvl+T/AKKrp1UKa9V5WfTB49oO2jd1mgIgXC2AD1J7Y4+n08enJj2lq4Lc/c/6YucvYdfL8n/TyRXa23m764ZEaGMNJC480XG5UqGANGvfNRIY9VKsIZRKwYl3O0BVUn+p6YFtPPNDpkMryLGtIGY1GL6C+gvDlL2HXy/J/wBFNrrUiMySKbQhqIPuD2xaSEsxd3ZmY+pmJJJ+Sc9BqdCRBphsVX5Dbfjm8D+QBUFr63hyl7F1snyZ5s6Sm3gFjdUPf3xptJLDAZOGauvxm0uhNcgVfFdbwjaQzQkDrzt44v5w5y9j6+T5M8VJpvN1A3Em+SR2xw+HGUJvXbfRquh2sZtf9DP5xV2MI0JId+GcdiRdD7f3zQl0wWCP09Rz84+pP2HWyfJnj5dA0cZJWvv1zP1IEjjZGke1I422CgxUEbz8ni/c57p9N/AYtSof5j0vPH6pQnicsKqdqhFIbrewf5vDqz9kvJN92FU7I7qz7Yx4bIaIkF3/AK4Bl8p4zdq/pPPQ9sbhhAlajx1Pxj6uT2w6s/Y8yiNlCAevjpj+j0iRpukW3+ew9v8AXFoK/Mxg8gKeo6ZprwPjvi6kvY+rP2y0E5k1yJ/LHR+/b+nP3GeiTXb1WOCmI4L/AMq/6nPD6B5NczMCUidi5I6tZ/sBQ+c9TCyx6eNYxtUHpkttieSb7sj8RTKmgUcyGyxHUnjj+ueLnlkiaJtq7XX9O3kc56rxHUGQgKbTaGNdz/sD/U4tptJuni3LZLAhT7dcanJKkxrNkWlJmBL4RqtG2/TqZIHZgNvDLyeKP049ssNGkTK7OQ3auCD7Zuy+YNF5dssgdmDA9yTX9cxZfEpmo6kB0HT0gEHDnL2PrZPkxPUPrA58mYBD0tQSDk6dTKiHaXCWBZ73yT+2Wkm2Teay3Eqk7fcn/n9cvppmliZZaFtyFFdcHOT7sXWyfJi+oLSaozbgvlrUR6Gz1b/TN78JxJphqHAFtsWR65ev0i+ygVQHfk85namECNmalND4Iyuj1s0UKwab0X6i2SDy5H3kz2HjirN+Htcjcjyi/HPK0w/tny7SFWeZWY/r5FcHtX9c9zrNcX8N/JQHzXmjKglv1bgwJs9+v9s8vFpo4VKxnh/UCebyozlHswWWa7MRcGW0NgG7O3t7DBMzLIUlBdQtKbr6HHp4W8u6IUcX7XgfIaTUIrhgAOnWx8ZXVn7YdbJ8maGjEkkIdyKv0gdhnPo5HcAMSl16uT9cf0emEMW0d+ecKVKEUl80eemLqS9j6+T5MUOl00ELF0LM/C2emCOnGnUMrh93BI7f8/xh9cd0wW/SoFDBBOVAPHWqw6k/Yutk+TB6hSQCVbrXTplYoEln2xGlYXRJ4HzjmohYRpdeomsjS6OYyJI6FRu78E4ucvY+vk+TGIkVKSuBwaFA13yI1ZjIJQtP/L8f742IiSPcD2zmj9SjaTxycXJj+4zfJ/0ydSiRRsCT5m60o9B7fTFFifVOQ3qN2Wbt981dfACAw4F0R74tNAoiQxo+4KQ7Eggm+Kx8pew+4y/J/wBM1SN1Pxz+o9Me8OqTeAFPNhT0HHXKjRO6bwwBvuL7ZqJCDFGtj0KApIF+/NYc5exdfL8n/SywKfSy0wq7+ntnPoeRtNEijtPXLeZtbkVt6Fv+c4f8zaIjbWUDih1vrz74uT9h18vyf9MqeMWaWmrkVQzD8Q0aSqSF8s9Cw4Jz2cmmM67qRSBtU3/fMbU6UyFtwG8Hm+hx85ewefI+8mZnhHh4ni8ucOyFiptqodv856fReHyRkFLeECuf7HF/B9FLHMVeOl60Oev/AC8914NptOTTFVtCF3Ghu7c4OUn3Yutk+TPPJ4cJofLKEJXI7gduf7YRtGDIFAKlefseM9S8UEaOFUA9Ao6DviLab1bwBffJDq5PbMKbQJM1ngD0+/Izs2Y9Mzbto43HpnY7YdXJ7Y3HpQqciyeowUsITy2LRxovpNL1+Wrr7Y5GRuBdbW+fp8e2d4kkLyMYQyxHqDdj5xGYiNOGeN1ApSeKHX4w6ABiuyq5sjJjj/h7VpaHpw4jIQEng9Ce/vgAnr40EbAA8AFSPfEDppJHdkVdqKDyQDXwO+bTQiSNwwteLN/OUkiRY1bbVemttg/N9vpgBlxErQIsDplggZAxBZdxB5okfXHZNKFUMCrAjnb/ACnpRy8UTyFzIWfkC2PTjpgAk8O6JuO14jFpA7KwUlRz16/XN9oVCkVxXTEYIVi/lPPPOAGfJpTGh2MVHUi75wcWn3tytHrmzJCNpYjnoBizxeXbEmvYdftgBiyxkTuDQ5yEjUdCCb98NrmWViwTqeOK/fAQKyyhtt2duABGj5uvvlYFi89PPB8uzdDHIYGmQN5bFSpI+QDycPrtAdEY0cAKtSMN3I3CuD71/bADMgggk10skJIQAgAjqp7/AL5EWmRCqrLwKBJIqs0NFot26R4yoDHYxYjizQrGZNKDCqK23c1EEdeuAAZIUeNmBvi1PbACEutkUc1ngDx7FalFAH6ZbT6MtCCwH6j3vADIWEpbNEHAQttdT6gbHH7cfIzW0PhX8NRLHFI7MNh54Ht2HPyMZTR7dQu5KPAPzj1rZU8kdR3wAzJ9EwMgkFhbOygaNV/jEn8OXyDuAoUCL5+v07ZuFSwKBG3HgADk/tiupKra2vBrqCMAMI6TbGyHpZo18Z8317+d41qXAq59pAHSuP8AGfRfFvFk8N0jvs82uNt1Z6/bPm+sSSPVtNIu15JTKaPHLWcAG9gk02xl4uvocZ0hVmAYEgdX6YLTLU5VjwwsY1+SdWu+Op5wAa0kQEhckn2s9MnxCRpIDp4moy+jcO198rEGVSHJK1wvzhYYS2oj3cgEub9wKH2FnAB3TwLptMkaiqUD9hj0Lf8AhyKJN8AdTi5Bb641ooWZ3PUKvNDvgBBiXahoEv6uGsGsZijESec9WAW9ux/+MXhi8uVVY3HfVQLHvV4HxbxCbS6CRkjR62qA3cnoMAFY5/zmi3uD5y7jwOoJv/P9Mx5/DvOjllfcFBs0DyewHuemez02h/hpJIdzlRx/Kp+Bi82l/wCpS/lYaWKMhpJSLo9gB3PxgB5SLwjUqygyROQOF5NfX74ynh0qjdJtjP8A3Ib+/vWekj8Bh8PicaOWQ3zUyqNx/wDb0H3OYcczeKN5PkvFKgIO79KEGjfe7449uMAE4o9HKuyRd5biQNbBWuv1dxf9xg9ZovJjZYVv2Iux983I/CNNCrbgZXYUzOxHPuADx0zF8YebQvp0ikYgoQd9EGvf/X2PxgBmaOU6XxbR6aeYtIuoRmPuLBFj7n7YVo2AMYHqU7T7CuK/fM3xNtvjXnG0VQnThv0nNuaE6V5otwMquVLD3B/+cAFkVqplBWz2745HpnZA6gkXX0987SI4fe3Cr09ifjGhqdkpjUBhwBQrb3s4AWKeXWwAqDzZ5+2RJp2kAVWO6wb6d8vsCNy4kJ6npzlhK8cpVTQ784AEh0aSSNa8laJZeoxuHSoFanUcVtrBxTPIA+08jkjGtHGzryeA3cYALReGhJBIw9LA2jDuD/bDvpgkNKoG3kAHpmr5DMi92468nBrDuYleNvUHjADKaQBhGG2s60V69Pf2xdWjZ+CGtSRtPObs0GmcsyRKshbhutn/AExOTQfw5AibXA9dGxXbnADA1ro9oB6gaHpxeZZFHkbiGsqVHNkfTNXX+HmKBZnikXc+zeo4J/7a/wA4XTeF+ZpC0cRZ1k9ZuiAPYe30wAzoNMViCkGR65HUCvtkqCLKjt3OEd5dJOQkmx14BT2we8H0joR+2ABNqygIeSe3SsnyXhFOLQ/o+T/g4AhlmV15ZffNdY4m0sJ81S8n6h2wAHpdOX2lSGXkkkdPgjNaHwvTSoGkAaQCvUOP2ztDpFVRQ6G+O33zSSIEc2rf9w6HADOHhKwM7IaDkFubw0Ykiaozd9814UJVlkv4r++V/KBX9A+57YAdo4zqAdxI29ffOaIicjigctpwyswU2zcisY8khwCOfbAAMelYJuBWz7nOxrywFr+mdgAntJYG74/bOYCQEckkgVXXLNSqCOt9e2dtkREcD9R4ZSbXr7dM545m/B3fZr2KM50vmSBAyMAFFVsPT9umMK2yFfMKWOpHAw21mBVjvurN3ycBqIJDGygcE9D7jqMpZW/A19JFunIIVLBqAs9LwiopILoDXazl4o38gGQcDgsBQGMCOxVAc5LzteDN/TxXkVaDc5Pp47Dp9sqIhyxx8xLfBAr374EJXXuKo9vnHHM34JWBPyB2htx20D0wDwg1fJPPH9sf8n0/ByPJApvbLUx9CPszp9ORC2yrA6HocRVJXXbPGLI5YdPpnpDCrKQRwcANATIFNFTdmumHUXkFgh5Z5dtGNRqvJiVykbBTY4HxfXHl8HhKyN5fAvkGxwO2ekGjjjj2ooHb/f65R9KqwiKMKo4ArjjIeb0ielB+TG0kLx6apFJVY9pC9CSecPrdIk0BKpbsm0WP1fXNIwCqA5POCkUJQFkk9cn7h+hrBF9meUgcxTCGVQLXcB2Hxf2zQjWOXUBLAKqCm7oT71mnP4cmvAjeMhls7gMUg0UmhmjV2BQsArlf2+/+2aLKmivt4exldAP5jfsBxjUcOyPaBx2vJ0c3nRFnIZ1Js1XHbCuSV5PNVmbztd0R0f2ef13iPk6kRqx3FNz0e5JofYVin/U9WdQPKOn8vig5ayftmRrpWbX6kkUfNYV7Vx/YYKMSN6weFNjnqRnQrOlfQxavkemfVyhD5tCPuYn5X7EcjMzxF9RtLQakedH6tn6VlTsevXqOK/tgfzZrg8HM/Wl5IWRHNAEr7gEcgfX+4y1G2T9l+xHxa5USI6cR7judC/Kmu3NEZmeLQiWRto22vBN8c/6Y7PIdTp40nAVgi06fqDAdfnEm1Ebl/OcPLwDt6V8ZtHBb2yX9KvZTTaUoEkW3jHFH9QPuP9M0iAYgwcFehrt/pikGrUyLGqHb1r5xt9VDuDEK5A6Ee+afaq+5P2ya0ykrVA5DBaXjmsP4fKJVJLevpWZmpnRi24KsY5qhx7c4TSuE2NRAuwOmafZKu5L+np1Z6SNC1V1zZ8MgZdPJtHV6J+gH+TmTopkOmZ3oMRTEn9I9v2vNHwrVeY3krpXkayWC87ATybBAFChye2c88HHsyHiS8hJIZRuWwUdg3CgURxiPienSYxPOw4k852PxZJOeog0mm1bvFBO8rRmn2opC/U3Wee/GPhcSaKTydQ0kg5LJ+kLXKkX1738VmcIKUqYljTdWZ48b8zwx5VFeYahXvV1f/PfNzRxx6bSooNmrY+7d/wDT7Z8002sYSicLaaWgqk8WBx/k5t/h3xgt4S8MsoMsczhiT7nd/nNZfT06TLWC3VnrNTqlUGznmI9VFBr/ABN1HMkym/8A2j/U4DV+MRFgnm7nJoKMzFm/i6kvwWKv/Sv8Yuh7ZsvpF5ZqS+NsrUf6ZieKa9dTJGsjUQC4rkgDqf7YCeeF/wBMgYjn08nPO+K6hn8fi8ossMMXQ9bJvn9hiliryVP6OEVfI2NVpppfEm0zKJNQ+pWIANw/fg+xFfY5t6iB95nsvvJdm5uzzmZ4B+II/CfHNB4hrNOsyIFhkYi2QAFd630YALz7KR3z2HjOgh0Wq8RCglY5n2+q/STYr7HMZfi1fkUfo1KXGzAikdUHJKk2B2Jx2kkYOECtwTQ9umVEAWqFKeeThQPXtAw0+xb+gS/6C7owgcvTXyCOg+uWmS2BAteD9u+WjQGVSRW6vT1zT0kEck4BRWQNxfN++J0kT9lH2K6NCzyKlgBLN8dc2dBAyMrAEq3Tjp75Ph8CIz8EngGz0FVm1pIFjgajuPVsxnl49iZfSRXkD+XR13UD3Bvpg/LDemT0seA/v9cZQqJXUfp+R1GWZFdeeQffti6z9C+1XsRfTiKPy9p62ebsfGEECGJl4HB9R617ZL7xKUdQY79L+w9vr/fLIC77RZPftldQf2i9mXptMmliaMsJIxyBILvFdXqEgkZYTsLLtPSiPpm34jpLhVo2C2QCTzmBqELIABTLwTXXNo/krKh9FGX/AEZE8bSSFUXaRwSTyfn4wBidSObrj4zTeAyelRwOWb3xhdKteogPXp475TikaP6CK/6M2G4nYSqj7gVVT2+fjNCDQkevg9iB2y8ei2KWc2b5Pc5paOJpCdq3Qs12rIdIiX0UV/0E006xLt8sKlfpv4zRiUSqCvN9xgDEB+oAX0vOiWSKRViPVuaoi8lt1oz+0Xs1IINqbSP9sMYfRVH64ZFuNWvirF9cKVpeRnM/qX6MHiXsSSEIQ4/UP6Zceu+DfvhCjAbhyO3GXjSlthf0xfdP0N4VXcAVBNAfbOwjKrGyLzsf3P6H0V7EnXdEqO3oToo+f85Onh/NagQtJsIAAodQMsR6PrlWJSVZFNMAKI4yYP2d1tppFtRpxp5zEGDVzdZQw+atAesfpf8A7ftkqSW5Nk8knG4f0n5xt+US5OK/YoYWXUxyUtng3f8Azpj6KD0yWQWMvHxZyG7MZztFCtXlFS9wv6YyQMigDjiZ8gWylrKMhHHY9DjNc1lJVBTNExqWysS0vPbDpGDZzqFZeIdTfXE9ozlK9lGS6+MFNFuEZA/S4JxsgZQgHtmbTQoyaAeXuUngVgJUUj1naB3rGiaN4CUblN5BpBuwBba4uwDxxlZtOOGi2s9gnd0/4ML0Cn5yTwThdGt+jPRjFEFRQqtIdxHbnnHSedvfOJvrgxfnRjca5GV/pj7nlfH9E3h+sOqVd0U9b/ggVmUJVK2lV8DPd+JaePV+HTxSi1KE/INcHPm0JIVjfUAn+2d+GXKH/hvik2qGHkoYpPqljUljfsPfJkY7Qfe8zdf+lD3JPObwR0LYlr9c62saqAbq/wC2Yb6iSN/NpuBTA9/g/wCuauqUNA5PZb/rmS4B07MeTZXnOqLoxyrejX/Mxro1eEhmcWWPYe2cmrJiJPDGhZ7jMjQ+iaXiwI9wB6XWAk1UnlitoIF2BnRB2c7yNPRrvPciR1dnc1+w/wCVmlDOJH31Q9s8/pP46NLJyxO3jjgY/ppXLspPCnjNn2IhbdvyaWt8ZGmligDHYPXLt6/A/wA5v6QavVwR+ZLMsR9XkxybAL/7q7/uc8HpD52u82T1Nv7/AGz02n1Mq/pcj75jNa0CjzbZ7MarWw6UQDUiDT/9mnHX5LHkn7YtLOrRbHkeQf8AnazmTpdXM52O24VfPOU1UrrMwB4zl6ey440jzniKLH4lqI1JKGVn5+cQjkk0i6hY32NqAGVv+35/bHvFDWv3d3QE/wBcX8TbytJogoHrVQ1jsBf+TmzWi1Gm2LppYY1WSUbm8wAsCSzH3vBeI69GuAFiCi2W6NxfPes7TyNLqYt5vYyqP75Z9NFN4lOHXgQkivgDOdrQoptWjz7oYm80GienHTOErSyM7XvYcn6Vj/iqKksiKOE4H7XmdpwCGzKvyonalxNwIh00QfaQ6Ww+tHPoGi18niXgemnkRW3KqzPf6ytr07EhR/fPAaVA8miRrplAP/6nPTaH/wAL4f5Uf6Y3ZVvtR/vizQ5pHfGN7HwpRiSFD8XXXp0OGjQWeK98BCTHDQN17j4/3w0Rts50W0O6YbpVpbA5+ubml05jgBMYVm5r2xDQqBxQI+Rm4vJF/OYZcjTowkWgiGwqAB3uupwge1216e/HOXiUITX/ADjByjYARmClsz7nb/UCQB7c9McRd/KWb6j5xGIAtyPnNCEldUwB4Iym6CWkL6iJxSmgxP8ATAoQDu3EEHj5x7XIqHcBZ+cywAxa/k5pjdxHD8kWnmEtRIAG38fGCbR798II3uRTAdPfGvDAHllsDgYx5EbW1UVcAV85o3xaSK5cXSMYaBop2iUAjrvbgHKz6J9M6BxuJ5JXms2FiUrXP6z/AGw88KNEbH8lf75PVadMHkpowTGxAAFAf0x3SxeXGeoJ49PQDKxD+KF7Y6G9IFDjNW9Cm/ARIDKFG3r198MfDvKIkRgQvJU9+MZ0irV1RvGyoP2zneSSZyTytOkJ6dydRwrhWQEKewx73NWRgYpGMTMTZC/4wsLFolY9SAczydzGb2Uo+Yb6DoBlxGK4y4Ubryy9KzAhyFXUI3HXvnYWbsO2dlGkXaP/2Q=="

/***/ }),

/***/ 17:
/*!********************************************************!*\
  !*** F:/projectWeb/YcYsItem/MobileTerminal/api/api.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getLogIn = getLogIn;exports.getAllList = getAllList;var _request = _interopRequireDefault(__webpack_require__(/*! ../utils/request */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function getLogIn(data) {
  return (0, _request.default)({
    url: '/user/login',
    method: 'post',
    data: data });

}

function getAllList(data) {
  return (0, _request.default)({
    url: '/user/all-article',
    method: 'post',
    data: data });

}

/***/ }),

/***/ 18:
/*!**************************************************************!*\
  !*** F:/projectWeb/YcYsItem/MobileTerminal/utils/request.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var envConfig = 'http://localhost:3300';
var request = function request(_ref) {var url = _ref.url,method = _ref.method,data = _ref.data,header = _ref.header;
  return uni.request({
    url: envConfig + url, //仅为示例，并非真实接口地址。
    data: data,
    method: method,
    header: header
    // success: (res) => {
    //     console.log(res.data);
    //     return new Promise((resolve, reject) => {
    // 		resolve(res.data);
    // 	})
    // },
    // fail: (err) => {
    // 	console.log(err);
    // 	throw err
    // }
  }).
  then(function (res) {
    if (res[1].statusCode === 200) {
      console.log(res);
      return res[1];
    } else {
      return { data: { status: 'fail' } };
    }
  }).catch(function (err) {
    return err;
  });
};var _default =

request;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!*******************************************************************!*\
  !*** F:/projectWeb/YcYsItem/MobileTerminal/static/image/nav3.jpg ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    } else {
      console.error(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 26:
/*!******************************************************************!*\
  !*** F:/projectWeb/YcYsItem/MobileTerminal/static/image/ad1.jpg ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 27:
/*!******************************************************************!*\
  !*** F:/projectWeb/YcYsItem/MobileTerminal/static/image/ad2.jpg ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/ad2.c32ec208.jpg";

/***/ }),

/***/ 28:
/*!******************************************************************!*\
  !*** F:/projectWeb/YcYsItem/MobileTerminal/static/image/ad3.jpg ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!********************************************************!*\
  !*** F:/projectWeb/YcYsItem/MobileTerminal/pages.json ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@alpha","_id":"@dcloudio/uni-stat@2.0.0-alpha-25720200116005","_inBundle":false,"_integrity":"sha512-RZFw3WAaS/CZTzzv9JPaWvmoNitojD/06vPdHSzlqZi8GbuE222lFuyochEjrGkG8rPPrWHAnwfoPBuQVtkfdg==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@alpha","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"alpha","saveSpec":null,"fetchSpec":"alpha"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-alpha-25720200116005.tgz","_shasum":"08bb17aba91c84a981f33d74153aa3dd07b578ad","_spec":"@dcloudio/uni-stat@alpha","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/alpha/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"a129bde60de35f7ef497f43d5a45b4556231995c","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-alpha-25720200116005"};

/***/ }),

/***/ 7:
/*!*************************************************************************!*\
  !*** F:/projectWeb/YcYsItem/MobileTerminal/pages.json?{"type":"style"} ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "首页", "usingComponents": { "yangr-msg": "/components/yangr-msg/yangr-msg", "top-bar": "/pages/topBar/topBar", "uni-card": "/components/uni-card/uni-card", "uni-search-bar": "/components/uni-search-bar/uni-search-bar" }, "usingAutoImportComponents": { "uni-search-bar": "/components/uni-search-bar/uni-search-bar", "uni-card": "/components/uni-card/uni-card", "yangr-msg": "/components/yangr-msg/yangr-msg" } }, "pages/class/class": { "navigationBarTitleText": "分类", "usingComponents": { "top-bar": "/pages/topBar/topBar", "uni-load-more": "/components/uni-load-more/uni-load-more" }, "usingAutoImportComponents": { "uni-search-bar": "/components/uni-search-bar/uni-search-bar" } }, "pages/mine/mine": { "navigationBarTitleText": "我的", "usingComponents": { "uni-icons": "/components/uni-icons/uni-icons" }, "usingAutoImportComponents": { "uni-icons": "/components/uni-icons/uni-icons" } }, "pages/login/login": { "navigationBarTitleText": "登录|注册", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/details/details": { "navigationBarTitleText": "详情", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/person/person": { "navigationBarTitleText": "个人主页", "usingComponents": { "uni-card": "/components/uni-card/uni-card", "uni-segmented-control": "/components/uni-segmented-control/uni-segmented-control", "uni-icons": "/components/uni-icons/uni-icons" }, "usingAutoImportComponents": { "uni-icons": "/components/uni-icons/uni-icons", "uni-card": "/components/uni-card/uni-card" } } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "uni-app", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!************************************************************************!*\
  !*** F:/projectWeb/YcYsItem/MobileTerminal/pages.json?{"type":"stat"} ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map