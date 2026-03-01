package bag.support.method;

import java.net.InetSocketAddress;
import java.net.Socket;

public class SmtpTest {
    public static void main(String[] args) {
        try {
            Socket socket = new Socket();
            socket.connect(new InetSocketAddress("smtp.gmail.com", 587), 5000);
            System.out.println("KET NOI THANH CONG");
            socket.close();
        } catch (Exception e) {
            System.out.println("KHONG KET NOI DUOC");
            e.printStackTrace();
        }
    }
}
