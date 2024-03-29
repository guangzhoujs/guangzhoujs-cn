/** @type {import('next').NextConfig} */
const withAntdLess = require('next-with-less')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = withAntdLess({
  generateBuildId: async () => 'v3',
  trailingSlash: true,
  experimental: {
    // forceSwcTransforms: true,
    concurrentFeatures: true,
    serverComponents: true,
  },
  distDir: '.out', // 打包后输出目录

  images: {
    domains: ['localhost', 'zhjs.top', 'guangzhoujs.cn'],
  },

  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        'primary-color': '#9900FF',
        'border-radius-base': '2px',
      },
    },
  },

  reactStrictMode: false,
  swcMinify: false,

  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    config.resolve.alias['@@'] = path.resolve(__dirname, './components')

    // tinymce
    config.plugins.push(new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, 'node_modules/tinymce/skins'), to: path.join(__dirname, 'public/assets/libs/tinymce/skins') },
      ],
    }))

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})
