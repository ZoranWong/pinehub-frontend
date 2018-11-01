/* eslint-disable no-unused-vars */
const ORDER_STATUS = {
    "ALL": null,
    "CANCEL": 0,
    "WAIT_COMMIT": 100,
    "WAIT_PAY": 200,
    "WAIT_SEND": 300,
    "PAID": 300,
    "WAIT_SIGNED": 400,
    "SEND": 400,
    "COMPLETED": 500,
    "PAY_FAILED": 600,
    "REFUNDING": 700,
    "REFUSE_REFUND": 800,
    "REFUNDED": 900
};

export default ORDER_STATUS;
