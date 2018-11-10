import Model from './Model'
import _ from 'underscore';
import OrderTransformer from './transformers/Order';
export default class Orders extends Model{
    constructor(application) {
        super(application);
        this.transformer = OrderTransformer;
    }
    computed() {
        return _.extend(super.computed(), {
            currentPage() {
                if(this.currentPage) {
                    let orders = this.list[this.currentPage -1];
                    let list = [];
                    _.each(orders, function (order){
                        let items = order.orderItems;
                        if(items && items.length > 0) {
                            if(items.length > 0) {
                                order.span={
                                    colspan: 1,
                                    rowspan: items.length
                                };
                            }else{
                                order.span={
                                    colspan: 0,
                                    rowspan: 0
                                };
                            }

                            let needSpan = false;
                            _.each(items, function (item){
                                if(!needSpan){
                                    needSpan = true;
                                    list.push(_.extend({'item': item, needSpan: true}, order));
                                }else{
                                    list.push(_.extend({'item': item, needSpan: false}, order));
                                }

                            });
                        }else{
                            order.span={
                                colspan: 0,
                                rowspan: 0
                            };
                            list.push(order);
                        }

                    });
                    console.log('orders', list, this.list);
                    return list;
                }else{
                    return null;
                }
            }
        });
    }
}
