// import account from './AccountRoute';
import signIn from './SignInRoute';
import layout from './LayoutRoute';
import apps from './AppsRoute';
//公众号管理
import wechat from './WechatRoute';
//营销管理
import marketing from './MarketingRoute';
//商品管理
import merchandises from './MerchandisesRoute';
//订单管理
import orders from './OrdersRoute';
//餐车管理
import shops from './ShopsRoute';
//优惠券管理
import tickets from './TicketsRoute';
//用户管理
import users from './UsersRoute';

let routes = [];
// routes.push(account);
routes.push(signIn);
routes.push(layout);
routes.push(marketing);
routes.push(wechat);

routes.push(merchandises);
routes.push(orders);
routes.push(shops);
routes.push(tickets);
routes.push(users);
export default routes;
