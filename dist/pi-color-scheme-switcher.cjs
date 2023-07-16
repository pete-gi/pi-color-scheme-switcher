"use strict";const a=`<button part="button" type="button">
  <span part="marker">
    <slot></slot>
  </span>
</button>

<style>
  :host {
    display: contents;
  }

  [part="button"] {
    min-width: 2rem;
    height: 1rem;
  }
</style>
`,s=class s extends HTMLElement{constructor(){super(),this.DEFAULTS={attrname:"color-scheme",element:"html",requesturl:"",storagekey:"color-scheme"},this.additionalHeaders={},this._storagekey=this.DEFAULTS.storagekey,this._attrname=this.DEFAULTS.attrname,this._element=this.DEFAULTS.element,this._requesturl=this.DEFAULTS.requesturl,this.attachTemplate(),this.attachEventListener()}get storagekey(){return this._storagekey}set storagekey(t){this._storagekey=t}get attrname(){return this._attrname}set attrname(t){this._attrname=t}get element(){return document.querySelector(this._element)}set element(t){this._element=t}get requesturl(){return this._requesturl}set requesturl(t){this._requesturl=t}get light(){return this._light}set light(t){this._light=t,t?this.setAttribute("light",""):this.removeAttribute("light")}get dark(){return this._dark}set dark(t){this._dark=t,t?this.setAttribute("dark",""):this.removeAttribute("dark")}get currentScheme(){return this.light?"light":"dark"}get alternativeScheme(){return this.light?"dark":"light"}get button(){return this.shadowRoot.querySelector("button")}attachTemplate(){this.attachShadow({mode:"open"});const t=document.createElement("template");t.innerHTML=a,this.shadowRoot.appendChild(t.content.cloneNode(!0))}attachEventListener(){this.button.addEventListener("click",()=>{this.toggle()})}connectedCallback(){this.getDefaultValue()}attributeChangedCallback(t,r,i){this[t]=i||this.DEFAULTS[t]}getDefaultValue(){const t=this.getStorageValue();if(t){this.toggle(t);return}window.matchMedia("(prefers-color-scheme: dark)").matches?this.toggle("dark"):this.toggle("light")}getStorageValue(){return window.localStorage.getItem(this.storagekey)}setStorageValue(){window.localStorage.setItem(this.storagekey,this.currentScheme)}toggle(t=this.alternativeScheme){this.light=t==="light",this.dark=t==="dark",this.setStorageValue(),this.toggleElementAttribute(),this.sendRequestToUrl()}toggleElementAttribute(){this.element.setAttribute(this.attrname,this.currentScheme)}sendRequestToUrl(){this.requesturl&&fetch(this.requesturl,{method:"POST",headers:{...this.additionalHeaders,"Content-Type":"application/json"},body:JSON.stringify({[this.storagekey]:this.currentScheme})})}};s.observedAttributes=["attrname","element","storagekey","requesturl"];let e=s;window.customElements.define("pi-color-scheme-switcher",e);module.exports=e;
