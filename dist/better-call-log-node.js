(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/BetterCall.ts":
/*!***************************!*\
  !*** ./src/BetterCall.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BetterCall": () => (/* binding */ BetterCall)
/* harmony export */ });
/* harmony import */ var _BetterCallLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BetterCallLevel */ "./src/BetterCallLevel.ts");
/* harmony import */ var _BetterCallOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BetterCallOptions */ "./src/BetterCallOptions.ts");


class BetterCall {
    constructor(name, options) {
        this.name = name !== null && name !== void 0 ? name : 'Better Call LOG';
        this.options = options !== null && options !== void 0 ? options : new _BetterCallOptions__WEBPACK_IMPORTED_MODULE_1__.BetterCallOptions();
    }
    static level(level) {
        return BetterCall.getInstance().level(level);
    }
    level(level) {
        if (level != null) {
            this.options.level = level;
        }
        return this.options.level;
    }
    static getInstance() {
        if (!BetterCall.instance) {
            BetterCall.instance = new BetterCall();
        }
        return BetterCall.instance;
    }
    static isOff() {
        return BetterCall.getInstance().isOff();
    }
    isOff() {
        return !(this.level() | _BetterCallLevel__WEBPACK_IMPORTED_MODULE_0__.BetterCallLevel.OFF);
    }
    static assert(...args) {
        return BetterCall.getInstance().assert(...args);
    }
    assert(...args) {
        if (this.isOff())
            return;
        let assertion = args[0];
        if (!assertion || !this.options.ignoreAssert) {
            this.fire('group', 'ASSERT');
        }
        if (assertion && !this.options.ignoreAssert) {
            console.info('ASSERTION ', ...args);
        }
        console.assert(...args);
        if (!assertion || !this.options.ignoreAssert) {
            this.groupEnd();
        }
    }
    static clear() {
        BetterCall.getInstance().clear();
    }
    clear() {
        if (this.isOff())
            return;
        console.clear();
    }
    static count(label) {
        return BetterCall.getInstance().count(label);
    }
    count(label) {
        if (this.isOff())
            return;
        label = label !== null && label !== void 0 ? label : this.name;
        console.count(label);
    }
    static countReset(label) {
        return BetterCall.getInstance().countReset(label);
    }
    countReset(label) {
        if (this.isOff())
            return;
        label = label !== null && label !== void 0 ? label : this.name;
        console.countReset(label);
    }
    static debug(...args) {
        return BetterCall.getInstance().debug(...args);
    }
    debug(...args) {
        if (this.level() & _BetterCallLevel__WEBPACK_IMPORTED_MODULE_0__.BetterCallLevel.DEBUG)
            this.fire('debug', ...args);
    }
    static dir(obj) {
        return BetterCall.getInstance().dir(obj);
    }
    dir(obj) {
        if (this.isOff())
            return;
        console.dir(obj);
    }
    static dirxml(obj) {
        return BetterCall.getInstance().dirxml(obj);
    }
    dirxml(obj) {
        if (this.isOff())
            return;
        console.dirxml(obj);
    }
    static error(...args) {
        return BetterCall.getInstance().error(...args);
    }
    error(...args) {
        if (this.level() & _BetterCallLevel__WEBPACK_IMPORTED_MODULE_0__.BetterCallLevel.ERROR)
            this.fire('error', ...args);
    }
    static group(label) {
        return BetterCall.getInstance().group(label);
    }
    group(label) {
        if (this.isOff())
            return;
        label = label !== null && label !== void 0 ? label : this.name;
        console.group(label);
    }
    static groupCollapsed(label) {
        return BetterCall.getInstance().groupCollapsed(label);
    }
    groupCollapsed(label) {
        if (this.isOff())
            return;
        label = label !== null && label !== void 0 ? label : this.name;
        console.groupCollapsed(label);
    }
    static groupEnd(n) {
        return BetterCall.getInstance().groupEnd(n);
    }
    groupEnd(n) {
        if (this.isOff())
            return;
        n = n !== null && n !== void 0 ? n : 1;
        for (let i = 0; i < n; i++) {
            console.groupEnd();
        }
    }
    static info(...args) {
        return BetterCall.getInstance().info(...args);
    }
    info(...args) {
        if (this.level() & _BetterCallLevel__WEBPACK_IMPORTED_MODULE_0__.BetterCallLevel.INFO)
            this.fire('info', ...args);
    }
    static log(...args) {
        return BetterCall.getInstance().log(...args);
    }
    log(...args) {
        if (this.level() & _BetterCallLevel__WEBPACK_IMPORTED_MODULE_0__.BetterCallLevel.LOG)
            this.fire('log', ...args);
    }
    static table(data) {
        return BetterCall.getInstance().table(data);
    }
    table(data, name, columns) {
        if (this.isOff())
            return;
        this.fire('group', 'TABLE', name !== null && name !== void 0 ? name : this.name);
        console.table(data, columns);
        this.groupEnd();
    }
    static time(label) {
        return BetterCall.getInstance().time(label);
    }
    time(label) {
        if (this.isOff())
            return;
        console.time(label);
    }
    static timeEnd(label) {
        return BetterCall.getInstance().timeEnd(label);
    }
    timeEnd(label) {
        if (this.isOff())
            return;
        this.fire('group', 'TIME END');
        console.timeEnd(label);
        this.groupEnd();
    }
    static timeLog(label) {
        return BetterCall.getInstance().timeLog(label);
    }
    timeLog(label) {
        if (this.isOff())
            return;
        this.fire('group', 'TIME LOG');
        console.timeLog(label);
        this.groupEnd();
    }
    static timeStamp(label) {
        return BetterCall.getInstance().timeStamp(label);
    }
    timeStamp(label) {
        let options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
        };
        // TODO use luxon
        let locale = typeof navigator !== 'undefined' ? navigator.language : 'en-EN';
        return label !== null && label !== void 0 ? label : '' + ' ' + Intl.DateTimeFormat(locale, options).format(new Date());
    }
    static trace(...args) {
        return BetterCall.getInstance().trace(...args);
    }
    trace(...args) {
        if (this.isOff())
            return;
        this.fire('trace', ...args);
    }
    static warn(...args) {
        return BetterCall.getInstance().warn(...args);
    }
    warn(...args) {
        if (this.level() & _BetterCallLevel__WEBPACK_IMPORTED_MODULE_0__.BetterCallLevel.WARNING)
            this.fire('warn', ...args);
    }
    fire(tag, ...args) {
        let p = this.options.style.package(tag);
        let tagSpaces = '';
        let nameSpaces = '';
        for (let i = 0; i < 10 - p.tag.length; i++)
            tagSpaces += ' ';
        let name = this.name.length > 20 ? this.name.substring(0, 20) + '...' : this.name;
        for (let i = 0; i < 25 - name.length; i++)
            nameSpaces += ' ';
        let content = [];
        content[p.order['tag']] = p.tag + tagSpaces + '➤ ' + name + nameSpaces + (this.options.showTimestamp ? '➤' + this.timeStamp() : '');
        content[p.order['style']] = p.style;
        content.push('\n↳');
        if (this.options.compactMode) {
            content.pop();
            this.options.compactCollapsed ? console.groupCollapsed.apply(this, content) : console.group.apply(this, content);
        }
        console[tag].apply(this, (this.options.compactMode ? args : content.concat(args)));
        if (this.options.compactMode) {
            console.groupEnd.call(this);
        }
    }
}
BetterCall.LEVEL_OFF = 0x00;
BetterCall.LEVEL_INFO = 0x10;
BetterCall.LEVEL_LOG = 0x20;
BetterCall.LEVEL_DEBUG = 0x30;
BetterCall.LEVEL_WARNING = 0x40;
BetterCall.LEVEL_ERROR = 0x50;


