<template>
  <div class="fixAddition">
    <p>
      <span class="additionName"><i>*</i>收货人姓名：</span>
      <el-input type="text" v-model="receiverName" placeholder="请输入收货人姓名"></el-input>
    </p>
    <p>
      <span class="additionName"><i>*</i>地址信息：</span>
      <Additions ref="myAddtion"></Additions>
    </p>
    <p>
      <span class="additionName"><i>*</i>详细地址：</span>
      <el-input type="textarea" v-model="receiverAddress" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"></el-input>
    </p>
    <p>
      <span class="additionName"><i>*</i>邮政编码：</span>
      <el-input type="text" v-model="receiverZip" placeholder="请输入当地的邮政编码"></el-input>
    </p>
    <p>
      <span class="additionName"><i>*</i>手机号码：</span>
      <el-input type="text" v-model="receiverMobile" placeholder="请输入收货人手机号码" @change="rulePhone"></el-input>
      <span style="color: red;padding-left: 10px;font-size: 14px;height: 40px;line-height: 40px;" v-if="!phoneOk">{{phoneError}}</span>
    </p>
    <p>
      <span class="additionName"><i>*</i>电话号码：</span>
      <el-input type="text" v-model="receiverPhone" placeholder="请输入收货人电话号码"></el-input>
    </p>
    <p>
      <span class="additionName" />
      <el-button @click="updateAddition">确定</el-button>
    </p>
  </div>
</template>

<script>
  import {UPDATEADDITION,REQADDITIONS} from '../../api/types'
  import {mapActions} from 'vuex'
  import Additions from '../base/addition'
  export default {
    data () {
      return {
        id:'',
        pageNum: 1,             //地址列表分页
        pageSize: 2,            //地址列表行数
        receiverName:'',        //收件人
        receiverProvince:'',    //收件人省份
        receiverCity:'',        //收件人城市
        receiverDistrict:'',    //收件人县或区
        receiverAddress:'',     //收件人详细地址
        receiverZip:'',         //收件人邮编
        receiverMobile:'',      //收件人手机
        receiverPhone:'',       //收件人电话
        additions:[],
        phoneError:'',
        phoneOk:true,
      }
    },
    props:{
      fixs:{
        required:true
      },
    },
    components:{
      Additions
    },
    computed:{

    },
    mounted () {
      this.init(this.fixs)
    },
    methods: {
      ...mapActions(['ocfixaddition','saveadditions']),
      //手机验证
      rulePhone(){
        var {receiverMobile} = this
        var regPhone = /^1[34578]\d{9}$/ ;
        if(!regPhone.test(receiverMobile)){
          this.phoneOk = false
          this.phoneError = '手机号码不正确'
        }else{
          this.phoneOk = true
          this.phoneError = ''
        }
      },
      async updateAddition(){
        this.addition = this.$refs.myAddtion.addtions
        var {phoneOk,id,addition,receiverName,receiverAddress,receiverZip,receiverMobile,receiverPhone} = this
        if(id,addition,receiverName,receiverAddress,receiverZip,receiverMobile,receiverPhone){
          if(!phoneOk){
            this.message('手机号码不正确',1500,'error')
            return false
          }
          var receiverProvince = addition[0]
          var receiverCity = addition[1]
          var receiverDistrict = addition[2]
          var params = new FormData()
          params.append('id',id)
          params.append('receiverProvince',receiverProvince)
          params.append('receiverCity',receiverCity)
          params.append('receiverDistrict',receiverDistrict)
          params.append('receiverName',receiverName)
          params.append('receiverAddress',receiverAddress)
          params.append('receiverZip',receiverZip)
          params.append('receiverMobile',receiverMobile)
          params.append('receiverPhone',receiverPhone)
          var result = await UPDATEADDITION(params)
          if(result.status ==0 ){
            this.message(result.msg,1000,'success')
            this.pageNum = 1
            var {pageNum,pageSize} = this
            result = await REQADDITIONS({pageNum,pageSize})
            if(result.status == 0){
              this.saveadditions(result.data)
            }
            this.clearAll()
            this.ocfixaddition(false)
          }else{
            this.message(result.msg,1500,'error')
          }
        }else{
          this.message('请输入完整信息',1500,'warning')
        }
      },

      message(message,duration,type){
        this.$message({
          message,
          duration,
          type
        })
      },

      init(newval){
        this.id = newval.id
        this.receiverName = newval.receiverName        //收件人
        this.receiverAddress = newval.receiverAddress     //收件人详细地址
        this.receiverZip = newval.receiverZip            //收件人邮编
        this.receiverMobile = newval.receiverMobile      //收件人手机
        this.receiverPhone = newval.receiverPhone        //收件人电话
        this.$refs.myAddtion.init(newval)
      },

      clearAll(){
        this.id = ''
        this.receiverName = ''        //收件人
        this.receiverProvince = ''    //收件人省份
        this.receiverCity = ''        //收件人城市
        this.receiverDistrict = ''    //收件人县或区
        this.receiverAddress = ''     //收件人详细地址
        this.receiverZip = ''         //收件人邮编
        this.receiverMobile = ''      //收件人手机
        this.receiverPhone = ''       //收件人电话
        this.$refs.myAddtion.clearAll()
      },
    },
    watch:{
      fixs(newval){
        this.init(newval)
      }
    }
  }
</script>

<style lang="less">
  div.fixAddition{
    p{
      font-size: 16px;
      color: #666666;
      line-height: 20px;
      margin-bottom: 5px;
      padding: 7px;
      display: flex;
      align-items: flex-start;
      span.additionName{
        display: inline-block;
        width: 120px;
        margin-right: 20px;
        text-align: right;
        i{
          color: red;
          padding: 0 4px;
        }
      }
      .el-textarea{
        position: relative;
        display: inline-block;
        width: 350px;
      }
      textarea{
        outline: none;
        resize: none;
      }
      .el-input{
        display: inline-block;
        width: 350px;
      }
      .el-button{
        padding: 9px 20px!important;
      }
    }
  }
</style>
