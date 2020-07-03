import { ros, says } from '@palett/says'
import { deco }      from '@spare/deco'
import { Deco }      from '@spare/deco-vector'
import { NONE }      from '@spare/enum-brackets'
import { SP }        from '@spare/enum-chars'
import { OBJ, STR }  from '@typen/enum-data-types'
import { time }      from '@valjoux/timestamp-pretty'

const LOGGER = 'logger'
const decoArgs = Deco({ bracket: NONE, delim: SP })

/**
 *
 * @param {string|Object} [p]
 * @param {string} [p.caller]
 * @param {boolean} [p.showArgs]
 * @param {boolean} [p.showReturn]
 * @return Function
 */
export const ClassMethodLogger = (p) => {
  if (typeof p === OBJ) {
    if (!p.caller) p.caller = LOGGER
  } else {
    p = { caller: typeof p === STR ? p : String(p), outcome: false, showArgs: false }
  }
  return classMethodLogger.bind(p)
}

export function classMethodLogger(target, key, descriptor) {
  const { caller, showArgs, showReturn } = this ?? {}
  const origin = descriptor.value
  descriptor.value = function () {
    const
      context = this,
      className = target?.constructor?.name,
      callee = className ? ros(className) + '.' + ros(key) : ros(key),
      result = origin.apply(context, arguments)
    let info = 'calling ' + callee
    if (showArgs) info += '(' + decoArgs(Array.from(arguments)) + ')'
    if (showReturn) info += ' = ' + deco(result)
    info |> says[caller ?? LOGGER].p(time())
    return result
  }
  return descriptor
}