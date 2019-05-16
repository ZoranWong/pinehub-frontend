export default class Category {
    constructor(category) {
        this.idx = category['index'];
        this.id = category['id'];
        this.name = category['name'];
        let children = category['children']['data'];
        this.children = [];
        for (let i in children) {
            this.children.push(new Category(children[i]));
        }
        this.key = category['key'];
        this.merchandiseNum = category['merchandise_num'];
    }
}
