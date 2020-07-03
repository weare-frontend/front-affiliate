<template>
<div class="center">
    <b-img style="cursor: pointer; max-width: 300px;" @click="getUrl()" :src="require(`@/static/img/${this.selected.dirImg}/favicon.png`)" fluid alt="logo"></b-img>
</div>
</template>

<script>
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
    components: {},
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
