//汇报命令
/* eslint-disable */
import Command from './Command';
export default class GetCouponCommand extends Command {
    constructor(app) {
        super(app);
    }
    async handle(page, search = null, limit = 10) {
        try{
            let [coupon, totalNum, currentPage, totalPage ] = await this.$service('coupon').coupon(page, search, limit);
            this.store().dispatch({
                type: 'coupon/setCoupon',
                coupon: coupon,
                totalNum: totalNum,
                currentPage: currentPage,
                totalPage: totalPage
            });
        }catch (e) {
            console.log(e);
        }
    }
    static commandName() {
        return 'get-coupon';
    }
}
