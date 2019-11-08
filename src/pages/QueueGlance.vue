<template>
<div>
    <div>
    <img src="../assets/logo.png">
    <p class = "topic">คิวปัจจุบัน:</p>
    <p class = "value">{{user.queueRef.q_run - user.queueRef.q_call + 1}} คิว</p>
    <p class = "topic">เวลาโดยประมาณ:</p>
    <p class = "value">{{parseInt((user.queueRef.est_time * (user.queueRef.q_run-user.queueRef.q_call + 1)) / 60) + " นาที : "}}{{parseInt((user.queueRef.est_time * (user.queueRef.q_run-user.queueRef.q_call + 1)) % 60) + " วินาที "}}</p>
    <router-link to="/UIque"><button style = "font-size: 4.5vw">กดคิว</button></router-link>
</div>
</div>
</template>

<script>
/* eslint-disable no-console */

import { rtb } from "../firebase";
const users = rtb.collection('user')
export default {
    name: 'QueueGlance',
    data: function() {
        return {
        user: '',
        queue: 20,
        time: '00:25 hr',
        }
    },
    created() {
        this.$bind('user', users.doc(this.$store.getters.LinkID)).then(user => {
        this.user === user
        /* eslint-disable no-console */
        console.log(user)
    })},
}
</script>


<style scoped>
    button{
        background: linear-gradient(281.54deg, #7FBCEB -3.52%, rgba(255, 255, 255, 0) 114.63%), #92E0D0; 
        border: 0px;
        margin-top: 25px;
        height: 55px;
        width: 200px;
        border-radius: 5px;
        margin-top: 20%
    }
a {
  text-decoration: none;
}
img {
    width: 40%;
    margin: auto;
    margin-bottom: 5%;
    margin-top: 10%;
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