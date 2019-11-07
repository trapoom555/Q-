<template>
<div>
    <img src = "../assets/logo.png" class = "logo">
    <router-link to = "/Regis"><button class = "pressQueue">Register</button></router-link>
    <router-link to = "/Login"><button class = "backToQueue">Login</button></router-link>
</div>
</template>

<script>
export default {
    name:'Home',
}
</script>

<style scoped>
a {
 text-decoration: none;
}
.logo {
    width: 50%;
    height: auto;
    margin: 30% auto 10% auto;
    display: block;
}
.pressQueue {
    background: linear-gradient(285.21deg, #7FBCEB -3.52%, rgba(255, 255, 255, 0) 114.63%), #92E0D0;
    border-radius: 5px;
    display: block;
    margin:  30% auto 12% auto;
    width: 70%;
    height: 50px;
    font-size: 4vw;
    border: none;

}
.backToQueue {
    color: #004E60;
    width: 70%;
    margin: auto;
    height:50px;
    font-size: 4vw;
    background-color:white;
    border-radius: 5px;
    border: 1px solid #939393;
}
* {
    font-family: 'Noto Sans Thai Cound', sans-serif;
}


</style>