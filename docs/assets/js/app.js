(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict"; // import functions

var _classlist_polyfill = _interopRequireDefault(require("./modules/classlist_polyfill"));

var _foreach_polyfill = _interopRequireDefault(require("./modules/foreach_polyfill"));

var _type_ratio_interpolation = _interopRequireDefault(require("./modules/type_ratio_interpolation"));

var _back_to_top = _interopRequireDefault(require("./modules/back_to_top"));

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
/*
    Back to top button functionality with smooth scroll
    and active navigation link highlighting based on scroll position
*/

(0, _back_to_top["default"])();

},{"./modules/back_to_top":2,"./modules/classlist_polyfill":3,"./modules/foreach_polyfill":4,"./modules/type_ratio_interpolation":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/*
    Back to top button functionality with smooth scroll
    and active navigation link highlighting based on scroll position
*/
function _default() {
  document.addEventListener('DOMContentLoaded', function () {
    var backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
      // Show/hide button based on scroll position
      window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
          backToTopButton.style.display = 'block';
        } else {
          backToTopButton.style.display = 'none';
        }
      }); // Scroll to top when button is clicked

      backToTopButton.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    } // Add active state to navigation links based on scroll position


    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    window.addEventListener('scroll', function () {
      var current = '';
      sections.forEach(function (section) {
        var sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(function (link) {
        link.classList.remove('active');

        if (link.getAttribute('href') === "#".concat(current)) {
          link.classList.add('active');
        }
      });
    });
  });
}

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9hc3NldHMvanMvYXBwLmpzIiwiLi4vYXNzZXRzL2pzL21vZHVsZXMvYmFja190b190b3AuanMiLCIuLi9hc3NldHMvanMvbW9kdWxlcy9jbGFzc2xpc3RfcG9seWZpbGwuanMiLCIuLi9hc3NldHMvanMvbW9kdWxlcy9mb3JlYWNoX3BvbHlmaWxsLmpzIiwiLi4vYXNzZXRzL2pzL21vZHVsZXMvdHlwZV9yYXRpb19pbnRlcnBvbGF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsYSxDQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDZSxvQkFBWTtBQUN2QixFQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUNyRCxRQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4QixDQUF4Qjs7QUFFQSxRQUFJLGVBQUosRUFBcUI7QUFDakI7QUFDQSxNQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxZQUFXO0FBQ3pDLFlBQUksTUFBTSxDQUFDLE9BQVAsR0FBaUIsR0FBckIsRUFBMEI7QUFDdEIsVUFBQSxlQUFlLENBQUMsS0FBaEIsQ0FBc0IsT0FBdEIsR0FBZ0MsT0FBaEM7QUFDSCxTQUZELE1BRU87QUFDSCxVQUFBLGVBQWUsQ0FBQyxLQUFoQixDQUFzQixPQUF0QixHQUFnQyxNQUFoQztBQUNIO0FBQ0osT0FORCxFQUZpQixDQVVqQjs7QUFDQSxNQUFBLGVBQWUsQ0FBQyxnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVztBQUNqRCxRQUFB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O0FBTUgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbi8vIGltcG9ydCBmdW5jdGlvbnNcbmltcG9ydCBjbGFzc2xpc3RfcG9seWZpbGwgZnJvbSBcIi4vbW9kdWxlcy9jbGFzc2xpc3RfcG9seWZpbGxcIjtcbmltcG9ydCBmb3JfZWFjaF9wb2x5ZmlsbCBmcm9tIFwiLi9tb2R1bGVzL2ZvcmVhY2hfcG9seWZpbGxcIjtcbmltcG9ydCB0eXBlX3JhdGlvX2ludGVycG9sYXRpb24gZnJvbSBcIi4vbW9kdWxlcy90eXBlX3JhdGlvX2ludGVycG9sYXRpb25cIjtcbmltcG9ydCBiYWNrX3RvX3RvcCBmcm9tIFwiLi9tb2R1bGVzL2JhY2tfdG9fdG9wXCI7XG4vKlxuICAgIHBvbHlmaWxsIHRvIGVuYWJsZSB1c2Ugb2YgZm9yRWFjaCBvbiBub2RlIGxpc3RzIGluIElFMTFcbiovXG5mb3JfZWFjaF9wb2x5ZmlsbCgpO1xuLypcbiAgICBwb2x5ZmlsbCB0byBhbGxvdyB1c2Ugb2YgcmVwbGFjZSBtZXRob2RcbiAgICBvbiBhIGNsYXNzTGlzdCBpbiBpbnRlcm5ldCBleHBsb3JlclxuKi9cbmNsYXNzbGlzdF9wb2x5ZmlsbCgpO1xuLypcbiAgICBpbnRlcnBvbGF0ZSBiZXR3ZWVuIHR5cGUgcmF0aW8gbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMsXG4gICAgYW5kIHN0b3JlIHRoZSByZXN1bHQgaW4gYSBDU1MgY3VzdG9tIHByb3BlcnR5XG4qL1xudHlwZV9yYXRpb19pbnRlcnBvbGF0aW9uKCk7XG4vKlxuICAgIEJhY2sgdG8gdG9wIGJ1dHRvbiBmdW5jdGlvbmFsaXR5IHdpdGggc21vb3RoIHNjcm9sbFxuICAgIGFuZCBhY3RpdmUgbmF2aWdhdGlvbiBsaW5rIGhpZ2hsaWdodGluZyBiYXNlZCBvbiBzY3JvbGwgcG9zaXRpb25cbiovXG5iYWNrX3RvX3RvcCgpOyIsIi8qXG4gICAgQmFjayB0byB0b3AgYnV0dG9uIGZ1bmN0aW9uYWxpdHkgd2l0aCBzbW9vdGggc2Nyb2xsXG4gICAgYW5kIGFjdGl2ZSBuYXZpZ2F0aW9uIGxpbmsgaGlnaGxpZ2h0aW5nIGJhc2VkIG9uIHNjcm9sbCBwb3NpdGlvblxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGJhY2tUb1RvcEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrVG9Ub3AnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChiYWNrVG9Ub3BCdXR0b24pIHtcbiAgICAgICAgICAgIC8vIFNob3cvaGlkZSBidXR0b24gYmFzZWQgb24gc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tUb1RvcEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBiYWNrVG9Ub3BCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gU2Nyb2xsIHRvIHRvcCB3aGVuIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICAgICAgICBiYWNrVG9Ub3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCBhY3RpdmUgc3RhdGUgdG8gbmF2aWdhdGlvbiBsaW5rcyBiYXNlZCBvbiBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgY29uc3Qgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzZWN0aW9uW2lkXScpO1xuICAgICAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uYXYtbGlua1tocmVmXj1cIiNcIl0nKTtcbiAgICAgICAgXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gJyc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvblRvcCA9IHNlY3Rpb24ub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+PSAoc2VjdGlvblRvcCAtIDIwMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJykgPT09IGAjJHtjdXJyZW50fWApIHtcbiAgICAgICAgICAgICAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59IiwiLypcbiAgICBwb2x5ZmlsbCB0byBhbGxvdyB1c2Ugb2YgcmVwbGFjZSBtZXRob2Qgb24gYSBjbGFzc0xpc3QgaW4gaW50ZXJuZXQgZXhwbG9yZXJcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCEoXCJyZXBsYWNlXCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIikuY2xhc3NMaXN0KSkge1xuICAgICAgICBET01Ub2tlbkxpc3QucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAodG9rZW4sIHJlcGxhY2VtZW50VG9rZW4pIHtcbiAgICAgICAgICAgIGxldCB0b2tlbnMgPSB0aGlzLnRvU3RyaW5nKCkuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggID0gdG9rZW5zLmluZGV4T2YodG9rZW4gKyBcIlwiKTtcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0b2tlbnMgPSB0b2tlbnMuc2xpY2UoaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlLmFwcGx5KHRoaXMsIHRva2Vucyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQocmVwbGFjZW1lbnRUb2tlbik7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQuYXBwbHkodGhpcywgdG9rZW5zLnNsaWNlKDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCIvKlxuICAgIHBvbHlmaWxsIHRvIGVuYWJsZSB1c2Ugb2YgZm9yRWFjaCBvbiBub2RlIGxpc3RzIGluIElFMTFcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFwiTm9kZUxpc3RcIiBpbiB3aW5kb3cgJiYgIU5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoKSB7XG4gICAgICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgICAgICB0aGlzQXJnID0gdGhpc0FyZyB8fCB3aW5kb3c7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImZ1bmN0aW9uIHNjYWxlX3JhdGlvIChjdXJyZW50X3ZpZXdwb3J0X3dpZHRoLCBtaW5pbXVtX3ZhbHVlLCBtYXhpbXVtX3ZhbHVlKSB7XG4gICAgLy8gc3RvcmUgdGhlIG1pbmltdW0gdmlld3BvcnQgd2lkdGggYXQgd2hpY2ggYC0tcmF0aW9gXG4gICAgLy8gY3VzdG9tIHByb3BlcnR5IHdpbGwgYmUgc2V0LiB0aGlzIG11c3QgbWF0Y2ggdmFsdWVzXG4gICAgLy8gc2V0IGluIGBicmVha3BvaW50cy5zdHlsYCAmIGB0eXBvZ3JhcGh5LnN0eWxgLlxuICAgIGNvbnN0IG1pbl9yYW5nZSA9IDQ4MDtcbiAgICAvLyBzdG9yZSB0aGUgbWF4aW11bSB2aWV3cG9ydCB3aWR0aCBhdCB3aGljaCBgLS1yYXRpb2BcbiAgICAvLyBjdXN0b20gcHJvcGVydHkgd2lsbCBiZSBzZXQuIHRoaXMgbXVzdCBtYXRjaCB2YWx1ZXNcbiAgICAvLyBzZXQgaW4gYGJyZWFrcG9pbnRzLnN0eWxgICYgYHR5cG9ncmFwaHkuc3R5bGAuXG4gICAgY29uc3QgbWF4X3JhbmdlID0gMTY4MDtcbiAgICAvLyBjYWxjdWxhdGUgYW5kIHN0b3JlIHRoZSByYXRlIGF0IHdpY2ggb3VyIHJhdGlvIGNoYW5nZXNcbiAgICAvLyB3aGVuIHRoZSB2aWV3cG9ydCB3aWR0aCBjaGFuZ2VzIGJ5IDFweFxuICAgIGNvbnN0IHJhdGVfb2ZfY2hhbmdlID0gKG1heGltdW1fdmFsdWUgLSBtaW5pbXVtX3ZhbHVlKSAvIChtYXhfcmFuZ2UgLSBtaW5fcmFuZ2UpO1xuICAgIC8vIHN0b3JlIHRoZSBpbnRlcmNlcHQgKHRoZSB2YWx1ZSBvZiBZIHdoZW4gYWxsIFg9MClcbiAgICBjb25zdCB2YWx1ZV9hdF92aWV3cG9ydF96ZXJvID0gbWluaW11bV92YWx1ZSAtIHJhdGVfb2ZfY2hhbmdlICogbWluX3JhbmdlO1xuICAgIC8vIGlmIHdlIGZvbGxvdyBhIGxpbmVhciBwcm9ncmVzc2lvbiBmcm9tIHJhdGlvIG0gYXQgdmlld3BvcnQgTSxcbiAgICAvLyB0byByYXRpbyBuIGF0IHZpZXdwb3J0IE4sIGNhbGN1bGF0ZSBhbmQgc3RvcmUgdGhlIHJhdGlvIGF0IHZpZXdwb3J0IFhcbiAgICBjb25zdCBpbnRlcnBvbGF0ZWRfcmF0aW8gPSBjdXJyZW50X3ZpZXdwb3J0X3dpZHRoICogcmF0ZV9vZl9jaGFuZ2UgKyB2YWx1ZV9hdF92aWV3cG9ydF96ZXJvO1xuICAgIC8vIHVzZSBgaW50ZXJwb2xhdGVkX3JhdGlvYCB2YWx1ZSBpZiBpdCdzIHdpdGhpbiByYW5nZS5cbiAgICAvLyBpZiBpdCB3b3VsZCBiZSBzbWFsbGVyIHRoYW4gdGhlIHNtYWxsZXN0IGFjY2VwdGFibGUgcmF0aW8sIHVzZSB0aGUgc21hbGxlc3QuXG4gICAgLy8gaWYgaXQgd291bGQgYmUgbGFyZ2VyIHRoYW4gdGhlIGxhcmdlc3QgYWNjZXB0YWJsZSByYXRpbywgdXNlIHRoZSBsYXJnZXN0LlxuICAgIGNvbnN0IGJvdW5kZWRfcmF0aW8gPSBNYXRoLm1heChtaW5pbXVtX3ZhbHVlLCBNYXRoLm1pbihpbnRlcnBvbGF0ZWRfcmF0aW8sIG1heGltdW1fdmFsdWUpKTtcbiAgICAvLyBzdG9yZSBmaW5hbCByYXRpbyBpbiBDU1MgY3VzdG9tIHByb3BlcnR5IGAtLXJhdGlvYFxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcmF0aW9cIiwgYm91bmRlZF9yYXRpbyk7XG59XG4vKlxuICAgIGludGVycG9sYXRlIGJldHdlZW4gdHlwZSByYXRpbyBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcyxcbiAgICBhbmQgc3RvcmUgdGhlIHJlc3VsdCBpbiBhIENTUyBjdXN0b20gcHJvcGVydHlcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gc3RvcmUgdGhlIGxvd2VzdCByYXRpbyB0byB1c2UgZm9yIG91ciB0eXBvZ3JhcGhpYyBzY2FsZS5cbiAgICAvLyBUaGlzIG11c3QgbWF0Y2ggdGhlIHZhbHVlIHNldCBpbiBgdHlwb2dyYXBoaWMtdmFyaWFibGVzLnN0eWxgLlxuICAgIGNvbnN0IHR5cGVfcmF0aW9fbG93ID0gMS4xMjU7XG4gICAgLy8gc3RvcmUgdGhlIGhpZ2hlc3QgcmF0aW8gdG8gdXNlIGZvciBvdXIgdHlwb2dyYXBoaWMgc2NhbGUuXG4gICAgLy8gVGhpcyBtdXN0IG1hdGNoIHRoZSB2YWx1ZSBzZXQgaW4gYHR5cG9ncmFwaGljLXZhcmlhYmxlcy5zdHlsYC5cbiAgICBjb25zdCB0eXBlX3JhdGlvX2hpZ2ggPSAxLjI4O1xuICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IHZpZXdwb3J0IHdpZHRoXG4gICAgY29uc3Qgc2NyZWVuX3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgLy8gYXBwbHkgdGhlIHJhdGlvIHNjYWxpbmcgZnVuY3Rpb24sIHRvIGFwcGx5XG4gICAgLy8gdGhlIHJhdGlvIGZvciB0aGUgY3VycmVudCB2aWV3cG9ydCB3aWR0aFxuICAgIHNjYWxlX3JhdGlvKHNjcmVlbl93aWR0aCwgdHlwZV9yYXRpb19sb3csIHR5cGVfcmF0aW9faGlnaCk7XG4gICAgLy8gd2F0Y2ggZm9yIGNoYW5nZSBpbiB0aGUgdmlld3BvcnQgd2lkdGhcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IHZpZXdwb3J0IHdpZHRoXG4gICAgICAgIGNvbnN0IHNjcmVlbl93aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAvLyByZWNhbGN1bGF0ZSByYXRpbyB3aGVuIGNoYW5nZSBpcyBkZXRlY3RlZFxuICAgICAgICBzY2FsZV9yYXRpbyhzY3JlZW5fd2lkdGgsIHR5cGVfcmF0aW9fbG93LCB0eXBlX3JhdGlvX2hpZ2gpO1xuICAgIH0pO1xufVxuIl19
