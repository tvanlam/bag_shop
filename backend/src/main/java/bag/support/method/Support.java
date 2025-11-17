package bag.support.method;

import bag.modal.entity.Order;
import bag.modal.entity.OrderDetails;
import bag.modal.entity.Voucher;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class Support {
    public static String buildKey(String email, String action){
        return String.format("OTP:%s:%s", email, action);
    }

    public static String formatCurrency(double amount){
        return String.format("%,.0f đ", amount);
    }

    public static LocalDate convertStringToLocalDate(String date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        return LocalDate.parse(date, formatter);
    }

    public static LocalTime convertStringToLocalTime(String time){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        return LocalTime.parse(time, formatter);
    }

    public static LocalDateTime convertStringToLocalDateTime(String dateTime){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        return LocalDateTime.parse(dateTime, formatter);
    }

}
