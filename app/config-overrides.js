const {
  addWebpackPlugin,
  override,
  addBundleVisualizer
} = require("customize-cra");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = override(
  addWebpackPlugin(
    new MonacoWebpackPlugin({
      languages: ["json", "typescript"],
      features: []
    })
  ),
  process.env.BUNDLE_VISUALIZE && addBundleVisualizer()
);
