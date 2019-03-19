export default class WechaMenu{
    constructor(menu) {
        this.id = menu.id;
        this.name = menu.name;
        this.menus = menu.menus;
        this.isPublic = menu.is_public;
    }
}
