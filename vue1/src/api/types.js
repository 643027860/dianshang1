import ajax from './ajax'

const Base2 = "http://47.112.132.177:8250"

//用户
//（1）用户信息模块
export const LOGIN = (date) => ajax(Base2+"/user/login.do",date,'POST')  //登录
export const GETINFO = () => ajax(Base2+"/user/get_user_info.do")  //获取登录用户信息
export const LOGOUT = (date) => ajax(Base2+"/user/logout.do",date,)  //退出登录
export const REGISTER = (date) => ajax(Base2+"/user/register.do",date,'POST')  //注册
export const CHECKVALID = (date) => ajax(Base2+"/user/check_valid.do",date)  //校验手机号和邮箱是否重复注册
export const CHECKQUESTION = (date) => ajax(Base2+"/user/forget_get_question.do",date)  //忘记密码时获取问题
export const CHECKANSWER = (date) => ajax(Base2+"/user/forget_check_answer.do",date)  //忘记密码验证是否答案正确
export const RESETPW = (date,token) => ajax(Base2+"/user/forget_reset_password.do",date,'PUT')  //忘记密码重置密码是否成功
export const UPDATEINFO = (date) => ajax(Base2+"/user/update_information.do",date,'PUT')  //登录状态更新个人信息
export const RESETPASSWORD = (date) => ajax(Base2+"/user/reset_password.do",date,'PUT')  //登录状态修改密码
//（2）商品展示模块
export const REQSHOPLISTS = (date) => ajax(Base2+"/product/list.do",date)  //商品搜索以及动态排序List
export const REQSHOPDETAIL= (date) => ajax(Base2+"/product/detail.do",date)  //商品详情
//(3)购物车
export const ADDCART= (date) => ajax(Base2+"/cart/add.do",date,'POST')  //通过商品ID和商品数量在购物车添加商品
export const REQCARTLISTS= () => ajax(Base2+"/cart/list.do")  //无条件获取购物车列表
export const UPDATECARTCOUNT= (date) => ajax(Base2+"/cart/update.do",date,'PUT')  //更新购物车某个商品的数量
export const DELETECART= (date) => ajax(Base2+"/cart/delete_product.do",date,'DELETE')  //列表移除购物车商品
export const SELECTCART= (date) => ajax(Base2+"/cart/select.do",date)  //选中购物车中某个商品
export const UNSELECTCART= (date) => ajax(Base2+"/cart/un_select.do",date)  //购物车取消选中某个商品
export const GETCARTCOUNT= (date) => ajax(Base2+"/cart/get_cart_product_count.do",date)  //查询购物车中产品的数量
export const SELECTCARTALL= (date) => ajax(Base2+"/cart/select_all.do",date)  //购物车全选
export const UNSELECTALL= (date) => ajax(Base2+"/cart/un_select_all.do",date)  //购物车全反选
//(4)订单
export const CREATEORDER= (date) => ajax(Base2+"/order/create.do",date,'POST')  //根据收货地址创建订单
export const GETCARTPRODUCT= (date) => ajax(Base2+"/order/get_order_cart_product.do",date,'POST')  //购物车确定购买时的订单预览
export const REQORDERLISTS= (date) => ajax(Base2+"/order/list.do",date)  //分页获取订单列表
export const REQORDERDETAIL= (date) => ajax(Base2+"/order/detail.do",date,'POST')  //根据订单编号查看订单详情
export const CANCELORDER= (date) => ajax(Base2+"/order/cancel.do",date,'PUT')  //取消订单
//(5)地址
export const ADDADDITION= (date) => ajax(Base2+"/shipping/add.do",date,'POST')  //添加地址
export const DELETEADDITION= (date) => ajax(Base2+"/shipping/del.do",date,'DELETE')  //删除地址
export const UPDATEADDITION= (date) => ajax(Base2+"/shipping/update.do",date,'PUT')  //更新状态更新地址
export const SEEADDITION= (date) => ajax(Base2+"/shipping/select.do",date)  //查看具体地址
export const REQADDITIONS= (date) => ajax(Base2+"/shipping/list.do",date)  //查看地址列表

//(6)支付
export const PAY = (date) => ajax(Base2+"/order/pay.do",date,'POST')  //预支付
export const SELECTPAYSTATUS = (date) => ajax(Base2+"/order/query_order_pay_status.do",date,'POST')  //查询支付状态
//后台管理
export const LoginManage = (date) => ajax(Base2+"/manage/user/login.do",date,'POST')  //管理员登录
//（1）品类管理
export const GETTYPE = (date) => ajax(Base2+"/manage/category/get_category.do",date)  //获取当前品类下一级ID（平级）
export const ADDTYPE = (date) => ajax(Base2+"/manage/category/add_category.do",date,'POST')  //增加品类
export const SETTYPE = (date) => ajax(Base2+"/manage/category/set_category_name.do",date,'PUT')  //修改品类名称
export const DEEPTYPE = (date) => ajax(Base2+"/manage/category/get_deep_category.do",date)  //获取当前品类ID以及递归子节点ID
//（2）商品管理
export const GETSHOPLISTS = (date) => ajax(Base2+"/manage/product/list.do",date)  //获取产品列表
export const SEARCHSHOP = (date) => ajax(Base2+"/manage/product/search.do",date)  //产品搜索
export const UPLOADIMAGE = (date) => ajax(Base2+"/manage/product/upload.do",date,'POST')  //图片上传
export const GETSHOPDETAIL = (date) => ajax(Base2+"/manage/product/detail.do",date)  //商品详情
export const UPDOWNSHOP = (date) => ajax(Base2+"/manage/product/set_sale_status.do",date,'PUT')  //产品上下架
export const UPDATESHOP = (date) => ajax(Base2+"/manage/product/save.do",date,'POST')  // 新增或者更新商品
export const UUPOLOADIMAGE = (date) => ajax(Base2+"/manage/product/richtext_img_upload.do",date,'POST')  //  富文本上传图片(Ueditor图片返回格式)
//(3)订单管理
export const GETORDERLISTS = (date) => ajax(Base2+"/manage/order/list.do",date)  //管理员分页获取全部订单列表
export const GETORDERLISTSBYID = (date) => ajax(Base2+"/manage/order/search.do",date)  //根据订单号分页查询订单
export const GETORDERDETAIL = (date) => ajax(Base2+"/manage/order/detail.do",date)  //订单详情
export const SENDGOOD = (date) => ajax(Base2+"/manage/order/send_goods.do",date)  //订单发货


