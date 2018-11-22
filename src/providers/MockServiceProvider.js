/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import Shops from '@/mocks/Shops';
import Projects from '@/mocks/Projects';
import Project from '@/mocks/Project';
import Coupons from '@/mocks/Coupons';
import UpToCutActivities from '@/mocks/UpToCutActivities';
import PayGiftActivities from '@/mocks/PayGiftActivities';
import Provinces from '@/mocks/Provinces';
import WechatMenus from '@/mocks/WechatMenus';
import Merchandises from '@/mocks/Merchandises';
import Categories from '@/mocks/Categories';
import Orders from '@/mocks/Orders';
import Customers from '@/mocks/Customers';
import Members from '@/mocks/Members';
import MemberCards from '@/mocks/MemberCards';
import ScoreRules from '@/mocks/ScoreRules';
import Materials from '@/mocks/Materials';
import Material from '@/mocks/Material';
import Delete from '@/mocks/Delete';
import File from '@/mocks/File';
import Cities from '@/mocks/Cities';
import Counties from '@/mocks/Counties'
import SevenDaysCount from '@/mocks/SevenDaysCount';
import Shop from '@/mocks/Shop';
import UpToCut from '@/mocks/UpToCut';
import Tickets from '@/mocks/Tickets';
import MemberCard from '@/mocks/MemberCard';
import Account from '@/mocks/Account';
/* eslint-disable */
export default class AppServiceProvider extends ServiceProvider{
    constructor(app) {
        super(app);
    }
    register() {
        if(this.app.needMock()) {
            this.app.register('mock', require('mockjs'));
            this.app.register('mock.shops', Shops);
            this.app.register('mock.projects', Projects);
            this.app.register('mock.project', Project);
            this.app.register('mock.coupons', Coupons);
            this.app.register('mock.upToCutActivities', UpToCutActivities);
            this.app.register('mock.provinces', Provinces);
            this.app.register('mock.cities', Cities);
            this.app.register('mock.counties', Counties);
            this.app.register('mock.wechatMenus', WechatMenus);
            this.app.register('mock.merchandises', Merchandises);
            this.app.register('mock.categories', Categories);
            this.app.register('mock.orders', Orders);
            this.app.register('mock.customers', Customers);
            this.app.register('mock.members', Members);
            this.app.register('mock.memberCards', MemberCards);
            this.app.register('mock.scoreRules', ScoreRules);
            this.app.register('mock.materials', Materials);
            this.app.register('mock.material.upload', Material);
            this.app.register('mock.delete', Delete );
            this.app.register('mock.file', File);
            this.app.register('mock.sevenDaysCount', SevenDaysCount);
            this.app.register('mock.shop.create', Shop);
            this.app.register('mock.shop.update', Shop);
            this.app.register('mock.shop.show', Shop);
            this.app.register('mock.activity.utc.create', UpToCut);
            this.app.register('mock.activity.utc.show', UpToCut);
            this.app.register('mock.tickets', Tickets);
            this.app.register('mock.payGiftActivities', PayGiftActivities);
            this.app.register('mock.memberCard', MemberCard);
            this.app.register('mock.account', Account);
        }
    }
    boot() {

    }
}
