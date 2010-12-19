Code Style
==========

This is a draft document. Please [become a member](http://www.fireworksproject.com/join) and have your say about how we do.

General
-------

Use not [Yoda conditionals][1]. Bad:
  
    if (true === myVar)

Good:

    if (myVar === true)

HMTL and CSS
------------

To save bandwidth, use tab indents, not spaces. This includes inline Javascript.

*Everything* else should be indented using 4 spaces.

Javascript
----------

Run all Javascript through JSLint before committing. Make a note at the top of the given file for any checks that you turn off.

Example:

    /*jslint
      browser: true
    , onevar: true
    , undef: true
    , nomen: true
    , eqeqeq: true
    , plusplus: true
    , bitwise: true
    , regexp: true
    , newcap: true
    , immed: true
    , strict: true
    , maxlen: 80
    */

We use [comma first notation][2]. Yeah, it's ugly. It's also a lot easier to catch bugs when you use it, and that is beautiful to us. Less bugs, less time, less money, more happy.

Also, contrary to many JS coding styles, we use single quotes for string literals. This is not only a stylistic decision but also that creates easier HTML string literals, a task commonly done with JS. So:

`if (typeof foo === 'function')` and `jQuery('<a href="home/page.html">')` are both correct.

Python
------

See the [Google Python Style Guide][3].

  [1]: http://stackoverflow.com/questions/2349378/new-programming-jargon-you-coined/2430307#2430307
  [2]: https://gist.github.com/357981
  [3]: http://google-styleguide.googlecode.com/svn/trunk/pyguide.html
  
