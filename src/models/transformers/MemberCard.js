export default class MemberCard {
    constructor(memberCard) {
        this.idx = memberCard['index'];
        this.id = memberCard['id'];
        this.title = memberCard['title'];
        this.sync = !memberCard['sync'] ? '同步失败' : '同步成功';
    }
}