/***/ }),

/***/ "./src/BetterCallLevel.ts":
/*!********************************!*\
  !*** ./src/BetterCallLevel.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BetterCallLevel": () => (/* binding */ BetterCallLevel)
/* harmony export */ });
var BetterCallLevel;
(function (BetterCallLevel) {
    BetterCallLevel[BetterCallLevel["INFO"] = 2] = "INFO";
    BetterCallLevel[BetterCallLevel["LOG"] = 4] = "LOG";
    BetterCallLevel[BetterCallLevel["DEBUG"] = 8] = "DEBUG";
    BetterCallLevel[BetterCallLevel["WARNING"] = 16] = "WARNING";
    BetterCallLevel[BetterCallLevel["ERROR"] = 32] = "ERROR";
    BetterCallLevel[BetterCallLevel["OFF"] = 0] = "OFF";
    BetterCallLevel[BetterCallLevel["ALL"] = 255] = "ALL";
})(BetterCallLevel || (BetterCallLevel = {}));


/***/ }),

/***/ "./src/BetterCallOptions.ts":
/*!**********************************!*\
  !*** ./src/BetterCallOptions.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BetterCallOptions": () => (/* binding */ BetterCallOptions)
/* harmony export */ });
/* harmony import */ var _BetterCallLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BetterCallLevel */ "./src/BetterCallLevel.ts");
/* harmony import */ var _BetterCallStyleANSI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BetterCallStyleANSI */ "./src/BetterCallStyleANSI.ts");
/* harmony import */ var _BetterCallStyleCSS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BetterCallStyleCSS */ "./src/BetterCallStyleCSS.ts");



