(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// import functions
var _classlist_polyfill = _interopRequireDefault(require("./modules/classlist_polyfill"));
var _foreach_polyfill = _interopRequireDefault(require("./modules/foreach_polyfill"));
var _type_ratio_interpolation = _interopRequireDefault(require("./modules/type_ratio_interpolation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
    polyfill to enable use of forEach on node lists in IE11
*/
(0, _foreach_polyfill["default"])();
/*
    polyfill to allow use of replace method
    on a classList in internet explorer
*/
(0, _classlist_polyfill["default"])();
/*
    interpolate between type ratio minimum and maximum values,
    and store the result in a CSS custom property
*/
(0, _type_ratio_interpolation["default"])();

},{"./modules/classlist_polyfill":2,"./modules/foreach_polyfill":3,"./modules/type_ratio_interpolation":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
/*
    polyfill to allow use of replace method on a classList in internet explorer
*/
function _default() {
  if (!("replace" in document.createElement("_").classList)) {
    DOMTokenList.prototype.replace = function (token, replacementToken) {
      var tokens = this.toString().split(" ");
      var index = tokens.indexOf(token + "");
      if (~index) {
        tokens = tokens.slice(index);
        this.remove.apply(this, tokens);
        this.add(replacementToken);
        this.add.apply(this, tokens.slice(1));
      }
    };
  }
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
/*
    polyfill to enable use of forEach on node lists in IE11
*/
function _default() {
  if ("NodeList" in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
function scale_ratio(current_viewport_width, minimum_value, maximum_value) {
  // store the minimum viewport width at which `--ratio`
  // custom property will be set. this must match values
  // set in `breakpoints.styl` & `typography.styl`.
  var min_range = 480;
  // store the maximum viewport width at which `--ratio`
  // custom property will be set. this must match values
  // set in `breakpoints.styl` & `typography.styl`.
  var max_range = 1680;
  // calculate and store the rate at wich our ratio changes
  // when the viewport width changes by 1px
  var rate_of_change = (maximum_value - minimum_value) / (max_range - min_range);
  // store the intercept (the value of Y when all X=0)
  var value_at_viewport_zero = minimum_value - rate_of_change * min_range;
  // if we follow a linear progression from ratio m at viewport M,
  // to ratio n at viewport N, calculate and store the ratio at viewport X
  var interpolated_ratio = current_viewport_width * rate_of_change + value_at_viewport_zero;
  // use `interpolated_ratio` value if it's within range.
  // if it would be smaller than the smallest acceptable ratio, use the smallest.
  // if it would be larger than the largest acceptable ratio, use the largest.
  var bounded_ratio = Math.max(minimum_value, Math.min(interpolated_ratio, maximum_value));
  // store final ratio in CSS custom property `--ratio`
  document.documentElement.style.setProperty("--ratio", bounded_ratio);
}
/*
    interpolate between type ratio minimum and maximum values,
    and store the result in a CSS custom property
*/
function _default() {
  // store the lowest ratio to use for our typographic scale.
  // This must match the value set in `typographic-variables.styl`.
  var type_ratio_low = 1.125;
  // store the highest ratio to use for our typographic scale.
  // This must match the value set in `typographic-variables.styl`.
  var type_ratio_high = 1.28;
  // store the current viewport width
  var screen_width = window.innerWidth;
  // apply the ratio scaling function, to apply
  // the ratio for the current viewport width
  scale_ratio(screen_width, type_ratio_low, type_ratio_high);
  // watch for change in the viewport width
  window.addEventListener("resize", function () {
    // store the current viewport width
    var screen_width = window.innerWidth;
    // recalculate ratio when change is detected
    scale_ratio(screen_width, type_ratio_low, type_ratio_high);
  });
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9hc3NldHMvanMvYXBwLmpzIiwiLi4vYXNzZXRzL2pzL21vZHVsZXMvY2xhc3NsaXN0X3BvbHlmaWxsLmpzIiwiLi4vYXNzZXRzL2pzL21vZHVsZXMvZm9yZWFjaF9wb2x5ZmlsbC5qcyIsIi4uL2Fzc2V0cy9qcy9tb2R1bGVzL3R5cGVfcmF0aW9faW50ZXJwb2xhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVk7O0FBQ1o7QUFDQSxJQUFBLG1CQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxpQkFBQSxHQUFBLHNCQUFBLENBQUEsT0FBQTtBQUNBLElBQUEseUJBQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUE7QUFBMEUsU0FBQSx1QkFBQSxHQUFBLFdBQUEsR0FBQSxJQUFBLEdBQUEsQ0FBQSxVQUFBLEdBQUEsR0FBQSxnQkFBQSxHQUFBO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLElBQUEsNEJBQWlCLEVBQUMsQ0FBQztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUEsOEJBQWtCLEVBQUMsQ0FBQztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUEsb0NBQXdCLEVBQUMsQ0FBQzs7Ozs7Ozs7O0FDbEIxQjtBQUNBO0FBQ0E7QUFDZSxTQUFBLFNBQUEsRUFBWTtFQUN2QixJQUFJLEVBQUUsU0FBUyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUU7SUFDdkQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUU7TUFDaEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztNQUN2QyxJQUFNLEtBQUssR0FBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7TUFDekMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7UUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDekM7SUFDSixDQUFDO0VBQ0w7QUFDSjs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNlLFNBQUEsU0FBQSxFQUFZO0VBQ3ZCLElBQUksVUFBVSxJQUFJLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO0lBQ3JELFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFVBQVUsUUFBUSxFQUFFLE9BQU8sRUFBRTtNQUN0RCxPQUFPLEdBQUcsT0FBTyxJQUFJLE1BQU07TUFDM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUM7TUFDNUM7SUFDSixDQUFDO0VBQ0w7QUFDSjs7Ozs7Ozs7O0FDWkEsU0FBUyxXQUFXLENBQUUsc0JBQXNCLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRTtFQUN4RTtFQUNBO0VBQ0E7RUFDQSxJQUFNLFNBQVMsR0FBRyxHQUFHO0VBQ3JCO0VBQ0E7RUFDQTtFQUNBLElBQU0sU0FBUyxHQUFHLElBQUk7RUFDdEI7RUFDQTtFQUNBLElBQU0sY0FBYyxHQUFHLENBQUMsYUFBYSxHQUFHLGFBQWEsS0FBSyxTQUFTLEdBQUcsU0FBUyxDQUFDO0VBQ2hGO0VBQ0EsSUFBTSxzQkFBc0IsR0FBRyxhQUFhLEdBQUcsY0FBYyxHQUFHLFNBQVM7RUFDekU7RUFDQTtFQUNBLElBQU0sa0JBQWtCLEdBQUcsc0JBQXNCLEdBQUcsY0FBYyxHQUFHLHNCQUFzQjtFQUMzRjtFQUNBO0VBQ0E7RUFDQSxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0VBQzFGO0VBQ0EsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLFNBQUEsU0FBQSxFQUFZO0VBQ3ZCO0VBQ0E7RUFDQSxJQUFNLGNBQWMsR0FBRyxLQUFLO0VBQzVCO0VBQ0E7RUFDQSxJQUFNLGVBQWUsR0FBRyxJQUFJO0VBQzVCO0VBQ0EsSUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFVBQVU7RUFDdEM7RUFDQTtFQUNBLFdBQVcsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQztFQUMxRDtFQUNBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBTTtJQUNwQztJQUNBLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxVQUFVO0lBQ3RDO0lBQ0EsV0FBVyxDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDO0VBQzlELENBQUMsQ0FBQztBQUNOIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBpbXBvcnQgZnVuY3Rpb25zXG5pbXBvcnQgY2xhc3NsaXN0X3BvbHlmaWxsIGZyb20gXCIuL21vZHVsZXMvY2xhc3NsaXN0X3BvbHlmaWxsXCI7XG5pbXBvcnQgZm9yX2VhY2hfcG9seWZpbGwgZnJvbSBcIi4vbW9kdWxlcy9mb3JlYWNoX3BvbHlmaWxsXCI7XG5pbXBvcnQgdHlwZV9yYXRpb19pbnRlcnBvbGF0aW9uIGZyb20gXCIuL21vZHVsZXMvdHlwZV9yYXRpb19pbnRlcnBvbGF0aW9uXCI7XG4vKlxuICAgIHBvbHlmaWxsIHRvIGVuYWJsZSB1c2Ugb2YgZm9yRWFjaCBvbiBub2RlIGxpc3RzIGluIElFMTFcbiovXG5mb3JfZWFjaF9wb2x5ZmlsbCgpO1xuLypcbiAgICBwb2x5ZmlsbCB0byBhbGxvdyB1c2Ugb2YgcmVwbGFjZSBtZXRob2RcbiAgICBvbiBhIGNsYXNzTGlzdCBpbiBpbnRlcm5ldCBleHBsb3JlclxuKi9cbmNsYXNzbGlzdF9wb2x5ZmlsbCgpO1xuLypcbiAgICBpbnRlcnBvbGF0ZSBiZXR3ZWVuIHR5cGUgcmF0aW8gbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMsXG4gICAgYW5kIHN0b3JlIHRoZSByZXN1bHQgaW4gYSBDU1MgY3VzdG9tIHByb3BlcnR5XG4qL1xudHlwZV9yYXRpb19pbnRlcnBvbGF0aW9uKCk7IiwiLypcbiAgICBwb2x5ZmlsbCB0byBhbGxvdyB1c2Ugb2YgcmVwbGFjZSBtZXRob2Qgb24gYSBjbGFzc0xpc3QgaW4gaW50ZXJuZXQgZXhwbG9yZXJcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCEoXCJyZXBsYWNlXCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIikuY2xhc3NMaXN0KSkge1xuICAgICAgICBET01Ub2tlbkxpc3QucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAodG9rZW4sIHJlcGxhY2VtZW50VG9rZW4pIHtcbiAgICAgICAgICAgIGxldCB0b2tlbnMgPSB0aGlzLnRvU3RyaW5nKCkuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggID0gdG9rZW5zLmluZGV4T2YodG9rZW4gKyBcIlwiKTtcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0b2tlbnMgPSB0b2tlbnMuc2xpY2UoaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlLmFwcGx5KHRoaXMsIHRva2Vucyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQocmVwbGFjZW1lbnRUb2tlbik7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQuYXBwbHkodGhpcywgdG9rZW5zLnNsaWNlKDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCIvKlxuICAgIHBvbHlmaWxsIHRvIGVuYWJsZSB1c2Ugb2YgZm9yRWFjaCBvbiBub2RlIGxpc3RzIGluIElFMTFcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFwiTm9kZUxpc3RcIiBpbiB3aW5kb3cgJiYgIU5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoKSB7XG4gICAgICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgICAgICB0aGlzQXJnID0gdGhpc0FyZyB8fCB3aW5kb3c7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImZ1bmN0aW9uIHNjYWxlX3JhdGlvIChjdXJyZW50X3ZpZXdwb3J0X3dpZHRoLCBtaW5pbXVtX3ZhbHVlLCBtYXhpbXVtX3ZhbHVlKSB7XG4gICAgLy8gc3RvcmUgdGhlIG1pbmltdW0gdmlld3BvcnQgd2lkdGggYXQgd2hpY2ggYC0tcmF0aW9gXG4gICAgLy8gY3VzdG9tIHByb3BlcnR5IHdpbGwgYmUgc2V0LiB0aGlzIG11c3QgbWF0Y2ggdmFsdWVzXG4gICAgLy8gc2V0IGluIGBicmVha3BvaW50cy5zdHlsYCAmIGB0eXBvZ3JhcGh5LnN0eWxgLlxuICAgIGNvbnN0IG1pbl9yYW5nZSA9IDQ4MDtcbiAgICAvLyBzdG9yZSB0aGUgbWF4aW11bSB2aWV3cG9ydCB3aWR0aCBhdCB3aGljaCBgLS1yYXRpb2BcbiAgICAvLyBjdXN0b20gcHJvcGVydHkgd2lsbCBiZSBzZXQuIHRoaXMgbXVzdCBtYXRjaCB2YWx1ZXNcbiAgICAvLyBzZXQgaW4gYGJyZWFrcG9pbnRzLnN0eWxgICYgYHR5cG9ncmFwaHkuc3R5bGAuXG4gICAgY29uc3QgbWF4X3JhbmdlID0gMTY4MDtcbiAgICAvLyBjYWxjdWxhdGUgYW5kIHN0b3JlIHRoZSByYXRlIGF0IHdpY2ggb3VyIHJhdGlvIGNoYW5nZXNcbiAgICAvLyB3aGVuIHRoZSB2aWV3cG9ydCB3aWR0aCBjaGFuZ2VzIGJ5IDFweFxuICAgIGNvbnN0IHJhdGVfb2ZfY2hhbmdlID0gKG1heGltdW1fdmFsdWUgLSBtaW5pbXVtX3ZhbHVlKSAvIChtYXhfcmFuZ2UgLSBtaW5fcmFuZ2UpO1xuICAgIC8vIHN0b3JlIHRoZSBpbnRlcmNlcHQgKHRoZSB2YWx1ZSBvZiBZIHdoZW4gYWxsIFg9MClcbiAgICBjb25zdCB2YWx1ZV9hdF92aWV3cG9ydF96ZXJvID0gbWluaW11bV92YWx1ZSAtIHJhdGVfb2ZfY2hhbmdlICogbWluX3JhbmdlO1xuICAgIC8vIGlmIHdlIGZvbGxvdyBhIGxpbmVhciBwcm9ncmVzc2lvbiBmcm9tIHJhdGlvIG0gYXQgdmlld3BvcnQgTSxcbiAgICAvLyB0byByYXRpbyBuIGF0IHZpZXdwb3J0IE4sIGNhbGN1bGF0ZSBhbmQgc3RvcmUgdGhlIHJhdGlvIGF0IHZpZXdwb3J0IFhcbiAgICBjb25zdCBpbnRlcnBvbGF0ZWRfcmF0aW8gPSBjdXJyZW50X3ZpZXdwb3J0X3dpZHRoICogcmF0ZV9vZl9jaGFuZ2UgKyB2YWx1ZV9hdF92aWV3cG9ydF96ZXJvO1xuICAgIC8vIHVzZSBgaW50ZXJwb2xhdGVkX3JhdGlvYCB2YWx1ZSBpZiBpdCdzIHdpdGhpbiByYW5nZS5cbiAgICAvLyBpZiBpdCB3b3VsZCBiZSBzbWFsbGVyIHRoYW4gdGhlIHNtYWxsZXN0IGFjY2VwdGFibGUgcmF0aW8sIHVzZSB0aGUgc21hbGxlc3QuXG4gICAgLy8gaWYgaXQgd291bGQgYmUgbGFyZ2VyIHRoYW4gdGhlIGxhcmdlc3QgYWNjZXB0YWJsZSByYXRpbywgdXNlIHRoZSBsYXJnZXN0LlxuICAgIGNvbnN0IGJvdW5kZWRfcmF0aW8gPSBNYXRoLm1heChtaW5pbXVtX3ZhbHVlLCBNYXRoLm1pbihpbnRlcnBvbGF0ZWRfcmF0aW8sIG1heGltdW1fdmFsdWUpKTtcbiAgICAvLyBzdG9yZSBmaW5hbCByYXRpbyBpbiBDU1MgY3VzdG9tIHByb3BlcnR5IGAtLXJhdGlvYFxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcmF0aW9cIiwgYm91bmRlZF9yYXRpbyk7XG59XG4vKlxuICAgIGludGVycG9sYXRlIGJldHdlZW4gdHlwZSByYXRpbyBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcyxcbiAgICBhbmQgc3RvcmUgdGhlIHJlc3VsdCBpbiBhIENTUyBjdXN0b20gcHJvcGVydHlcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gc3RvcmUgdGhlIGxvd2VzdCByYXRpbyB0byB1c2UgZm9yIG91ciB0eXBvZ3JhcGhpYyBzY2FsZS5cbiAgICAvLyBUaGlzIG11c3QgbWF0Y2ggdGhlIHZhbHVlIHNldCBpbiBgdHlwb2dyYXBoaWMtdmFyaWFibGVzLnN0eWxgLlxuICAgIGNvbnN0IHR5cGVfcmF0aW9fbG93ID0gMS4xMjU7XG4gICAgLy8gc3RvcmUgdGhlIGhpZ2hlc3QgcmF0aW8gdG8gdXNlIGZvciBvdXIgdHlwb2dyYXBoaWMgc2NhbGUuXG4gICAgLy8gVGhpcyBtdXN0IG1hdGNoIHRoZSB2YWx1ZSBzZXQgaW4gYHR5cG9ncmFwaGljLXZhcmlhYmxlcy5zdHlsYC5cbiAgICBjb25zdCB0eXBlX3JhdGlvX2hpZ2ggPSAxLjI4O1xuICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IHZpZXdwb3J0IHdpZHRoXG4gICAgY29uc3Qgc2NyZWVuX3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgLy8gYXBwbHkgdGhlIHJhdGlvIHNjYWxpbmcgZnVuY3Rpb24sIHRvIGFwcGx5XG4gICAgLy8gdGhlIHJhdGlvIGZvciB0aGUgY3VycmVudCB2aWV3cG9ydCB3aWR0aFxuICAgIHNjYWxlX3JhdGlvKHNjcmVlbl93aWR0aCwgdHlwZV9yYXRpb19sb3csIHR5cGVfcmF0aW9faGlnaCk7XG4gICAgLy8gd2F0Y2ggZm9yIGNoYW5nZSBpbiB0aGUgdmlld3BvcnQgd2lkdGhcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IHZpZXdwb3J0IHdpZHRoXG4gICAgICAgIGNvbnN0IHNjcmVlbl93aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAvLyByZWNhbGN1bGF0ZSByYXRpbyB3aGVuIGNoYW5nZSBpcyBkZXRlY3RlZFxuICAgICAgICBzY2FsZV9yYXRpbyhzY3JlZW5fd2lkdGgsIHR5cGVfcmF0aW9fbG93LCB0eXBlX3JhdGlvX2hpZ2gpO1xuICAgIH0pO1xufVxuIl19
