# ldr-export-opml [![Build Status](https://travis-ci.org/azu/ldr-export-opml.svg?branch=master)](https://travis-ci.org/azu/ldr-export-opml)


Convert ldr exported json to opml with rate.

LDRのフィードデータから**レート**（☆）をカテゴリとしたOPML(XML)ファイルを作成するツールです。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install ldr-export-opml -g

## Usage

    Usage
      $ ldr-export-opml ldr.json

    Options:
    
      --output path to output
      
    Examples
      $ ldr-export-opml path/to/ldr.json
      $ cat path/to/ldr.json | ldr-export-opml 

## How to ldr.json

ldr.json is response of `http://reader.livedoor.com/api/subs?unread=0` API.

![image](https://monosnap.com/file/abUjuGNgDfX317alNW0j42p1gxM8SO.png)

0. ブラウザの開発者ツールでネットワークを開く
1. "編集"をクリック
2. `http://reader.livedoor.com/api/subs?unread=0`へのリクエストを探す
3. レスポンスをコピーして `ldr.json` として保存する

`ldr.json`にはカテゴリ、レートなどの情報が含まれています。

## 確認環境

- [x] [Inoreader](http://www.inoreader.com/ "Inoreader -")

## Changelog

See [Releases page](https://github.com/azu/ldr-export-opml/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/ldr-export-opml/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
