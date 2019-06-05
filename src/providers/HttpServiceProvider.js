import ServiceProvider from './ServiceProvider';
import AccountService from '@/services/http/AccountService';
import UriService from '@/services/http/UriService';
import ShopsService from '@/services/http/ShopsService';
import ProjectsService from '@/services/http/ProjectsService';
import CouponsService from '@/services/http/CouponsService';
import UpToCutActivitiesService from '@/services/http/UpToCutActivitiesService';
import AppService from '@/services/http/AppService';
import WechatMenusService from '@/services/http/WechatMenuService';
import MerchandisesService from '@/services/http/MerchandisesService';
import CategoriesService from '@/services/http/CategoriesService';
import OrdersService from '@/services/http/OrdersService';
import CustomersService from '@/services/http/CustomersService';
import MembersService from '@/services/http/MemberService';
import MemberCardService from '@/services/http/MemberCardService';
import ScoreRulesService from '@/services/http/ScoreRulesService';
import MaterialsService from '@/services/http/MaterialsService';
import FilesService from '@/services/http/FilesService';
import RegionsService from '@/services/http/RegionsService';
import TicketsService from '@/services/http/TicketsService';
import PaidGiftActivitiesService from '@/services/http/PaidGiftActivitiesService';
import MarketingService from '@/services/http/MarketingService';
import ActivityMerchandisesService from '@/services/http/ActivityMerchandisesService';
import AdvertisementService from '@/services/http/AdvertisementService';
import WxTemplateMessageService from "../services/http/WxTemplateMessageService";
import UserTemplateMessageService from "../services/http/UserTemplateMessageService";
import UserTemplateWithMiniprogramService from "../services/http/UserTemplateWithMiniprogramService";
import UserTemplateWithOfficialAccountService from "../services/http/UserTemplateWithOfficialAccountService";
import RechargeableCardService from "../services/http/RechargeableCardService";
import UserRechargeableCardConsumeRecordService from "../services/http/UserRechargeableCardConsumeRecordService";
import ExcelService from "../services/http/ExcelService";

export default class HttpServiceProvider extends ServiceProvider {
    constructor(app) {
        super(app);
        let axios = null;
        Object.defineProperty(app, '_axios', {
            get: () => {
                return axios = app.$axios.create({
                    headers: app.config['http']['headers'],
                    baseURL: app.config['http']['apiGateway'],
                });
            },
            set: (v) => {
                axios = v;
            }
        });
    }

    register() {

        this.app.register('uri', UriService);

        this.app.register('http.account', AccountService);
        this.app.register('http.shops', ShopsService);
        this.app.register('http.projects', ProjectsService);
        this.app.register('http.couponCards', CouponsService);
        this.app.register('http.upToCutActivities', UpToCutActivitiesService);
        this.app.register('http.app', AppService);
        this.app.register('http.wechatMenus', WechatMenusService);
        this.app.register('http.merchandises', MerchandisesService);
        this.app.register('http.categories', CategoriesService);
        this.app.register('http.orders', OrdersService);
        this.app.register('http.customers', CustomersService);
        this.app.register('http.members', MembersService);
        this.app.register('http.memberCards', MemberCardService);
        this.app.register('http.scoreRules', ScoreRulesService);
        this.app.register('http.materials', MaterialsService);
        this.app.register('http.files', FilesService);
        this.app.register('http.regions', RegionsService);
        this.app.register('http.tickets', TicketsService);
        this.app.register('http.paidGiftActivities', PaidGiftActivitiesService);
        this.app.register('http.marketing', MarketingService);
        this.app.register('http.activityMerchandises', ActivityMerchandisesService);
        this.app.register('http.advertisements', AdvertisementService);
        this.app.register('http.wxTemplateMessages', WxTemplateMessageService);
        this.app.register('http.userTemplateMessages', UserTemplateMessageService);
        this.app.register('http.userTemplateWithMiniprogram', UserTemplateWithMiniprogramService);
        this.app.register('http.userTemplateWithOfficialAccount', UserTemplateWithOfficialAccountService);
        this.app.register('http.rechargeableCards', RechargeableCardService);
        this.app.register('http.userRechargeableCardConsumeRecords', UserRechargeableCardConsumeRecordService);
        this.app.register('http.excel', ExcelService);
    }
}
