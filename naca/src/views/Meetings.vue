<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <!-- <ProgressComp :propData="dates"></ProgressComp> -->
        <v-btn flat icon Outline fixed left color="black" style="z-index:2; left: 2px; top: 60px;" @click="historyBack()">
          <v-icon>undo</v-icon>
        </v-btn>
        <v-card class="pt-5 pa-3">
          <div class="subheading">이달의 벙 목록</div>
          <!-- v-model="dates" -->
          <v-date-picker
            full-width
            v-model="date"
            ref="picker"
            event-color="green lighten-1"
            :reactive="true"
            :events="checkMeetingDay"
            :picker-date.sync="pickerDate"
            locale="ko"
          ></v-date-picker>
        </v-card>

        <v-dialog v-model="viewDialog" persistent >
          <form id="create-meeting-dialog" class="ui form" @submit.prevent="putMeeting">
            <v-card>
              <v-card-title>
                <span class="headline">모임 생성</span>
                <v-btn
                  @click="closeDialog()"
                  fixed
                  right
                  flat
                  icon
                  style="font-size:20px"
                >
                  <v-icon>clear</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="pa-0">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="computedDateFormatted"
                          label="모임 날짜"
                          required
                          readonly
                          disabled
                        ></v-text-field>
                        <!-- <v-dialog
                          ref="dateInput"
                          v-model="dateInput"
                          persistent
                          full-width
                        >
                          <v-text-field
                            slot="activator"
                            v-validate="'required|date_format:YYYY-MM-DD'"
                            v-model="computedDateFormatted"
                            :error-messages="errors.collect('date')"
                            label="모임 날짜"
                            data-vv-name="date"
                            required
                            readonly
                          ></v-text-field>
                          <v-date-picker
                            full-width
                            v-model="date"
                            no-title
                            @input="$refs.dateInput.save(date)"
                            ref="picker"
                            event-color="green lighten-1"
                            :picker-date.sync="pickerDate"
                            :reactive="true"
                            :events="checkMeetingDay"
                            locale="ko"
                          ></v-date-picker>
                        </v-dialog> -->
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-validate="'required|min:1|max:20'"
                          v-model="title"
                          :counter="20"
                          :error-messages="errors.collect('title')"
                          label="타이틀"
                          data-vv-name="title"
                          clearable
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-select
                          v-validate="'required'"
                          v-model="place"
                          :items="PlaceList"
                          :error-messages="errors.collect('place')"
                          label="장소"
                          data-vv-name="place"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12>
                        <v-select
                          v-model="selectedContents"
                          v-validate="'required|min:1'"
                          :error-messages="errors.collect('contents')"
                          :items="Contents"
                          label="컨텐츠"
                          data-vv-name="contents"
                          deletable-chips
                          multiple
                        >
                          <v-list-tile
                            slot="prepend-item"
                            ripple
                            @click="toggleSelectAllContents"
                          >
                            <v-list-tile-action>
                              <v-icon :color="selectedContents.length > 0 ? 'indigo darken-4' : ''">{{contentsCheckboxIcon}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-title>
                              {{selectedContents.length == Contents.length ? 'Deselect All' : 'Select All'}}
                            </v-list-tile-title>
                          </v-list-tile>
                          <v-divider
                            slot="prepend-item"
                            class="mt-2"
                          ></v-divider>
                          <v-divider
                            slot="append-item"
                            class="mb-2"
                          ></v-divider>
                        </v-select>
                      </v-flex>
                      
                      <v-flex xs12>
                        <v-select
                          v-model="selectedMembers"
                          :items="members"
                          label="참여자"
                          data-vv-name="members"
                          item-value="key"
                          item-text="name"
                          chips
                          deletable-chips
                          multiple
                          dense
                          hint="참여자는 필수입력값이 아니며, 벙을 먼저 생성후 나중에 입력하는 것을 권장합니다."
                        >
                          <v-list-tile
                            slot="prepend-item"
                            ripple
                            @click="toggleSelectAllMembers"
                          >
                            <v-list-tile-action>
                              <v-icon :color="selectedMembers.length > 0 ? 'indigo darken-4' : ''">{{membersCheckboxIcon}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-title>
                              {{selectedMembers.length == members.length ? 'Deselect All' : 'Select All'}}
                            </v-list-tile-title>
                          </v-list-tile>
                          <v-divider
                            slot="prepend-item"
                            class="mt-2"
                          ></v-divider>
                          <v-divider
                            slot="append-item"
                            class="mb-2"
                          ></v-divider>
                        </v-select>

                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="closeDialog()">Close</v-btn>
                  <v-btn color="blue darken-1" flat type="submit">
                    {{isNew ? 'Create' : 'Update'}}
                  </v-btn>

                  <v-layout row justify-center v-if="!isNew">
                    <v-btn color="red darken-1" flat
                    @click="viewConfirmDelete = true">Delete</v-btn>
                    <v-dialog
                      v-model="viewConfirmDelete"
                    >
                      <v-card>
                        <v-card-title class="headline">정말 지우시겠습니까?</v-card-title>
                        <v-card-text>
                          이 모임을 삭제하면 복구할 수 없습니다.
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            flat="flat"
                            @click="viewConfirmDelete = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="red darken-1"
                            flat="flat"
                            @click="deleteMeeting()"
                          >
                            Delete
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-layout>
                </v-card-actions>
            </v-card>
          </form>
        </v-dialog>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import { MeetingService } from '../service/MeetingService';
import { MemberService } from '../service/MemberService';
import { Meeting }  from '../model/meeting.model';
import { Member }  from '../model/member.model';
import { Contents }  from '../model/Contents';
import { Place }  from '../model/Place';
import ProgressComp from '../components/ProgressComp.vue';


@Component({
  components : {
    ProgressComp
  }
})
export default class Meetings extends Vue {
  @Prop() currentUser: any;
  @Prop() windowSize: any;
  @Prop() query: any;
  @Prop() params: any;
  @Emit('showSnackbar') showSnackbar(color:string,text:string){}

  @Watch('currentUser')
  changeCurrentUser() {
    this.getMeetingsMonth();
  }

  @Watch('pickerDate')
  dateChanged(val:any){
    if(val.length > 4){
      this.getMeetingsMonth(this.$moment(val)._d);
    }
  }
    
  @Watch('date')
  pickDay(pickDay:any,prevDay:any){
    if(pickDay.length == 10 && (pickDay.split('-')[2] != prevDay.split('-')[2])){
      if(!this.members.length || !this.Members){
        this.getMembers();
      }
      
      const meetingAndKey = this.findMeetingAndKeyByDate(parseInt(this.$moment(pickDay).format('YYYYMMDD')));
      this.isNew = true;
      this.viewDialog = true;
      if(meetingAndKey.meeting){
        this.isNew = false;
        this.selectedContents = meetingAndKey.meeting.contents
        this.selectedMembers = meetingAndKey.meeting.members
        this.title = meetingAndKey.meeting.title
        this.place = meetingAndKey.meeting.place
      }
    }
  }
  get computedDateFormatted () {
    return this.$moment(this.date).format('YYYY-MM-DD');
  }
  get allContents () {
    return this.selectedContents.length === this.Contents.length
  }
  get someContents () {
    return this.selectedContents.length > 0 && !this.allContents
  }
  get contentsCheckboxIcon () {
    if (this.allContents) return 'check_box'
    if (this.someContents) return 'indeterminate_check_box'
    return 'check_box_outline_blank'
  }
  get allMembers () {
    return this.selectedMembers.length === this.members.length
  }
  get someMembers () {
    return this.selectedMembers.length > 0 && !this.allMembers
  }
  get membersCheckboxIcon () {
    if (this.allMembers) return 'check_box'
    if (this.someMembers) return 'indeterminate_check_box'
    return 'check_box_outline_blank'
  }

  viewDialog:boolean = false;
  viewDialogChild:boolean = false;
  title:string = '';


  Contents:string[] = Contents;
  selectedContents:string[] = [];
  
  PlaceList:string[] = Place;
  place:string = '';
  date:any = '';//this.$moment(new Date).format('YYYY-MM-DD');
  dates:any = null;
  meetingsMonth:any = null;
  meeting:Meeting = new Meeting;
  pickerDate:any = null;
  // dateInput:boolean = false;
  isNew:boolean = false;
  viewConfirmDelete:boolean = false;

  Members:any = null;
  members:any[] = [];
  selectedMembers:any[] = [];

  created(){
    if(this.currentUser){
      this.getMeetingsMonth();
    }
  }
  historyBack(){
    this.$router.go(-1);
  }
  getMembers(){
    const that = this;
    MemberService.getMembers()
    .then((members:any)=>{
      if(members){
        this.Members = members;
        this.members = Object.keys(members).map(memberKey=>{
          return {
            "key" : memberKey,
            "name" : members[memberKey].name
          }
        });
      }
    });
  }
  getMeetingsMonth(pDate:Date=new Date()){
    const date:string = this.$moment(pDate).format('YYYYMM');
    const that = this;
    this.dates = [];
    MeetingService.getMeetings({
      startAt : parseInt(`${date}01`),
      endAt : parseInt(`${date}32`)
    })
    .then((res:any)=>{
      if(res){
        this.meetingsMonth = res;
        this.dates = Object.keys(res).map((key:any)=>{
          return that.$moment(res[key].date.toString()).format('YYYY-MM-DD')
        })
      } else {
        this.meetingsMonth = {};
      }
    });
  }
  checkMeetingDay(event:any){
    return this.dates ? 
      this.dates.find((date:any)=>{
        return date == event;
      })
      : false
  }
  closeDialog(){
    this.viewDialog = false;
    this.date = '';
  }
  putMeeting(){
    this.$validator.validateAll().then((result:any) => {
      if (result) {
        if(this.currentUser){
          MeetingService.getIdToken(this.currentUser).then((auth:any)=>{
            const date = parseInt(this.$moment(this.date).format('YYYYMMDD'));
            const meetingAndKey = this.findMeetingAndKeyByDate(date);
            const params = {
              date,
              contents : this.selectedContents,
              title : this.title,
              place : this.place,
              members : this.selectedMembers || [],
            }
            if(!meetingAndKey.meeting){
              MeetingService.createMeeting(params).then((res:any)=>{
                this.showSnackbar('success','모임을 생성했습니다');
                this.closeDialog();
                this.clear();
                this.getMeetingsMonth(this.$moment(date.toString())._d);
              },(err:any)=>{
                this.showSnackbar('error','모임을 생성 실패했습니다');
              })
            } else {
              MeetingService.updateMeeting(meetingAndKey.key,params).then((res:any)=>{
                this.showSnackbar('success','모임을 수정했습니다');
                this.closeDialog();
                this.clear();
                this.getMeetingsMonth(this.$moment(date.toString())._d);
              },(err:any)=>{
                this.showSnackbar('error','모임을 수정 실패했습니다');
              })
            }
          },(err:any)=>{
            this.showSnackbar('error', err);
          });
        } else {
          this.showSnackbar('error','권한이 없습니다.');
        }
      }
    });
  }
  deleteMeeting(){
    this.viewConfirmDelete = false;
    const date = parseInt(this.$moment(this.date).format('YYYYMMDD'));
    const meetingAndKey = this.findMeetingAndKeyByDate(date);

    if(this.currentUser && meetingAndKey.meeting){
      MeetingService.getIdToken(this.currentUser).then((auth:any)=>{
        MeetingService.deleteMeeting(meetingAndKey.key,{auth}).then(()=>{
          this.showSnackbar('success','모임을 삭제했습니다');
          this.closeDialog();
          this.clear();
          this.getMeetingsMonth(this.$moment(date.toString())._d);
        },(err:any)=>{
        })
        .catch((error:any)=>{
          this.showSnackbar('error','모임을 삭제 실패했습니다');
        });
      });
    } else {
      this.showSnackbar('error', '권한이 없습니다.');
    }
  }
  findMeetingAndKeyByDate(date:number){
    let meeting,key;
    for(let meetingKey in this.meetingsMonth){
      if(this.meetingsMonth[meetingKey]['date'] === date){
        meeting = this.meetingsMonth[meetingKey];
        key = meetingKey;
        break
      } else {
        continue;
      }
    }
    return {
      meeting,
      key
    }
  }
  clear(){
    this.selectedContents = [];
    this.selectedMembers = [];
    this.title = '';
    this.place = '';
    this.$validator.reset();
  }
  toggleSelectAllContents () {
    this.$nextTick(() => {
      if (this.allContents) {
        this.selectedContents = []
      } else {
        this.selectedContents = this.Contents.slice()
      }
    })
  }
  toggleSelectAllMembers () {
    this.$nextTick(() => {
      if (this.allMembers) {
        this.selectedMembers = []
      } else {
        this.selectedMembers = this.members.slice()
      }
    })
  }
}
</script>

<style scoped lang="scss">
.v-card {
  box-shadow:none;
}
.v-btn--right {
    right: 26px;
}
</style>