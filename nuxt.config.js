require("dotenv").config();
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.OG_TITLE || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ยิ่งชวนเยอะ ยิ่งได้เยอะ เติมเร็ว ถอนไว' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: process.env.OG_IMG || ''
      },
      {
        hid: "og:description",
        name: "og:description",
        content: 'ยิ่งชวนเยอะ ยิ่งได้เยอะ เติมเร็ว ถอนไว'
      },
      {
        name: 'twitter:image',
        content: process.env.OG_IMG || ''
      },
      {
        name: 'twitter:title',
        content: process.env.OG_TITLE || ''
      },
      {
        name: "twitter:description",
        content: 'ยิ่งชวนเยอะ ยิ่งได้เยอะ เติมเร็ว ถอนไว'
      },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '@/static/img/'+process.env.DIR_IMG+'/favicon.png' },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
        integrity: "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/",
        crossorigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Kanit:300,400,500,600,700"
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/index.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [{
    src: "~/plugins/carousel3d.js",
    ssr: false
  },
  {
    src: '~plugins/fb-sdk.js',
    ssr: false,
  }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    ['@nuxtjs/axios', { proxy: true }],
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'vue-social-sharing/nuxt',
    'nuxt-clipboard2',
    '@nuxtjs/toast',
  ],
  axios: {},
  proxy: {
    '/api/': {
      target: process.env.API + 'backend/',
      pathRewrite: { '^/api': 'api' },
    },
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  server: {
    port: process.env.PORT || 4002,
    host: process.env.HOST || "localhost"
  },
  axios: {
  },
  toast: {
    position: 'top-center',
    className: 'justify-content-start',
    register: [
      // Register custom toasts
      {
        name: 'error',
        message: (option) => option.message,
        options: {
          type: 'error',
          duration: 2000,
        },
      },
      {
        name: 'success',
        message: (option) => option.message,
        options: {
          type: 'success',
          duration: 2000,
        },
      },
    ],
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
