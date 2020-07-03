import { Palett }    from '@palett/cards'
import { HexDye }    from '@palett/dye'
import { ros, says } from '@palett/says'
import { deco }      from '@spare/deco'
import { Deco }      from '@spare/deco-vector'
import { NONE }      from '@spare/enum-brackets'
import { SP }        from '@spare/enum-chars'
import { OBJ, STR }  from '@typen/enum-data-types'
import { time }      from '@valjoux/timestamp-pretty'
import { init }      from '@vect/object-init'

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
export const Logger = (p) => {
  if (typeof p === OBJ) {
    if (!p.caller) p.caller = LOGGER
  } else {
    p = { caller: typeof p === STR ? p : String(p), outcome: false, showArgs: false }
  }
  return logger.bind(p)
}

const CALLING = 'calling', VALUE = 'value', GET = 'get', METHOD = 'method', PROPERTY = 'property'

const Pd = init([
  [CALLING, CALLING |>  HexDye(Palett.grey.accent_3)],
  [METHOD, METHOD |>  HexDye(Palett.cyan.lighten_2)],
  [PROPERTY, PROPERTY |>  HexDye(Palett.purple.lighten_3)],
])

export function logger(context) {
  // ({ ...context }) |> delogger
  const config = this
  const { key, descriptor } = context
  if (VALUE in descriptor) { descriptor.value = injectLogger.call(config, METHOD, key, descriptor.value) }
  if (GET in descriptor) { descriptor.get = injectLogger.call(config, PROPERTY, key, descriptor.get) }
  return context
}

function injectLogger(kind, key, callable) {
  const { caller, showArgs, showReturn } = this ?? {}
  return function () {
    const
      instance = this,
      className = instance?.constructor?.name,
      callee = className ? ros(className) + '.' + ros(key) : ros(key),
      result = callable.apply(instance, arguments)
    let info = Pd[CALLING] + ' ' + Pd[kind] + ' ' + callee
    if (kind === METHOD) info += '(' + (showArgs ? decoArgs(Array.from(arguments)) : '') + ')'
    if (showReturn) info += ' = ' + deco(result)
    info |> says[caller ?? LOGGER].p(time())
    return result
  }
}