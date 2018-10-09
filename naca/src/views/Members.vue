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
          <td class="text-xs-left" >
            <span v-if="props.item.exitDay<1" class="custom-red">강퇴대상</span>
            <span v-else-if="props.item.exitDay>=100 && props.item.exitDay<200" class="custom-amber">특수회원</span>
            <span v-else-if="props.item.exitDay>=200 && props.item.exitDay<300" class="custom-blue">운영진</span>
            <span v-else-if="props.item.exitDay>=300" class="custom-green">모임장</span>
            <span v-else>{{props.item.exitDay}}일</span>
          </td>
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
    GradeService.getGrades().then((gradeList:any)=>{
      console.log('gradeList : ', gradeList);
    });
    this.getMembers();
  }
  getMembers(){
    MemberService.getMembers()
    .then((snapShot:any)=>{
      if(snapShot){
        console.log('snapShot : ', snapShot);
        let memberList= snapShot.val();
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
      }
    });
  }
  computeExitDay(member){
    let ExitDay
    let lastDay:any;
    let grade = member.grade;

    if(grade == 0){
      return 300;
    } else if(grade == 1){
      return 200;
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
      ExitDay = (grade == 2 ? 90 : (grade == 3 ? 60 : 30))
        - this.$moment(new Date).diff(lastDay, 'days');
      return ExitDay;
    } else {
      return 100
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

.custom-red { 
  color:red !important
}
.custom-amber { 
  color:#ffa000!important
}
.custom-blue { 
  color:#1976d2!important
}
.custom-green { 
  color:green !important
}
</style>