<template>
   <div>
       <div class = "iconpre">
            <div class = "please">กรุณาใส่อีเมล</div>
            <img src = "../assets/gmail.png">
        </div>
    <center>
        <form>
            <div>
            <input type="text" placeholder="กรอกอีเมล" v-model = "onChangeEmail">
            </div>
            <router-link to = "/QueueGlance"><button :class = "{disable: !isEmail}" @click="sendEmail">รับคิว</button></router-link>
        </form>
    </center>
    </div> 
</template>

<script>
 /* eslint-disable no-console */
import { rtb } from "../firebase";
const users = rtb.collection('user')

export default {
    name: 'Gmail',
    data: function() {
        return {
        user: '',
        Email: '',
        isEmail: false,
        }
    },
    created() {
        this.$bind('user', users.doc(this.$store.getters.LinkID)).then(user => {
        this.user === user
       
    })},
    methods: {
        isEmailValid: function() {
                if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.Email))
            {
                return (true)
            }
                return (false)
            },
        sendEmail: function() {
            this.user.email = this.Email
            if(this.user.enroll == true)this.user.queueRef = rtb.collection('department').doc('OPD')
            else this.user.queueRef = rtb.collection('process').doc('ลงทะเบียนผู้ป่วย')
            users.doc(this.user.ID).set(this.user)
        }
    },
    computed: {
        onChangeEmail: {
            get(){
                return this.Email;
            },
            set(newValue){
                this.Email = newValue;
                this.isEmail = this.isEmailValid();
            }
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

    .disable {
    pointer-events:none; 
    opacity:0.6;  
}
* {
    font-family: 'Noto Sans Thai Cound', sans-serif;
}
</style>