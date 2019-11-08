<template>
   <div>
       <div class = "iconpre">
            <div class = "please">กรุณาใส่ ID line</div>
            <img src = "../assets/line.png">
        </div>
    <center>
        <form>
            <div>
            <input type="text" placeholder="กรอกไอดีไลน์" v-model = "Line">
            </div>
            <router-link to="/QueueGlance"><button @click = "setLine">รับคิว</button></router-link>
        </form>
    </center>
    </div> 
</template>

<script>
import { rtb } from "../firebase";
const users = rtb.collection('user')
export default {
    name: 'Line',
    data: function() {
        return {
        user: '',
        Line: ''
        }
    },
    created() {
        this.$bind('user', users.doc(this.$store.getters.LinkID)).then(user => {
        this.user === user
        /* eslint-disable no-console */
        console.log(this.user.process_list[0].name)
    })},
    methods: {
        setLine: function() {
            this.user.line = this.Line
            if(this.user.enroll == true)this.user.queueRef = rtb.collection('department').doc('OPD')
            else this.user.queueRef = rtb.collection('process').doc('ลงทะเบียนผู้ป่วย')
            users.doc(this.user.ID).set(this.user)
        }
    }
}
</script>

<style scoped>

img {
    width: 10%;
    padding-left: 5%;
    margin-left: 2%;
    border-left: 1px solid #837D7D;
    vertical-align: -50%;
}

*{
    font-size: 4vw;
}

.please {
    display: inline-block;
    padding-right: 2%;
}

.iconpre{
    text-align: left;
    margin-top: 40%;
    margin-left: 15%;
    margin-bottom: 20%;
    
}
    input{
    width: 80%;
  padding: 5% 10%;
  font-size: 3vw;
  margin: 5% 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
    }

    button{
        background: linear-gradient(281.54deg, #7FBCEB -3.52%, rgba(255, 255, 255, 0) 114.63%), #92E0D0; 
        border: 0px;
        margin-top: 25px;
        height: 55px;
        width: 200px;
        border-radius: 5px;
        margin-top: 30%
    }
    * {
        font-family: 'Noto Sans Thai Cound', sans-serif;
    }
</style>