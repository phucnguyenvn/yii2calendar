/*!
 * rrule.js - Library for working with recurrence rules for calendar dates.
 * https://github.com/jkbrzt/rrule
 *
 * Copyright 2010, Jakub Roztocil and Lars Schoning
 * Licenced under the BSD licence.
 * https://github.com/jkbrzt/rrule/blob/master/LICENCE
 *
 */

/**
 *
 * Implementation of RRule.fromText() and RRule::toText().
 *
 *
 * On the client side, this file needs to be included
 * when those functions are used.
 *
 */
/* global module, define */

!function(t,e){"object"==typeof module&&module.exports?module.exports=e():"function"==typeof define&&define.amd?define([],e):t._getRRuleNLP=e()}("object"==typeof window?window:this,function(){var t=function(t,e){return-1!==t.indexOf(e)};return function(e){var s=function(t,e,s){if(this.text="",this.language=s||r,this.gettext=e||function(t){return t},this.rrule=t,this.freq=t.options.freq,this.options=t.options,this.origOptions=t.origOptions,this.origOptions.bymonthday){var n=[].concat(this.options.bymonthday),i=[].concat(this.options.bynmonthday);n.sort(),i.sort(),i.reverse(),this.bymonthday=n.concat(i),this.bymonthday.length||(this.bymonthday=null)}if(this.origOptions.byweekday){var a=this.origOptions.byweekday instanceof Array?this.origOptions.byweekday:[this.origOptions.byweekday],o=String(a);this.byweekday={allWeeks:a.filter(function(t){return!Boolean(t.n)}),someWeeks:a.filter(function(t){return Boolean(t.n)}),isWeekdays:-1!==o.indexOf("MO")&&-1!==o.indexOf("TU")&&-1!==o.indexOf("WE")&&-1!==o.indexOf("TH")&&-1!==o.indexOf("FR")&&-1===o.indexOf("SA")&&-1===o.indexOf("SU")};var h=function(t,e){return t.weekday-e.weekday};this.byweekday.allWeeks.sort(h),this.byweekday.someWeeks.sort(h),this.byweekday.allWeeks.length||(this.byweekday.allWeeks=null),this.byweekday.someWeeks.length||(this.byweekday.someWeeks=null)}else this.byweekday=null},n=["count","until","interval","byweekday","bymonthday","bymonth"];(s.IMPLEMENTED=[])[e.HOURLY]=n,s.IMPLEMENTED[e.DAILY]=["byhour"].concat(n),s.IMPLEMENTED[e.WEEKLY]=n,s.IMPLEMENTED[e.MONTHLY]=n,s.IMPLEMENTED[e.YEARLY]=["byweekno","byyearday"].concat(n),s.isFullyConvertible=function(e){if(!(e.options.freq in s.IMPLEMENTED))return!1;if(e.origOptions.until&&e.origOptions.count)return!1;for(var n in e.origOptions){if(t(["dtstart","wkst","freq"],n))return!0;if(!t(s.IMPLEMENTED[e.options.freq],n))return!1}return!0},s.prototype={constructor:s,isFullyConvertible:function(){return s.isFullyConvertible(this.rrule)},toString:function(){var t=this.gettext;if(!(this.options.freq in s.IMPLEMENTED))return t("RRule error: Unable to fully convert this rrule to text");if(this.text=[t("every")],this[e.FREQUENCIES[this.options.freq]](),this.options.until){this.add(t("until"));var n=this.options.until;this.add(this.language.monthNames[n.getMonth()]).add(n.getDate()+",").add(n.getFullYear())}else this.options.count&&this.add(t("for")).add(this.options.count).add(t(this.plural(this.options.count)?"times":"time"));return this.isFullyConvertible()||this.add(t("(~ approximate)")),this.text.join("")},HOURLY:function(){var t=this.gettext;1!==this.options.interval&&this.add(this.options.interval),this.add(t(this.plural(this.options.interval)?"hours":"hour"))},DAILY:function(){var t=this.gettext;1!==this.options.interval&&this.add(this.options.interval),this.byweekday&&this.byweekday.isWeekdays?this.add(t(this.plural(this.options.interval)?"weekdays":"weekday")):this.add(t(this.plural(this.options.interval)?"days":"day")),this.origOptions.bymonth&&(this.add(t("in")),this._bymonth()),this.bymonthday?this._bymonthday():this.byweekday?this._byweekday():this.origOptions.byhour&&this._byhour()},WEEKLY:function(){var t=this.gettext;1!==this.options.interval&&this.add(this.options.interval).add(t(this.plural(this.options.interval)?"weeks":"week")),this.byweekday&&this.byweekday.isWeekdays?1===this.options.interval?this.add(t(this.plural(this.options.interval)?"weekdays":"weekday")):this.add(t("on")).add(t("weekdays")):(1===this.options.interval&&this.add(t("week")),this.origOptions.bymonth&&(this.add(t("in")),this._bymonth()),this.bymonthday?this._bymonthday():this.byweekday&&this._byweekday())},MONTHLY:function(){var t=this.gettext;this.origOptions.bymonth?(1!==this.options.interval&&(this.add(this.options.interval).add(t("months")),this.plural(this.options.interval)&&this.add(t("in"))),this._bymonth()):(1!==this.options.interval&&this.add(this.options.interval),this.add(t(this.plural(this.options.interval)?"months":"month"))),this.bymonthday?this._bymonthday():this.byweekday&&this.byweekday.isWeekdays?this.add(t("on")).add(t("weekdays")):this.byweekday&&this._byweekday()},YEARLY:function(){var t=this.gettext;this.origOptions.bymonth?(1!==this.options.interval&&(this.add(this.options.interval),this.add(t("years"))),this._bymonth()):(1!==this.options.interval&&this.add(this.options.interval),this.add(t(this.plural(this.options.interval)?"years":"year"))),this.bymonthday?this._bymonthday():this.byweekday&&this._byweekday(),this.options.byyearday&&this.add(t("on the")).add(this.list(this.options.byyearday,this.nth,t("and"))).add(t("day")),this.options.byweekno&&this.add(t("in")).add(t(this.plural(this.options.byweekno.length)?"weeks":"week")).add(this.list(this.options.byweekno,null,t("and")))},_bymonthday:function(){var t=this.gettext;this.byweekday&&this.byweekday.allWeeks?this.add(t("on")).add(this.list(this.byweekday.allWeeks,this.weekdaytext,t("or"))).add(t("the")).add(this.list(this.bymonthday,this.nth,t("or"))):this.add(t("on the")).add(this.list(this.bymonthday,this.nth,t("and")))},_byweekday:function(){var t=this.gettext;this.byweekday.allWeeks&&!this.byweekday.isWeekdays&&this.add(t("on")).add(this.list(this.byweekday.allWeeks,this.weekdaytext)),this.byweekday.someWeeks&&(this.byweekday.allWeeks&&this.add(t("and")),this.add(t("on the")).add(this.list(this.byweekday.someWeeks,this.weekdaytext,t("and"))))},_byhour:function(){var t=this.gettext;this.add(t("at")).add(this.list(this.origOptions.byhour,null,t("and")))},_bymonth:function(){this.add(this.list(this.options.bymonth,this.monthtext,this.gettext("and")))},nth:function(t){var e,s,n=this.gettext;if(-1===t)return n("last");switch(s=Math.abs(t)){case 1:case 21:case 31:e=s+n("st");break;case 2:case 22:e=s+n("nd");break;case 3:case 23:e=s+n("rd");break;default:e=s+n("th")}return t<0?e+" "+n("last"):e},monthtext:function(t){return this.language.monthNames[t-1]},weekdaytext:function(t){var e="number"==typeof t?t:t.getJsWeekday();return(t.n?this.nth(t.n)+" ":"")+this.language.dayNames[e]},plural:function(t){return t%100!=1},add:function(t){return this.text.push(" "),this.text.push(t),this},list:function(t,e,s,n){n=n||",",e=e||function(t){return t};var i=this,a=function(t){return e.call(i,t)};return s?function(t,e,s){for(var n="",i=0;i<t.length;i++)0!==i&&(i===t.length-1?n+=" "+s+" ":n+=e+" "),n+=t[i];return n}(t.map(a),n,s):t.map(a).join(n+" ")}};var i=function(t,s){return new e(a(t,s))},a=function(t,s){function n(){var t=c.accept("on"),s=c.accept("the");if(t||s)do{var n,i,o;if(n=y())(i=h())?(c.nextSymbol(),l.byweekday||(l.byweekday=[]),l.byweekday.push(e[i].nth(n))):(l.bymonthday||(l.bymonthday=[]),l.bymonthday.push(n),c.accept("day(s)"));else if(i=h())c.nextSymbol(),l.byweekday||(l.byweekday=[]),l.byweekday.push(e[i]);else if("weekday(s)"===c.symbol)c.nextSymbol(),l.byweekday||(l.byweekday=[]),l.byweekday.push(e.MO),l.byweekday.push(e.TU),l.byweekday.push(e.WE),l.byweekday.push(e.TH),l.byweekday.push(e.FR);else if("week(s)"===c.symbol){c.nextSymbol();var r;if(!(r=c.accept("number")))throw new Error("Unexpected symbol "+c.symbol+", expected week number");for(l.byweekno=[r[0]];c.accept("comma");){if(!(r=c.accept("number")))throw new Error("Unexpected symbol "+c.symbol+"; expected monthday");l.byweekno.push(r[0])}}else{if(!(o=a()))return;c.nextSymbol(),l.bymonth||(l.bymonth=[]),l.bymonth.push(o)}}while(c.accept("comma")||c.accept("the")||c.accept("on"))}function i(){if(c.accept("at"))do{var t;if(!(t=c.accept("number")))throw new Error("Unexpected symbol "+c.symbol+", expected hour");for(l.byhour=[t[0]];c.accept("comma");){if(!(t=c.accept("number")))throw new Error("Unexpected symbol "+c.symbol+"; expected hour");l.byhour.push(t[0])}}while(c.accept("comma")||c.accept("at"))}function a(){switch(c.symbol){case"january":return 1;case"february":return 2;case"march":return 3;case"april":return 4;case"may":return 5;case"june":return 6;case"july":return 7;case"august":return 8;case"september":return 9;case"october":return 10;case"november":return 11;case"december":return 12;default:return!1}}function h(){switch(c.symbol){case"monday":case"tuesday":case"wednesday":case"thursday":case"friday":case"saturday":case"sunday":return c.symbol.substr(0,2).toUpperCase();default:return!1}}function y(){switch(c.symbol){case"last":return c.nextSymbol(),-1;case"first":return c.nextSymbol(),1;case"second":return c.nextSymbol(),c.accept("last")?-2:2;case"third":return c.nextSymbol(),c.accept("last")?-3:3;case"nth":var t=parseInt(c.value[1],10);if(t<-366||t>366)throw new Error("Nth out of range: "+t);return c.nextSymbol(),c.accept("last")?-t:t;default:return!1}}function d(){c.accept("on"),c.accept("the");var t;if(t=y())for(l.bymonthday=[t],c.nextSymbol();c.accept("comma");){if(!(t=y()))throw new Error("Unexpected symbol "+c.symbol+"; expected monthday");l.bymonthday.push(t),c.nextSymbol()}}function u(){if("until"===c.symbol){var t=Date.parse(c.text);if(!t)throw new Error("Cannot parse until date:"+c.text);l.until=new Date(t)}else c.accept("for")&&(l.count=c.value[0],c.expect("number"))}var l={},c=new o((s||r).tokens);return c.start(t)?(function(){var t;if(c.expect("every"),(t=c.accept("number"))&&(l.interval=parseInt(t[0],10)),c.isDone())throw new Error("Unexpected end");switch(c.symbol){case"day(s)":l.freq=e.DAILY,c.nextSymbol()&&(i(),u());break;case"weekday(s)":l.freq=e.WEEKLY,l.byweekday=[e.MO,e.TU,e.WE,e.TH,e.FR],c.nextSymbol(),u();break;case"week(s)":l.freq=e.WEEKLY,c.nextSymbol()&&(n(),u());break;case"hour(s)":l.freq=e.HOURLY,c.nextSymbol()&&(n(),u());break;case"month(s)":l.freq=e.MONTHLY,c.nextSymbol()&&(n(),u());break;case"year(s)":l.freq=e.YEARLY,c.nextSymbol()&&(n(),u());break;case"monday":case"tuesday":case"wednesday":case"thursday":case"friday":case"saturday":case"sunday":if(l.freq=e.WEEKLY,l.byweekday=[e[c.symbol.substr(0,2).toUpperCase()]],!c.nextSymbol())return;for(;c.accept("comma");){if(c.isDone())throw new Error("Unexpected end");var s;if(!(s=h()))throw new Error("Unexpected symbol "+c.symbol+", expected weekday");l.byweekday.push(e[s]),c.nextSymbol()}d(),u();break;case"january":case"february":case"march":case"april":case"may":case"june":case"july":case"august":case"september":case"october":case"november":case"december":if(l.freq=e.YEARLY,l.bymonth=[a()],!c.nextSymbol())return;for(;c.accept("comma");){if(c.isDone())throw new Error("Unexpected end");var o;if(!(o=a()))throw new Error("Unexpected symbol "+c.symbol+", expected month");l.bymonth.push(o),c.nextSymbol()}n(),u();break;default:throw new Error("Unknown symbol")}}(),l):null},o=function(t){this.rules=t};o.prototype.start=function(t){return this.text=t,this.done=!1,this.nextSymbol()},o.prototype.isDone=function(){return this.done&&null==this.symbol},o.prototype.nextSymbol=function(){var t,e,s=this;this.symbol=null,this.value=null;do{if(this.done)return!1;var n;t=null;for(var i in this.rules)(n=this.rules[i].exec(s.text))&&(null==t||n[0].length>t[0].length)&&(t=n,e=i);if(null!=t&&(this.text=this.text.substr(t[0].length),""===this.text&&(this.done=!0)),null==t)return this.done=!0,this.symbol=null,void(this.value=null)}while("SKIP"===e);return this.symbol=e,this.value=t,!0},o.prototype.accept=function(t){if(this.symbol===t){if(this.value){var e=this.value;return this.nextSymbol(),e}return this.nextSymbol(),!0}return!1},o.prototype.expect=function(t){if(this.accept(t))return!0;throw new Error("expected "+t+" but found "+this.symbol)};var r={dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],tokens:{SKIP:/^[ \r\n\t]+|^\.$/,number:/^[1-9][0-9]*/,numberAsText:/^(one|two|three)/i,every:/^every/i,"day(s)":/^days?/i,"weekday(s)":/^weekdays?/i,"week(s)":/^weeks?/i,"hour(s)":/^hours?/i,"month(s)":/^months?/i,"year(s)":/^years?/i,on:/^(on|in)/i,at:/^(at)/i,the:/^the/i,first:/^first/i,second:/^second/i,third:/^third/i,nth:/^([1-9][0-9]*)(\.|th|nd|rd|st)/i,last:/^last/i,for:/^for/i,"time(s)":/^times?/i,until:/^(un)?til/i,monday:/^mo(n(day)?)?/i,tuesday:/^tu(e(s(day)?)?)?/i,wednesday:/^we(d(n(esday)?)?)?/i,thursday:/^th(u(r(sday)?)?)?/i,friday:/^fr(i(day)?)?/i,saturday:/^sa(t(urday)?)?/i,sunday:/^su(n(day)?)?/i,january:/^jan(uary)?/i,february:/^feb(ruary)?/i,march:/^mar(ch)?/i,april:/^apr(il)?/i,may:/^may/i,june:/^june?/i,july:/^july?/i,august:/^aug(ust)?/i,september:/^sep(t(ember)?)?/i,october:/^oct(ober)?/i,november:/^nov(ember)?/i,december:/^dec(ember)?/i,comma:/^(,\s*|(and|or)\s*)+/i}};return{fromText:i,parseText:a,isFullyConvertible:s.isFullyConvertible,toText:function(t,e,n){return new s(t,e,n).toString()}}}});
