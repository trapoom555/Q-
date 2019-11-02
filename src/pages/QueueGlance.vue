<template>
<div>
    <img src="../assets/logo.png">
    <p class = "topic" v-on:click="getQueue" >คิวปัจจุบัน:</p>
    <p class = "value">{{queue}} คิว</p>
    <p class = "topic">เวลาโดยประมาณ:</p>
    <p class = "value">{{time}}</p>
    <router-link to="/UIque"><btn msg = "กดคิว"/></router-link>
</div>
</template>

<script>
/* eslint-disable no-console */
import { rtb } from "../firebase";
const users = rtb.collection('user')
import btn from '../components/button.vue'
const departments = rtb.collection('department')
const processes = rtb.collection('process')
var f
export default {
    name: 'QueueGlance',
    components:{
    btn
    },
    data: function() {
        return {
        user: '',
        queue: 20,
        time: '00:25 hr',
        process: '',
        department: '',

        }
    },
    created() {
        this.$bind('user', users.doc(this.$store.getters.LinkID)).then(user => {
        this.user === user
        /* eslint-disable no-console */
        console.log(this.user.enroll)
    })},
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
                  }]
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
            console.log('jaaj')
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
      
    
        }
    }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
img {
    width: 40%;
    margin: auto;
    margin-bottom: 5%;
    margin-top: 10%;
}
p {
    font-size: 4.5vw;
    text-align: left;
    padding: 1%;
}

.topic {
    margin-left: 7%;
    color: #333;
    border-bottom: 1px solid #ccc;
    width: 50%;
    padding-bottom: 3%;
}
.value {
    margin-left:15%;
}
* {
    font-family: 'Noto Sans Thai Cound', sans-serif;
}
</style>