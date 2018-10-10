<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <!-- <ProgressComp :propData="dates"></ProgressComp> -->
        <form id="create-meeting-dialog" class="ui form" @submit.prevent="putMember">
          <v-card>
            <v-card-title class="pb-0">
              <span class="headline">
                {{params.key ? "회원정보 수정": "신입 회원정보 입력"}}
              </span>
            </v-card-title>
            <v-card-text class="pa-0">
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-menu
                        :close-on-content-click="false"
                        v-model="viewJoinDate"
                        lazy
                        full-width
                      >
                        <v-text-field
                          slot="activator"
                          v-model="computedJoinDateFormatted"
                          label="가입일을 입력하세요"
                          readonly
                        ></v-text-field>
                        <v-date-picker
                          v-model="joinDate"
                          @input="viewJoinDate = false"
                          full-width
                          locale="ko"
                          ></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <!-- :nudge-right="40" -->
                      <v-menu
                        ref="birthMenu"
                        :close-on-content-click="false"
                        v-model="viewBirth"
                        lazy
                        full-width
                      >
                        <v-text-field
                          slot="activator"
                          v-model="birth"
                          label="생년월일을 입력하세요"
                          readonly
                        ></v-text-field>
                        <v-date-picker
                          ref="picker"
                          v-model="birth"
                          max="1995-12-31"
                          min="1985-01-01"
                          full-width
                          locale="ko"
                          @change="saveBirth"
                        ></v-date-picker>
                        <!-- new Date().toISOString().substr(0, 10) -->
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-validate="'required|min:2|max:10'"
                        v-model="member.name"
                        :counter="10"
                        :error-messages="errors.collect('name')"
                        label="이름"
                        data-vv-name="name"
                        clearable
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-validate="'required|min:2|max:20'"
                        v-model="member.address"
                        :counter="20"
                        :error-messages="errors.collect('address')"
                        label="사는곳"
                        data-vv-name="address"
                        clearable
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="member.job"
                        label="직업"
                        data-vv-name="job"
                        clearable
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="error"
                  v-if="params.key"
                  @click="viewConfirmDelete = true"
                  depressed
                  outline
                >
                  Delete
                </v-btn>
                <v-dialog
                  v-model="viewConfirmDelete"
                >
                  <v-card>
                    <v-card-title class="headline">정말 강퇴하시겠습니까?</v-card-title>
                    <v-card-text>
                      회원을 강퇴합니다.
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        right
                        @click="viewConfirmDelete = false"
                        outline
                        depressed
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        right
                        color="red darken-1"
                        @click="deleteMember()"
                        outline
                        depressed
                      >
                        Delete
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-spacer></v-spacer>

                <v-btn
                  color="success"
                  type="submit"
                  outline
                  depressed
                >
                  {{!params.key ? 'Create' : 'Update'}}
                </v-btn>

              </v-card-actions>


          </v-card>
        </form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import { MemberService } from '../service/MemberService';
import { Member }  from '../model/member.model';
import ProgressComp from '../components/ProgressComp.vue';

@Component({
  components : {
    ProgressComp
  }
})
export default class MemberCreate extends Vue {
  @Prop() currentUser: any;
  @Prop() windowSize: any;
  @Prop() query: any;
  @Prop() params: any;
  @Emit('showSnackbar') showSnackbar(color:string,text:string){}

  @Watch('currentUser')
    changeCurrentUser() {
  }
  @Watch('viewBirth')
  setYear(val) {
    val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
  }

  get computedJoinDateFormatted () {
    return this.$moment(this.joinDate.toString()).format('YYYY-MM-DD');
  }
  get computedBirthFormatted () {
    return this.$moment(this.birth.toString()).format('YYYY-MM-DD');
  }
  joinDate:any = this.$moment(new Date).format('YYYY-MM-DD');
  birth:any = null;

  viewConfirmUpdate:boolean = false;
  viewConfirmDelete:boolean = false;
  viewJoinDate:boolean = false;
  viewBirth:boolean = false;
  member:Member = new Member(
    '',
    19900101,
    parseInt(this.$moment(new Date).format('YYYYMMDD')),
    '',
  );

  created(){
    // this.getPlaces();
    // this.getContents();
    if(this.params.key){
      if(this.currentUser){
        this.getMember()
      } else {
        this.showSnackbar('error','로그인이 필요합니다');
      }
    } else {
      if(this.query.joinDate){
        this.joinDate = this.$moment(this.query.joinDate.toString()).format('YYYY-MM-DD');
      } else {
        this.showSnackbar('error','잘못된 url입니다');
        this.$router.go(-1);
      }
    }
  }
  getMember(){
    MemberService.getMember(this.params.key).then((snapShot:any)=>{
      let member = snapShot.val();
      console.log('member : ', member);
      this.member = new Member(
        member.address,
        member.birth,
        member.joinDate,
        member.name,
        member.job,
        member.mail,
        member.grade,
        member.participation,
        member.phone
      );
      console.log('this.member : ', this.member);
      this.birth = this.$moment(member.birth.toString()).format('YYYY-MM-DD');
      this.joinDate = this.$moment(member.joinDate.toString()).format('YYYY-MM-DD');
    },(err:any)=>{
        this.showSnackbar('error','회원정보를 가져오지 못했습니다');
    });
  }
  putMember(){
    this.$validator.validateAll().then((result:any) => {
      if(result){
        if(this.currentUser){
          console.log('putMember');
        } else {
          this.showSnackbar('error','권한이 없습니다.');
        }
      }
    });
  }
  deleteMember(){
    if(this.currentUser){
      console.log('deleteMember');
    } else {
      this.showSnackbar('error','권한이 없습니다.');
    }
  }
  saveBirth(param){
    console.log('save param : ', param);
    this.$refs.birthMenu.save(this.birth);
  }
}
</script>

<style scoped lang="scss">
.v-card {
  box-shadow:none;
}
</style>