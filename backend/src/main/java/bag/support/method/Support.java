package bag.support.method;

import bag.modal.entity.Order;
import bag.modal.entity.OrderDetails;
import bag.modal.entity.Voucher;

import java.math.BigDecimal;

public class Support {
    public static String buildKey(String email, String action){
        return String.format("OTP:%s:%s", email, action);
    }

    public static String formatCurrency(double amount){
        return String.format("%,.0f đ", amount);
    }


}
