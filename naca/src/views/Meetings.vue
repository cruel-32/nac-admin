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
                    <v-text-field
                      v-validate="'required|min:1|max:20'"
                      v-model="place"
                      :counter="20"
                      :error-messages="errors.collect('place')"
                      label="장소"
                      data-vv-name="place"
                    ></v-text-field>
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
              <v-btn color="blue darken-1" flat type="submit">Save</v-btn>
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
      } else {
        console.log('haveMeeting : ', haveMeeting);
        this.viewDialog = true;
      }
    }
  }
  get computedDateFormatted () {
    return this.$moment(this.date).format('YYYY-MM-DD');
  }
  viewDialog:boolean = false;
  title:string = '';
  place:string = '';
  date:any = this.$moment(new Date).format('YYYY-MM-DD');
  dates:any = null;
  meeting:Meeting = new Meeting;
  pickerDate:any = null;
  dateInput:boolean = false;

  created(){
    if(this.currentUser){
      this.getMeetingsMonth();
    }
  }
  historyBack(){
    this.$router.go(-1);
  }
  getMeetingsMonth(date:any=new Date()){
    if(this.currentUser){
      const that = this;
      date = this.$moment(date).format('YYYYMM');
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
      //인증토큰받기
      // MeetingService.getIdToken(this.currentUser).then((auth:any)=>{
      //   console.log('auth : ', auth);
      // });
    }
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
        return;
      }
      console.log('Correct them errors!');
    });
  }
}
</script>

<style scoped lang="scss">
.v-card {
  box-shadow:none;
}
</style>