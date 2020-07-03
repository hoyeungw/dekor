'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var says = require('@palett/says');
var deco = require('@spare/deco');
var enumDataTypes = require('@typen/enum-data-types');
var timestampPretty = require('@valjoux/timestamp-pretty');
var cards = require('@palett/cards');
var dye = require('@palett/dye');
var objectInit = require('@vect/object-init');
var decoVector = require('@spare/deco-vector');
var enumBrackets = require('@spare/enum-brackets');
var enumChars = require('@spare/enum-chars');

var _CALLING, _METHOD, _PROPERTY;
const LOGGER = 'logger',
      CALLING = 'calling',
      VALUE = 'value',
      GET = 'get',
      METHOD = 'method',
      PROPERTY = 'property';
const Colored = objectInit.init([[CALLING, (_CALLING = CALLING, dye.HexDye(cards.Palett.grey.accent_3)(_CALLING))], [METHOD, (_METHOD = METHOD, dye.HexDye(cards.Palett.cyan.lighten_2)(_METHOD))], [PROPERTY, (_PROPERTY = PROPERTY, dye.HexDye(cards.Palett.purple.lighten_3)(_PROPERTY))]]);

const decoArgs = decoVector.Deco({
  bracket: enumBrackets.NONE,
  delim: enumChars.SP
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
  if (typeof p === enumDataTypes.OBJ) {
    if (!p.caller) p.caller = LOGGER;
  } else {
    p = {
      caller: typeof p === enumDataTypes.STR ? p : String(p),
      outcome: false,
      showArgs: false
    };
  }

  return logger.bind(p);
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
          callee = className ? says.ros(className) + '.' + says.ros(key) : says.ros(key),
          result = callable.apply(instance, arguments);
    let info = Colored[CALLING] + ' ' + Colored[kind] + ' ' + callee;
    if (kind === METHOD) info += '(' + (showArgs ? decoArgs(Array.from(arguments)) : '') + ')';
    if (showReturn) info += ' = ' + deco.deco(result);
    _info = info, says.says[caller !== null && caller !== void 0 ? caller : LOGGER].p(timestampPretty.time())(_info);
    return result;
  };
}

exports.Logger = Logger;
