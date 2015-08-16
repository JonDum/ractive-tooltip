#ractive-tooltip

![Tooltip in action](http://jondum.github.com/ractive-tooltip/demo/screenshot.png)

### Demo

[Live Demo](http://jondum.github.com/ractive-tooltip/demo/)

### Install

```
npm install ractive-tooltip --save
```

### Usage

Add the tooltip to your Ractive instance:

```
Ractive.extend({
    ...
    decorators: {
        tooltip: require('ractive-tooltip')
    },
    ...
});
```

Use it
```
<div decorator='tooltip:Tooltip for some {{thing}}'>I'm a {{thing}}</div>
```

Includes minimal styling under the class `.ractive-tooltip-container`. Styles are included in the javascript and added to the page on load this is ideal since a script like this is best loaded async after the initial page scripts have been loaded. If you don't want these styles in the javascript, copy src/tooltip.js and remove the `require('./styles.styl')`.

### API

Open to PRs and stuff. I'm around.


