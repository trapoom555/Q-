<template>
<div class="big" style = "margin-top: 20%;">
  <p class = "topic">ใส่ข้อมูลเพื่อกดคิว</p>
  <form> 
    <input type="text" id="fname" name="ID" placeholder="กรอกชื่อ" v-model = "onChangeName">
    <input type="text" id="fname" name="ID" placeholder="กรอกเลขบัตรประชาชน" v-model = "onChangeID">
    <p  :class = "{wrongID: !isIDtrue, trueID: isIDtrue}">คุณใส่หมายเลขบัตรประชาชนผิด</p>
    <p :class = "{wrongID: isAccount, trueID: !isAccount}">คุณมี account นี้แล้วกรุณาไปหน้า login</p>
    <input type="text" id="lname" name="Brith day" placeholder="กรอกวันเกิด (วว/ดด/ปป)" v-model = "onChangeBirthday">
    <p :class = "{wrongBirthDay: !isBirthdayTrue, trueBirthDay: isBirthdayTrue}">กรุณาใส่วันเกิดในรูปแบบ วว/ดด/ปป</p>
    <router-link :class = "{disable: !isID || !isBirthday || this.name.length || !isAccount == 0}" to="/Notification"><input type="submit" value="ต่อไป"></router-link>
  </form>
</div>
</template>

<script>
import { rtb } from "../firebase";
const users = rtb.collection('user')
export default {
    name:'Regis',
    data: function() {
        return{
            user: '',
            ID: '',
            name: '',
            isIDtrue: true,
            isIDcomplete: false,
            isID: false,
            birthDay: '',
            isBirthdayTrue: true,
            isBirthdayComplete: false,
            isBirthday: false,
            out: '',
            isAccount: false
        }  
    },
    created() {
        this.$bind('user', users.doc(this.$store.getters.LinkID)).then(user => {
        this.user === user
        /* eslint-disable no-console */
    })},
    methods:{
        checkID: function() {
            if(this.ID.length==13){
                this.isIDcomplete = true;
                var IDlist = this.ID.split('');
                IDlist = IDlist.reverse();
                var sum = 0;
                for(var i = 2; i < 14; i++){
                    sum += parseInt(IDlist[i-1])*i;
                }
                var checkDigit = (11 - (sum % 11)) % 10;
                if(checkDigit == parseInt(IDlist[0])){
                    this.isIDtrue = true;
                }
                else {
                    this.isIDtrue = false;
                }
            }
            else if(this.ID.length < 13){
                this.isIDcomplete = false;
                this.isIDtrue = true;
            }
            else {
                this.isIDcomplete = false;
                this.isIDtrue = false;
            }
        },
        checkBirthDay: function() {
            if(this.birthDay.length == 8){
                this.isBirthdayComplete = true;
                if(this.birthDay[2]=='/' && this.birthDay[5] == '/'){
                    var birthDayList = this.birthDay.split('/');
                    this.isBirthdayTrue = true;
                    for(var i = 0; i < birthDayList.length; i++){
                        if(isNaN(birthDayList[i] - parseInt(birthDayList[i]))){
                            this.isBirthdayTrue = false;
                            break;
                        }
                    }
                    if(parseInt(birthDayList[1]) > 12){
                        this.isBirthdayTrue = false;
                    }
                    if(parseInt(birthDayList[0]) > 31){
                        this.isBirthdayTrue = false;
                    }
                }
                else {
                    this.isBirthdayTrue = false;
                }
            }
            else if(this.birthDay.length < 8){
                this.isBirthdayComplete = false;
                this.isBirthdayTrue = true;
            }
            else{
                this.isBirthdayComplete = false;
                this.isBirthdayTrue = false;
            }
        }
    },
    computed: {
        onChangeID:{
            get(){
                return this.ID;
            },
            set(newValue){
                this.ID = newValue;
                this.$store.commit('IDMutation', newValue); 
                this.checkID();
                this.isID = this.isIDtrue && this.isIDcomplete;
                rtb.collection('user').doc(this.ID).get().then(doc => {
                    if (doc.exists) {
                        this.user = doc.data()
                        if(this.user.password == 'OP'){
                            this.out = ''
                            this.isAccount = false;
                        }

                        else { 
                            this.isAccount = true
                            this.out = 'already have this account' 
                            }
                    }
                    else {
                        this.isAccount = false;
                    } 

                })
            }
        },
        onChangeBirthday:{
            get(){
                return this.birthDay;
            },
            set(newValue){
                this.birthDay = newValue;
                this.checkBirthDay();
                this.$store.commit('BirthdayMutation', newValue); 
                this.isBirthday = this.isBirthdayTrue && this.isBirthdayComplete;
            }
        },
        onChangeName: {
            get(){
                return this.name;
            },
            set(newValue){
                this.name = newValue;
                this.$store.commit('NameMutation', newValue)
            }
        }
    }
}

</script>

<style>
.big{
    margin-top: 5%;
}
.topic {
    font-size:5vw;
    text-align: left;
    position :relative;
    left:10% ;
    margin-bottom: 10%;
    }
input[type=text], select {
  width: 80%;
  padding: 5% 10%;
  font-size: 4vw;
  margin: 5% 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 60%;
   background: linear-gradient(281.54deg, #7FBCEB -3.52%, rgba(255, 255, 255, 0) 114.63%), #92E0D0; 
  color:black;
  padding: 14px 20px;
  margin-top: 5%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 4vw;
}

input[type=submit]:hover {
  background: linear-gradient(281.54deg, #7FBCEB -3.52%, rgba(255, 255, 255, 0) 114.63%), #92E0D0; 
}

.wrongID {
    font-size: 3vw;
    display: block;
    color:red;
}

.trueID {
    display: none;
}

.wrongBirthDay {
    font-size: 3vw;
    display:block;
    color:red;
}

.trueBirthDay {
    display: none;
}
.disable {
    pointer-events:none; 
    opacity:0.6;  
}
* {
    font-family: 'Noto Sans Thai Cound', sans-serif;
}

</style>
