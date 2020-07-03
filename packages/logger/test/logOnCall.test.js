import { ObjectCollection } from '@foba/object-string'
import { deco, delogger }   from '@spare/deco'
import { Logger }           from '../src/logger'

const log = Logger('decorator:logOnCall')

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  @log
  get distance() { return Math.sqrt(this.x ** 2 + this.y ** 2) }

  @log
  move(dx, dy) { return this.horizontalMove(dx).verticalMove(dy) }

  @log
  horizontalMove(delta) { return this.x += delta, this }

  @log
  verticalMove(delta) { return this.y += delta, this }

  @log
  foo(anything) { return deco(anything) }

  toString() { return `(${ this.x }, ${ this.y })`}
}

const p = new Point(3, 4)
p.move(5, 2)
p.distance |> console.log
p.foo(ObjectCollection.flopShuffle()) |> delogger