var l=Object.defineProperty;var a=(s,e,t)=>e in s?l(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var d=(s,e,t)=>a(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();class r{static init(){window.addEventListener("resize",this.checkScreenSize),this.checkScreenSize()}static checkScreenSize(){const e=window.innerWidth;let t;e<=768?t="small":e<=1024?t="medium":t="large",t!==this.currentSize&&(this.currentSize=t,window.dispatchEvent(new CustomEvent("screenSizeChange",{detail:t})))}}d(r,"currentSize",null);class u{static init(){window.addEventListener("screenSizeChange",t=>{t.detail==="small"?this.hideContent():this.showContent(),r.checkScreenSize()}),r.currentSize==="small"?this.hideContent():this.showContent()}static hideContent(){document.getElementById("unsupported-device").classList.remove("hidden"),document.querySelectorAll("[d-c='page-content']").forEach(e=>{e.classList.add("hidden")})}static showContent(){document.getElementById("unsupported-device").classList.add("hidden"),document.querySelectorAll("[d-c='page-content']").forEach(e=>{e.classList.remove("hidden")})}}r.init();u.init();