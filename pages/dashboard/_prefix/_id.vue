<template>
<div class="container">
    <Snowf :amount="50" :size="5" :speed="0.5" :wind="0" :opacity="0.8" :swing="1" :image="null" :zIndex="null" :resize="true" color="#fff" />
    <br>
    <b-img style="max-width: 230px; max-height: 150px;" :src="require(`@/static/img/${selected.prefix}/${selected.icon}`)" fluid alt="Fluid image"></b-img>
    <carousel-3d :display="3" :autoplayTimeout="5000" :autoplay='true' :controls-visible="true" :clickable="true" :width="400" :height="400">
        <slide v-for="(slide, i) in selected.img" :index="i" :key="i">
            <figure>
                <img :src="require(`@/static/img/${selected.prefix}/${slide}`)">
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
                    <b-button @click="copySomething(linkAccount)" >คัดลอก</b-button>
                </b-input-group-append>
            </b-input-group>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8 offset-md-2 col-sm-12" v-if="selected.lineShare">
            <b-button @click="loginLine" variant="success" block size="lg"><i style="font-size:20px; " class="fab fa-line"></i> สมัครสมาชิกผ่านไลน์</b-button><br>
        </div>
        <div class="col-md-8 offset-md-2 col-sm-12" v-else>
            <!-- <b-button v-b-modal.modal-center variant="success" ><i class="fas fa-sign-in-alt"></i> เข้าสู่ระบบ</b-button> -->
            <b-button @click="getUrl" variant="success" block size="lg" ><i class="fas fa-user"></i> สมัครสมาชิก</b-button><br>
        </div>
        <div class="col-12">
            <ShareNetwork network="line" :url="this.linkAccount" :title="selected.title" :description="selected.desc">
                <b-button variant="light">
                    <i class="fab fa-line" style="font-size:38px; color:#00c300"></i>
                </b-button>
            </ShareNetwork>
            <ShareNetwork network="facebook" :url="this.linkAccount" :title="selected.title" :quote="selected.desc">
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
    <br>
    <b-modal id="modal-center" centered title="LOGIN" hide-footer :header-bg-variant="'success'" :header-text-variant="'white'">
        <b-input-group size="md">
            <b-input-group-prepend is-text>
                <i class="fas fa-user"></i>
            </b-input-group-prepend>
            <b-form-input v-model="params.username" placeholder="USERNAME/ เบอร์โทร"></b-form-input>
        </b-input-group> <br>
        <b-input-group size="md">
            <b-input-group-prepend is-text>
                <i class="fas fa-key"></i>
            </b-input-group-prepend>
            <b-form-input v-model="params.password" placeholder="PIN CODE"></b-form-input>
        </b-input-group>
        <br>
        <b-button block @click="login()">LOGIN</b-button>
    </b-modal>
</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Snowf from 'vue-snowf';

export default {
    async asyncData($route) {
        var dataArray = [{
                prefix: "asia",
                site: "https://m.lucabetasia.com",
                icon: "logo.png",
                ogImage: "img-1.jpg",
                title: "lucabetasia",
                desc: "ชวนเพื่อนมาเล่น lucabetasia กันเถอะ",
                img: [
                    "img-1.png",
                    "img-2.png",
                    "img-3.png"
                ],
                favicon:'logo.png',
            },
            {
                prefix: "happy555",
                site: "https://m.happy555th.com",
                icon: "logo.png",
                ogImage: "img-1.jpg",
                title: "happy555th",
                desc: "ชวนเพื่อนมาเล่น happy555th กันเถอะ",
                img: [
                    "img-1.jpg",
                    "img-2.jpg",
                    "img-3.jpg"
                ],
                favicon:'logo.png',
            },
            {
                prefix: "lucabet24hr",
                site: "https://lucabet24hr.com",
                lineShare: "https://lucabet24hr.com/dashboard/login?friendshipid=",
                icon: "logo.png",
                ogImage: "https://login.lucabet24hr.com/backend/web/special_promotions/879c0a318b6f8613ad93d719d298ac1a.jpg",
                title: "LUCABET24HR",
                desc: `\nสมาชิกสมัครใหม่\nแจกฟรี 100 บาท\nถอนเงินสดได้ 2,000 บาท\n\nคาสิโนออนไลน์\nบอล หวย สล็อต\n'มีไว้ ครบ จบ ในเว็บเดียว'\n\n\nSA Gaming/Sexy Gaming/Pretty Gaming/ DG Gaming`,
                favicon:'favicon.png',
                img: [
                    "img-1.jpg",
                    "img-2.png",
                    "img-3.jpg",
                    "img-4.jpg",
                ]
            }
        ]
        var item = await dataArray.find(_x => _x.prefix == $route.params.prefix);
        return {
            selected: item || []
        }
    },
    head() {
        return {
            meta: [{
                    hid: 'og:image',
                    property: 'og:image',
                    content: this.selected.ogImage
                },
                {
                    hid: "og:description",
                    name: "og:description",
                    content: this.selected.desc
                },
                {
                    hid: "og:type",
                    property: 'og:type',
                    content: 'website'
                },
            ],
            link: [{
                rel: "icon",
                type: "image/x-icon",
                href: require(`@/static/img/${this.selected.prefix}/${this.selected.favicon}`)
            }]
        }
    },
    data: () => ({
        params: {
            username: "",
            password: ""
        },
        slides: 3,
        userAccount: "",
        linkAccount: "https://nuxtv10-982d0.web.app/dashboard/",
        linkAffiliate: "",
        selected: [],
    }),
    async mounted() {
        this.userAccount = this.$route.params.id || ""
        if (this.selected) {
            // link line
            if (this.selected.lineShare && this.userAccount) {
                this.linkAffiliate = this.selected.lineShare + this.userAccount
            } else {
                this.linkAffiliate = this.selected.site + "/register/"
            }
            // link account
            if (this.userAccount) {
                this.linkAccount = `${this.linkAccount}${this.selected.prefix}/${this.userAccount}`
            } else {
                this.linkAccount = `${this.linkAccount}${this.selected.prefix}`
            }
        } else {
            alert("no prefix")
        }
    },
    components: {
        Logo,
        Snowf
    },
    methods: {
        loginLine() {
            let url = `${this.linkAffiliate}`;
            window.open(url, '_blank');
        },
        login() {
            let url = `${this.selected.site}/check-login?username=${this.params.username}&password=${this.params.password}`;
            window.open(url, '_blank');
        },
        getUrl() {
            let url = this.selected.site + "/register/";
            if (this.selected) {
                url += this.userAccount
            } else {
                url
            }
            window.open(url, '_blank');
        },
        pathImg(item, name) {
            return '@/static/img/' + item.prefix + '/' + name
        },
        async findData(id) {
            const item = await this.webArray.find(_x => _x.prefix == id);
            if (item) {
                return item
            } else {
                return "null"
            }
        },
        async copySomething(text) {
            try {
                await this.$copyText(text);
            } catch (e) {
                console.error(e);
            }
        },
    },
}
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
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
