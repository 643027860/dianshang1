<template>
  <div class="updateGood">
    <form class="updateform">
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
<!--      <div class="form-group">-->
<!--      <label for="shopStatus"><i style="color: red;margin-right: 5px;">*</i>商品状态：</label>-->
<!--      <el-select v-model="status" placeholder="请选择">-->
<!--        <el-option-->
<!--          v-for="item in Status"-->
<!--          :key="item.id"-->
<!--          id="shopStatus"-->
<!--          :label="item.name"-->
<!--          :value="item.id">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--    </div>-->
      <el-button id="updateButton" @click="updata">确认修改</el-button>
    </form>
  </div>
</template>

<script>
  import Ueditor from '../../../../components/ueditor/ueditor'
  import Tag from '../../../../components/base/tag'
  import UploadImg from '../../../../components/base/uploadImgs'
  import {UPDATESHOP,GETTYPE,GETSHOPDETAIL} from '../../../../api/types'
  import {mapActions,mapState} from 'vuex'

  export default {
    data() {
      return {
        editor: null,  //编辑器对象
        config:'',   //请求设置

        myGood:'',   //商品详情对象
        types:'',  //获取商品品类列表

        name:'',   //标题
        subtitle:'',  //副标题
        subImages:'',  //副图
        detail:'',  //详情
        price:'',   //价格
        stock:'',   //库存
        categoryId:[], //商品分类
        // status:'',   //销售状态1-在售 2-下架 3-删除- 请求响应结果实例
        // Status:[
        //   {
        //     id:1,
        //     name:'在售'
        //   },
        //   {
        //     id:2,
        //     name:'下架'
        //   },
        //   {
        //     id:3,
        //     name:'删除'
        //   },
        // ],//销售状态1-在售 2-下架 3-删除- 请求响应结果实例

        typesName:[], //商品分类名数组

        loading:false,   //是否加载中
      }
    },

    components:{
      Ueditor,  //富文本组件
      Tag,    //标签组件
      UploadImg,   //上传图片组件
    },
    computed:{
      ...mapState([''])
    },
    created(){
      //修改菜单UD
      if(this.$route.query.id){
        this.id = JSON.parse(this.$route.query.id)*1
        this.reqTypes()  //获取商品品类列表
        this.choiceMenuId('goodList')
        this.changePathNames(
          [
            {name:'商品管理'},
            {name:'商品列表',path:'goodList'},
            {name:'商品更新'}
          ]
        )
      }else{
        this.$router.replace({name:'goodList'})
      }
    },

    methods: {
      //修改主界面菜单
      ...mapActions(['choiceMenuId','changePathNames']),

      //获取商品品类列表
      async reqTypes(){
        const categoryId = 0
        var result = await GETTYPE({categoryId})
        if(result.status === 0){
          this.types = result.data
          this.reqGoodDetail(this.id)
        }
      },
      //获取详情
      async reqGoodDetail(id){
        var result = await GETSHOPDETAIL({productId:id})
        if(result.status === 0){
          this.myGood = result.data
          this.init(this.myGood)
        }else{
          this.message(result.msg,1500,'error')
        }
      },
      //初始化数据
      init(good){
        this.name = good.name //标题
        this.subtitle = good.subtitle  //副标题
        this.subImages = good.subImages.split(",")  //副图
        this.price = good.price*1   //价格
        this.stock = good.stock*1   //库存
        this.categoryId = good.categoryId //商品分类
        // this.status = good.status   //销售状态1-在售 2-下架 3-删除- 请求响应结果实例
        this.types.map(type => {
          if(type.id == this.categoryId){
            this.typesName.push({id:type.id,name:type.name})
          }
        })//商品分类名数组
        this.$refs.mainImages.setList(this.subImages)
        var _this = this
        setTimeout(()=>{
          _this.$refs.ueditor.editor.setContent(good.detail)  //详情
        },2000)
      },

      //修改商品
      async updata() {
        this.detail = this.$refs.ueditor.content
        var {imgsUrl} = this.$refs.mainImages
        var {detail,stock,price,subtitle,name,categoryId,id} = this
        if(detail && imgsUrl.length>0  && stock && price && subtitle && name && categoryId){
          var newImages = imgsUrl
          this.subImages = ''
          newImages.map(item => this.subImages = this.subImages + item.url + ',')
          this.subImages = this.subImages.slice(0,this.subImages.length-1)
          var {subImages} = this
          var params = new FormData()
          params.append('id',id)
          params.append('detail',detail)
          params.append('subImages',subImages)
          params.append('stock',stock)
          params.append('price',price)
          params.append('subtitle',subtitle)
          params.append('name',name)
          params.append('categoryId',categoryId)
          var result = await UPDATESHOP(params)
          if(result.status === 0){
            this.clearAll()
            this.message('商品修改成功',1200,'success')
            setTimeout(()=>{
              this.$router.push({name:'goodList'})
            },1500)
          }else{
            this.message(result.msg,1200,'error')
          }
        }else{
          this.message('请输入完整商品信息',1200,'warning')
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
        this.categoryId = []
        this.typesName = this.typesName.filter(type=>type.id!==id)
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
        this.name = ''
        this.subtitle = ''
        this.subImages = ''
        this.detail = ''
        this.price = ''
        this.stock = ''
        this.status = ''
        this.categoryId = []
        this.typesName = []
        this.$refs.ueditor.clearContent()
        this.$refs.mainImages.clearAll()
      }
    },
    watch:{
      detail(newval,oldval){
        if(newval.trim().length>500){
          this.detail = newval.slice(0,500)
        }
      },
      price(newval,oldval){
        var str = newval+'';
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

  .updateGood{
    width: 90%;
    max-width: 1200px;
    margin: 10px 10px 10px 15px;
    .updateform{
      label{
        font-size: 16px;
        display: inline-block;
        height: 30px;
        line-height: 30px;
      }
    }
  }
</style>

