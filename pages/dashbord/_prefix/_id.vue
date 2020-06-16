<template>
<div class="container">
    <Snowf :amount="50" :size="5" :speed="0.5" :wind="0" :opacity="0.8" :swing="1" :image="null" :zIndex="null" :resize="true" color="#fff" />
    <br>
    <b-img style="max-width: 230px;" :src="require(`@/static/img/${selected.prefix}/${selected.icon}`)" fluid alt="Fluid image"></b-img>
    <carousel-3d :autoplay='true' :controls-visible="true" :clickable="true" :width="400" :height="400">
        <slide v-for="(slide, i) in selected.img" :index="i" :key="i">
            <figure>
                <img :src="require(`@/static/img/${selected.prefix}/${slide}`)">
                <!-- <img src="https://wplucabetasia.b-cdn.net/wp-content/uploads/2020/03/affliate.jpg"> -->
            </figure>
        </slide>
    </carousel-3d>
    <div class="row">
        <div class="col" style="padding-bottom: 10px;">
            <b-input-group size="md">
                <b-input-group-prepend is-text>
                    <i class="fas fa-link"></i>
                </b-input-group-prepend>
                <b-form-input disabled v-model="linkAccount"></b-form-input>
                <b-input-group-append>
                    <b-button @click="copySomething(linkAccount)" variant="success"><i class="fas fa-clone"></i></b-button>
                </b-input-group-append>
            </b-input-group>

        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-12">
            <b-button variant="success" size="lg"><i class="fas fa-sign-in-alt"></i> เข้าสู่ระบบ</b-button>
            <b-button @click="getUrl" variant="success" size="lg"><i class="fas fa-user"></i> สมัครสมาชิก</b-button><br><br>
        </div>
        <div class="col-12">
            <ShareNetwork network="line" url="https://news.vuejs.org/issues/180" title="Say hi to Vite! A brand new, extremely fast development setup for Vue." description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You." quote="The hot reload is so fast it\'s near instant. - Evan You" hashtags="vuejs,vite">
                <b-button variant="light">
                    <i class="fab fa-line" style="font-size:30px; color:#00c300"></i>
                </b-button>
            </ShareNetwork>
            <ShareNetwork network="facebook" url="https://news.vuejs.org/issues/180" title="Say hi to Vite! A brand new, extremely fast development setup for Vue." description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You." quote="The hot reload is so fast it\'s near instant. - Evan You" hashtags="vuejs,vite">
                <b-button variant="light">
                    <i class="fab fa-facebook" style="font-size:30px; color:#3b5999"></i>
                </b-button>
            </ShareNetwork>
            <ShareNetwork network="facebook" url="https://news.vuejs.org/issues/180" title="Say hi to Vite! A brand new, extremely fast development setup for Vue." description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You." quote="The hot reload is so fast it\'s near instant. - Evan You" hashtags="vuejs,vite">
                <b-button variant="light">
                    <i class="fab fa-twitter" style="font-size:30px; color:#55acee"></i>
                </b-button>
            </ShareNetwork>
            <ShareNetwork network="skype" url="https://news.vuejs.org/issues/180" title="Say hi to Vite! A brand new, extremely fast development setup for Vue." description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You." quote="The hot reload is so fast it\'s near instant. - Evan You" hashtags="vuejs,vite">
                <b-button variant="light">
                    <i class="fab fa-skype" style="font-size:30px; color:#00AFF0"></i>
                </b-button>
            </ShareNetwork>
        </div>

    </div>

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
                img: [
                    "img-1.png",
                    "img-2.png",
                    "img-3.png"
                ]
            },
            {
                prefix: "happy555",
                site: "https://m.happy555th.com",
                icon: "logo.png",
                img: [
                    "img-1.jpg",
                    "img-2.jpg",
                    "img-3.jpg"
                ]
            }
        ]
        var item = await dataArray.find(_x => _x.prefix == $route.params.prefix);
        return {
            selected: item || []
        }
    },
    data: () => ({
        slides: 3,
        userAccount: "",
        linkAccount: "http://localhost:3000/dashbord/",
        selected: [],
    }),
    async mounted() {
        this.userAccount = this.$route.params.id || ""
        if (this.userAccount.trim()) {
            this.linkAccount = this.linkAccount + this.userAccount
        }
        // this.selected = await this.findData('asia')
    },
    components: {
        Logo,
        Snowf
    },
    methods: {
        getUrl() {
            let url = this.selected.site + "/register/";
            if (this.selected) {
                url += this.userAccount
                // window.location.href = this.selected.site+this.userAccount
            } else {
                url
                // window.location.href = this.selected.site
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
