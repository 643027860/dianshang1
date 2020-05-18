<template>
  <div class="uploadGood">
    <form class="uploadform">
      <div class="form-group">
        <label for="shopName"><i style="color: red;margin-right: 5px;">*</i>商品名称：</label>
        <el-input
          type="text"
          placeholder="请输入商品名称,最多50个字。"
          id="shopName"
          v-model="name"
          maxlength="50"
          show-word-limit
        >
        </el-input>
      </div>
      <div class="form-group">
        <label for="subtitleName"><i style="color: red;margin-right: 5px;">*</i>商品副标题：</label>
        <el-input
          type="text"
          placeholder="请输入商品名称,最多50个字。"
          id="subtitleName"
          v-model="subtitle"
          maxlength="50"
          show-word-limit
        >
        </el-input>
      </div>
      <div class="form-group">
        <label for="shopPrice"><i style="color: red;margin-right: 5px;">*</i>商品单价：</label>
        <el-input
          type="text"
          placeholder="请输入商品单价（例如500.00）"
          id="shopPrice"
          v-model="price"
        >
        </el-input>
      </div>
      <div class="form-group">
        <label for="shopStock"><i style="color: red;margin-right: 5px;">*</i>商品库存：</label>
        <el-input
          type="text"
          placeholder="请输入商品库存（例如500）"
          id="shopStock"
          v-model="stock"
          oninput="value=value.replace(/[^\d]/g,'')"
        >
        </el-input>
      </div>
      <div class="form-group">
        <label><i style="color: red;margin-right: 5px;">*</i>商品类型：</label>
        <div>
          <div class="input-group">
            <div class="input-group-btn">
              <button type="button" class="btn btn-default dropdown-toggle" style="margin-right: 15px;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">选择类型 <span class="caret"></span></button>
              <ul class="dropdown-menu" v-show="types">
                <li v-for="(li,index) in types" :key="index" v-if="li.status"><a href="javascript:;" @click="()=>choiceType(li.id,li.name)">{{li.name}}</a></li>
              </ul>
            </div>
            <Tag :typesname="typesName" @outtype="outType"/>   <!--标签组件-->
          </div>
        </div>
      </div>
      <div class="form-group">
        <label><i style="color: red;margin-right: 5px;">*</i>图片(最多五张，第一张为主图)：</label>
        <UploadImg ref="mainImages"></UploadImg>
      </div>
      <div class="form-group">
        <label ><i style="color: red;margin-right: 5px;">*</i>商品介绍：</label>
        <Ueditor ref="ueditor"></Ueditor>
      </div>
      <el-button id="uploadButton" @click="upload">商品上传</el-button>
    </form>
  </div>
</template>

<script>
  import Ueditor from '../../../../components/ueditor/ueditor'
  import Tag from '../../../../components/base/tag'
  import UploadImg from '../../../../components/base/uploadImage'
  import {GETTYPE,UPDATESHOP} from '../../../../api/types'
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        editor: null,  //编辑器对象
        jwt:'',       //令牌
        config:'',   //请求设置

        types:'',  //获取商品品类列表

        name:'',   //标题
        subtitle:'',  //副标题
        subImages:'',  //副图
        detail:'',  //详情
        price:'',   //价格
        stock:'',   //库存
        categoryId:[], //商品分类

        typesName:[], //商品分类名数组


        loading:false,   //是否加载中
      }
    },

    components:{
      Ueditor,  //富文本组件
      Tag,    //标签组件
      UploadImg,   //上传图片组件
    },

    created() {
      //修改菜单UD
      this.choiceMenuId('uploadGood')
      this.reqTypes()   //获取商品品类列表
      this.changePathNames(
        [
          {name:'商品管理'},
          {name:'商品上传'}
        ]
      )
    },

    methods: {
      //修改主界面菜单
      ...mapActions(['choiceMenuId','changePathNames']),

      //上传商品
      async upload() {
        this.detail = this.$refs.ueditor.content
        var {imgsUrl} = this.$refs.mainImages
        var {detail,stock,price,subtitle,name,categoryId} = this
        if(detail && imgsUrl.length>0 && stock && price && subtitle && name && categoryId){
          var newImages = imgsUrl
          this.subImages = ''
          newImages.map(item => this.subImages = this.subImages + item.url + ',')
          this.subImages = this.subImages.slice(0,this.subImages.length-1)
          var {subImages} = this
          var params = new FormData()
          params.append('detail',detail)
          params.append('subImages',subImages)
          params.append('stock',stock)
          params.append('price',price)
          params.append('subtitle',subtitle)
          params.append('name',name)
          params.append('categoryId',categoryId)
          var result = await UPDATESHOP(params)
          if(result.status == 0){
            this.message('新增产品成功',1500,'success')
            this.clearAll()
          }else{
            this.message(result.msg,1500,'error')
          }
        }else{
          this.message('请输入完整商品信息',1500,'warning')
        }
      },

      //获取商品品类列表
      async reqTypes(){
        const categoryId = 0
        var result = await GETTYPE({categoryId})
        if(result.status === 0){
          this.types = result.data
        }
      },

      //选择商品类型
      choiceType(id,name){
        if(this.categoryId.length<1){
          var had = false
          for(var i = 0; i < this.categoryId.length; i++){
            if(this.categoryId[i] == id){
              had = true
              return
            }
          }
          if(!had){
            this.categoryId.push(id)
            this.typesName.push({id,name})
          }
        }else{
          this.$message({
            message:'一件商品最多添加1个类型',
            duration:1000,
            type:'warning'
          })
        }
      },

      //去掉错的商品类型
      outType(id){
        this.categoryId = this.categoryId.filter(type=>type!=id);
        this.typesName = this.typesName.filter(type=>type.id!==id);
      },

      //消息提示
      message(message,duration,type){
        this.$message({
          message,
          duration,
          type
        })
      },

      //清空所有数据
      clearAll(){
        this.$refs.ueditor.clearContent()
        this.$refs.mainImages.clearAll()
        this.name = ''
        this.subtitle = ''
        this.subImages = ''
        this.detail = ''
        this.price = ''
        this.stock = ''
        this.typesName = ''
        this.categoryId = []
      }
    },
    watch:{
      price(newval,oldval){
        var str = newval;
        var len1 = str.substr(0, 1);
        var len2 = str.substr(1, 1);
        //如果第一位是0，第二位不是点，就用数字把点替换掉
        if (str.length > 1 && len1 == 0 && len2 != ".") {
          str = str.substr(1, 1);
        }
        //第一位不能是.
        if (len1 == ".") {
          str = "";
        }
        //限制只能输入一个小数点
        if (str.indexOf(".") != -1) {
          var str_ = str.substr(str.indexOf(".") + 1);
          if (str_.indexOf(".") != -1) {
            str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
          }
        }
        //正则替换，保留数字和小数点
        str = str.replace(/[^\d^\.]+/g,'')
        //如果需要保留小数点后两位，则用下面公式
        if(/\.\d\d\d$/.test(str)){
          str = str.slice(0,str.indexOf(".") + 3)
        }
        this.price = str
      },
    }
  }
</script>

<style lang="less">
  //标签样式
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .uploadGood{
    width: 90%;
    max-width: 1200px;
    margin: 10px 10px 10px 15px;
    .uploadform{
      label{
        font-size: 16px;
        display: inline-block;
        height: 30px;
        line-height: 30px;
      }
    }
  }
</style>

