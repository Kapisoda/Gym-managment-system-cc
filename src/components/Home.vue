<template lang="html">
  <div>
    <appNavbar></appNavbar>
    <div class="row" >
      <div class="col s6">
        <div class="info" v-for="note in notes" >
          <p><strong>{{note.author}}: </strong> {{note.body}}</p>

        </div>
        <button class="btn waves-effect waves-light teal" v-on:click="createNote" >Kreiraj novu poruku</button>
      </div>
    </div>
      <modal name="createNoteModal" :scrollable="true" :draggable="true" height="auto">
        <appNewNote></appNewNote>
      </modal>

  </div>
</template>

<script>
import NavBar from './Navbar.vue'
import NewNote from './NewNote.vue'
export default {
  name: 'home',
  data(){
    return{
      notes: []
    }
  },
  created(){
    this.$http.get('https://gym-management-system-cc.herokuapp.com/api/v1/notes/index').then(response => {
      return response.json();// success callback
    }, error => { console.log('nije prošlo'); /*rror callback*/  }).then(data => {/*obrada podataka*/  this.notes = data.notes;});
  },
  methods:{
    createNote(){
      this.$modal.show('createNoteModal');
    }
  },
  components:{
    appNavbar: NavBar,
    appNewNote: NewNote
  }
}
</script>

<style lang="css" scoped>
.info {
    background-color: #e7f3fe;
    border-left: 6px solid #2196F3;
    margin-bottom: 15px;
    padding: 4px 12px;
}

</style>
