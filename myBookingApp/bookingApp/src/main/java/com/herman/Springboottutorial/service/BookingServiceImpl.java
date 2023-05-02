package com.herman.Springboottutorial.service;

import com.herman.Springboottutorial.entity.Booking;
import com.herman.Springboottutorial.entity.User;
import com.herman.Springboottutorial.repository.BookingRepository;
import com.herman.Springboottutorial.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UserRepository userRepository;
//    @Autowired
//    private RefundRepository refundRepository;

    @Override
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public void saveUser(){
        List<Booking> bookingsList = fetchBookingList();
        User user = User.builder()
                .userName("")
                .userSurname("D")
                .userEmail("Ja@gmail.com")
                .password("12345678Aa!")
                .idNumber("12345678")
                .phoneNumber("1234567891")
                .booking(bookingsList)
                .build();
        userRepository.save(user);
    }
    @Override
    public Booking calculate(Booking booking) throws ParseException {
//        booking.setStartDate(booking.getStartDate());
//        booking.setEndDate(booking.getEndDate());
        Date firstDate = stringToDate(booking.getStartDate());
        Date secondDate = stringToDate(booking.getEndDate());
        long totalDays = dateDiff(firstDate, secondDate);
        booking.setDuration(totalDays);
        calculateRoomCost(booking);
//        float totalCost = (totalDays) * (booking.getRoomRate());
//        booking.setTotal(totalCost);
//        booking.setUser_id((long)14);
//        saveUser();
        return bookingRepository.save(booking);
    }

    public Date stringToDate(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
        Date formattedDate = sdf.parse(date);
        return formattedDate;
    }

    public long dateDiff(Date firstDate, Date secondDate) {
        long diffInMillies = (secondDate.getTime() - firstDate.getTime());
        if (diffInMillies <= 0) {
            throw new IllegalArgumentException("Invalid Date Range");
        }
        long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
        return diff;
    }

    @Override
    public List<Booking> fetchBookingList() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking updateBooking(Long bookingKey, Booking booking) throws ParseException {
        Booking bookingDB = bookingRepository.findById(bookingKey).get();
        if (Objects.nonNull(booking.getStartDate()) && !"".equalsIgnoreCase(booking.getStartDate())) {
            bookingDB.setStartDate(booking.getStartDate());
        }
        if (Objects.nonNull(booking.getEndDate()) && !"".equalsIgnoreCase(booking.getEndDate())) {
            bookingDB.setEndDate(booking.getEndDate());
        }
        bookingDB.setDuration(booking.getDuration());
        bookingDB.setRoomSelected(booking.getRoomSelected());
        calculate(bookingDB);
        return bookingRepository.save(bookingDB);
    }
    @Override
    public void deleteBookingById(Long bookingKey) {
        bookingRepository.deleteById(bookingKey);
    }

    @Override
    public Booking fetchBookingById(Long bookingKey) {
        return bookingRepository.findById(bookingKey).get();
    }

    @Override
    public Booking calculateRoomCost(Booking booking) {
        float totalCost = (booking.getDuration()) * (booking.getRoomRate());
        booking.setTotal(totalCost);
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> fetchBookingsByUserId(Long userRef) {
        return bookingRepository.findByUserRef(userRef);
    }


//    @Override
//    public Refund calculateRefund(Refund refund, Booking booking) throws ParseException {
//        String arrivalDate = booking.getStartDate();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/YYYY");
//        String currentDate = formatter.format(LocalDate.now());
//        Date firstDate = stringToDate(currentDate);
//        Date secondDate = stringToDate(arrivalDate);
//        Long timeToVisit = dateDiff(firstDate, secondDate);
//        refund.setCurrentDate(currentDate);
//        refund.setTimeToVisit(timeToVisit);
//        return refundRepository.save(refund);
//    }
//        if(timeTillVisit<2){
//            booking.setRefund(booking.getTotal()*0);
//        } else if (timeTillVisit>2 && timeTillVisit<14) {
//            booking.setRefund(booking.getTotal()*0.5);
//        }else
//            booking.setRefund(booking.getTotal()*0.8);
//        return bookingRepository.save(booking);
//    }
//
//
}
