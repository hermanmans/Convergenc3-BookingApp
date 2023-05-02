package com.herman.Springboottutorial.service;

import com.herman.Springboottutorial.entity.Refund;
import com.herman.Springboottutorial.repository.RefundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
public class RefundServiceImpl implements RefundService{
    @Autowired
    private RefundRepository refundRepository  ;
    @Autowired
    private BookingServiceImpl booking;
    @Override
    public Refund saveRefund(Refund refund) {
        return refundRepository.save(refund);
    }
        @Override
    public Refund calculateRefund(Refund refund) throws ParseException, ParseException {
        String arrivalDate = refund.getStartDate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/YYYY");
        String currentDate = formatter.format(LocalDate.now());

        Date firstDate = booking.stringToDate(currentDate);
        Date secondDate = booking.stringToDate(arrivalDate);
        Long timeToVisit = booking.dateDiff(firstDate, secondDate);
        refund.setTimeToVisit(timeToVisit);
//        refund.setCurrentDate(currentDate);

//        return refundRepository.save(refund);
        if(timeToVisit<2){
            refund.setRefundAmount(refund.getTotal()*0);
        } else if (timeToVisit>2 && timeToVisit<14) {
            refund.setRefundAmount(refund.getTotal()*0.5);
        }else
            refund.setRefundAmount(refund.getTotal()*0.8);
        return refundRepository.save(refund);
    }

    @Override
    public List<Refund> fetchRefundByUserId(Long userRef) {
        return refundRepository.findByUserRef(userRef);
    }
}
