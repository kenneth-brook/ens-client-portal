!/**
 * Highcharts JS v11.4.0 (2024-03-04)
 *
 * (c) 2009-2024 Highsoft AS
 *
 * License: www.highcharts.com/license
 */function(o){"object"==typeof module&&module.exports?(o.default=o,module.exports=o):"function"==typeof define&&define.amd?define("highcharts/themes/high-contrast-dark",["highcharts"],function(r){return o(r),o.Highcharts=r,o}):o("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(o){"use strict";var r=o?o._modules:{};function l(o,r,l,e){o.hasOwnProperty(r)||(o[r]=e.apply(null,l),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:r,module:o[r]}})))}l(r,"Extensions/Themes/HighContrastDark.js",[r["Core/Defaults.js"]],function(o){var r;let{setOptions:l}=o;return function(o){let r="#F0F0F3";o.options={colors:["#67B9EE","#CEEDA5","#9F6AE1","#FEA26E","#6BA48F","#EA3535","#8D96B7","#ECCA15","#20AA09","#E0C3E4"],chart:{backgroundColor:"#1f1f20",plotBorderColor:"#606063"},title:{style:{color:r}},subtitle:{style:{color:r}},xAxis:{gridLineColor:"#707073",labels:{style:{color:r}},lineColor:"#707073",minorGridLineColor:"#505053",tickColor:"#707073",title:{style:{color:r}}},yAxis:{gridLineColor:"#707073",labels:{style:{color:r}},lineColor:"#707073",minorGridLineColor:"#505053",tickColor:"#707073",title:{style:{color:r}}},tooltip:{backgroundColor:"rgba(0, 0, 0, 0.85)",style:{color:r}},plotOptions:{series:{dataLabels:{color:r},marker:{lineColor:"#333"}},boxplot:{fillColor:"#505053"},candlestick:{lineColor:"white"},errorbar:{color:"white"},map:{nullColor:"#353535"}},legend:{backgroundColor:"transparent",itemStyle:{color:r},itemHoverStyle:{color:"#FFF"},itemHiddenStyle:{color:"#606063"},title:{style:{color:"#D0D0D0"}}},credits:{style:{color:r}},drilldown:{activeAxisLabelStyle:{color:r},activeDataLabelStyle:{color:r}},navigation:{buttonOptions:{symbolStroke:"#DDDDDD",theme:{fill:"#505053"}}},rangeSelector:{buttonTheme:{fill:"#505053",stroke:"#000000",style:{color:"#eee"},states:{hover:{fill:"#707073",stroke:"#000000",style:{color:r}},select:{fill:"#303030",stroke:"#101010",style:{color:r}}}},inputBoxBorderColor:"#505053",inputStyle:{backgroundColor:"#333",color:r},labelStyle:{color:r}},navigator:{handles:{backgroundColor:"#666",borderColor:"#AAA"},outlineColor:"#CCC",maskFill:"rgba(180,180,255,0.2)",series:{color:"#7798BF",lineColor:"#A6C7ED"},xAxis:{gridLineColor:"#505053"}},scrollbar:{barBackgroundColor:"#808083",barBorderColor:"#808083",buttonArrowColor:"#CCC",buttonBackgroundColor:"#606063",buttonBorderColor:"#606063",rifleColor:"#FFF",trackBackgroundColor:"#404043",trackBorderColor:"#404043"}},o.apply=function(){l(o.options)}}(r||(r={})),r}),l(r,"masters/themes/high-contrast-dark.src.js",[r["Core/Globals.js"],r["Extensions/Themes/HighContrastDark.js"]],function(o,r){return o.theme=r.options,r.apply(),o})});