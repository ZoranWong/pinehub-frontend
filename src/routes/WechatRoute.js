import Route from './Route';
import Layout from '../views/common/Layout';
import WechatIndex from '../views/wechat/Index';
import WechatMenus from '../views/wechat/menu/Index';
import CreateMenu from '../views/wechat/menu/Create';
import UpdateMenu from '../views/wechat/menu/Edit';
import WechatAutoReply from '../views/wechat/AutoReply';
import WechatMaterials from '../views/wechat/Materials';
import WechatTemplateMessagesIndex from '../views/wechat/template_message/Index'
import WechatTemplateMessages from '../views/wechat/template_message/TemplateIndex';
import CustomTemplateMessages from '../views/wechat/template_message/custom/TemplateIndex';
import CustomTemplateMessagesForm from '../views/wechat/template_message/custom/Form';


let route = new Route();
route.group('/project/:projectId/wechat', {
    'tag': '微信管理',
    'component': Layout,
    'uses': function (route) {
        route.addRoute('index', {
            'name': 'wechat-index',
            'component': WechatIndex,
            'tag': '公众号管理'
        });

        route.addRoute('menus', {
            'name': 'wechat-menus',
            'component': WechatMenus,
            'tag': '菜单管理'
        });

        route.addRoute('create/menu', {
            'name': 'create-wx-menu',
            'component': CreateMenu,
            'tag': '创建菜单'
        });

        route.addRoute('update/:id/menu', {
            'name': 'update-wx-menu',
            'component': UpdateMenu,
            'tag': '更新菜单'
        });

        route.addRoute('/autoReply', {
            'name': 'wechat-autoReply',
            'component': WechatAutoReply,
            'tag': '自动回复'
        });

        route.addRoute('/materials', {
            'name': 'wechat-materials',
            'component': WechatMaterials,
            'tag': '素材管理'
        });

        route.addRoute('template_messages', {
            'name': 'wechat-template-messages',
            'component': WechatTemplateMessagesIndex,
            'tag': '模板消息'
        });

        route.addRoute(':wxType/template_messages', {
            'name': 'wechat-template-messages-miniprogram',
            'component': WechatTemplateMessages,
            'tag': '小程序模板消息'
        });

        route.addRoute(':wxType/template_messages', {
            'name': 'wechat-template-messages-official-account',
            'component': WechatTemplateMessages,
            'tag': '公众号模板消息'
        });

        route.addRoute(':wxType/template_message/:wxTemplateId/custom', {
            'name': 'wechat-template-messages-custom',
            'component': CustomTemplateMessages,
            'tag': '自填充模板消息'
        });

        route.addRoute(':wxType/template_message/:wxTemplateId/custom', {
            'name': 'wechat-template-messages-custom-create',
            'component': CustomTemplateMessagesForm,
            'tag': '新建自填充模板消息'
        });

        route.addRoute(':wxType/template_message/:wxTemplateId/custom/:templateId', {
            'name': 'wechat-template-messages-custom-edit',
            'component': CustomTemplateMessagesForm,
            'tag': '更新自填充模板消息'
        });
    }
});
export default route;
