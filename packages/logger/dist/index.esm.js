import { Palett } from '@palett/cards';
import { HexDye } from '@palett/dye';
import { ros, says } from '@palett/says';
import { deco } from '@spare/deco';
import { Deco } from '@spare/deco-vector';
import { NONE } from '@spare/enum-brackets';
import { SP } from '@spare/enum-chars';
import { OBJ, STR } from '@typen/enum-data-types';
import { time } from '@valjoux/timestamp-pretty';
import { init } from '@vect/object-init';

var _CALLING, _METHOD, _PROPERTY;
const LOGGER = 'logger';
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
    if (!p.caller) p.caller = LOGGER;
  } else {
    p = {
      caller: typeof p === STR ? p : String(p),
      outcome: false,
      showArgs: false
    };
  }

  return logger.bind(p);
};
const CALLING = 'calling',
      VALUE = 'value',
      GET = 'get',
      METHOD = 'method',
      PROPERTY = 'property';
const Pd = init([[CALLING, (_CALLING = CALLING, HexDye(Palett.grey.accent_3)(_CALLING))], [METHOD, (_METHOD = METHOD, HexDye(Palett.cyan.lighten_2)(_METHOD))], [PROPERTY, (_PROPERTY = PROPERTY, HexDye(Palett.purple.lighten_3)(_PROPERTY))]]);
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
    let info = Pd[CALLING] + ' ' + Pd[kind] + ' ' + callee;
    if (kind === METHOD) info += '(' + (showArgs ? decoArgs(Array.from(arguments)) : '') + ')';
    if (showReturn) info += ' = ' + deco(result);
    _info = info, says[caller !== null && caller !== void 0 ? caller : LOGGER].p(time())(_info);
    return result;
  };
}

export { Logger };
