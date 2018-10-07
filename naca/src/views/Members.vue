<template>
  <v-card>
    <v-card-title>
      회원목록
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="memberList"
      :search="search"
      :rows-per-page-items="options"
      class="elevation-1 custom-table"
    >
      <template slot="items" slot-scope="props" >
        <tr @click="meberDetail(props.item.key)">
          <td class="text-xs-center custom-padding">{{ props.item.name }}</td>
          <td class="text-xs-center custom-padding">{{ props.item.birth }}</td>
          <td class="text-xs-center custom-padding">{{ props.item.joinDate }}</td>
          <td class="text-xs-left custom-padding">{{ props.item.address }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MemberService } from '../service/MemberService';
import { GradeService } from '../service/GradeService';

@Component
export default class Management extends Vue {
  @Prop() windowSize: any;
  @Prop() currentUser: any;
  @Prop() query: any;
  @Prop() params: any;
  search:string = '';
  options:any[] = [10,20,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}];
  headers:any[] = [
    {
      text: '회원이름',
      align: 'center',
      value: 'name'
    },
    {
      text : '생년월일',
      align: 'center',
      value: 'birth'
    },
    {
      text : '가입일',
      align: 'center',
      value: 'joinDate'
    },
    {
      text : '사는곳',
      align: 'left',
      value: 'address'
    }
  ];
  memberList:any[] = [];

  created(){
    console.log('currentUser : ', this.currentUser);
    console.log('query : ', this.query);
    console.log('params : ', this.params);

    GradeService.getGrades().then((gradeList:any)=>{
      console.log('gradeList : ', gradeList);
    });
    this.getMembers();
  }
  getMembers(){
    MemberService.getMembers()
    .then((memberList:any)=>{
      if(memberList){
        console.log('memberList : ', memberList);
        this.memberList = Object.keys(memberList).map(memberKey=>{
          return {
            "key" : memberKey,
            "name" : memberList[memberKey].name || "-",
            "birth" : this.$moment(memberList[memberKey].birth.toString()).format('YYYY.MM.DD') || "-",
            "joinDate" : this.$moment(memberList[memberKey].joinDate.toString()).format('YYYY.MM.DD') || "-",
            "address" : memberList[memberKey].address || "-"
          }
        });
        console.log('this.memberList : ', this.memberList);
      }
    });
  }
  meberDetail(key:string){
    console.log('key : ', key);
  }
}
</script>

<style scoped lang="scss">
.custom-table {
  .custom-padding {
    padding: 0 15px !important;
  }
}
</style>