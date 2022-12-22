/** @type {import('next').NextConfig} */
const withAntdLess = require('next-with-less')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = withAntdLess({
  basePath: isProd ? '/ssr' : '',
  experimental: {
    forceSwcTransforms: true,
  },

  images: {
    domains: ['localhost', 'zhjs.top'],
  },

  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        'primary-color': '#9900FF',
        'border-radius-base': '2px',
      },
    },
  },

  reactStrictMode: true,
  swcMinify: true,

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
