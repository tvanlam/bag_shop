package bag.service.voucher;

import bag.modal.dto.VoucherDto;
import bag.modal.request.VoucherRequest;

import java.util.List;

public interface VoucherService {
    List<VoucherDto> getVouchers();

    VoucherDto getVoucherById(int id);

    VoucherDto createVoucher(VoucherRequest request);

    VoucherDto updateVoucher(VoucherRequest request, int id);

    void deleteVoucher(int id);


}
