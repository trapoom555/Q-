
<template>
<div class="big">
  <p>ใส่ข้อมูลเพื่อกลับไปที่คิว</p>
  <form action="/action_page.php"> 
    <input type="text" id="fname" name="ID" placeholder="กรอกเลขบัตรประชาชน" v-model = "onChangeID">
    <p  :class = "{wrongID: !isIDtrue, trueID: isIDtrue}">คุณใส่หมายเลขบัตรประชาชนผิด</p>
    <input type="text" id="lname" name="Brith day" placeholder="กรอกวันเกิด (วว/ดด/ปป)" v-model = "onChangeBirthday">
    <p :class = "{wrongBirthDay: !isBirthdayTrue, trueBirthDay: isBirthdayTrue}">กรุณาใส่วันเกิดในรูปแบบ วว/ดด/ปป</p>
    <p  :class = "{wrongID: !isPasstruetrue, trueID: isPasstruetrue}">คุณ เลขบัตรประชาชน หรือ วันเกิด ผิด</p>
    <div v-if = "vif1"><router-link :class = "{disable: (!isID || !isBirthday)}" to="/QueueGlance"><input type="submit" value="Login"></router-link></div>
    <div v-if = "vif2"><router-link :class = "{disable: (!isID || !isBirthday)}" to="/Login"><input type="submit" value="Login" @click="setIsPasstrue"></router-link></div>
    <div v-if = "vif3"><router-link :class = "{disable: (!isID || !isBirthday)}" to="/UIque"><input type="submit" value="Login" ></router-link></div>
  </form>
</div>
</template>

<script>
import { rtb } from "../firebase";
const users = rtb.collection('user')
// const departments = rtb.collection('department')
// const processes = rtb.collection('process')
// var f
// 1101700285065
export default {
    name:'Regis',
    data: function() {
        return{
            ID: '',
            isIDtrue: true,
            isIDcomplete: false,
            isID: false,
            birthDay: '',
            isBirthdayTrue: true,
            isBirthdayComplete: false,
            isBirthday: false,
            check:0,
            out:"",
            b : rtb.collection("user").doc("1101700285065").process,
            queue : rtb.collection("wtf").doc("queueList"),
            user : 'Nan',
            process : '',
            q_run : '',
            p : 0,
            vif1: false,
            vif2: true,
            vif3: false,
            isPasstrue: true,
            isPasstruetrue: true,
        }  
    },
    created() {
        this.$bind('user', users.doc(this.$store.getters.LinkID)).then(user => {
        this.user === user
        /* eslint-disable no-console */
        console.log(this.user.process_list[0].name)
    })},
    methods:{
        setIsPasstrue: function() {
            if(!this.isPasstrue){
                this.isPasstruetrue = false
            }
        },
        vif1Method: function() {
            this.vif1 = this.check && !this.user.process_list.length
        },
        vif2Method: function() {
            this.vif2 = !this.check
        },
        vif3Method: function() {
            this.vif3 = this.check && this.user.process_list.length
        },
        checkvif: function() {
            this.vif1Method()
            this.vif2Method()
            this.vif3Method()
        },
        checkID: function() {
            if(this.ID.length == 13){
                this.login();
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
                    this.login();
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
        },
        login(){
            this.$bind('user', users.doc(this.ID))
            rtb.collection('user').doc(this.ID).get().then(doc => {
                /* eslint-disable no-console */
                console.log('haha');
                if (doc.exists) {
                    if(this.user.password == this.birthDay){
                        this.out = 'log in success'
                        this.isPasstrue = true 
                        this.check  = 1
                        this.checkvif();
                    
                        // this.out = this.user.process_list[this.user.process_list.length-1].type
                    }
                    else{
                    this.out = 'wrong password '+this.user.password
                    this.check  = 0
                    this.isPasstrue = false
                    }
                } else {
                    this.out = 'not have this user ID'
                    this.check = 0
                }
                console.log(this.out)
            })
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
                this.checkvif();
                this.isPasstruetrue = true
            }
        },
        onChangeBirthday:{
            get(){
                return this.birthDay;
            },
            set(newValue){
                this.birthDay = newValue;
                this.checkBirthDay();
                this.isBirthday = this.isBirthdayTrue && this.isBirthdayComplete;
                this.checkvif();
                this.isPasstruetrue = true
            }
        }
    }
}

</script>

<style>
.big{
    margin-top: 40%;
}
p{font-size:4vw;
    text-align: left;
    position :relative;
    left:10% ;
    margin-bottom: 10%;
    }
input[type=text], select {
  width: 80%;
  padding: 5% 10%;
  font-size: 3vw;
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
  margin-top: 20%;
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
