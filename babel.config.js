const plugins = [
  // ['@babel/plugin-transform-runtime', { helpers: false, }],
  ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
  // ['@babel/plugin-proposal-decorators', { legacy:false }],
  ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
  ['@babel/plugin-proposal-class-properties'],
  ['@babel/plugin-proposal-private-methods'],
  ['@babel/plugin-proposal-nullish-coalescing-operator'],
  ['@babel/plugin-proposal-optional-chaining']
]

module.exports = function (api) {
  api.cache(true)
  const presets = ['@babel/preset-env']
  const ignore = ['node_modules/**']
  return {
    presets,
    plugins,
    ignore
  }
}
