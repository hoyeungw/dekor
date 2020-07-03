import { ros, says }                                              from '@palett/says'
import { deco }                                                   from '@spare/deco'
import { OBJ, STR }                                               from '@typen/enum-data-types'
import { time }                                                   from '@valjoux/timestamp-pretty'
import { CALLING, Colored, GET, LOGGER, METHOD, PROPERTY, VALUE } from '../resources/constants'
import { decoArgs }                                               from './helpers/decoArgs'

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
    p.caller = p.caller ?? LOGGER
  } else {
    p = { caller: typeof p === STR ? p : String(p), outcome: false, showArgs: false, }
  }
  return logger.bind(p)
}

export const LoggerLegacy = (p) => {
  if (typeof p === OBJ) {
    p.caller = p.caller ?? LOGGER
  } else {
    p = { caller: typeof p === STR ? p : String(p), outcome: false, showArgs: false, }
  }
  return loggerLegacy.bind(p)
}


export function logger(context) {
  // ({ ...context }) |> delogger
  const config = this
  const { key, descriptor } = context
  if (VALUE in descriptor) { descriptor.value = injectLogger.call(config, METHOD, key, descriptor.value) }
  if (GET in descriptor) { descriptor.get = injectLogger.call(config, PROPERTY, key, descriptor.get) }
  return context
}

export function loggerLegacy(target, key, descriptor) {
  const config = this
  if (VALUE in descriptor) { descriptor.value = injectLogger.call(config, METHOD, key, descriptor.value) }
  if (GET in descriptor) { descriptor.get = injectLogger.call(config, PROPERTY, key, descriptor.get) }
  return descriptor
}

export function injectLogger(kind, key, callable) {
  const { caller, showArgs, showReturn } = this ?? {}
  return function () {
    const
      instance = this,
      className = instance?.constructor?.name,
      callee = className ? ros(className) + '.' + ros(key) : ros(key),
      result = callable.apply(instance, arguments)
    let info = Colored[CALLING] + ' ' + Colored[kind] + ' ' + callee
    if (kind === METHOD) info += '(' + (showArgs ? decoArgs(Array.from(arguments)) : '') + ')'
    if (showReturn) info += ' = ' + deco(result)
    info |> says[caller ?? LOGGER].p(time())
    return result
  }
}