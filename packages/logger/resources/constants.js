import { Palett } from '@palett/cards'
import { HexDye } from '@palett/dye'
import { init }   from '@vect/object-init'

export const
  LOGGER = 'logger',
  CALLING = 'calling',
  VALUE = 'value',
  GET = 'get',
  METHOD = 'method',
  PROPERTY = 'property'

export const Colored = init([
  [CALLING, CALLING |>  HexDye(Palett.grey.accent_3)],
  [METHOD, METHOD |>  HexDye(Palett.cyan.lighten_2)],
  [PROPERTY, PROPERTY |>  HexDye(Palett.purple.lighten_3)],
])