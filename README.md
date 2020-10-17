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

# Building

1. Install the required npm packages (`npm install`)
2. Create a `mongoclient.json` file, and create a cluster, and add your link to that file.

```json
{
	"mongoconnectionid": "mongodb+srv://username:passwords@"
}
```

3. run `devStart` (`npm run devStart`)
4. Navigate to `http://localhost:5000/` in your browser.

[hatebin]: https://hatebin.com/
[pastemyst]: https://paste.myst.rs/
[pastebin]: https://pastebin.com/
[license]: https://opensource.org/licenses/MIT
[contributing]: https://github.com/harshhhdev/snip-bin/blob/main/CONTRIBUTING.md
[sponsor]: https://www.patreon.com/harshdev
[code of conduct]: https://github.com/harshhhdev/snip-bin/blob/main/CODE_OF_CONDUCT.md
