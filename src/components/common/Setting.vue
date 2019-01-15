<template>
  <section class="Setting">
    <el-row class="setting-head">
      <el-col :span="24">
        <p>{{$t('menu.setting')}}</p>
      </el-col>
    </el-row>
    <el-row class="userId">
      <el-col :span="24">
        <p>{{$t('setting.account')}}</p>
        <p class="contentUn">{{id}}</p>
      </el-col>
    </el-row>
    <el-row class="mail-box">
      <el-col :span="12">
        <p>{{$t('setting.mail')}}</p>
        <p class="contentUn">{{mail}}</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-button type="text" @click="setMail()">{{$t('setting.modifyMail.click')}}</el-button>
          <el-dialog :title="$t('setting.modifyMail.click')" :visible.sync="mailOuterVisible" :close-on-click-modal="false"
            width="580px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
              <el-form-item :label="$t('setting.modifyMail.email')" prop="buyerEmail">
                <el-input v-model="mail"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                <el-input v-model="mailCaptcha" style="width:69%"></el-input>
                <el-button style="width:28%" @click="sendCode('email',mail)">{{$t('setting.codeBtn')}}</el-button>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="mailOuterVisible = false">{{$t('setting.button1')}}</el-button>
              <el-button type="primary" @click="mailOuterVisible = false,mailInnerVisible = true,checkCaptcha()">
                {{$t('setting.button3')}}next
              </el-button>
            </div>
          </el-dialog>
          <el-dialog width="580px" :close-on-click-modal="false" :title="$t('setting.mail')" :visible.sync="mailInnerVisible"
              append-to-body>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                <el-form-item :label="$t('setting.modifyMail.email')" prop="buyerEmail">
                  <span slot="label">{{$t('setting.mail')}}</span>
                  <el-input v-model="newEmail"></el-input>
                </el-form-item>
                <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                  <el-input v-model="bindMailCaptcha" style="width:69%"></el-input>
                  <el-button style="width:28%" @click="sendCode('email',newEmail)">{{$t('setting.codeBtn')}}</el-button>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="userBind('email',newEmail,bindMailCaptcha)">
                  {{$t('setting.button2')}}
                </el-button>
              </div>
            </el-dialog>
        </p>
      </el-col>
    </el-row>
    <el-row class="phone-box">
      <el-col :span="12">
        <p>{{$t('setting.phone')}}</p>
        <p class="contentUn">{{phonenum}}</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-button type="text" @click="setPhone()">
            {{$t('setting.modifyPhone.click')}}
          </el-button>
          <el-dialog :title="$t('setting.modifyPhone.click')" :visible.sync="phoneOuterVisible" width="580px"
            :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
              <el-form-item :label="$t('setting.modifyPhone.phone')" prop="buyerEmail">
                <el-input v-model="sourceNum"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                <el-input v-model="captcha" style="width:69%"></el-input>
                <el-button style="width:28%" @click="sendCode('mobile',sourceNum)">{{$t('setting.codeBtn')}}</el-button>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="phoneOuterVisible = false">{{$t('setting.button1')}}</el-button>
              <el-button type="primary" @click="checkCaptcha()">
                {{$t('setting.button3')}}
              </el-button>
            </div>
          </el-dialog>
           <el-dialog width="580px" :title="$t('setting.phone')" :visible.sync="phoneInnerVisible" append-to-body
              :close-on-click-modal="false">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                <el-form-item :label="$t('setting.modifyPhone.phone')" prop="buyerEmail">
                  <el-input v-model="newPhoneNum"></el-input>
                </el-form-item>
                <el-form-item :label="$t('setting.codeIn')" prop="buyerPhone">
                  <el-input v-model="bindCaptcha" style="width:69%"></el-input>
                  <el-button style="width:28%" @click="sendCode('mobile',newPhoneNum)">{{$t('setting.codeBtn')}}</el-button>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="userBind('mobile',newPhoneNum,bindCaptcha)">
                  {{$t('setting.button2')}}
                </el-button>
              </div>
            </el-dialog>
        </p>
      </el-col>
    </el-row>
    <el-row class="pwd-box">
      <el-col :span="12">
        <p>{{$t('setting.password')}}</p>
        <p class="contentUn">******</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-button type="text" @click="pwdOuterVisible = true">{{$t('setting.modifyPassword.click')}}</el-button>
          <el-dialog :title="$t('setting.modifyPassword.click')" :visible.sync="pwdOuterVisible" width="580px"
            :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
              <el-form-item :label="$t('setting.modifyPassword.current')" prop="buyerEmail">
                <el-input v-model="currentPassword"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.modifyPassword.new')" prop="buyerEmail">
                <el-input v-model="newPassword"></el-input>
              </el-form-item>
              <el-form-item :label="$t('setting.modifyPassword.confirm')" prop="buyerEmail">
                <el-input v-model="confirmPassword"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="pwdOuterVisible = false">{{$t('setting.button1')}}</el-button>
              <el-button type="primary" @click="resetPassword()">{{$t('setting.button2')}}</el-button>
            </div>
          </el-dialog>
        </p>
      </el-col>
    </el-row>
    <el-row class="code-box">
      <el-col :span="12">
        <p>{{$t('setting.codeSet')}}</p>
        <p class="contentUn">{{$t('setting.code')}}</p>
      </el-col>
      <el-col :span="8" :offset="4">
        <p>
          <el-select v-model="code">
            <el-option :value="$t('setting.codePhone')">
              <p @click="dialogVisible = true">{{$t('setting.codePhone')}}</p>
            </el-option>
            <el-option :value="$t('setting.codeEmail')">
              <p style="width:100%" @click="dialogVisible = true">{{$t('setting.codeEmail')}}</p>
            </el-option>
          </el-select>
          <el-dialog title="提示" :visible.sync="dialogVisible" width="580px">
            <span>如果继续此项操作，交易时所需要获取验证码将会改变，确定继续此操作吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </p>
      </el-col>
    </el-row>
  </section>
