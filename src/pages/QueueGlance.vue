<template>
<div>
    <img src="../assets/logo.png">
    <p class = "topic">คิวปัจจุบัน:</p>
    <p class = "value">{{queue}} คิว</p>
    <p class = "topic">เวลาโดยประมาณ:</p>
    <p class = "value">{{time}}</p>
    <router-link to="/Regis"><btn msg = "ยืนยันการกดคิว"/></router-link>
</div>
</template>

<script>
import btn from '../components/button.vue'

export default {
    name: 'QueueGlance',
    components:{
    btn
    },
    data: function() {
        return {
        queue: 20,
        time: '00:25 hr'
        }
    }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
img {
    width: 40%;
    margin: auto;
    margin-bottom: 5%;
}
p {
    font-size: 4.5vw;
    text-align: left;
    padding: 1%;
}

.topic {
    margin-left: 7%;
    color: #333;
    border-bottom: 1px solid #ccc;
    width: 50%;
    padding-bottom: 3%;
}
.value {
    margin-left:15%;
}
* {
    font-family: 'Noto Sans Thai Cound', sans-serif;
}
</style>