class BetterCallOptions {
    constructor() {
        this.level = _BetterCallLevel__WEBPACK_IMPORTED_MODULE_0__.BetterCallLevel.ALL;
        this.ignoreAssert = false;
        this.style = typeof window !== 'undefined' ? new _BetterCallStyleCSS__WEBPACK_IMPORTED_MODULE_2__.BetterCallStyleCSS() : new _BetterCallStyleANSI__WEBPACK_IMPORTED_MODULE_1__.BetterCallStyleANSI;
        this.showTimestamp = true;
        this.compactMode = false;
        this.compactCollapsed = false;
    }
}


/***/ }),

/***/ "./src/BetterCallStyle.ts":
/*!********************************!*\
  !*** ./src/BetterCallStyle.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BetterCallStyle": () => (/* binding */ BetterCallStyle)
/* harmony export */ });
/* harmony import */ var _BetterCallStyleObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BetterCallStyleObject */ "./src/BetterCallStyleObject.ts");

class BetterCallStyle {
    constructor(style) {
        this.style = style !== null && style !== void 0 ? style : new _BetterCallStyleObject__WEBPACK_IMPORTED_MODULE_0__.BetterCallStyleObject();
    }
}


/***/ }),

/***/ "./src/BetterCallStyleANSI.ts":
/*!************************************!*\
  !*** ./src/BetterCallStyleANSI.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BetterCallStyleANSI": () => (/* binding */ BetterCallStyleANSI)
/* harmony export */ });
/* harmony import */ var _BetterCallStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BetterCallStyle */ "./src/BetterCallStyle.ts");
/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Color */ "./src/Color.ts");


class BetterCallStyleANSI extends _BetterCallStyle__WEBPACK_IMPORTED_MODULE_0__.BetterCallStyle {
    constructor() {
        super();
        this.style.base = [];
        this.style.info = [
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.BgBlue,
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.FgWhite,
        ];
        this.style.log = [
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.BgBlack,
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.FgWhite,
        ];
        this.style.debug = [
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.BgCyan,
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.FgBlack,
        ];
        this.style.warn = [
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.BgYellow,
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.FgBlack,
        ];
        this.style.error = [
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.BgRed,
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.FgBlack,
        ];
        this.style.trace = [
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.BgMagenta,
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.FgWhite,
        ];
        this.style.table = [
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.BgMagenta,
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.FgWhite,
        ];
        this.style.group = [
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.BgMagenta,
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.FgWhite,
        ];
        this.style.assert = [
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.BgMagenta,
            _Color__WEBPACK_IMPORTED_MODULE_1__.Color.FgWhite,
        ];
    }
    toString(tag) {
        return (this.style.base.join('') + (this.style[tag] ? this.style[tag].join('') : '') + '%s' + _Color__WEBPACK_IMPORTED_MODULE_1__.Color.Reset);
    }
    package(tag) {
        return { style: this.toString(tag), tag: tag.toUpperCase(), order: { style: 0, tag: 1 } };
    }
}


