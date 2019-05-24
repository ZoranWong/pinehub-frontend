//model模块
import Projects from './Projects';
import Account from './Account';
import Menus from './Menus';
import Shops from './Shops';
import Common from './Common';
import Merchandises from './Merchandises';
import Categories from './Categories';
import WechatMenu from './WechatMenu';
import CouponCards from './Coupons';
import UpToCutActivities from './UpToCutActivities';
import PaidGiftActivities from './PaidGiftActivities';
import Orders from './Orders';
import Customers from './Customers';
import Members from './Members';
import MemberCards from './MemberCards';
import ScoreRules from './ScoreRules';
import Materials from './Materials';
import Regions from './Regions';
import Advertisements from './Advertisement';
import WxTemplateMessage from "./WxTemplateMessage";
import UserTemplateMessage from './UserTemplateMessage';
import UserTemplateWithMiniprogram from "./UserTemplateWithMiniprogram";
import UserTemplateWithOfficialAccount from "./UserTemplateWithOfficialAccount";
import RechargeableCard from "./RechargeableCard";
import UserRechargeableCardConsumeRecord from "./UserRechargeableCardConsumeRecord";

export default class Store {
    constructor(application) {
        this.$application = application;
        this.modules = {};
        this.addModel('common', Common);
        this.addModel('projects', Projects);
        this.addModel('account', Account);
        this.addModel('menus', Menus);
        this.addModel('shops', Shops);
        this.addModel('upToCutActivities', UpToCutActivities);
        this.addModel('paidGiftActivities', PaidGiftActivities);
        this.addModel('merchandises', Merchandises);
        this.addModel('activityMerchandises', Merchandises);
        this.addModel('shopSkuMerchandises', Merchandises);
        this.addModel('couponCards', CouponCards);
        this.addModel('categories', Categories);
        this.addModel('wechatMenus', WechatMenu);
        this.addModel('orders', Orders);
        this.addModel('bookingOrders', Orders);
        this.addModel('immediateOrders', Orders);
        this.addModel('scanPaymentOrders', Orders);
        this.addModel('customers', Customers);
        this.addModel('members', Members);
        this.addModel('memberCards', MemberCards);
        this.addModel('scoreRules', ScoreRules);
        this.addModel('material.image', Materials);
        this.addModel('material.video', Materials);
        this.addModel('material.voice', Materials);
        this.addModel('regions', Regions);
        this.addModel('advertisements', Advertisements);
        this.addModel('wxTemplateMessages', WxTemplateMessage);
        this.addModel('userTemplateMessages', UserTemplateMessage);
        this.addModel('userTemplateWithMiniprogram', UserTemplateWithMiniprogram);
        this.addModel('userTemplateWithOfficialAccount', UserTemplateWithOfficialAccount);
        this.addModel('rechargeableCards', RechargeableCard);
        this.addModel('userRechargeableCardConsumeRecords', UserRechargeableCardConsumeRecord);
    }

    addModel(name, model) {
        this.modules[name] = new model(this.$application);
        this.modules[name].namespaced = true;
    }
}
