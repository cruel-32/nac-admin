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
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.birth }}</td>
          <td class="text-xs-center">{{ props.item.joinDate }}</td>
          <td class="text-xs-left">{{ props.item.address }}</td>
          <td class="text-xs-left">{{ props.item.exitDay }}</td>
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
    },
    {
      text : '강퇴날(D-?)',
      align: 'left',
      value: 'exitDay'
    },
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
            "address" : memberList[memberKey].address || "-",
            "exitDay" : this.computeExitDay(memberList[memberKey])
          }
        });
        console.log('this.memberList : ', this.memberList);
      }
    });
  }
  computeExitDay(member){
    let ExitDay
    let lastDay:any;
    let grade = member.grade;

    if(grade == 0){
      return '모임장';
    } else if(grade == 1){
      return '운영진';
    } else if(grade == 2 || grade == 3 || grade == 4){
      let memberPart = member.participation;
      if(memberPart){
        let memberPartArr = Object.keys(memberPart);
        if(memberPartArr.length){
          lastDay = this.$moment(
            memberPartArr.map((key:any)=>{
              return memberPart[key]
            }).sort((a:any,b:any)=>{
              return b-a;
            })[0].toString()
          )
        } else {
          lastDay = this.$moment(member.joinDate.toString())
        }
      } else {
        lastDay = this.$moment(member.joinDate.toString())
      }
      // console.log('lastDay : ', lastDay);
      ExitDay = (grade == 2 ? 90 : (grade == 3 ? 60 : 30))
        - this.$moment(new Date).diff(lastDay, 'days');
      return ExitDay < 1 ? "강퇴대상" : ExitDay;
    } else {
      return '-'
    }
  }
  meberDetail(key:string){
    console.log('key : ', key);
  }
}
</script>

<style lang="scss">
.custom-table {
  th,td {
    padding: 0 10px !important;
  }
}
</style>