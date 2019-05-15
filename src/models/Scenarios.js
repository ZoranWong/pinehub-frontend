export default class Scenarios {
    static toArray() {
        const MERGE_PAY = 1;
        const NEIGHBOR = 2;
        const BOOK_MARKET = 3;
        return [
            {key: MERGE_PAY, value: '聚合支付'},
            {key: NEIGHBOR, value: '邻里优鲜'},
            {key: BOOK_MARKET, value: '预定商场'}
        ]
    }
}