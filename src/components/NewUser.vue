<template>
  <div>
   <div class="col s12" ><!--:test=test -->
      <div class= "row">
        <center>
          <h4>Novi korisnik</h4>
        </center>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="Ime" type="text" class="validate" v-model="newUserObject.user.first_name">
          <label for="Ime">Ime</label>
        </div>
        <div class="input-field col s6">
          <input id="Prezime" type="text" class="validate" v-model="newUserObject.user.last_name">
          <label for="Prezime">Prezime</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="Address" type="text" class="validate" v-model="newUserObject.user.address">
          <label for="Address">Adresa</label>
        </div>
        <div class="input-field col s6">
          <input id="OIB" type="text" class="validate" v-model="newUserObject.user.OIB">
          <label for="OIB">OIB:</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input  id="birthDate" type="date" v-model="newUserObject.user.birth_date">
          <label class="active" for="birthDate">Datum rođenja</label>
        </div>
        <div class="input-field col s6">
          <input id="cardNumber" type="text" class="validate" v-model="newUserObject.user.code">
          <label for="cardNumber">Broj kartice</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="Email" type="text" class="validate" v-model="newUserObject.user.email">
          <label for="Email">Email</label>
        </div>
        <div class="input-field col s6">
          <label class="active" for="aktivnost">Aktivnost</label>
          <br />
          <v-select v-model="statusSelect" :options="[{ label: 'Aktivni', value: 'active'},{ label: 'Neaktivni', value: 'inactive'}, { label: 'Pauza', value: 'pause'}]"></v-select>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s6">
          <input id="phoneNumber" type="text" class="validate" v-model="newUserObject.user.phone_number">
          <label for="phoneNumber">Tel:</label>
        </div>
        <div class="input-field col s6">
          <label class="active" for="gender">Spol</label>
          <br />
          <v-select v-model="genderSelect" :options="[{ label: 'M', value: 'm'},{ label: 'Ž', value: 'ž'}]"></v-select>
        </div>
      </div>

      <div class="row">
        <div class="field col s12">
          <label class="active" for="memberships">Članarine</label>
          <br />
          <v-select multiple v-model="membershipOption" :options="membershipsForPick"></v-select>
        </div>
      </div>
      <div class="row">
        <div class="field col s12">
          <label class="active" for="groups">Grupe</label>
          <br />
          <v-select multiple v-model="groupOption" :options="groupsForPick"></v-select>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input  id="from" type="date" v-model="newUserObject.user.membership_starts_at">
          <label class="active" for="from">Trajanje članarine od:</label>
        </div>
        <div class="input-field col s6">
          <input  id="to" type="date" v-model="newUserObject.user.membership_ends_at">
          <label class="active" for="to">Trajanje članarine do:</label>
        </div>
      </div>
      <div class="row">
        <div class="field col s12">
          <center>
          <a class="waves-effect waves-light btn" v-on:click="createNewUser">Kreiraj novog korisnika</a>
        </center>
        </div>
      </div>

    </div>
</div>
</template>


<script>
import dropdown from 'vue-my-dropdown'
import moment from 'moment'
export default {
  name: 'newUser',
  data(){
    return {
      visible: false,
      isActive: false,
      error: false,
      newUserObject: {
        user: {
          first_name: '',
          last_name: '',
          birth_date: '',
          email: '',
          status: '',
          birth_date: '',
          OIB: '',
          phone_number: '',
          address: '',
          sex: '',
          code: '',
          membership_type_ids: [],
          group_ids: [],
          membership_starts_at: '',
          membership_ends_at: ''
        }
      },
      memberships: [],
      membershipsForPick: [],
      membershipOption: '',
      groups: [],
      groupsForPick: [],
      groupOption: '',
      statusSelect: '',
      genderSelect: ''

    }
  },
  methods:{
    createNewUser(){
      var self = this;
      if(this.membershipOption){
      this.membershipOption.forEach(function(el){
        self.newUserObject.user.membership_type_ids.push(el.value);
      });
      }
      console.log(this.groupOption);
      if(this.groupOption){
      this.groupOption.forEach(function(el){
        self.newUserObject.user.group_ids.push(el.value);
      });
      }

      this.newUserObject.user.status = this.statusSelect.value;
      this.newUserObject.user.sex = this.genderSelect.value;

     this.$http.post('https://gym-management-system-cc.herokuapp.com/api/v1/users/create', this.newUserObject).then(response => {
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
        console.log('prošlo');
      });
      //location.reload();
    }
  },
  components: {
    dropdown: dropdown
  },
  created(){
    this.$http.get('https://gym-management-system-cc.herokuapp.com/api/v1/membership_types/index').then(response => {
      // success callback
      console.log('uspjesan poziv');
      return response.json();
    }, error => {
      // error callback
      console.log('Memberships nije prošlo');
    }).then(data => {
      //obrada podataka
      this.memberships= data.membership_types;
      var self = this;
      data.membership_types.map(x => {
        let obj = {
          label: x.name,
          value: x.id
        }
        self.membershipsForPick.push(obj);
      });
    });


    this.$http.get('https://gym-management-system-cc.herokuapp.com/api/v1/groups/index').then(response => {
      // success callback
      return response.json();
    }, error => {
      // error callback
    }).then(data => {
      //obrada podataka
      this.groups = data.groups;
      var self = this;
      data.groups.map(x => {
        let obj = {
          label: x.name,
          value: x.id
        }
          self.groupsForPick.push(obj);
      });
    });

    this.newUserObject.user.membership_starts_at = moment().format('YYYY-MM-DD');
    this.newUserObject.user.membership_ends_at = moment().add(1, 'M').format('YYYY-MM-DD');
  }
}

</script>

<style lang="scss">

</style>
