Code Style
==========

This is a draft document. Please [become a member](http://www.fireworksproject.com/join) and have your say about how we do.

General
-------

Use not [Yoda conditionals](http://stackoverflow.com/questions/2349378/new-programming-jargon-you-coined/2430307#2430307). Bad:
  
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

We use [comma first notation](https://gist.github.com/357981). Yeah, it's ugly. It's also a lot easier to catch bugs when you use it, and that is beautiful to us. Less bugs, less time, less money, more happy.

Python
------

See the [Google Python Style Guide](http://google-styleguide.googlecode.com/svn/trunk/pyguide.html).
