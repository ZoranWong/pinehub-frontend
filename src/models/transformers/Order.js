import _ from 'underscore';

export default class Order {
    constructor(order) {
        //订单状态：0-订单取消 100-等待提交支付订单 200-提交支付订单 300-支付完成 400-已发货 500-订单完成 600-支付失败
        const ORDER_STATUS = ["已取消", "未提交", "未支付", "待发货", "待签收", "已完成", "支付失败", "退款中", "拒绝退款", "退款成功"];

        // 订单类型：0-线下扫码 1-商城订单 2-站点用户订单  3-商家进货订单 4 -充值
        const ORDER_TYPE = ['扫码付', '商城订单', '站点用户订单', '商家进货订单', '充值'];

        const PAYMENT_TYPE = ['其他支付方式', '支付宝支付', '微信支付', '余额支付'];

        this.typeStr = ORDER_TYPE[order['type']];

        this.type = order['type'];

        this.id = order['id'];

        this.code = order['code'];

        this.transactionId = order['transaction_id'];

        this.orderItems = [];
        this.acitvity = order['activity'];

        let self = this;

        _.each(order['order_items'], function (item) {
            let orderItem = {};

            orderItem.merchandiseName = item['merchandise_name'];

            orderItem.merchandiseImage = item['main_image'];

            orderItem.merchandiseId = item['merchandise_id'];

            orderItem.sellPrice = item['sell_price'].toFixed(2);

            orderItem.quality = item['quality'];

            orderItem.customer = order['customer'];

            orderItem.totalAmount = item['total_amount'].toFixed(2);

            orderItem.discountAmount = item['discount_amount'].toFixed(2);

            orderItem.paymentAmount = item['payment_amount'].toFixed(2);

            orderItem.shop = item['shop'];

            orderItem.status = item['status'];

            orderItem.statusStr = ORDER_STATUS[item['status'] / 100];

            self.orderItems.push(orderItem);
        });

        this.isAliPay = order['pay_type'] == 1;

        this.isWechatPay = !this.isAliPay;

        this.payTypeStr = PAYMENT_TYPE[order['pay_type']];

        this.status = order['status'];

        this.statusStr = ORDER_STATUS[order['status'] / 100];

        this.idx = order['index'];

        this.paymentAmount = order['payment_amount'].toFixed(2);

        this.totalAmount = order['total_amount'].toFixed(2);

        this.discountAmount = order['discount_amount'].toFixed(2);

        let createdAt = '';
        let paidAt = '';

        if (_.isObject(order['created_at'])) {
            createdAt = order['created_at']['date'];
        } else {
            createdAt = order['created_at'];
        }

        if (_.isObject(order['paid_at'])) {
            paidAt = order['paid_at']['date'];
        } else {
            paidAt = order['paid_at'];
        }

        createdAt = new Date(createdAt);
        paidAt = new Date(paidAt);

        this.paidAt = paidAt.format('yyyy-MM-dd hh:mm:ss');
        this.createdAt = createdAt.format('yyyy-MM-dd hh:mm:ss');
        this.activity = order['activity'] ? order['activity'] : null;
        this.receiveShop = order['receiving_shop'] ? order['receiving_shop'] : null;
    }
}
