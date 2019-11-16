<template >
<div id="body-all">
  <div class="bg-head">
    <div v-if= "user.waitConfirm" class="circle" style="background:#e0e0eb;">
      <div class="circle2">
        <div class="box-circle" style="border-bottom:0;padding-top:8%;"> 
          <button @click="confirm" style="font-size:20px; height:100%;border:0; margin-top:25%;background:none; color: #333;" >กดที่นี่<br>เพื่อรับคิวถัดไป<div style = "font-size: 17px; margin-top: 3%; color: #555;">คิวถัดไปเหลือ {{user.queueRef.q_run - user.queueRef.q_call + 1}} คิว</div></button>
        </div>
      </div>
    </div>



    <div class="circle" v-if= "!user.waitConfirm">
    <div class="box-circle"  >
      <div class="box-item" style="color:#737171;margin-top:20%; font-size: 4vw;">เหลืออีก :</div>
      <div v-if="user.process_list.length != 0">
      <div class="box-item" style="font-size:30px; display:inline-block;" >{{(user.queueRef.q_call) > 0 ? user.queue-user.queueRef.q_call : 0+ " "}}</div>
      <div class="box-item" style="display:inline-block; font-size: 5vw"> คิว</div>
      </div>
    </div>
    <div class="box-circle" style="padding-top:6%;border-bottom:0px">
      <button v-if = "user.waitConfirm" @click="confirm">ยืนยันคิว</button>
      <div  v-if = "!user.waitConfirm">
      
      <div class="box-item" style="font-size:27px; display:inline-block;">{{(user.queue-user.queueRef.q_call) > 0 ? parseInt(this.user.queueRef.est_time * (user.queue-user.queueRef.q_call)/ 60) + 1 : "-"}}</div>
      <div>
        <div class="box-item" style="display:inline ; font-size:15px; color:grey;">นาที</div>
      </div>
      </div>
    
    </div>
    </div>
  </div>
  <div class="name-user" style="">ชื่อ {{user.name}}</div>
  <div class="name-user" style="">คิวที่ {{user.queue}}</div>
  <div style = "height: 220px;">
  <div class="task" style="padding-left:20px; font-size: 4vw;">
    กระบวนการ
  </div>
  <div class="task" style="width:30%; max-width:150px;text-align:center; font-size: 4vw;">
  สถานะ
  </div><br>
  <div v-for = "e in this.hmhm" :key="e.name" style="padding-left:0px; font-size: 4.2vw;">
    <div :class = "{grey: !Number.isInteger(e.status)}" style = "text-align:justify; width: 60%; margin:auto; margin-left:17%"><br><span>{{e.name}}</span><span style = "float:right">{{e.status != 'pass' ? Number.parseInt(e.status) == 0 ? "ถึงคิวของท่านแล้ว" :"รอ" : "เสร็จสิ้น"}}</span><br></div>
  </div>
  <div class="task-data" style="width:30%; max-width:150px;text-align:center;border-right:0; font-size: 4vw;">
  </div>
  </div>
  <!-- <p>{{ $store.getters.LinkID }}</p> -->
  <router-link to = "/DrugPage"><button type="button" style = "font-size: 4vw; margin-top:17%;">ดูสถานที่ {{user.process_list[user.process_list.length - 1].name}}</button></router-link>
  
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
        console.log(this.user)
        if(this.user.process_list.length == 0){
          this.getQueue()
        }
  
    })
  },
  computed: {
    hmhm: function() {
      return(this.user.process_list.slice(-3))
    }
  },
  methods: {
    getQueue() {
       
      this.out = 1234
      temp = this.user
      if(this.user.enroll == true){
        rtb.runTransaction(function(transaction) {
              // This code may get re-run multiple times if there are conflicts.
          return transaction.get(departments.doc('OPD')).then(function(doc) {
              if (!doc.exists) {
                  throw "Document does not exist!";
                  
              }
              f = doc.data()
              console.log(f)
              // console.log(temp)
              
              f.q_run+=1
              
              // console.log(this.user)
              f.q_list.push({userID:temp.ID,queue:f.q_run})
              
              console.log(f)
              console.log('efe')
              transaction.update(departments.doc('OPD'),{
                q_run : f.q_run,
                q_list: f.q_list
              });
              console.log('ppp')
          });
        }).then(function() {
            console.log("Transaction successfully committed!");
            users.doc(temp.ID).set({
              process_list: [{
                type : 'department',
                name : 'OPD',
                status : f.q_run
              }],
              queue : f.q_run
            }, { merge: true });
        }).catch(function(error) {
            console.log("Transaction failed: ", error);
        });
      }
      else{
        processes.doc('ลงทะเบียนผู้ป่วย').get().then(doc => {
          this.out = 666666
          if (doc.exists) {
            rtb.runTransaction(function(transaction) {
              // This code may get re-run multiple times if there are conflicts.
              return transaction.get(processes.doc('ลงทะเบียนผู้ป่วย')).then(function(doc) {
                  if (!doc.exists) {
                      throw "Document does not exist!";
                      
                  }
                  f = doc.data()
                  console.log(f)
                  f.q_run+=1
                  f.q_list.push({userID:temp.ID,queue:f.q_run})
                  transaction.update(processes.doc('ลงทะเบียนผู้ป่วย'),{
                    q_run : f.q_run,
                    q_list: f.q_list
                  });
                });
              }).then(function() {
                  console.log("Transaction successfully committed!");
                  users.doc(temp.ID).set({
                    process_list: [{
                      type : 'process',
                      name : 'ลงทะเบียนผู้ป่วย',
                      status : f.q_run
                    }],
                    queue : f.q_run,
                    waitConfirm : false,
                  }, { merge: true });
              }).catch(function(error) {
                  console.log("Transaction failed: ", error);
              });
              // this.$bind('process', processes.doc('ลงทะเบียนผู้ป่วย')).then(process => {
              //   this.process === process
              //   f = doc.data()

              //   this.out = 555
              //   users.doc(this.user.ID).set({
              //     process_list: [{
              //       type : 'process',
              //       name : 'ลงทะเบียนผู้ป่วย',
              //       status : f.q_run + 1
              //     }],
              //     queue : f.q_run
              //   }, { merge: true });
              //   f.q_list.push({userID:this.user.ID,queue:f.q_run})
              //   processes.doc('ลงทะเบียนผู้ป่วย').set(f).then(() => {
              //     this.out = f.q_run
              //   })
              // })
          }
        })
        }
      },
      confirm(){
      temp = this.user.process_list[this.user.process_list.length-1]
      this.out = temp
      var user = this.user
      if(temp.type == 'department' || temp.type == 'process'){
        rtb.runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(rtb.collection(temp.type).doc(temp.name)).then(function(doc) {
            if (!doc.exists) {
                throw "Document does not exist!";
                
            }
            f = doc.data()
            console.log(f)
            f.q_run+=1
            f.q_list.push({userID:user.ID,queue:f.q_run})
            transaction.update(rtb.collection(temp.type).doc(temp.name),{
              q_run : f.q_run,
              q_list: f.q_list
            });
          }).then(function() {
              console.log("Transaction successfully committed!");
              users.doc(user.ID).set({
                process_list: [{
                  type : 'process',
                  name : 'ลงทะเบียนผู้ป่วย',
                  status : f.q_run,
                 
                }],
                 waitConfirm : false,
                queue : f.q_run
              }, { merge: true });
          }).catch(function(error) {
              console.log("Transaction failed: ", error);
          });
        })
 
      }
      else {
        rtb.runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(rtb.collection('department').doc(temp.type).collection('Doctors').doc(temp.name)).then(function(doc) {
              if (!doc.exists) {
                  throw "Document does not exist!";
                  
              }
              f = doc.data()
              console.log(f)
              f.q_run+=1
              f.q_list.push({userID:user.ID,queue:f.q_run})
              transaction.update(rtb.collection('department').doc(temp.type).collection('Doctors').doc(temp.name),{
                q_run : f.q_run,
                q_list: f.q_list
              });
          }).then(function() {
              console.log("Transaction successfully committed!");
              users.doc(user.ID).set({
                process_list: [{
                  type : 'process',
                  name : 'ลงทะเบียนผู้ป่วย',
                  status : f.q_run,
                  
                }],
                waitConfirm : false,
                queue : f.q_run
              }, { merge: true });
          }).catch(function(error) {
              console.log("Transaction failed: ", error);
          })
        })
        // rtb.collection('department').doc(temp.type).collection('Doctors').doc(temp.name).get().then(doc => {
        //  if (doc.exists) {
        //     f = doc.data()
        //     f.q_run+=1
        //     f.q_list.push({userID:this.user.ID,queue:f.q_run})
        //     rtb.collection('department').doc(temp.type).collection('Doctors').doc(temp.name).update({
        //       q_run : f.q_run,
        //       q_list : f.q_list
        //     })
        //     this.user.process_list[this.user.process_list.length - 1].status = f.q_run
        //     this.user.waitConfirm = false
        //     this.user.queueRef =  rtb.collection(temp.type).doc(temp.name)
        //     users.doc(this.user.ID).set(this.user)
        //   } else {
        //       this.out = 'not have this user ID'
        //       this.check = 0
        //   }
        // }) 
      }
    }
  }
}
</script>



<style>
button{
  margin-top: 70px;
  width: 60vw;
  height:45px;
  background:#FFFFFF;
  border: 2px solid #7FBCEB;
  box-sizing: border-box;
  border-radius: 5px;
  max-width: 250px;

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
  box-shadow: 0px 3px 5px #dfdfdf;
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
.circle2{
  background: #FFFFFF;
  width: 200px;
  height:200px;
  display:block;
  margin :auto;
  border-radius: 100%; 
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-name: buttonTransition;
  transform-origin: center center;
}
@keyframes buttonTransition {
    from {
        transform: scale(0.8);
    }
    to {
        transform: scale(1);
    }
}
* {
  font-family: 'Noto Sans Thai Cound', sans-serif;
}

@keyframes buttonTransition {
    from {
        transform: scale(0.9);
    }
    to {
        transform: scale(1);
    }
}

.innerCircle {
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-name: buttonTransition;
    transform-origin: center center;

}
.grey {
  color: #888;
}

</style>