/***/ }),

/***/ "./src/BetterCallStyleCSS.ts":
/*!***********************************!*\
  !*** ./src/BetterCallStyleCSS.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BetterCallStyleCSS": () => (/* binding */ BetterCallStyleCSS)
/* harmony export */ });
/* harmony import */ var _BetterCallStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BetterCallStyle */ "./src/BetterCallStyle.ts");

class BetterCallStyleCSS extends _BetterCallStyle__WEBPACK_IMPORTED_MODULE_0__.BetterCallStyle {
    constructor() {
        super();
        this.style.base = [
            "padding: 2px 4px",
            "border-radius: 2px"
        ];
        this.style.debug = [
            "background-color: #5EEBC2",
            "color: #000000"
        ];
        this.style.error = [
            "background-color: #F54E47",
            "color: #000000"
        ];
        this.style.info = [
            "background-color: #30A2F5",
            "color: #D0FFFF"
        ];
        this.style.log = [
            "background-color: #000000",
            "color: #FFFFFF"
        ];
        this.style.warn = [
            "background-color: #EBBA3E",
            "color: #000000"
        ];
        this.style.trace = [
            "background-color: #69187D",
            "color: #FFFFFF"
        ];
        this.style.table = [
            "background-color: #69187D",
            "color: #FFFFFF"
        ];
        this.style.group = [
            "background-color: #69187D",
            "color: #FFFFFF"
        ];
        this.style.assert = [
            "background-color: #69187D",
            "color: #FFFFFF"
        ];
    }
    toString(tag) {
        return (this.style.base.join(';') + ';') + (this.style[tag] ? this.style[tag].join(';') + ';' : '');
    }
    package(tag) {
        return { style: this.toString(tag), tag: '%c' + tag.toUpperCase(), order: { tag: 0, style: 1 } };
    }
}


/***/ }),

/***/ "./src/BetterCallStyleObject.ts":
/*!**************************************!*\
  !*** ./src/BetterCallStyleObject.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BetterCallStyleObject": () => (/* binding */ BetterCallStyleObject)
/* harmony export */ });
class BetterCallStyleObject {
}


/***/ }),

/***/ "./src/Color.ts":
/*!**********************!*\
  !*** ./src/Color.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Color": () => (/* binding */ Color)
/* harmony export */ });
var Color;
(function (Color) {
    Color["Reset"] = "\u001B[0m";
    Color["Bright"] = "\u001B[1m";
    Color["Dim"] = "\u001B[2m";
    Color["Underscore"] = "\u001B[4m";
    Color["Blink"] = "\u001B[5m";
    Color["Reverse"] = "\u001B[7m";
    Color["Hidden"] = "\u001B[8m";
    Color["FgBlack"] = "\u001B[30m";
    Color["FgRed"] = "\u001B[31m";
    Color["FgGreen"] = "\u001B[32m";
    Color["FgYellow"] = "\u001B[33m";
    Color["FgBlue"] = "\u001B[34m";
    Color["FgMagenta"] = "\u001B[35m";
    Color["FgCyan"] = "\u001B[36m";
    Color["FgWhite"] = "\u001B[37m";
    Color["BgBlack"] = "\u001B[40m";
    Color["BgRed"] = "\u001B[41m";
    Color["BgGreen"] = "\u001B[42m";
    Color["BgYellow"] = "\u001B[43m";
    Color["BgBlue"] = "\u001B[44m";
    Color["BgMagenta"] = "\u001B[45m";
    Color["BgCyan"] = "\u001B[46m";
    Color["BgWhite"] = "\u001B[47m";
})(Color || (Color = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/node.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BetterCall)
/* harmony export */ });
/* harmony import */ var _BetterCall__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BetterCall */ "./src/BetterCall.ts");

class BetterCall extends _BetterCall__WEBPACK_IMPORTED_MODULE_0__.BetterCall {
}

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=better-call-log-node.js.map