</template>

<script>
    import * as account from '../../services/AccountService'
    import * as auth from '../../services/AuthService'

export default {
  name: "Setting",
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
        id:"",
        mail: "",
        newEmail: '',
        mailCaptcha: '',
        bindMailCaptcha: '',
        phonenum: "",//用户信息手机号
        sourceNum:"",//用户原手机号
        newPhoneNum:"",
        captcha:"",//初次验证原手机验证码
        bindCaptcha:"",//解绑验证码
        mailOuterVisible: false,
        mailInnerVisible: false,
        currentPassword:'', //输入框当前密码
        newPassword:'',//输入框新密码
        confirmPassword:'',//输入框确认密码
        phoneOuterVisible: false,
        phoneInnerVisible: false,
        code: this.$t("setting.codePhone"),
        pwdOuterVisible: false,
        pwdInnerVisible: false,
        dialogVisible: false
    }
  },
    methods: {

        userInfo(){ //获取用户信息
            account.userInfo(this.$store.getters.lang,68)
            .then(data => {
                this.id=data.data.data.id
                this.phonenum=data.data.data.mobile
                this.mail=data.data.data.email
                this.sourceNum=this.phonenum

                console.log(data)
            })
       },

        resetPassword(){ //修改密码
            var param={
                "id": this.id,
                "newPassword": this.newPassword,
                "oldPassword": this.currentPassword
            }
            auth.resetPassword(this.$store.getters.lang,param).then( data=> {
                console.log(data)
                if(data.data.success){
                    this.pwdOuterVisible = false
                }else{
                    alert("修改失败")
                }
            })

        },

        sendCode(senderType,receiver){ //发送验证码至原手机/邮箱
            const param = {
                'captchaType': 0,
                'receiver': receiver,
                'senderType': senderType
            }
            auth.captcha(this.$store.getters.lang,param)
                .then(data=>{
                    if(!data.data.success){
                        console.log("验证码发送失败")
                    }else {
                        console.log("验证码发送成功")
                    }
                })
        },

        checkCaptcha(){ //校验原手机/邮箱验证码是否正确
            console.log("校验中。。。。")
           // var sourceNum=this.$refs.sourceNum
            //console.log("原手机邮箱号码"+sourceNum)
            this.phoneOuterVisible = false
            this.phoneInnerVisible = true
        },

        userBind(bindType,bindNum,bindCap){
            /**
             * 绑定手机号/邮箱
             * bindType :mobile/email
             * bindNum: 邮箱或手机号码
             * bindCap：验证码
             * **/

            var param={
                'captcha': bindCap,
                'id': this.id,
                'loginName': bindNum
            }
            account.userBind(this.$store.getters.lang,bindType,param).then(data=>{
                console.log("解绑中。。。。")
                console.log(data)
                if(data.data.success){
                    //成功
                    if(bindType=='email'){
                        this.mailOuterVisible = false
                        this.mailInnerVisible = false
                    }else if(bindType=='mobile'){
                        this.phoneOuterVisible = false
                        this.phoneInnerVisible = false
                    }

                }else{
                    //失败
                    alert("解绑失败")
                }
            })
        },
        setMail(){
            //change mail 按钮控制逻辑
            if(this.mail==null||this.mail==''){
                this.mailInnerVisible=true
            }else{
                this.mailOuterVisible = true
            }
        },
        setPhone(){
            //change phone 按钮控制逻辑
            if(this.phonenum==null || this.phonenum==''){
                this.phoneInnerVisible=true
            }else{
                this.phoneOuterVisible = true
            }
        }


    },
    mounted() {
        this.userInfo()
    }
};
</script>

<style lang="scss" scoped>
.Setting {
  width: 100%;
  min-width: 1130px;
  background: #f2f2f2;
  p {
    margin: 0;
  }
  .setting-head {
    background: #ffffff;
    height: 65px;
    p {
      font-family: PingFang-SC-Bold;
      padding-left: 30px;
      font-size: 20px;
      color: #252525;
      line-height: 60px;
      text-align: left;
    }
  }
  .userId {
    background: #ffffff;
    height: 100px;
    margin: 20px;
    margin-bottom: 0;
    border-bottom: 1px #e9e9e9 solid;
    p {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 50px;
      text-align: left;
      padding-left: 32px;
    }
    .contentUn {
      font-family: HelveticaNeue;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
      text-align: left;
    }
  }
  .mail-box,
  .phone-box,
  .pwd-box,
  .code-box {
    background: #ffffff;
    height: 100px;
    margin: 0 20px;
    border-bottom: 1px #e9e9e9 solid;
    p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 50px;
      text-align: left;
      padding-left: 32px;
      font-family: PingFangSC-Medium;
    }
    .contentUn {
      font-family: HelveticaNeue;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
      text-align: left;
    }
    p > .el-button {
      color: #8eb357;
      margin-top: 45px;
    }
  }
  .code-box {
    .el-select {
      width: 100px;
      margin-top: 30px;
    }
  }
}
</style>
