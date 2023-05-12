package com.herman.Springboottutorial.service;

import com.herman.Springboottutorial.entity.Booking;
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


    @Override
    public Booking calculate(Booking booking) throws ParseException {

        Date firstDate = booking.getStartDate();
        Date secondDate = booking.getEndDate();
        long totalDays = dateDiff(firstDate, secondDate);
        booking.setDuration(totalDays);
        calculateRoomCost(booking);
        booking.setStatus("Confirmed");

//        Date foundFirstDate = bookingRepository.findByStartDate(firstDate);
//        System.out.println(foundFirstDate);
//            System.out.println("EXISTS");
//        }else{
//            System.out.println("NO SUCH ENTRIES");
//        };
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
        if (Objects.nonNull(booking.getStartDate())) {
            bookingDB.setStartDate(booking.getStartDate());
        }
        if (Objects.nonNull(booking.getEndDate())) {
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

    @Override
    public Booking cancelBooking(Long bookingKey, Booking booking) {
        Booking bookingDB = bookingRepository.findById(bookingKey).get();
        if (Objects.nonNull(booking.getStatus()) && !"".equalsIgnoreCase(booking.getStatus())) {
            bookingDB.setStatus(booking.getStatus());
        }
        return bookingRepository.save(bookingDB);
    }

    @Override
    public Booking fetchUserTotal(Long bookingKey) {
        return bookingRepository.findByBookingKey(bookingKey);
    }

    @Override
    public List<Booking> fetchStartDate(String startDate) {
       return bookingRepository.findByStartDate(convertToDate(startDate));
    }

    @Override
    public List<Booking> fetchDates(String startDate, String endDate) throws ParseException {
        Date convertedStart = stringToDate(convertToDate(startDate));//Startdate converted from 17052023 to 17/05 and string to date
        Date convertedEnd = stringToDate(convertToDate(endDate));
        if(convertedStart.getTime()<convertedEnd.getTime()){
            System.out.println("Dates are available");
        }
        return bookingRepository.findByStartDateAndEndDate(convertToDate(startDate),convertToDate(endDate));
    }

//    @Override
//    public List<Booking> fetchBetween(String startDate,String endDate,String roomSelected) {
//        List<Booking> onStartDate = bookingRepository.findByStartDate(startDate);
//        return bookingRepository.findByStartDateLessThanEqualAndEndDateGreaterThanAndRoomSelected(convertToDate(startDate),convertToDate(endDate),roomSelected);
//    }
@Override
public List<Booking> fetchBetween(String startDate,String startDuplicate,String roomSelected) throws ParseException {
        Date convertStart = stringToDate(convertToDate(startDate));
        Date convertDuplicate = stringToDate(convertToDate(startDuplicate));
        System.out.println(convertStart);
        System.out.println(convertDuplicate);
        return bookingRepository.findByStartDateLessThanEqualAndEndDateGreaterThanAndRoomSelected(convertStart,convertDuplicate,roomSelected);
}
    private String convertToDate(String date ){
        StringBuilder sb = new StringBuilder(date);
        sb.insert(2,"/");
        sb.insert(5,"/");
        return sb.toString();
//        return startDate.substring(0,2)+"/"+startDate.substring(3,4)+"/"+startDate.substring(5,8);
    }

}


