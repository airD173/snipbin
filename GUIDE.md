## SnipBin Guide

Here's a basic guide on how to use SnipBin and it's features!

### Syntax Highlighting

SnipBin uses [highlight.js](https://highlightjs.org/), which supports
syntax highlighting for 196 languages.

When you create a new paste, the paste's language is autodetected
through [LangMyst](https://lang.myst.rs), which is a simple wrapper
around [go-enry](https://github.com/go-enry/go-enry).

If the syntax highlighting is wrong, you can simply change the language
by editing it's file extension in the searchbar. So, for instance, if
you add a `.java` to the current URL, this webpage will be highlighted
as if the code was in java.

### Logging in

You can authorise your GitHub or GitLab account with SnipBin, allowing
you to have access to the following features:

- Viewing all the pastes you've created
- Editing your pastes
- Deleting your pastes
- Using the SnipBin API

To login, simply open up the command palette and search "Login", then
proceed with the account provider of your choice.

None of your information is public. This site uses JSON Web Tokens (JWT)
and an in-memory database which resets every ~2 hours. Data provided to
this site is exclusively used to support signing in and is not passed
to any third party services, other than via SMTP or OAuth for the purposes
of authentication.

### Keyboard Shortcuts

This website revolves around keyboard navigation. You can view the basic
keyboard shortcuts in the popout at the bottom centre of your screen at
all times.

New paste: Ctrl + M
Save paste: Ctrl + S
Edit paste: Ctrl + E
Toggle Palette: Ctrl + P/Escape

### Command Palette

All functions of this website, from logging in to creating pastes, can be
done through our powerful built-in command palette.

In case you're interested on how I made this command palette, I wrote a
[blog](https://dev.to/harshhhdev/adding-a-command-palette-to-your-website-5cpp) on
the process which goes into detail about how to go about adding this to your own
React projects.
