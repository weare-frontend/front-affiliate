<template>
  <div class="container">
    <Snowf
      :amount="50"
      :size="5"
      :speed="0.5"
      :wind="0"
      :opacity="0.8"
      :swing="1"
      :image="null"
      :zIndex="null"
      :resize="true"
      color="#fff"
    />
    <br />
    <b-img
      style="max-width: 230px; max-height: 150px;"
      :src="require(`@/static/img/${selected.icon}`)"
      fluid
      alt="Fluid image"
    ></b-img>
    <carousel-3d
      :display="3"
      :autoplayTimeout="5000"
      :autoplay="true"
      :controls-visible="true"
      :clickable="true"
      :width="400"
      :height="400"
    >
      <slide v-for="(slide, i) in selected.img" :index="i" :key="i">
        <figure>
          <img :src="require(`@/static/img/${slide}`)" />
        </figure>
      </slide>
    </carousel-3d>
    <div class="row">
      <div class="col-md-8 offset-md-2 col-sm-12" style="padding-bottom: 10px;">
        <b-input-group size="md">
          <b-input-group-prepend is-text>
            <i class="fas fa-link"></i>
          </b-input-group-prepend>
          <b-form-input disabled v-model="linkAccount"></b-form-input>
          <b-input-group-append>
            <b-button @click="copySomething(linkAccount)">คัดลอก</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 offset-md-2 col-sm-12" v-if="selected.lineShare">
        <b-button @click="loginLine" variant="success" block size="lg">
          <i style="font-size:20px; " class="fab fa-line"></i> สมัครสมาชิกผ่านไลน์
        </b-button>
        <br />
      </div>
      <div class="col-md-8 offset-md-2 col-sm-12" v-else>
        <!-- <b-button v-b-modal.modal-center variant="success" ><i class="fas fa-sign-in-alt"></i> เข้าสู่ระบบ</b-button> -->
        <b-button @click="getUrl" variant="success" block size="lg">
          <i class="fas fa-user"></i> สมัครสมาชิก
        </b-button>
        <br />
      </div>
      <div class="col-12">
        <ShareNetwork
          network="line"
          :url="this.linkAccount"
          :title="selected.title"
          :description="selected.desc"
        >
          <b-button variant="light">
            <i class="fab fa-line" style="font-size:38px; color:#00c300"></i>
          </b-button>
        </ShareNetwork>
        <ShareNetwork
          network="facebook"
          :url="this.linkAccount"
          :title="selected.title"
          :quote="selected.desc"
        >
          <b-button variant="light">
            <i class="fab fa-facebook" style="font-size:38px; color:#3b5999"></i>
          </b-button>
        </ShareNetwork>
        <ShareNetwork network="twitter" :url="this.linkAccount" :title="selected.title">
          <b-button variant="light">
            <i class="fab fa-twitter" style="font-size:38px; color:#55acee"></i>
          </b-button>
        </ShareNetwork>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Snowf from "vue-snowf";

export default {
  head() {
    return {
        link: [{
            rel: "icon",
            type: "image/x-icon",
            href: require(`@/static/img/${this.selected.icon}`)
        }]
    }
  },
  async asyncData($route) {
    var item = {
      website: process.env.WEBSITE,
      linkLineAuth: process.env.LINK_LINE_AUTH || "",
      title: process.env.TITLE,
      desc: process.env.DESC,
      icon: "favicon.png",
      img: ["img-1.jpg", "img-2.jpg", "img-3.jpg", "img-4.jpg","img-5.jpg"]
    };

    return {
      selected: item || {}
    };
  },

  data: () => ({
    slides: 3,
    userAccount: "",
    linkAccount: process.env.LINKSHARE,
    linkAffiliate: "",
    selected: []
  }),
  async mounted() {
    this.userAccount = this.$route.params.id || "";
    if (this.selected) {
      // link line
      if (this.selected.linkLineAuth && this.userAccount) {
        this.linkAffiliate = this.selected.linkLineAuth + this.userAccount;
      } else {
        this.linkAffiliate = this.selected.website + "/register/";
      }
      // link account
      if (this.userAccount) {
        this.linkAccount = `${this.linkAccount}/${this.userAccount}`;
      } else {
        this.linkAccount = `${this.linkAccount}`;
      }
    }
  },
  components: {
    Logo,
    Snowf
  },
  methods: {
    loginLine() {
      let url = `${this.linkAffiliate}`;
      window.open(url, "_blank");
    },
    getUrl() {
      let url = this.selected.website + "/register/";
      if (this.selected) {
        url += this.userAccount;
      } else {
        url;
      }
      window.open(url, "_blank");
    },

    async copySomething(text) {
      try {
        await this.$copyText(text);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
