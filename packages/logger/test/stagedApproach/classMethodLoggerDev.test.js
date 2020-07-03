import { ObjectCollection }     from '@foba/object-string'
import { deco, delogger }       from '@spare/deco'
import { ClassMethodLoggerDev } from './classMethodLoggerDev'

const logger = ClassMethodLoggerDev({ caller: 'decorator:stage2', showArgs: true, showReturn: true })

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  @logger
  get distance() { return Math.sqrt(this.x ** 2 + this.y ** 2) }

  @logger
  horizontalMove(delta) { return this.x += delta }

  @logger
  verticalMove(delta) { return this.y += delta }

  @logger
  foo(anything) {return deco(anything)}

  toString() { return `(${ this.x },${ this.y })`}
}

const p = new Point(3, 4)
p.horizontalMove(3)
p.verticalMove(4)
p.distance |> delogger
p.foo(ObjectCollection.flopShuffle()) |> delogger