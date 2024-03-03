(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict"; // import functions

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
  var min_range = 480; // store the maximum viewport width at which `--ratio`
  // custom property will be set. this must match values
  // set in `breakpoints.styl` & `typography.styl`.

  var max_range = 1680; // calculate and store the rate at wich our ratio changes
  // when the viewport width changes by 1px

  var rate_of_change = (maximum_value - minimum_value) / (max_range - min_range); // store the intercept (the value of Y when all X=0)

  var value_at_viewport_zero = minimum_value - rate_of_change * min_range; // if we follow a linear progression from ratio m at viewport M,
  // to ratio n at viewport N, calculate and store the ratio at viewport X

  var interpolated_ratio = current_viewport_width * rate_of_change + value_at_viewport_zero; // use `interpolated_ratio` value if it's within range.
  // if it would be smaller than the smallest acceptable ratio, use the smallest.
  // if it would be larger than the largest acceptable ratio, use the largest.

  var bounded_ratio = Math.max(minimum_value, Math.min(interpolated_ratio, maximum_value)); // store final ratio in CSS custom property `--ratio`

  document.documentElement.style.setProperty("--ratio", bounded_ratio);
}
/*
    interpolate between type ratio minimum and maximum values,
    and store the result in a CSS custom property
*/


function _default() {
  // store the lowest ratio to use for our typographic scale.
  // This must match the value set in `typographic-variables.styl`.
  var type_ratio_low = 1.125; // store the highest ratio to use for our typographic scale.
  // This must match the value set in `typographic-variables.styl`.

  var type_ratio_high = 1.28; // store the current viewport width

  var screen_width = window.innerWidth; // apply the ratio scaling function, to apply
  // the ratio for the current viewport width

  scale_ratio(screen_width, type_ratio_low, type_ratio_high); // watch for change in the viewport width

  window.addEventListener("resize", function () {
    // store the current viewport width
    var screen_width = window.innerWidth; // recalculate ratio when change is detected

    scale_ratio(screen_width, type_ratio_low, type_ratio_high);
  });
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9hc3NldHMvanMvYXBwLmpzIiwiLi4vYXNzZXRzL2pzL21vZHVsZXMvY2xhc3NsaXN0X3BvbHlmaWxsLmpzIiwiLi4vYXNzZXRzL2pzL21vZHVsZXMvZm9yZWFjaF9wb2x5ZmlsbC5qcyIsIi4uL2Fzc2V0cy9qcy9tb2R1bGVzL3R5cGVfcmF0aW9faW50ZXJwb2xhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLGEsQ0FDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDZSxvQkFBWTtBQUN2QixNQUFJLEVBQUUsYUFBYSxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QixFQUE0QixTQUEzQyxDQUFKLEVBQTJEO0FBQ3ZELElBQUEsWUFBWSxDQUFDLFNBQWIsQ0FBdUIsT0FBdkIsR0FBaUMsVUFBVSxLQUFWLEVBQWlCLGdCQUFqQixFQUFtQztBQUNoRSxVQUFJLE1BQU0sR0FBRyxLQUFLLFFBQUwsR0FBZ0IsS0FBaEIsQ0FBc0IsR0FBdEIsQ0FBYjtBQUNBLFVBQU0sS0FBSyxHQUFJLE1BQU0sQ0FBQyxPQUFQLENBQWUsS0FBSyxHQUFHLEVBQXZCLENBQWY7O0FBQ0EsVUFBSSxDQUFDLEtBQUwsRUFBWTtBQUNSLFFBQUEsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFQLENBQWEsS0FBYixDQUFUO0FBQ0EsYUFBSyxNQUFMLENBQVksS0FBWixDQUFrQixJQUFsQixFQUF3QixNQUF4QjtBQUNBLGFBQUssR0FBTCxDQUFTLGdCQUFUO0FBQ0EsYUFBSyxHQUFMLENBQVMsS0FBVCxDQUFlLElBQWYsRUFBcUIsTUFBTSxDQUFDLEtBQVAsQ0FBYSxDQUFiLENBQXJCO0FBQ0g7QUFDSixLQVREO0FBVUg7QUFDSjs7Ozs7Ozs7OztBQ2hCRDtBQUNBO0FBQ0E7QUFDZSxvQkFBWTtBQUN2QixNQUFJLGNBQWMsTUFBZCxJQUF3QixDQUFDLFFBQVEsQ0FBQyxTQUFULENBQW1CLE9BQWhELEVBQXlEO0FBQ3JELElBQUEsUUFBUSxDQUFDLFNBQVQsQ0FBbUIsT0FBbkIsR0FBNkIsVUFBVSxRQUFWLEVBQW9CLE9BQXBCLEVBQTZCO0FBQ3RELE1BQUEsT0FBTyxHQUFHLE9BQU8sSUFBSSxNQUFyQjs7QUFDQSxXQUFLLElBQUksQ0FBQyxHQUFHLENBQWIsRUFBZ0IsQ0FBQyxHQUFHLEtBQUssTUFBekIsRUFBaUMsQ0FBQyxFQUFsQyxFQUFzQztBQUNsQyxRQUFBLFFBQVEsQ0FBQyxJQUFULENBQWMsT0FBZCxFQUF1QixLQUFLLENBQUwsQ0FBdkIsRUFBZ0MsQ0FBaEMsRUFBbUMsSUFBbkM7QUFDSDtBQUNKLEtBTEQ7QUFNSDtBQUNKOzs7Ozs7Ozs7O0FDWkQsU0FBUyxXQUFULENBQXNCLHNCQUF0QixFQUE4QyxhQUE5QyxFQUE2RCxhQUE3RCxFQUE0RTtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFNBQVMsR0FBRyxHQUFsQixDQUp3RSxDQUt4RTtBQUNBO0FBQ0E7O0FBQ0EsTUFBTSxTQUFTLEdBQUcsSUFBbEIsQ0FSd0UsQ0FTeEU7QUFDQTs7QUFDQSxNQUFNLGNBQWMsR0FBRyxDQUFDLGFBQWEsR0FBRyxhQUFqQixLQUFtQyxTQUFTLEdBQUcsU0FBL0MsQ0FBdkIsQ0FYd0UsQ0FZeEU7O0FBQ0EsTUFBTSxzQkFBc0IsR0FBRyxhQUFhLEdBQUcsY0FBYyxHQUFHLFNBQWhFLENBYndFLENBY3hFO0FBQ0E7O0FBQ0EsTUFBTSxrQkFBa0IsR0FBRyxzQkFBc0IsR0FBRyxjQUF6QixHQUEwQyxzQkFBckUsQ0FoQndFLENBaUJ4RTtBQUNBO0FBQ0E7O0FBQ0EsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxhQUFULEVBQXdCLElBQUksQ0FBQyxHQUFMLENBQVMsa0JBQVQsRUFBNkIsYUFBN0IsQ0FBeEIsQ0FBdEIsQ0FwQndFLENBcUJ4RTs7QUFDQSxFQUFBLFFBQVEsQ0FBQyxlQUFULENBQXlCLEtBQXpCLENBQStCLFdBQS9CLENBQTJDLFNBQTNDLEVBQXNELGFBQXREO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7O0FBQ2Usb0JBQVk7QUFDdkI7QUFDQTtBQUNBLE1BQU0sY0FBYyxHQUFHLEtBQXZCLENBSHVCLENBSXZCO0FBQ0E7O0FBQ0EsTUFBTSxlQUFlLEdBQUcsSUFBeEIsQ0FOdUIsQ0FPdkI7O0FBQ0EsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFVBQTVCLENBUnVCLENBU3ZCO0FBQ0E7O0FBQ0EsRUFBQSxXQUFXLENBQUMsWUFBRCxFQUFlLGNBQWYsRUFBK0IsZUFBL0IsQ0FBWCxDQVh1QixDQVl2Qjs7QUFDQSxFQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxZQUFNO0FBQ3BDO0FBQ0EsUUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFVBQTVCLENBRm9DLENBR3BDOztBQUNBLElBQUEsV0FBVyxDQUFDLFlBQUQsRUFBZSxjQUFmLEVBQStCLGVBQS9CLENBQVg7QUFDSCxHQUxEO0FBTUgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbi8vIGltcG9ydCBmdW5jdGlvbnNcbmltcG9ydCBjbGFzc2xpc3RfcG9seWZpbGwgZnJvbSBcIi4vbW9kdWxlcy9jbGFzc2xpc3RfcG9seWZpbGxcIjtcbmltcG9ydCBmb3JfZWFjaF9wb2x5ZmlsbCBmcm9tIFwiLi9tb2R1bGVzL2ZvcmVhY2hfcG9seWZpbGxcIjtcbmltcG9ydCB0eXBlX3JhdGlvX2ludGVycG9sYXRpb24gZnJvbSBcIi4vbW9kdWxlcy90eXBlX3JhdGlvX2ludGVycG9sYXRpb25cIjtcbi8qXG4gICAgcG9seWZpbGwgdG8gZW5hYmxlIHVzZSBvZiBmb3JFYWNoIG9uIG5vZGUgbGlzdHMgaW4gSUUxMVxuKi9cbmZvcl9lYWNoX3BvbHlmaWxsKCk7XG4vKlxuICAgIHBvbHlmaWxsIHRvIGFsbG93IHVzZSBvZiByZXBsYWNlIG1ldGhvZFxuICAgIG9uIGEgY2xhc3NMaXN0IGluIGludGVybmV0IGV4cGxvcmVyXG4qL1xuY2xhc3NsaXN0X3BvbHlmaWxsKCk7XG4vKlxuICAgIGludGVycG9sYXRlIGJldHdlZW4gdHlwZSByYXRpbyBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcyxcbiAgICBhbmQgc3RvcmUgdGhlIHJlc3VsdCBpbiBhIENTUyBjdXN0b20gcHJvcGVydHlcbiovXG50eXBlX3JhdGlvX2ludGVycG9sYXRpb24oKTsiLCIvKlxuICAgIHBvbHlmaWxsIHRvIGFsbG93IHVzZSBvZiByZXBsYWNlIG1ldGhvZCBvbiBhIGNsYXNzTGlzdCBpbiBpbnRlcm5ldCBleHBsb3JlclxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIShcInJlcGxhY2VcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKS5jbGFzc0xpc3QpKSB7XG4gICAgICAgIERPTVRva2VuTGlzdC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uICh0b2tlbiwgcmVwbGFjZW1lbnRUb2tlbikge1xuICAgICAgICAgICAgbGV0IHRva2VucyA9IHRoaXMudG9TdHJpbmcoKS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICBjb25zdCBpbmRleCAgPSB0b2tlbnMuaW5kZXhPZih0b2tlbiArIFwiXCIpO1xuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xuICAgICAgICAgICAgICAgIHRva2VucyA9IHRva2Vucy5zbGljZShpbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUuYXBwbHkodGhpcywgdG9rZW5zKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChyZXBsYWNlbWVudFRva2VuKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZC5hcHBseSh0aGlzLCB0b2tlbnMuc2xpY2UoMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsIi8qXG4gICAgcG9seWZpbGwgdG8gZW5hYmxlIHVzZSBvZiBmb3JFYWNoIG9uIG5vZGUgbGlzdHMgaW4gSUUxMVxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoXCJOb2RlTGlzdFwiIGluIHdpbmRvdyAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICAgICAgTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgICAgIHRoaXNBcmcgPSB0aGlzQXJnIHx8IHdpbmRvdztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiZnVuY3Rpb24gc2NhbGVfcmF0aW8gKGN1cnJlbnRfdmlld3BvcnRfd2lkdGgsIG1pbmltdW1fdmFsdWUsIG1heGltdW1fdmFsdWUpIHtcbiAgICAvLyBzdG9yZSB0aGUgbWluaW11bSB2aWV3cG9ydCB3aWR0aCBhdCB3aGljaCBgLS1yYXRpb2BcbiAgICAvLyBjdXN0b20gcHJvcGVydHkgd2lsbCBiZSBzZXQuIHRoaXMgbXVzdCBtYXRjaCB2YWx1ZXNcbiAgICAvLyBzZXQgaW4gYGJyZWFrcG9pbnRzLnN0eWxgICYgYHR5cG9ncmFwaHkuc3R5bGAuXG4gICAgY29uc3QgbWluX3JhbmdlID0gNDgwO1xuICAgIC8vIHN0b3JlIHRoZSBtYXhpbXVtIHZpZXdwb3J0IHdpZHRoIGF0IHdoaWNoIGAtLXJhdGlvYFxuICAgIC8vIGN1c3RvbSBwcm9wZXJ0eSB3aWxsIGJlIHNldC4gdGhpcyBtdXN0IG1hdGNoIHZhbHVlc1xuICAgIC8vIHNldCBpbiBgYnJlYWtwb2ludHMuc3R5bGAgJiBgdHlwb2dyYXBoeS5zdHlsYC5cbiAgICBjb25zdCBtYXhfcmFuZ2UgPSAxNjgwO1xuICAgIC8vIGNhbGN1bGF0ZSBhbmQgc3RvcmUgdGhlIHJhdGUgYXQgd2ljaCBvdXIgcmF0aW8gY2hhbmdlc1xuICAgIC8vIHdoZW4gdGhlIHZpZXdwb3J0IHdpZHRoIGNoYW5nZXMgYnkgMXB4XG4gICAgY29uc3QgcmF0ZV9vZl9jaGFuZ2UgPSAobWF4aW11bV92YWx1ZSAtIG1pbmltdW1fdmFsdWUpIC8gKG1heF9yYW5nZSAtIG1pbl9yYW5nZSk7XG4gICAgLy8gc3RvcmUgdGhlIGludGVyY2VwdCAodGhlIHZhbHVlIG9mIFkgd2hlbiBhbGwgWD0wKVxuICAgIGNvbnN0IHZhbHVlX2F0X3ZpZXdwb3J0X3plcm8gPSBtaW5pbXVtX3ZhbHVlIC0gcmF0ZV9vZl9jaGFuZ2UgKiBtaW5fcmFuZ2U7XG4gICAgLy8gaWYgd2UgZm9sbG93IGEgbGluZWFyIHByb2dyZXNzaW9uIGZyb20gcmF0aW8gbSBhdCB2aWV3cG9ydCBNLFxuICAgIC8vIHRvIHJhdGlvIG4gYXQgdmlld3BvcnQgTiwgY2FsY3VsYXRlIGFuZCBzdG9yZSB0aGUgcmF0aW8gYXQgdmlld3BvcnQgWFxuICAgIGNvbnN0IGludGVycG9sYXRlZF9yYXRpbyA9IGN1cnJlbnRfdmlld3BvcnRfd2lkdGggKiByYXRlX29mX2NoYW5nZSArIHZhbHVlX2F0X3ZpZXdwb3J0X3plcm87XG4gICAgLy8gdXNlIGBpbnRlcnBvbGF0ZWRfcmF0aW9gIHZhbHVlIGlmIGl0J3Mgd2l0aGluIHJhbmdlLlxuICAgIC8vIGlmIGl0IHdvdWxkIGJlIHNtYWxsZXIgdGhhbiB0aGUgc21hbGxlc3QgYWNjZXB0YWJsZSByYXRpbywgdXNlIHRoZSBzbWFsbGVzdC5cbiAgICAvLyBpZiBpdCB3b3VsZCBiZSBsYXJnZXIgdGhhbiB0aGUgbGFyZ2VzdCBhY2NlcHRhYmxlIHJhdGlvLCB1c2UgdGhlIGxhcmdlc3QuXG4gICAgY29uc3QgYm91bmRlZF9yYXRpbyA9IE1hdGgubWF4KG1pbmltdW1fdmFsdWUsIE1hdGgubWluKGludGVycG9sYXRlZF9yYXRpbywgbWF4aW11bV92YWx1ZSkpO1xuICAgIC8vIHN0b3JlIGZpbmFsIHJhdGlvIGluIENTUyBjdXN0b20gcHJvcGVydHkgYC0tcmF0aW9gXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwiLS1yYXRpb1wiLCBib3VuZGVkX3JhdGlvKTtcbn1cbi8qXG4gICAgaW50ZXJwb2xhdGUgYmV0d2VlbiB0eXBlIHJhdGlvIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLFxuICAgIGFuZCBzdG9yZSB0aGUgcmVzdWx0IGluIGEgQ1NTIGN1c3RvbSBwcm9wZXJ0eVxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBzdG9yZSB0aGUgbG93ZXN0IHJhdGlvIHRvIHVzZSBmb3Igb3VyIHR5cG9ncmFwaGljIHNjYWxlLlxuICAgIC8vIFRoaXMgbXVzdCBtYXRjaCB0aGUgdmFsdWUgc2V0IGluIGB0eXBvZ3JhcGhpYy12YXJpYWJsZXMuc3R5bGAuXG4gICAgY29uc3QgdHlwZV9yYXRpb19sb3cgPSAxLjEyNTtcbiAgICAvLyBzdG9yZSB0aGUgaGlnaGVzdCByYXRpbyB0byB1c2UgZm9yIG91ciB0eXBvZ3JhcGhpYyBzY2FsZS5cbiAgICAvLyBUaGlzIG11c3QgbWF0Y2ggdGhlIHZhbHVlIHNldCBpbiBgdHlwb2dyYXBoaWMtdmFyaWFibGVzLnN0eWxgLlxuICAgIGNvbnN0IHR5cGVfcmF0aW9faGlnaCA9IDEuMjg7XG4gICAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgdmlld3BvcnQgd2lkdGhcbiAgICBjb25zdCBzY3JlZW5fd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAvLyBhcHBseSB0aGUgcmF0aW8gc2NhbGluZyBmdW5jdGlvbiwgdG8gYXBwbHlcbiAgICAvLyB0aGUgcmF0aW8gZm9yIHRoZSBjdXJyZW50IHZpZXdwb3J0IHdpZHRoXG4gICAgc2NhbGVfcmF0aW8oc2NyZWVuX3dpZHRoLCB0eXBlX3JhdGlvX2xvdywgdHlwZV9yYXRpb19oaWdoKTtcbiAgICAvLyB3YXRjaCBmb3IgY2hhbmdlIGluIHRoZSB2aWV3cG9ydCB3aWR0aFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgICAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgdmlld3BvcnQgd2lkdGhcbiAgICAgICAgY29uc3Qgc2NyZWVuX3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIC8vIHJlY2FsY3VsYXRlIHJhdGlvIHdoZW4gY2hhbmdlIGlzIGRldGVjdGVkXG4gICAgICAgIHNjYWxlX3JhdGlvKHNjcmVlbl93aWR0aCwgdHlwZV9yYXRpb19sb3csIHR5cGVfcmF0aW9faGlnaCk7XG4gICAgfSk7XG59XG4iXX0=
