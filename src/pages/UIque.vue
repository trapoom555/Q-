<template >
<div id="body-all">
  <div class="bg-head">
    <div class="circle">
    <div class="box-circle">
      <div class="box-item" style="color:#737171;margin-top:20%; font-size: 4vw;">เหลืออีก :</div>
      <div class="box-item" style="font-size:28px; display:inline-block;">{{Qremain+" "}}</div>
      <div class="box-item" style="display:inline-block; font-size: 5vw"> คิว</div>
    </div>
    <div class="box-circle" style="border-bottom:0;padding-top:10%;">
      <div class="box-item" style="font-size:23px; display:inline-block;">{{coutUp+" "}}</div>
      <div class="box-item" style="display:inline-block; font-size: 3.5vw;"> hr</div>
    </div>
    </div>
  </div>
  <div style = "margin-top:10%;">
  <div class="task" style="padding-left:20px; font-size: 4vw;">
    กระบวนการ
  </div>
  <div class="task" style="width:30%; max-width:150px;text-align:center; font-size: 4vw;">
  สถานะ
  </div><br>
  <div v-for = "e in processes" :key="e.id" style="padding-left:20px; font-size: 4.2vw;">
    <div :class = "{grey: e.isFinished}" style = "text-align:justify; width: 60%; margin:auto;"><br><span>{{e.process}}</span><span style = "float:right">{{e.status}}</span><br></div>
  </div>
  <div class="task-data" style="width:30%; max-width:150px;text-align:center;border-right:0; font-size: 4vw;">

  </div>
  </div>
  <p>{{ $store.getters.LinkID }}</p>
  <router-link to = "/DrugPage"><button type="button" style = "font-size: 4vw; margin-top:20%;">สถานที่รับยา</button></router-link>
  
</div>

</template>



<script>
export default {
  name: 'UIque',
  data: function() {
    return {
      Qremain: 4,
      coutUp: '00:25',
      processes: [ {id:1,process:'ตรวจ',status:'Finished', isFinished: true}
      ,{id:2,process:'จ่ายเงิน',status:'Finished', isFinished: true}
      ,{id:3,process:'รับยา',status:'Waiting', isFinished: false}],
      ID: this.shared.userCount
    }
  }
}
</script>



<style>
button{
  margin-top: 60px;
  width: 30%;
  height:45px;
  background:#FFFFFF;
  border: 2px solid #7FBCEB;
  box-sizing: border-box;
  border-radius: 5px;
  max-width:200px;

}
.task{
  width:40%;
  border-bottom:1px solid #ccc;
  display: inline-block;
  text-align:left;
  max-width:350px;
  margin-top:40px;
  padding-bottom:10px;
  margin-bottom:10px;
}
.task-data{
  width:40%;
  max-width:350px;
  border-right:1px solid #ccc;
  text-align:left;
  display: inline-block;
  padding-top:5px;
  padding-bottom:5px;
  line-height: 1.8;
}
.box-circle{
  height: 35%;
  width:80%;
  border-bottom:1px solid #B5B0B0;
  margin:auto;
}
.box-item{
  margin:2% 2%;
  display:block;
}
#body-all{
  margin: 0;
  text-align:center;
  background-attachment: fixed;
  
}
.bg-head{
  background: linear-gradient(310.03deg, #DD7ECE -15.01%, rgba(255, 255, 255, 0) 107.56%), #7FECEB;
  height:200px;
  padding:30px; 
}
.circle{
  background: #FFFFFF;
  border: 1px solid #CDCDCD;
  width: 200px;
  height:200px;
  display:block;
  margin :auto;
  border-radius: 100%; 
}
* {
  font-family: 'Noto Sans Thai Cound', sans-serif;
}

.grey {
  color: #888;
}

</style>
