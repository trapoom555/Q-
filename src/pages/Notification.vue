<template>
<div class="noti">
    <div><h1 style = "margin-bottom: 12%; color:#555">เลือกช่องทางการแจ้งเตือนเมื่อใกล้ถึงคิว</h1></div>
    <router-link to="/Line"><button class="line" style = ""><img src = "../assets/line.png"><div style = "display: inline;position: relative; vertical-align: 30%">LINE</div></button></router-link>
    <router-link to="/Gmail"><button class="gmail"><img src = "../assets/gmail.png"><div style = "display: inline;position: relative; vertical-align: 30%">Email</div></button></router-link>
    <router-link to="/QueueGlance"><button class="nono">ไม่รับการแจ้งเตือน</button></router-link>
</div>
</template>
<script>
/* eslint-disable no-console */
import { rtb } from "../firebase";
const users = rtb.collection('user')
export default {
    name:'Notification',
    data: function() {
        return {
            ID: '',
            user: '',
            out: '',
            birthDay: '',
            name: ''
        }
    },
    created() {
      this.$bind('user', users.doc(this.$store.getters.LinkID)).then(user => {
        this.user === user
        console.log(this.$store.getters.LinkID)
        this.ID = this.$store.getters.LinkID
        this.birthDay = this.$store.getters.LinkBirthday
        this.name = this.$store.getters.LinkName
        this.register();
      });
    },
    methods: {
        register(){

      this.$bind('user', users.doc(this.ID))
      rtb.collection('user').doc(this.ID).get().then(doc => {
          if (doc.exists) {
            if(this.user.password == 'OP'){
              users.doc(this.ID).set({
                name: this.name,
                ID:this.ID,
                password:this.birthDay,
                process_list:[],
                email:'',
                lineID:'',
                queue:0,
                enroll:true,
                waitConfirm : false,
                queueRef:rtb.collection('department').doc('OPD')
                
              })
              this.out = 'finish'
            }

            else this.out = 'already have this account'
          } 
          else {

            users.doc(this.ID).set({
              name: this.name,
              ID:this.ID,
              password:this.birthDay,
              process_list:[],
              waitConfirm : false,
              email:'',
              lineID:'',
              queue:0,
              enroll:false,
              queueRef:rtb.collection('process').doc('ลงทะเบียนผู้ป่วย')
            })              
          }
      })
      

      // register()
    }
    }
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
    padding:0% 5%;
    height: 60px;
    width: 90%;
    background: white;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 3.7vw;
    display: block;
    color: #666;
}

.line:focus{background: #ddd}
.gmail:focus{background: #ddd}
.nono:focus{background: #ddd}
.noti{margin-top: 40%}
* {
    font-family: 'Noto Sans Thai Cound', sans-serif;
}
img {
    width: 18%;
    margin-right: 9%;
    vertical-align: -50%;
}

</style>