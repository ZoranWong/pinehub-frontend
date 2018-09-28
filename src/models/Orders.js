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
            if(items) {
              order.span={
                colspan: items.length>1 ? 1 : 0,
                rowspan: items.length > 1 ? items.length : 0
              };
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

          return list;
        }else{
          return null;
        }
      }
    });
  }
}
