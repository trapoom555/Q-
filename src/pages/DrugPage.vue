<template>
    <div class="body-back" style="padding-top:0%;">
<div class = "gradient-background">
        <div class="box-text-topic" style="border-right:1px solid gray;">{{action}}</div>
        <div class="box-text" style="width :20%;">{{display}}</div>

            <div class="pictur-room" style="text-align:center;">
                <img class = "pictureRoom" v-bind:src="UrlPath['i']">
            </div>
</div>
            <div class="text-room-topic" style="">สถานที่ :</div>
            <div class="text-room" style="padding-top:2%; padding-left:50px;">
                {{place}}
            </div>
            <div class="text-room" style=" padding-top:2%">
                {{"แผนก "+1+"  ชั้นที่ "+1}} :
            </div>
            <div class="text-room" style=" padding-top:2% ;text-align:center;">
                {{planHos}}
                <div><img class = "plan" src="../assets/place.jpg"></div>
            </div>
        
    </div>
    
</template>
<script>
/* eslint-disable no-console */
import { storage } from '../firebase';
import { rtb } from "../firebase";
const users = rtb.collection('user')
var user

export default {
    name : 'DrugPage',
    data: function() {
        return {
            Pic_name: 'X-ray',
            UrlPath: 'NULL',
            place: "อาคารสุเมธ",
            picSel: '',
            action: '',
            display: '',
            // user: ''
        }
    },
    created() {
        // this.$bind('user', users.doc(this.$store.getters.LinkID)).then(user => {
        // this.user === user
        
        users.doc(this.$store.getters.LinkID).get().then(doc=>{
            user = doc.data();
            console.log(user.process_list[user.process_list.length-1].name)
        })
        
        
        this.picSel = user.process_list[user.process_list.length-1].name
        this.UrlPath = storage.ref('Picture/' + this.picSel + '.jpg').getDownloadURL();
        if (user.process_list[user.process_list.length-1].type == 'process' || user.process_list[user.process_list.length-1].type == 'department'){
            rtb.collection('detail').doc(this.picSel).get().then(doc=>{
                this.place = doc.data().สถานที่
            })
        }
        else{
            rtb.collection('detail').doc(user.process_list[user.process_list.length-1].type).get().then(doc=>{
                this.place = doc.data().สถานที่
            })
        }
        /* eslint-disable no-console */
        if(this.picSel == 'OPD'){
            this.action = 'ตรวจ'
            this.display = 'OPD'
        }
        else if(this.picSel == 'X-ray'){
            this.action = 'X-ray'
            this.display = 'ห้องรัศมี'
        }
        else if(this.picSel == 'ลงทะเบียนผู้ป่วย'){
            this.action = 'ลงทะเบียนผู้ป่วย'
            this.display = 'ห้องจามจุรี'
        }
        else if(this.picSel == 'ชำระเงิน'){
            this.action = 'ชำระเงิน'
            this.display = 'ห้องจุฬา'
        }
        else if(this.picSel == 'รับยา'){
            this.action = 'รับยา'
            this.display = 'ห้องฮ่อง'
        }
        else if(this.picSel == 'เจาะเลือด'){
            this.action = 'เจาะเลือด'
            this.display = 'ห้องเจาะเลือด'
        }
        

    
    }
}
</script>
<style>

.body-back{
    margin:auto;
    display:block;
    padding-top:5%;
}

.text-room{
    width:80%;
    margin :auto;
    text-align:left;
    padding-top:3%;
    border-radius: 10px;
    font-size: 3.75vw;
    margin-top: 2%;
}
.text-room-topic {
    width:80%;
    margin :auto;
    text-align:left;
    padding-top:3%;
    border-radius: 10px;
    font-size: 3.75vw;
    margin-top: 2%;
    font-weight: bold;
}
.box-text{
    width: 30%;
    display:inline-block;
    text-align: left;
    margin: auto;
    margin-left: 2%;
    vertical-align: -50%;
    font-size:4.5vw ;
    padding:0 1%;
    margin-top: 10%;
    margin-bottom: 5%;
}

.box-text-topic{
    max-width: 30%;
    padding-right: 4%;
    display:inline-block;
    margin: auto;
    vertical-align: -50%;
    font-size:4.5vw ;
    margin-top: 10%;
    margin-bottom: 5%;
    font-weight: bold;
}

* {
    font-family: 'Noto Sans Thai Cound', sans-serif;
}
.plan {
    width: 90%;
    height:auto;
    -webkit-box-shadow: 4px 6px 8px -5px rgba(71,71,71,0.59);
-moz-box-shadow: 4px 6px 8px -5px rgba(71,71,71,0.59);
box-shadow: 4px 6px 8px -5px rgba(71,71,71,0.59);
margin-bottom: 5%;
}

.pictureRoom {
    margin-top: 10%;
    width: 70%;
    border-radius: 10px;
    margin: auto;
    -webkit-box-shadow: 4px 6px 31px -5px rgba(71,71,71,0.59);
-moz-box-shadow: 4px 6px 31px -5px rgba(71,71,71,0.59);
box-shadow: 4px 6px 31px -5px rgba(71,71,71,0.59);
}
.gradient-background {
    background: linear-gradient(273.76deg, #7FBCEB -3.52%, rgba(255, 255, 255, 0) 114.63%), #92E0D0;
    padding-bottom: 6%;
}
body {
    padding-bottom: 5%;
}
</style>
