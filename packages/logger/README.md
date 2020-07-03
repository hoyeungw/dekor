# @dekor/logger

[![npm version][badge-npm-version]][url-npm]
[![npm download monthly][badge-npm-download-monthly]][url-npm]
[![npm download total][badge-npm-download-total]][url-npm]
[![npm dependents][badge-npm-dependents]][url-github]
[![npm license][badge-npm-license]][url-npm]
[![pp install size][badge-pp-install-size]][url-pp]
[![github commit last][badge-github-last-commit]][url-github]
[![github commit total][badge-github-commit-count]][url-github]

[//]: <> (Shields)
[badge-npm-version]: https://flat.badgen.net/npm/v/@dekor/logger
[badge-npm-download-monthly]: https://flat.badgen.net/npm/dm/@dekor/logger
[badge-npm-download-total]:https://flat.badgen.net/npm/dt/@dekor/logger
[badge-npm-dependents]: https://flat.badgen.net/npm/dependents/@dekor/logger
[badge-npm-license]: https://flat.badgen.net/npm/license/@dekor/logger
[badge-pp-install-size]: https://flat.badgen.net/packagephobia/install/@dekor/logger
[badge-github-last-commit]: https://flat.badgen.net/github/last-commit/hoyeungw/dekor
[badge-github-commit-count]: https://flat.badgen.net/github/commits/hoyeungw/dekor

[//]: <> (Link)
[url-npm]: https://npmjs.org/package/@dekor/logger
[url-pp]: https://packagephobia.now.sh/result?p=@dekor/logger
[url-github]: https://github.com/hoyeungw/dekor

##### A decorator that logs the method or get property when it is called

#### Install
```console
$ npm install @dekor/logger
```

#### Logger vs LoggerLegacy
For those who use [@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators):

- If the decorated class contains [private methods](https://github.com/tc39/proposal-private-methods) (marked by '#'),
use LoggerLegacy, set the plugin: [ '@babel/plugin-proposal-decorators', { legacy: true } ].
because the @babel/plugin-proposal-decorators plugin under 7.10.4 version hasn't supported private fields yet.
- Otherwise, use Logger, set the plugin: [ '@babel/plugin-proposal-decorators', { legacy: false } ].

#### Usage - stage 2 mode
```js
import { Logger } from '@dekor/logger'
// if the class contains private field
// import { LoggerLegacy } from '@dekor/logger'

const logger = Logger('decorator:logger')


class Point {
  constructor(x, y) { this.x = x; this.y = y }

  @logger
  get distance() { return Math.sqrt(this.x ** 2 + this.y ** 2) }
}

const p = new Point(3, 4)
p.distance |> console.log

// console outputs:
// > [decorator:logOnCall] 18:29:49.008 calling property Point.distance
// > 10
```

#### Meta
[LICENSE (MIT)](LICENSE)
