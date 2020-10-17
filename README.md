# snip-bin

A blazing fast, lightweight, open-source and elegant alternative to PasteBin.

# About

I'm tired of using PasteBin for sharing code, it's absolutely littered with ads, bad UI, and don't even mention the light theme...

This was my main motivation behind this project, I was going to combine all the features from my favourite code pasting websites ([HateBin], [PasteMyst], and sadly, [PasteBin]), and turn them into a large, open-source, and customizible paste website.

# Important

- [License]
- [Contributing]
- [Sponsor]
- [Code of Conduct]

# Getting started

## Prequistes
  - [npm]
  
## Installation

  - Clone the repository `https://github.com/harshhhdev/snip-bin.git`
  - Install the needed npm pacakges `npm install`
  - Create a new cluster at [MongoDB atlas]
  - Create a new file called `mongoclient.json`
  - Copy paste this in, and put in your Mongo database connection.

```json
{
	"mongoconnectionid": "mongodb+srv://username:passwords@"
}
```
  - Run nodemon. (`npm run devStart`)
  - Navigate to [localhost:5000] in your browser.

# Built with

 - [MongoDB]
 - [Express.js]
 - [Node.js]
 - [Love]
 - [Sass]
 

[hatebin]: https://hatebin.com/
[pastemyst]: https://paste.myst.rs/
[pastebin]: https://pastebin.com/
[license]: https://opensource.org/licenses/MIT
[contributing]: https://github.com/harshhhdev/snip-bin/blob/main/CONTRIBUTING.md
[sponsor]: https://www.patreon.com/harshdev
[code of conduct]: https://github.com/harshhhdev/snip-bin/blob/main/CODE_OF_CONDUCT.md
[npm]: https://www.npmjs.com/get-npm
[MongoDB atlas]: https://cloud.mongodb.com/
[localhost:5000]: http://localhost:5000/
[MongoDB]: https://mongodb.org/
[Express.js]: https://expressjs.com/
[Node.js]: https://nodejs.org/en/
[Love]: https://www.dictionary.com/browse/love
[Sass]: https://sass-lang.com/
