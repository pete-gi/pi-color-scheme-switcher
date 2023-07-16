# PiColorSchemeSwitcher

Simple color scheme switcher for your site.
When connected to the DOM, checks if `LocalStorage` has the value with current scheme (by given key, look at the available attributes).
If no value is found in the `LocalStorage`, checks the media `prefers-color-scheme`.

Default styling is just button with specified `min-width` and `height`. To style the button on your own, look at the `Parts and slots` section to see how the element is structured.
By default, if you place the code in your HTML, the start of your document will look like:

```
<html color-scheme="dark"></html>`
```

## Requirements

Node v16+ if you'd like to build the component.

CustomElement doesn't have any dependencies other than `vite` used to build things up (devDep only).

## Instalation

```
npm install @petegi/pi-color-scheme-switcher
```

## Usage

```
// Include the script
import "path-to-@petegi/pi-color-scheme-switcher"
// or
<script src="path-to-@petegi/pi-color-scheme-switcher"></script>

// Use in your HTML
<pi-color-scheme-switcher></pi-color-scheme-switcher>
```

## Elements

| Name                     | Description           |
| ------------------------ | --------------------- |
| pi-color-scheme-switcher | Main and only element |

### Attributes

| Name         | Type   | Default        | Description                                                                                   |
| ------------ | ------ | -------------- | --------------------------------------------------------------------------------------------- |
| element      | string | 'head'         | Selector for element that should get attribute with value of current color scheme             |
| attrname     | string | 'color-scheme' | Name of te attribute that will be given to the `elemenet` with the value of color scheme      |
| storagekey   | string | 'color-scheme' | Name of the field to be used in `LocalStorage`                                                |
| requesturl\* | string | ''             | URL to make request with currently selected theme (sends `{ [attrname]: "light" or "dark" }`) |

\*CustomElement will not send anything if `requesturl` is not specified

### Special attributes

CustomElements spec doesn't give the ability to specify custom pseudoclasses, so these attributes show what current scheme is.

They **should not** be used in any other way than in CSS to style the element.

| Name  | Description                   |
| ----- | ----------------------------- |
| light | Current color scheme is light |
| dark  | Current color scheme is dark  |

### Properties

| Name              | Type   | Default | Description                                     |
| ----------------- | ------ | ------- | ----------------------------------------------- |
| additionalHeaders | Object | {}      | Additional headers to be sent with each request |

To use these properties, grab the element (e.g. using `querySelector`) and do it like:

```
const switcher = document.querySelector('.color-switcher');
switcher.additionalHeaders = { /* your custom headers */ }
```

### Parts and slots

Custom Element parts are useful for styling the components's inner elements.
Slots on the other hand, are used to place your content inside them.

PiColorSchemeSwitcher allows you to style all of the elements on your own.
Below you can see how the component is built, with all of it's parts and slots.

#### pi-select

```
<button part="button" type="button">
  <span part="marker">
    <slot></slot>
  </span>
</button>
```

## Licence

MIT
