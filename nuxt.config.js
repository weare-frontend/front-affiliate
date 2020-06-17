require("dotenv").config();
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.TITLE || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.DESC || '' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://i.imgur.com/MOyJCey.jpg'
      },
      {
        hid: "og:description",
        name: "og:description",
        content: process.env.DESC || '' 
      },
      {
        name:'twitter:image',
        content: 'https://i.imgur.com/MOyJCey.jpg'
      },
      {
        name:'twitter:title',
        content: 'lucabet24hr'
      },
      {
        name:"twitter:description",
        content: '\nสมาชิกสมัครใหม่\nแจกฟรี 100 บาท\nถอนเงินสดได้ 2,000 บาท\n\nคาสิโนออนไลน์\nบอล หวย สล็อต\nมีไว้ ครบ จบ ในเว็บเดียว\n\n\n\nSA Gaming/Sexy Gaming/Pretty Gaming/ DG Gaming'
      },

    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: 'https://i.imgur.com/ux14tYR.png' },
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
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'vue-social-sharing/nuxt',
    'nuxt-clipboard2',
  ],
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
