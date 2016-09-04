## jquery-tinyslide

[![npm version](https://badge.fury.io/js/jquery-tinyslide.svg)](https://badge.fury.io/js/jquery-tinyslide)

Transfer multiple elements into slide in one magic. 

### Installj

```
npm install --save jquery-tinyslide
```

or 

```
bower install --save jquery-tinyslide
```

### Dependency

Since this package acts as a jQuery extension, it depends on jQuery. Be sure that you have jQuery installed properly before requiring it.

### Usage

if you install it with npm, you can just: 

```
require('jquery-tinyslide');
```

otherwise you could require your own asset management tool(ex. sprocket) if you install it with bower.

`tinyslide` now should work as expected as a jQuery extension!

Now we can register DOM element which we would like it be a slide.

```js
$(MYSLIDE).tinySlide({
  title: 'li',
  interval: 4000,
  $pause: $(SLIDE).find('li'),
  onPause(pos) {
    return changepic(pos);
  },
  onRotate(pos) {
    return changepic(pos);
  },
});
```

this block above will **turn all li element in MYSLIDE element** to have slide bebaviour and attribute.

options will be introduced in next section.

### Options

`startIdx` _number_ (default: 0)

Beginning index of toggled elements.

`interval` _number_ (default: 2000)

Interval time from one to the next.

`title` _string_ (default: 'li')

Element type of slide to be toggled.

`activeClass` _string_ (default: 'current')

Class you want to attach when element is active.

`$pause` _DOM Element_ (default: null)

Set the controll element for controlling lifecycle of the slide. Pause when mouseenter event is triggered, and restart when mouseleave evnet is triggered,

`onPause(position)` _function_

It will be triggered when slide pause. 

`onRestart(position)` _function_

It will be triggered when slide restart.

`onRotate(position)` _function_

It will be triggered when slide finish one rotate.

### Test

`npm test`

### Demo

Check our simple [sample](https://github.com/polydice/jquery-tinyslide/tree/master/sample).

### Contribute

PR, issue and advice are always welcome.

### Lisence

Check lisence [here](https://github.com/polydice/jquery-tinyslide/blob/master/LICENSE).


