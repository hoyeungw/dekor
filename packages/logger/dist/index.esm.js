import { ros, says } from '@palett/says';
import { deco } from '@spare/deco';
import { OBJ, STR } from '@typen/enum-data-types';
import { time } from '@valjoux/timestamp-pretty';
import { Palett } from '@palett/cards';
import { HexDye } from '@palett/dye';
import { init } from '@vect/object-init';
import { Deco } from '@spare/deco-vector';
import { NONE } from '@spare/enum-brackets';
import { SP } from '@spare/enum-chars';

var _CALLING, _METHOD, _PROPERTY;
const LOGGER = 'logger',
      CALLING = 'calling',
      VALUE = 'value',
      GET = 'get',
      METHOD = 'method',
      PROPERTY = 'property';
const Colored = init([[CALLING, (_CALLING = CALLING, HexDye(Palett.grey.accent_3)(_CALLING))], [METHOD, (_METHOD = METHOD, HexDye(Palett.cyan.lighten_2)(_METHOD))], [PROPERTY, (_PROPERTY = PROPERTY, HexDye(Palett.purple.lighten_3)(_PROPERTY))]]);

const decoArgs = Deco({
  bracket: NONE,
  delim: SP
});

/**
 *
 * @param {string|Object} [p]
 * @param {string} [p.caller]
 * @param {boolean} [p.showArgs]
 * @param {boolean} [p.showReturn]
 * @return Function
 */

const Logger = p => {
  if (typeof p === OBJ) {
    var _p$caller;

    p.caller = (_p$caller = p.caller) !== null && _p$caller !== void 0 ? _p$caller : LOGGER;
  } else {
    p = {
      caller: typeof p === STR ? p : String(p),
      outcome: false,
      showArgs: false
    };
  }

  return logger.bind(p);
};
const LoggerLegacy = p => {
  if (typeof p === OBJ) {
    var _p$caller2;

    p.caller = (_p$caller2 = p.caller) !== null && _p$caller2 !== void 0 ? _p$caller2 : LOGGER;
  } else {
    p = {
      caller: typeof p === STR ? p : String(p),
      outcome: false,
      showArgs: false
    };
  }

  return loggerLegacy.bind(p);
};
function logger(context) {
  // ({ ...context }) |> delogger
  const config = this;
  const {
    key,
    descriptor
  } = context;

  if (VALUE in descriptor) {
    descriptor.value = injectLogger.call(config, METHOD, key, descriptor.value);
  }

  if (GET in descriptor) {
    descriptor.get = injectLogger.call(config, PROPERTY, key, descriptor.get);
  }

  return context;
}
function loggerLegacy(target, key, descriptor) {
  const config = this;

  if (VALUE in descriptor) {
    descriptor.value = injectLogger.call(config, METHOD, key, descriptor.value);
  }

  if (GET in descriptor) {
    descriptor.get = injectLogger.call(config, PROPERTY, key, descriptor.get);
  }

  return descriptor;
}
function injectLogger(kind, key, callable) {
  const {
    caller,
    showArgs,
    showReturn
  } = this !== null && this !== void 0 ? this : {};
  return function () {
    var _instance$constructor, _info;

    const instance = this,
          className = instance === null || instance === void 0 ? void 0 : (_instance$constructor = instance.constructor) === null || _instance$constructor === void 0 ? void 0 : _instance$constructor.name,
          callee = className ? ros(className) + '.' + ros(key) : ros(key),
          result = callable.apply(instance, arguments);
    let info = Colored[CALLING] + ' ' + Colored[kind] + ' ' + callee;
    if (kind === METHOD) info += '(' + (showArgs ? decoArgs(Array.from(arguments)) : '') + ')';
    if (showReturn) info += ' = ' + deco(result);
    _info = info, says[caller !== null && caller !== void 0 ? caller : LOGGER].p(time())(_info);
    return result;
  };
}

export { Logger, LoggerLegacy, logger, loggerLegacy };
