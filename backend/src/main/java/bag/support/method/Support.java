package bag.support.method;

public class Support {
    public static String buildKey(String email, String action){
        return String.format("OTP:%s:%s", email, action);
    }
}
