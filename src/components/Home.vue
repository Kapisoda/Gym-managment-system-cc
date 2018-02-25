<template lang="html">
  <div>
    <appNavbar></appNavbar>
    <div class="row" v-if="noUserError">
      <div class="col s12">
        <div class="danger">
            <p><strong>Oprez!</strong> Korisnik ne postoji</p>
        </div>
      </div>
    </div>
    <div class="row" >
      <div class="col s12">
        <h5>Kartice</h5>
        <p><input  type="text" v-model="stringCard" autofocus/></p> <!--onblur="this.focus()"-->
      </div>
    </div>
    <div class="row" >
      <div class="col s4">
        <h5>Poruke</h5>
        <a class="button-floater btn-floating btn-large red" v-on:click="createNote">
            <i class="large material-icons">mode_edit</i>
        </a>
        <div class="info" v-for="note in notes" >
          <p><strong>{{note.author}}: </strong> {{note.body}}<button class="btn-small right  btn waves-effect waves-light red"  v-on:click="deleteMessage(note.id)">X</button></p>
        </div>
      </div>
      <div class="col s4">
        <h5>Statistika</h5>
        <pie-chart :data="chartData" :donut="true"></pie-chart>
        <pie-chart :data="chartDataUser" :donut="true"></pie-chart>
      </div>
      <div class="col s4">
        <h5>Dolasci</h5>
        <div class="success" v-for="us in usersAttendance" >
          <p><strong>{{us.first_name}} {{us.last_name}}  </strong>  {{us.time}}</p>
        </div>
      </div>
    </div>
      <modal name="createNoteModal" :scrollable="true" :draggable="true" height="auto">
        <appNewNote></appNewNote>
      </modal>
      <modal name="singleUser" :scrollable="true" :draggable="true" height="auto">
        <appSingleUser :singleUserObject="singleUserObj"></appSingleUser>
      </modal>

  </div>
</template>

<script>
import NavBar from './Navbar.vue'
import NewNote from './NewNote.vue'
import SingleUser from './SingleUser.vue'
import moment from 'moment'
export default {
  name: 'home',
  data(){
    return{
      stringCard: '',
      usersAttendance: [],
      users: [],
      chartData: [],
      chartDataUser: [],
      notes: [],
      object:{
        note:{
          id: ''
        }
      },
      singleUserObj: null,
      noUserError: false,
      numberUnderline: 0
    }
  },
  created(){
    this.$http.get('https://gym-management-system-cc.herokuapp.com/api/v1/member_attendances/index').then(response => {
      return response.json();// success callback
    }, error => { console.log('nije prošlo'); /*rror callback*/  }).then(data => {/*obrada podataka usersAttendance*/ console.log('DOHVAĆANJE DOLAZAKA'); console.log(data.member_attendances)
      var self = this;
      for(let i=0; i<data.member_attendances.length; i++){
        if(i>20){break;};
        let obj={
          first_name: data.member_attendances[i].user.first_name,
          last_name: data.member_attendances[i].user.last_name,
          time: moment(data.member_attendances[i].created_at).format('DD.MM.YYYY, HH:mm')
        }
        self.usersAttendance.push(obj);
      };
      if(self.usersAttendance)
        self.usersAttendance = self.usersAttendance.reverse();

  });


    this.$http.get('https://gym-management-system-cc.herokuapp.com/api/v1/groups/index').then(response => {
    /*success callback*/ return response.json();}, error => {/* error callback*/}).then(data => {
        //obrada podataka*/
        this.groups = data.groups;
        var self = this;
        data.groups.forEach(function(el){
          self.chartData.push([el.name, el.users.length ]);
        });
    });
    this.$http.get('https://gym-management-system-cc.herokuapp.com/api/v1/notes/index').then(response => {
      return response.json();// success callback
    }, error => { console.log('nije prošlo'); /*rror callback*/  }).then(data => {/*obrada podataka*/  this.notes = data.notes.reverse();});

    this.$http.get('https://gym-management-system-cc.herokuapp.com/api/v1/users/index').then(response => {
      return response.json();// success callback
    }, error => {  /*rror callback*/  }).then(data => {/*obrada podataka*/
      this.users = data.users;
      var brojAktivnih = 0;
      var brojNeaktivnih = 0;
        data.users.forEach(function(el){
          if(el.status=='active'){
            brojAktivnih += 1;
          }else{ brojNeaktivnih += 1; };
        });
      this.chartDataUser.push(['Aktivni', brojAktivnih]);
      this.chartDataUser.push(['Neaktivni', brojNeaktivnih]);
    });
  },
  methods:{
    createNote(){
      this.$modal.show('createNoteModal');
    },
    deleteMessage(id){
      var por = confirm("Jeste li sigurni da želite izbrisati poruku?");
      if(por){
      this.object.note.id = id;
      console.log(this.object.note.id);
      alert(this.object.note.id);
      this.$http.post('https://gym-management-system-cc.herokuapp.com/api/v1/notes/destroy', this.object).then(response => {
      // success callback
        this.error = false;
        return response.json();
      }, error => {
        // error callback
        if(error.status){
          console.log('error is: '+error.status);
          this.error = true;
      }
      }).then(data => {
        //obrada podataka
        console.log(data);
      });
      location.reload();

      }
    }
  },
  components:{
    appNavbar: NavBar,
    appNewNote: NewNote,
    appSingleUser: SingleUser

  },
  watch:{
    stringCard(){ //_.includes(this.stringCard, '_')
      var tempError = 0;
      var self = this;
      this.numberUnderline = this.stringCard.split("_").length - 1
      if(this.numberUnderline==2){
        this.users.forEach(function(x) {
          if(x.code==self.stringCard){
            self.singleUserObj=x;
            self.stringCard = '';
            tempError = -1;
            self.numberUnderline = 0;
          }else {
            tempError = 1;
          }
        });
        if(tempError==-1){
          this.noUserError = false;
          this.$modal.show('singleUser');
        }else if (tempError==1) {
          this.noUserError = true;
          this.numberUnderline = 0;
          this.stringCard='';
        };
      };

      setTimeout(function(){
        self.numberUnderline = 0;
        self.stringCard='';
        self.noUserError = false;
      }, 5000);





    }
  },
}
</script>

<style lang="css" scoped>
.danger {
    background-color: #ffdddd;
    border-left: 6px solid #f44336;
    margin-bottom: 15px;
    padding: 4px 12px;
}
h5{
  color: white;
  background-color: #43C69C;
  text-align: center;
}

.success {
    background-color: #ddffdd;
    border-left: 6px solid #4CAF50;
    margin-bottom: 15px;
    padding: 4px 12px;
}

.button-floater{
  position: fixed;
    bottom: 1em;
    left: 1em;
}
.btn-small {
    height: 24px;
    line-height: 24px;
    padding: 0 0.5rem;
}
.info {
    background-color: #e7f3fe;
    border-left: 6px solid #2196F3;
    margin-bottom: 15px;
    padding: 4px 12px;
}

</style>
