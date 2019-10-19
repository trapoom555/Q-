<template>
<div>
    <img src="../assets/logo.png">
    <p class = "topic">คิวปัจจุบัน:</p>
    <p class = "value">{{queue}} คิว</p>
    <p class = "topic">เวลาโดยประมาณ:</p>
    <p class = "value">{{time}}</p>
    <btn msg = "ยืนยันการกดคิว"/>
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
img {
    width: 40%;
    margin: auto;
}
p {
    font-size: 4.5vw;
    text-align: left;
    padding: 1%;
}

.topic {
    margin-left: 15%;
}
.value {
    margin-left:20%;
}

</style>