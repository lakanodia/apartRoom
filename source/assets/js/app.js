"use strict";
// import functions
import classlist_polyfill from "./modules/classlist_polyfill";
import for_each_polyfill from "./modules/foreach_polyfill";
import type_ratio_interpolation from "./modules/type_ratio_interpolation";
import back_to_top from "./modules/back_to_top";
/*
    polyfill to enable use of forEach on node lists in IE11
*/
for_each_polyfill();
/*
    polyfill to allow use of replace method
    on a classList in internet explorer
*/
classlist_polyfill();
/*
    interpolate between type ratio minimum and maximum values,
    and store the result in a CSS custom property
*/
type_ratio_interpolation();
/*
    Back to top button functionality with smooth scroll
    and active navigation link highlighting based on scroll position
*/
back_to_top();