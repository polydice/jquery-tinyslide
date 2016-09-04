'use strict';

class TinySlide {
  constructor(elm, options) {
    const opts = $.extend({}, TinySlide.defaults, options);
    this.opts = opts;
    this.elm = elm;
    this.titleElms = elm.querySelectorAll(opts.title);
    this.total = this.titleElms.length || 0;
    this.currentIdx = opts.startIdx || 0;
    this.isPause = false;
    this.init(opts);
    if (opts.startIdx) {
      this.run(opts);
    }
  }

  init(opts) {
    this.setPause(opts)
        .setRestart(opts)
        .setInterval(opts);
    return this;
  }

  setPause(opts) {
    const theSlide = this;
    const $pause = opts.$pause || $(theSlide.elm);
    const $titles = $(theSlide.titleElms);
    $pause.on('mouseenter', (e) => {
      let $target = $(e.target).parents(opts.title);
      if (!$target.length) {
        $target = $(e.target);
      }
      const currentIdx = $target.index();
      theSlide.currentIdx = currentIdx;
      theSlide.isPause = true;
      theSlide.setCurrentStyle(
        $titles,
        currentIdx,
        opts.activeClass
      );
      opts.onPause(currentIdx);
    });
    return this;
  }

  setRestart(opts) {
    const theSlide = this;
    const $pause = opts.$pause || $(theSlide.elm);
    // restart event
    $pause.on('mouseleave', () => {
      theSlide.isPause = false;
      opts.onRestart(theSlide.currentIdx);
    });
    return this;
  }

  setCurrentStyle($titles, currentIdx, activeClass) {
    $titles.each((idx, title) => {
      if (idx === currentIdx) {
        $(title).addClass(activeClass);
      } else {
        $(title).removeClass(activeClass);
      }
    });
    return this;
  }

  run(opts) {
    const theSlide = this;
    const nextIdx = (theSlide.currentIdx + 1) % theSlide.total;
    this.currentIdx = nextIdx;
    const $titles = $(theSlide.elm).find(opts.title);
    this.setCurrentStyle(
      $titles,
      nextIdx,
      opts.activeClass
    );
    opts.onRotate(nextIdx);
    return this;
  }

  setInterval(opts) {
    const theSlide = this;
    const interval = opts.interval;
    setInterval(() => {
      if (!theSlide.isPause) {
        theSlide.run(opts);
      }
    }, interval);
    return this;
  }
}

TinySlide.defaults = {
  startIdx: 0,
  interval: 2000,
  title: 'li',
  $pause: null,
  activeClass: 'current',
  onPause() {},
  onRestart() {},
  onRotate() {},
};

$.fn.extend({
  tinySlide(options) {
    Array.prototype.forEach.call(this, (elm) => {
      const tinySlideIns = new TinySlide(elm, options);
      $(elm).data('tinySlide', tinySlideIns);
    });
  },
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TinySlide;
} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
  define('TinySlide', [], function () {
    return TinySlide;
  });
} else {
  window.TinySlide = TinySlide;
}

