<template>
    <div class="body-back" style="padding-top:10%;">

        <div class="box-text" style="border-right:1px solid gray;">รับยา</div>
        <div class="box-text" style="width :20%;">{{getDreucRoom}} ห้องรับยา</div>
        <div class="body-back" >

            <div class="pictur-room" style="text-align:center;">
                {{picturRoom}}<img src="C:/Users/Lenovo/Desktop/qplus/iPhone-11-Pro.jpg">
            </div>
            <div class="pictur-room" style="">สถานที่ :</div>
            <div class="pictur-room" style="padding-top:2%; padding-left:50px;">
                {{" ที่ไหนซักที่ "+drugeRoom}}
            </div>
            <div class="pictur-room" style=" padding-top:2%">
                {{"แผนก "+1+"  ชั้นที่ "+1}} :
            </div>
            <div class="pictur-room" style=" padding-top:2% ;text-align:center;">
                {{planHos}} แผนที่โรงบาล <img src="">
            </div>
        </div>
        
    </div>
    
</template>
<style>

.body-back{
    margin:auto;
    display:block;
    padding-top:5%;
}

.pictur-room{
    width:80%;
    margin :auto;
    text-align:left;
    padding-top:3%;
    border-radius: 10px;
}
.box-text{
    width: 10%;
    display:inline-block;
    margin: auto;
    vertical-align: -50%;
    font-size:4vw ;
    padding:0 1%;
}
* {
    font-family: 'Noto Sans Thai Cound', sans-serif;
}
</style>

<script>
export default {
  name: 'Drugpage',
  props: {
    msg: String
  }
}
</script>