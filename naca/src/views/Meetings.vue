<template>
  <div class="meetings">
    <ProgressComp :propData="dates"></ProgressComp>
    <v-btn flat icon Outline color="black" @click="historyBack()">
      <v-icon>undo</v-icon>
    </v-btn>
    <v-card class="pa-3">
      <div class="subheading">이달의 벙 목록</div>
      <!-- v-model="dates" -->
      <v-date-picker
        full-width
        v-model="date"
        ref="picker"
        event-color="green lighten-1"
        :picker-date.sync="pickerDate"
        :reactive="true"
        :events="checkMeetingDay"
      ></v-date-picker>
    </v-card>

    <v-dialog v-model="viewDialog" persistent max-width="500px">
      <form id="create-meeting-dialog" class="ui form" @submit.prevent="onSubmit">
        <v-card>
          <v-card-title>
            <span class="headline">모임 생성</span>
          </v-card-title>
          <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-validate="'required|min:1|max:20'"
                      v-model="title"
                      :counter="20"
                      :error-messages="errors.collect('title')"
                      label="타이틀"
                      data-vv-name="title"
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
                    <!-- <v-text-field
                      v-validate="'required|min:1|max:20'"
                      v-model="place"
                      :counter="20"
                      :error-messages="errors.collect('place')"
                      label="장소"
                      data-vv-name="place"
                    ></v-text-field> -->
                  </v-flex>
                  <v-flex xs12>
                    <!-- <v-select
                      v-validate="'required'"
                      :items="Contents"
                      :error-messages="errors.collect('contents')"
                      label="컨텐츠"
                      data-vv-name="contents"
                    ></v-select> -->
                    <v-select
                      v-model="selectedContents"
                      v-validate="'required|min:1'"
                      :error-messages="errors.collect('contents')"
                      :items="Contents"
                      label="컨텐츠"
                      data-vv-name="contents"
                      multiple
                    >
                      <v-list-tile
                        slot="prepend-item"
                        ripple
                        @click="toggle"
                      >
                        <v-list-tile-action>
                          <v-icon :color="selectedContents.length > 0 ? 'indigo darken-4' : ''">{{checkboxIcon}}</v-icon>
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
                  <v-flex xs12 sm6 md4>
                    <v-menu
                      :close-on-content-click="false"
                      v-model="dateInput"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
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
                      <v-date-picker v-model="date" no-title @input="dateInput = false"></v-date-picker>
                    </v-menu>
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
            </v-card-actions>
        </v-card>
      </form>
    </v-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { MeetingService } from '../service/MeetingService';
import { Meeting }  from '../model/meeting.model';
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

  @Watch('currentUser')
  changeCurrentUser() {
    this.getMeetingsMonth();
  }

  @Watch('pickerDate')
  dateChanged(val:any){
    this.getMeetingsMonth(val);
  }
  
  @Watch('date')
  pickDay(pickDay:any){
    if(this.dates){
      const haveMeeting = this.dates.find((date:any)=>{
        return date == pickDay
      });
      if(haveMeeting){
        console.log('haveMeeting : ', haveMeeting);
        this.isNew = false;
      } else {
        console.log('haveMeeting : ', haveMeeting);
        this.viewDialog = true;
        this.isNew = true;
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
  get checkboxIcon () {
    if (this.allContents) return 'mdi-close-box'
    if (this.someContents) return 'mdi-minus-box'
    return 'mdi-checkbox-blank-outline'
  }

  viewDialog:boolean = false;
  title:string = '';
  Contents:string[] = Contents;
  selectedContents:string[] = [];
  PlaceList:string[] = Place;
  place:string = null;
  date:any = this.$moment(new Date).format('YYYY-MM-DD');
  dates:any = null;
  meeting:Meeting = new Meeting;
  pickerDate:any = null;
  dateInput:boolean = false;
  isNew:boolean = false;

  created(){
    if(this.currentUser){
      this.getMeetingsMonth();
    }
  }
  historyBack(){
    this.$router.go(-1);
  }
  getMeetingsMonth(date:any=new Date()){
    date = this.$moment(date).format('YYYYMM');
    const that = this;
    this.dates= null;
    MeetingService.getMeetings({
      startAt : parseInt(`${date}01`),
      endAt : parseInt(`${date}32`)
    })
    .then((res:any)=>{
      if(res){
        this.dates = Object.keys(res).map((date:any)=>{
          return that.$moment(date).format('YYYY-MM-DD')
        })
      } else {
        this.dates = [];
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
  }
  onSubmit(){
    this.$validator.validateAll().then((result:any) => {
      if (result) {
        // eslint-disable-next-line
        console.log('Form Submitted!');
        MeetingService.getIdToken(this.currentUser).then((auth:any)=>{
          if(this.isNew){
            console.log('생성');
            MeetingService.createMeeting(auth,{
              date : this.$moment(this.date).format('YYYYMMDD'),
              contents : this.selectedContents,
              title : this.title,
              place : this.place,
            }).then((res:any)=>{
              console.log('createMeeting res : ', res);
              if(res){
                this.viewDialog = false;
                this.clear();
              }
            })
          } else {
            console.log('수정');
          }
          console.log('auth : ', auth);
        });

        return;
      }
      console.log('Correct them errors!');
    });
  }
  clear(){
    this.selectedContents = [];
    this.title = null
    this.place = null
  }
  toggle () {
    this.$nextTick(() => {
      if (this.allContents) {
        this.selectedContents = []
      } else {
        this.selectedContents = this.Contents.slice()
      }
    })
  }
}
</script>

<style scoped lang="scss">
.v-card {
  box-shadow:none;
}
</style>