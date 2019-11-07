<template >
<div id="body-all">
  <div class="bg-head">
    <div class="circle">
    <div class="box-circle">
      <div class="box-item" style="color:#737171;margin-top:20%; font-size: 4vw;">เหลืออีก :</div>
      <div v-if="user.process_list.length != 0">
      <div class="box-item" style="font-size:28px; display:inline-block;" >{{(user.process_list[user.process_list.length-1].status-user.queueRef.q_call) > 0 ? user.process_list[user.process_list.length-1].status-user.queueRef.q_call : 0+ " "}}</div>
      <div class="box-item" style="display:inline-block; font-size: 5vw"> คิว</div>
      </div>
    </div>
    <div class="box-circle" style="border-bottom:0;padding-top:10%;">
      <button v-if = "user.waitConfirm" @click="confirm">ยืนยันคิว</button>
      <div  v-if = "!user.waitConfirm">
      <div>
        <div class="box-item" style="display:inline ;">นาที</div>
        <div class="box-item" style="display:inline; margin-left:10%;">วินาที</div>
      </div>
      <div class="box-item" style="font-size:23px; display:inline-block;">{{parseInt(this.user.queueRef.est_time * (user.process_list[user.process_list.length-1].status-user.queueRef.q_call)/ 60)}}</div>
      <div class="box-item" style="font-size:23px; display:inline-block;">:</div>
      <div class="box-item" style="font-size:23px; display:inline-block;">{{parseInt(this.user.queueRef.est_time * (user.process_list[user.process_list.length-1].status-user.queueRef.q_call) % 60) +" "}}</div>
    </div>
    </div>
    </div>
  </div>
  <div class="name-user" style="">ชื่อ {{user.name}}</div>
  <div class="name-user" style="">คิวที่ {{user.queue}}</div>
  <div class="task" style="padding-left:20px; font-size: 4vw;">
    กระบวนการ
  </div>
  <div class="task" style="width:30%; max-width:150px;text-align:center; font-size: 4vw;">
  สถานะ
  </div><br>
  <div v-for = "e in this.user.process_list" :key="e.name" style="padding-left:0px; font-size: 4.2vw;">
    <div :class = "{grey: !Number.isInteger(e.status)}" style = "text-align:justify; width: 60%; margin:auto; margin-left:17%"><br><span>{{e.name}}</span><span style = "float:right">{{Number.isInteger(e.status) ? e.status == 0 ? "ถึงคิวของท่านแล้ว" :"รอ" : "เสร็จสิ้น"}}</span><br></div>
  </div>
  <div class="task-data" style="width:30%; max-width:150px;text-align:center;border-right:0; font-size: 4vw;">

  </div>
  <!-- <p>{{ $store.getters.LinkID }}</p> -->
  <router-link to = "/DrugPage"><button type="button" style = "font-size: 4vw; margin-top:20%;">สถานที่รับยา</button></router-link>
  
</div>

</template>



<script>
     /* eslint-disable no-console */
import { rtb } from "../firebase";
const users = rtb.collection('user')
const departments = rtb.collection('department')
const processes = rtb.collection('process')
var f;
var temp;
export default {
  name: 'UIque',
  data: function() {
    return {
      user: '',
      coutUp: '00:25',
      check: false,
      process: '',
      department: '',
    }
  },
  created() {
    this.$bind('user', users.doc(this.$store.getters.LinkID)).then(user => {
        this.user === user
        console.log(this.$store.getters.LinkID)
        console.log(user)
        if(this.user.process_list.length == 0){
          this.getQueue()
        }
   
        console.log(this.user.process_list[0].name)
    })
  },
  methods: {
    getQueue() {
      console.log('getget')
      this.out = 1234
      if(this.user.enroll == true){
        console.log('truetrue')
        departments.doc('Out Patient Department').get().then(doc => {
          this.out = 789
          if (doc.exists) {
            console.log('exist')
            this.$bind('department', departments.doc('Out Patient Department')).then(department => {
              this.process === department
              f = doc.data()
              f.q_run+=1

              this.out = 555
              users.doc(this.user.ID).set({
                process_list: [{
                  type : 'department',
                  name : 'Out Patient Department',
                  status : f.q_run
                }],
                queue : f.q_run
              }, { merge: true });
              f.q_list.push({userID:this.user.ID,queue:f.q_run})
              departments.doc('Out Patient Department').set(f).then(() => {
                this.out = f.q_run
              })
            })
          }
        })
      }
      else{
        processes.doc('registeration').get().then(doc => {
          this.out = 666666
          console.log('eiei')
          if (doc.exists) {
            this.out = 555555555
            // console.log('jaaj')
              this.$bind('process', processes.doc('registeration')).then(process => {
                this.process === process
                f = doc.data()
                f.q_run+=1
                console.log('ahah')
                this.out = 555
                users.doc(this.user.ID).set({
                  process_list: [{
                    type : 'process',
                    name : 'registeration',
                    status : f.q_run
                  }]
                }, { merge: true });
                f.q_list.push({userID:this.user.ID,queue:f.q_run})
                processes.doc('registeration').set(f).then(() => {
                  this.out = f.q_run
                })
              })
            }
          })
        }
      },
      confirm(){
      temp = this.user.process_list[this.user.process_list.length-1]
      this.out = temp
      
      if(temp.type == 'department' || temp.type == 'process'){
        rtb.collection(temp.type).doc(temp.name).get().then(doc => {
          if (doc.exists) {
            f = doc.data()
            f.q_run+=1
            f.q_list.push({userID:this.user.ID,queue:f.q_run})
            rtb.collection(temp.type).doc(temp.name).update({
              q_run : f.q_run,
              q_list : f.q_list
            })
            this.user.process_list[this.user.process_list.length - 1].status = f.q_run
            this.user.waitConfirm = false
            this.user.queueRef =  rtb.collection(temp.type).doc(temp.name)
            this.user.queue = f.q_run
            users.doc(this.user.ID).set(this.user)
          } else {
              this.out = 'not have this user ID'
              this.check = 0
          }
        }) 
      }
      else {
        rtb.collection('department').doc(temp.type).collection('Doctors').doc(temp.name).get().then(doc => {
         if (doc.exists) {
            f = doc.data()
            f.q_run+=1
            f.q_list.push({userID:this.user.ID,queue:f.q_run})
            rtb.collection('department').doc(temp.type).collection('Doctors').doc(temp.name).update({
              q_run : f.q_run,
              q_list : f.q_list
            })
            this.user.process_list[this.user.process_list.length - 1].status = f.q_run
            this.user.waitConfirm = false
            this.user.queueRef =  rtb.collection(temp.type).doc(temp.name)
            users.doc(this.user.ID).set(this.user)
          } else {
              this.out = 'not have this user ID'
              this.check = 0
          }
        }) 
      }
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
.name-user{
  background: #efeff5;
  font-size: 4vw;
  width: 50%;
  display: inline-block;
  padding: 3% 0 ;
  margin: 0 0 ;
  box-shadow: 0px 3px 3px #d0d0e1;
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
