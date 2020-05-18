//客户端
import {SETUSER,OCADDADDITION,OCFIXADDITION,SAVEADDITIONS} from './mutation_types'
//管理端
import {CHANCEPATHNAMES,CHOICEMENUID,SETCONFIG,RETURNLOGIN,OCMENUS,OCMENUS1,REQMENUS1,SHOWFIX,SHOWADD,SAVEGOOD,SAVEGOODS} from './mutation_types'
import {SAVECARTCOUNT,SAVEMANAGE} from './mutation_types'

export default {
  //保存用户信息
  setuser({commit},user){
    commit(SETUSER,user)
  },

  //保存管理员用户信息
  setmanage({commit},manage){
    commit(SAVEMANAGE,manage)
  },

  //保存购物车数量
  savecartcount({commit},cartCount){
    commit(SAVECARTCOUNT,cartCount)
  },

  //保存商品详情对象
  saveGood({commit},good){
    commit(SAVEGOOD,good)
  },
  //保存商品列表
  saveGoods({commit},myGoods){
    commit(SAVEGOODS,myGoods)
  },

  //保存地址信息
  saveadditions({commit},additions){
    commit(SAVEADDITIONS,additions)
  },

  //是否打开添加地址界面
  ocaddaddition({commit},flag){
    commit(OCADDADDITION,flag)
  },
  //是否打开修改地址界面
  ocfixaddition({commit},flag){
    commit(OCFIXADDITION,flag)
  },

  //是否打开菜单
  ocmenus({commit}){
    commit(OCMENUS)
  },
  //手机端
  ocmenus1({commit},flag){
    commit(OCMENUS1,flag)
  },

  //获取菜单数组
  reqMenus1({commit},menus){
    commit(REQMENUS1,menus)
  },
  //选择菜单ID
  choiceMenuId({commit},id){
    commit(CHOICEMENUID,id)
  },

  //是否显示新增弹窗
  showadd({commit},show){
    commit(SHOWADD,show)
  },
  //是否修改弹窗
  showfix({commit},show){
    commit(SHOWFIX,show)
  },

  //设置路径名
  changePathNames({commit},path){
    commit(CHANCEPATHNAMES,path)
  },

  //返回登录界面
  returnLogin({commit},path){
    commit(RETURNLOGIN,{path})
  },

  //设置令牌
  setConfig({commit},jwt){
    commit(SETCONFIG,{jwt})
  }
}
