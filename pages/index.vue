<template>
<div>
    <Snowf :amount="50" :size="5" :speed="0.5" :wind="0" :opacity="0.8" :swing="1" :image="null" :zIndex="null" :resize="true" color="#fff" />
    <div class="center">
        <div class="row">
            <div class="col-12">
                <b-img style="cursor: pointer; max-width: 300px;" @click="getUrl()" :src="require(`@/static/img/${this.selected.dirImg}/favicon.png`)" fluid alt="logo"></b-img>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Snowf from "vue-snowf";
export default {
    head() {
        return {
            link: [{
                rel: "icon",
                type: "image/x-icon",
                href: require(`@/static/img/${this.selected.dirImg}/favicon.png`)
            }]
        }
    },
    async asyncData($route) {
        var item = {
            dirImg: process.env.DIR_IMG || "",
            website: process.env.WEBSITE || "",
        };

        return {
            selected: item || {}
        };
    },
    components: {
        Snowf
    },
    data: () => ({
        selected: []
    }),
    methods: {
        getUrl() {
            let url = this.selected.website + "/register/";
            window.open(url, "_blank");
        },
    }
}
</script>

<style>
.center {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
