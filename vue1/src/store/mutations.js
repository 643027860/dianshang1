//客户端
import {SETUSER,OCADDADDITION,OCFIXADDITION,SAVEADDITIONS} from './mutation_types'
//管理端
import {CHANCEPATHNAMES, CHOICEMENUID, RETURNLOGIN, SETCONFIG,OCMENUS,OCMENUS1,REQMENUS1,SHOWADD,SHOWFIX,SAVEGOOD,SAVEGOODS} from './mutation_types'
import {SAVECARTCOUNT,SAVEMANAGE} from './mutation_types'

export default {
  //客户端
  //用户信息
  [SETUSER](state,user){
    state.user = user
  },

  [SAVEMANAGE](state,manage){
    state.manage = manage
  },

  //保存商品列表信息
  [SAVEGOODS](state,myGoods){
    state.goods = myGoods.goods
    state.Goods = myGoods.Goods
  },

  //购物车
  [SAVECARTCOUNT](state,cartCount){
    state.cartCount = cartCount
  },

  //保存地址数组信息
  [SAVEADDITIONS](state,additions){
    state.additions = additions
  },
  //是否打开添加地址界面
  [OCADDADDITION](state,flag){
    state.ocAddAddition = flag
  },
  //是否打开修改地址界面
  [OCFIXADDITION](state,flag){
    state.ocFixAddition = flag
  },

  /*管理端*/
  //保存商品详情信息
  [SAVEGOOD](state,good){
    state.good = good
  },


  //折叠菜单
  [OCMENUS](state){
    state.isCollapse = !state.isCollapse
  },
  [OCMENUS1](state,flag){
    state.isCollapse = flag
  },

  //获取菜单数组
  [REQMENUS1](state,menus){
    state.menus = menus
  },
  //改变菜单ID
  [CHOICEMENUID](state,id){
    state.menuId = id
  },

  //是否显示新增弹窗
  [SHOWADD](state,show){
    state.showAdd = show
  },
  //是否显示修改弹窗
  [SHOWFIX](state,show){
    state.showFix = show
  },

  //返回登录界面
  [RETURNLOGIN](state,{yon}){
    state.returnlogin = yon
  },

  //改变路径名字
  [CHANCEPATHNAMES](state,path){
    state.pathnames = path
  },

  //设置令牌
  [SETCONFIG](state,{jwt}){
    state.config = jwt
  },
}
