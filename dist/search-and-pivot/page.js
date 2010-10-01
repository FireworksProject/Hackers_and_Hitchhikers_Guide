/*jslint
onevar: true,
undef: true,
nomen: true,
eqeqeq: true,
plusplus: true,
bitwise: true,
regexp: true,
immed: true,
strict: true,
laxbreak: true
*/

/*global window: false */

"use strict";

(function (window) {
    // Hide jQuery for security and cleanliness.
  var j = window.jQuery.noConflict(true)

    // 'global' ref to jQuery window
    , jwin = j(window)

    // safe shortcut
    , setTimeout = window.setTimeout

    // 'global' components
    , comp = {}

    // the ready promise
    , ready
    ;

  // ### Construct a new promise.
  // Params:
  //   {Function} init Called to initialize the promise.
  function promise(init) {
      // Shortcuts
    var unresolved = 'unresolved', fulfilled = 'fulfilled', smashed = 'smashed'
      , aps = Array.prototype.slice

      // Carries the internal state of this promise.
      , status = unresolved

      // Progress reports.
      , reports = []

      // The outcome of the fillfilled promise (an array of arguments).
      , outcome

      // List of callbacks waiting for fulfillment.
      , waiting = []

      // List of callbacks waiting for an error.
      , dreading = []

      // List of callbacks listening for progress reports.
      , watching = []
      ;

    // The proper way to call a callback.
    function callback(fn, args) {
      try {
        fn.apply(null, args);
      } catch (e) {
        // Report a callback error after it can no longer get in our way.
        setTimeout(function () { throw e; }, 0);
      }
    }

    // Broadcast to a list of callbacks.
    function broadcast(callbacks, args) {
      var i = 0;
      for (; i < callbacks.length; i += 1) {
        callback(callbacks[i], args);
      }
    }

    // Resolve this promise.
    function resolve(deed, args) {
      if (status !== unresolved) {
        throw {
          name: 'PromiseError'
        , message: 'This promise has already been resolved: '+ status
        };
      }

      broadcast(
          deed === fulfilled ? waiting : dreading
        , outcome = args
        );
      waiting = null; dreading = null; status = deed;
    }

    // Add a callback to the waiting or dreading list.
    function add_fn(deed, fn) {
      if (typeof fn !== 'function') { return; }

      if (status !== unresolved) { callback(fn, outcome); return; }

      (deed === fulfilled ? waiting : dreading).push(fn);
    }

    // Create a new public function representing this promise.
    function pub() {
      return function (fn_fulfill, fn_smashed, fn_progress) {
        add_fn(fulfilled, fn_fulfill);
        add_fn(smashed, fn_smashed);
        if (typeof fn_progress === 'function') {
          watching.push(fn_progress);
          callback(fn_progress, [status, reports]);
        }
        return pub();
      };
    }

    // Init the promise with the private initializer function.
    init(
         function () {
           resolve(fulfilled, aps.call(arguments));
         }
       , function () {
           resolve(smashed, aps.call(arguments));
         }
       , function (report) {
           reports.push({status: status, report: report});
           broadcast(watching, [status, reports]);
         }
       );

    // Return a public promise for the caller to share with the world.
    return pub();
  }

  // Create the `ready` promise that will fire when the DOM is ready.
  ready = promise(function (fulfill, ex, prog) {
    j(function (j) { fulfill(j); });
  });

  // Create the table of contents component when
  // the `ready` promise is fulfilled.
  ready(function (j) {
    var that = {};

    // Will be a public function used to tell the toc component that a new
    // document section has been reached (usually by scrolling).
    function set_current(name) {
      var context = j('#table-of-contents');
      j('a.current', context).removeClass('current');
      j('a[href="#'+ name +'"]', context).addClass('current');
    }

    that.current = set_current;
    comp.toc = that;
  });

  // Set up the the document scrolling handler to listen for section changes in
  // the document caused by scrolling. Updates the table of contents component
  // when a change is detected.
  ready(function (j) {
      // The % of the top of the window to ignore
    var top_percent = 30

      // Collection of anchor tags. (Composed shortly after DOM ready)
      , janchors = []

      // Index pointer document section currently in the window.
      , current = 0
      ;

    // Search for and return the index of the
    // document section currently in the window.
    function search(thresh, i) {
      var janchor = janchors[i]
        , top
        ;

      if (!janchor) { return i -1; }

      top = Math.floor(janchor.offset().top);
      if (top >= thresh) {
        return i -1;
      }

      return search(thresh, i + 1);
    }

    // Locate the document section currently in the window using
    // a few shortcuts if possible. 
    function find_current(scrolltop, height) {
      var thresh = Math.floor(scrolltop + (height * (top_percent / 100)))
        , current_top = Math.floor(janchors[current].offset().top)
        , next_top
        ;

      if (current === janchors.length -1) {
        if (current_top < thresh) {
          return janchors[current].attr('name');
        }
        current = search(thresh, 0);
        return janchors[current].attr('name');
      }

      next_top = Math.floor(janchors[current +1].offset().top);
      if (current_top <= thresh && next_top >= thresh) {
        return janchors[current].attr('name');
      }

      current = search(thresh, 0);
      return janchors[current].attr('name');
    }

    // window scroll event handler.
    function onscroll() {
      var maybe_new_anchor = find_current(jwin.scrollTop(), jwin.height());

      if (maybe_new_anchor) {
        comp.toc.current(maybe_new_anchor);
      }
    }

    // We initialize with a delay to avoid positioning bugs on DOM ready.
    setTimeout(function () {
      j('a[name]').each(function (i) {
        var x = j(this);
        janchors.push(j(this));
      });
      jwin.scroll(onscroll);
      onscroll();
    }, 200);

  });
}(window));
