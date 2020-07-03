<template>
<div class="center">
    <b-img style="cursor: pointer;" @click="getUrl()" :src="require(`@/static/img/${this.dirImg}/favicon.png`)" fluid alt="logo"></b-img>
</div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
    components: {
        Logo
    },
    data: () => ({
        TITLE: process.env.OG_TITLE,
        dirImg: process.env.DIR_IMG || "",
        website: process.env.WEBSITE || "",
    }),
    methods: {
        getUrl() {
            let url = this.website + "/register/";
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
