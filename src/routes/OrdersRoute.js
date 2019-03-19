import Route from './Route';
import Layout from '@/views/common/Layout';
import Index from '@/views/orders/Index';
import ScanPaymentOrders from '@/views/orders/scan_payment_orders/Index';
import BookingOrders from "@/views/orders/booking_orders/Index";
import ImmediateOrders from "@/views/orders/immediate_orders/Index";
let route = new Route();
route.group('/project/:projectId/orders', {
  'tag' : '订单管理',
  'component': Layout,
  'uses' : (child) => {
    child.addRoute('', {
      name: 'orders',
      component: Index,
      tag: '订单列表'
    });
    child.addRoute('scan_payment', {
      'name': 'orders-scan-payment',
      'component': ScanPaymentOrders,
      'tag': '扫码支付订单'
    });

    child.addRoute('booking', {
      'name': 'orders-booking',
      'component': BookingOrders,
      'tag': '预定订单'
    });

    child.addRoute('immediate', {
      'name': 'orders-immediate',
      'component': ImmediateOrders,
      'tag': '即时订单'
    });
  }
});
export default route;
