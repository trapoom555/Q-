<template>
<div class="noti">
    <div><h1>เลือกช่องทางการแจ้งเตือนเมื่อใกล้ถึงคิว</h1></div>
    <router-link to="/Line"><button class="line"><img src = "../assets/line.png">LINE</button></router-link>
    <router-link to="/Gmail"><button class="gmail"><img src = "../assets/gmail.png">Gmail</button></router-link>
    <router-link to="/UIque"><button class="nono">ไม่รับการแจ้งเตือน</button></router-link>
</div>
</template>
<script>
export default {
    name:'Notification'
}
</script>
<style>
h1{
    margin-left: -20%;
    font-size: 4vw;
    margin-bottom: 10%
    }
button{
    margin: auto;
    margin-top: 10%;
    padding:1% 5%;
    width: 80%;
    background: white;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 3vw;
    display: block;
}

.line:focus{background: #ddd}
.gmail:focus{background: #ddd}
.nono:focus{background: #ddd}
.noti{margin-top: 35%}
* {
    font-family: 'Noto Sans Thai Cound', sans-serif;
}
img {
    width: 18%;
    margin-right: 9%;
    vertical-align: -50%;
}

</style>