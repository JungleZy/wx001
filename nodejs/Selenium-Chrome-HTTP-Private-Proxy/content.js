// var s = document.createElement('script');
// s.textContent = '(' + function () {
// 	'use strict';
// 	Object.defineProperty(navigator, 'platform', {
// 		get: function () {
// 			return 'iPhone';
// 		}
// 	});
// 	Object.defineProperty(navigator, 'vendor', {
// 		get: function () {
// 			return 'Apple Computer,Inc.';
// 		}
// 	});
// } + ')();';
// document.documentElement.appendChild(s);
// s.remove();
// function injectCustomJS(jsPath) {
// 	jsPath = jsPath || 'js/inject.js';
// 	var temp = document.createElement('script');
// 	temp.setAttribute('type', 'text/javascript');
// 	temp.src = chrome.extension.getURL(jsPath);
// 	temp.onload = function () {
// 		this.remove(); //执行完移除
// 	};
// 	document.children[0].appendChild(temp);
// }
//
// (function () {
// 	injectCustomJS('x1.js');
// })();
var codeToInject = 'Object.defineProperty(navigator,"platform", { \
  get: function () { return "MacIntel"; }, \
  set: function (a) {} \
 });';
var script = document.createElement('script');
script.appendChild(document.createTextNode(codeToInject));
(document.head || document.documentElement).appendChild(script);
script.parentNode.removeChild(script);