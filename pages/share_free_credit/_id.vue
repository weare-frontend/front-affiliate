<template>
<div class="container">
    <Snowf :amount="50" :size="10" :speed="0.5" :wind="0" :opacity="0.8" :swing="1" :image="null" :zIndex="null" :resize="true" color="#e6c12f" />
    <br>
    <b-img class="icon-intab-ani" style="max-width: 230px; max-height: 95px;" :src="require(`@/static/img/${selected.dirImg}${selected.icon}`)" fluid alt="Fluid image"></b-img>
    <carousel-3d :display="3" :autoplayTimeout="5000" :autoplay="true" :controls-visible="false" :clickable="true" :width="450" :height="450">
        <slide v-for="(slide, i) in selected.img" :index="i" :key="i">
            <figure>
                <img :src="require(`@/static/img/${selected.dirImg}${slide}`)" />
            </figure>
        </slide>
    </carousel-3d>
    <div class="row justify-content-center my-1">
        <div class="col-md-6 col-sm-12">
            <b-form-input class="text-center" :value="`รหัสยูสเซอร์  ${selected.account_api}`" size="lg" readonly></b-form-input>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-3 col-sm-12 my-1">
            <b-button variant="primary" block size="lg" @click="facebookShare()">
                <i class="fas fa-check-circle"></i> แชร์เฟสบุ๊ค
            </b-button>
        </div>
        <div class="col-md-3 col-sm-12 my-1">
            <b-button variant="danger" block size="lg" @click="goPageHome()">
                <i class="fas fa-times-circle"></i> ยกเลิก
            </b-button>
        </div>
    </div>
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
                href: require(`@/static/img/${this.selected.dirImg}${this.selected.icon}`)
            }]
        }
    },
    async asyncData({params ,$axios }) {
        let promotionFB = {}
        let facebookID = ''
        let linkShare = ''
        try {
            promotionFB = await $axios.$get(`/api/free-bonus-fb-landing/check-pro-facebookshare?account_api=${params.id}`)
            if (!promotionFB.success) {
                location.replace(process.env.WEBSITE, "_blank")
            }else{
                facebookID = promotionFB.data.values_json?JSON.parse(promotionFB.data.values_json).appID:''
                linkShare = promotionFB.data.values_json?JSON.parse(promotionFB.data.values_json).url:''
            }
        } catch (error) {
            location.replace(process.env.WEBSITE, "_blank")
            console.log('[ERROR]', error);
        }

        const item = {
            website: process.env.WEBSITE || '',
            desc: process.env.OG_DESC || '',
            icon: "favicon.png",
            dirImg: process.env.DIR_IMG + '/' || '',
            img: JSON.parse(process.env.IMAGE_SLIDE) || [],
            account_api: params.id || '',
            facebookId: facebookID || '',
            linkShare: linkShare || ''
        }
        return {
            selected: item || {}
        }
    },

    data: () => ({
        selected: [],
    }),
    async mounted() {},
    components: {
        Logo,
        Snowf
    },
    methods: {
        goPageHome(){
             location.replace(this.selected.website, "_blank")
        },
        facebookShare: async function () {
            var self = this;
            FB.init({
                appId: this.selected.facebookId,
                autoLogAppEvents: true,
                xfbml: true,
                version: "v6.0",
            });
            await this.$axios
                .$get(`/api/free-bonus-fb-landing/check-topup-facebook?account_api=${this.selected.account_api}`)
                .then((response) => {
                    if (response.success) {
                        FB.ui({method: "feed",link: this.selected.linkShare},
                            function (response) {
                                if (response) {
                                    if (response.length == 0||0) {
                                        this.$axios
                                            .$get("api/free-bonus/get-credit-facebook")
                                            .then((response) => {
                                                if (response.success) {
                                                    self.$toast.global.success({message: response.message})
                                                } else {
                                                    self.$toast.global.error({message: response.message})
                                                }
                                            });
                                    }
                                } else {
                                    self.$toast.global.error({message: "คุณแชร์ Facebook ไม่สำเร็จ !!"})
                                }
                            }
                        )
                    } else {
                        self.$toast.global.error({message: response.message})
                    }
                })
        }
    }
}
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
