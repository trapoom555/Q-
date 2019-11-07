<template>
    <button>{{msg}}</button>
</template>

<script>
export default {
    name:'btn',
    props: {
        msg: String
    }

}
</script>

<style scoped>

button {
    background: linear-gradient(285.21deg, #7FBCEB -3.52%, rgba(255, 255, 255, 0) 114.63%), #92E0D0;
    border-radius: 5px;
    display: block;
    margin:  10% auto 12% auto;
    width: 50%;
    height: 50px;
    font-size: 4vw;
    border: none;

}


</style>