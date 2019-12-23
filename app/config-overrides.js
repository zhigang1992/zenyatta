const {
  addWebpackPlugin,
  override,
  addBundleVisualizer
} = require("customize-cra");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = override(
  process.env.BUNDLE_VISUALIZE && addBundleVisualizer(),
  addWebpackPlugin(new MonacoWebpackPlugin())
);
