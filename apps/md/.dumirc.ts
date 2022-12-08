import { defineConfig } from 'dumi';
import { nav, footer } from './config/index'

export default defineConfig({
  themeConfig: {
    name: '羊城砍柴',
    nav,
    footer
  },
});
