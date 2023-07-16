import template from "../Templates/pi-color-scheme-switcher.template.html?raw";
import { SwitcherAttr } from "../Types/SwitcherAttr";
import { AttrDefaults } from "../Types/AttrDefaults";
import { LightDark } from "../Types/LightDark";

export default class PiColorSchemeSwitcher extends HTMLElement {
  public static observedAttributes: SwitcherAttr[] = [
    "attrname",
    "element",
    "storagekey",
    "requesturl",
  ];
  public shadowRoot: ShadowRoot;

  private DEFAULTS: AttrDefaults = {
    attrname: "color-scheme",
    element: "html",
    requesturl: "",
    storagekey: "color-scheme",
  };

  public additionalHeaders: Record<string, any> = {};

  private _storagekey: string = this.DEFAULTS.storagekey;
  public get storagekey(): string {
    return this._storagekey;
  }
  public set storagekey(v: string) {
    this._storagekey = v;
  }

  private _attrname: string = this.DEFAULTS.attrname;
  public get attrname(): string {
    return this._attrname;
  }
  public set attrname(v: string) {
    this._attrname = v;
  }

  private _element: string = this.DEFAULTS.element;
  public get element(): HTMLElement {
    return document.querySelector<HTMLElement>(this._element)!;
  }
  public set element(v: string) {
    this._element = v;
  }

  private _requesturl: string = this.DEFAULTS.requesturl;
  public get requesturl(): string {
    return this._requesturl;
  }
  public set requesturl(v: string) {
    this._requesturl = v;
  }

  private _light: boolean;
  public get light(): boolean {
    return this._light;
  }
  public set light(v: boolean) {
    this._light = v;
    if (v) {
      this.setAttribute("light", "");
    } else {
      this.removeAttribute("light");
    }
  }

  private _dark: boolean;
  public get dark(): boolean {
    return this._dark;
  }
  public set dark(v: boolean) {
    this._dark = v;
    if (v) {
      this.setAttribute("dark", "");
    } else {
      this.removeAttribute("dark");
    }
  }

  public get currentScheme(): LightDark {
    return this.light ? "light" : "dark";
  }

  public get alternativeScheme(): LightDark {
    return this.light ? "dark" : "light";
  }

  public get button() {
    return this.shadowRoot.querySelector<HTMLButtonElement>("button")!;
  }

  constructor() {
    super();
    this.attachTemplate();
    this.attachEventListener();
  }

  private attachTemplate() {
    this.attachShadow({ mode: "open" });
    const tmpl = document.createElement("template");
    tmpl.innerHTML = template;
    this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }

  private attachEventListener() {
    this.button.addEventListener("click", () => {
      this.toggle();
    });
  }

  connectedCallback() {
    this.getDefaultValue();
  }

  attributeChangedCallback(name: SwitcherAttr, _: any, value: string | null) {
    // @ts-ignore
    this[name] = value || this.DEFAULTS[name];
  }

  private getDefaultValue() {
    const storageValue = this.getStorageValue();
    if (storageValue) {
      this.toggle(storageValue);
      return;
    }

    const preferation = window.matchMedia("(prefers-color-scheme: dark)");
    if (preferation.matches) {
      this.toggle("dark");
    } else {
      this.toggle("light");
    }
  }

  private getStorageValue() {
    const value = window.localStorage.getItem(this.storagekey) as LightDark;
    return value;
  }

  private setStorageValue() {
    window.localStorage.setItem(this.storagekey, this.currentScheme);
  }

  public toggle(scheme: LightDark = this.alternativeScheme) {
    this.light = scheme === "light";
    this.dark = scheme === "dark";
    this.setStorageValue();
    this.toggleElementAttribute();
    this.sendRequestToUrl();
  }

  public toggleElementAttribute() {
    this.element.setAttribute(this.attrname, this.currentScheme);
  }

  public sendRequestToUrl() {
    if (this.requesturl) {
      fetch(this.requesturl, {
        method: "POST",
        headers: {
          ...this.additionalHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [this.storagekey]: this.currentScheme }),
      });
    }
  }
}

window.customElements.define("pi-color-scheme-switcher", PiColorSchemeSwitcher);
