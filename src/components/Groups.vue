<template>
  <div class="memberships">
    <appNavbar></appNavbar>
    <div class="row">
      <div class="col s3">
        <br />
        <center>
            <button type="button" class="btn waves-effect waves-light teal" name="action" v-on:click="createGroup">Kreiraj novu grupu</button>
        </center>


      </div>
      <div class="col s9">
        <table id="customers">
        <tr>
          <th>Naziv grupe</th>
        </tr>
        <tr class="list-group-item" style="cursor: pointer;" v-for="group in groups"  :key="group.id">
          <td v-on:click="seeGroup(group.id)" >{{group.name}}</td>
        </tr>
      </table>
      </div>
    </div>
    <modal name="createGroupModal" :scrollable="true" :draggable="true" height="auto">
      <appNewGroup></appNewGroup>
    </modal>
    <modal name="seeGroupModal" :scrollable="true" :draggable="true" height="auto">
      <appGroup :singleGroupObject="singleGroupObj"></appGroup>
    </modal>
    {{groups}}
    <div class = 'chart'>
    <!-- import font awesome for legend icons -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <!--
      Both the :data and :config properties are deeply reactive so any changes
      to these will cause the chart to update.
    -->
    <chart-pie :data = 'chartData' :config = 'chartConfig'></chart-pie>
  </div>



  </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import NewGroup from './NewGroup.vue'
import Group from './Group.vue'
import { ChartPie } from 'vue-d2b'

export default {
  name: 'groups',
  data () {
    return {
      chartData: [],
              chartConfig (chart) {
                  chart.donutRatio(0.5)
                },
      groups: null,
      singleGroupObj: {}
    }
  },
  created(){
      this.$http.get('https://gym-management-system-cc.herokuapp.com/api/v1/groups/index').then(response => {
      // success callback
      return response.json();
    }, error => {
      // error callback
      console.log('groups nije prošlo');
    }).then(data => {
      //obrada podataka
      this.groups = data.groups;
      var self = this;
      data.groups.forEach(function(el){
        let obj={
          label:  el.name,
          value: el.id
        }
        self.chartData.push(obj);
      });
    });


  },
  methods: {
    createGroup(){
      this.$modal.show('createGroupModal');
    },
    seeGroup(id){
      var self = this;
      this.groups.forEach(function(x) {
        if(x.id==id){
          self.singleGroupObj=x;
        }
      });
      this.$modal.show('seeGroupModal');
    }
  },
  components:{
    appNavbar: Navbar,
    appNewGroup: NewGroup,
    appGroup: Group,
    ChartPie
  }
}
</script>

<style>
.chart{
    height: 500px;
  }
#customers {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers td, #customers th {
    border: 1px solid #ddd;
    padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #7E8F7C;
    color: white;
}
</style>
