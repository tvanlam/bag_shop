package bag.service.voucher;

import bag.modal.dto.VoucherDto;
import bag.modal.entity.Voucher;
import bag.modal.request.VoucherRequest;
import bag.repository.VoucherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoucherServiceImpl implements VoucherService {
    private final VoucherRepository voucherRepository;

    public VoucherServiceImpl(VoucherRepository voucherRepository) {
        this.voucherRepository = voucherRepository;
    }

    @Override
    public List<VoucherDto> getVouchers() {
        return voucherRepository.findAll().stream().map(VoucherDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public VoucherDto getVoucherById(int id) {
        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voucher not found"));
        return new VoucherDto(voucher);
    }

    @Override
    public VoucherDto createVoucher(VoucherRequest request) {
        try {
            Voucher voucher = new Voucher();
            request.setVoucher(voucher);
            voucherRepository.save(voucher);
            return new VoucherDto(voucher);
        }catch(Exception e){
            throw new RuntimeException("Create voucher failed!" + e.getMessage());
        }
    }

    @Override
    public VoucherDto updateVoucher(VoucherRequest request, int id) {
        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voucher not found!"));
        try{
            request.setVoucher(voucher);
            voucherRepository.save(voucher);
            return new VoucherDto(voucher);
        }catch (Exception e){
            throw new RuntimeException("Update failed");
        }
    }

    @Override
    public void deleteVoucher(int id) {
        Voucher voucher = voucherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voucher not found"));
        try{
            voucherRepository.delete(voucher);
        }catch (Exception e) {
            throw new RuntimeException("Delete failed");
        }
    }
}
