import { ObjectCollection } from '@foba/object-string'
import { deco, delogger }   from '@spare/deco'
import { Logger }           from '..'

const logger = Logger({ caller: 'decorator:logger', showArgs: true, showReturn: true })

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  @logger
  get distance() { return Math.sqrt(this.x ** 2 + this.y ** 2) }

  @logger
  move(dx, dy) { return this.#horizontalMove(dx).#verticalMove(dy) }

  #horizontalMove(delta) { return this.x += delta, this }

  #verticalMove(delta) { return this.y += delta, this }

  @logger
  foo(anything) { return deco(anything) }

  toString() { return `(${ this.x }, ${ this.y })`}
}

const p = new Point(3, 4)
p.move(5, 2)
p.distance |> console.log
p.foo(ObjectCollection.flopShuffle()) |> delogger