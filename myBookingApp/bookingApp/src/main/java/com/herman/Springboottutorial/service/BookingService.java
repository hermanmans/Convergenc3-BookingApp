package com.herman.Springboottutorial.service;

import com.herman.Springboottutorial.entity.Booking;

import java.text.ParseException;
import java.util.List;

public interface BookingService {
    Booking saveBooking(Booking booking);


    Booking calculate(Booking booking) throws ParseException;

    List<Booking> fetchBookingList();

    Booking updateBooking(Long bookingKey, Booking booking) throws ParseException;

    void deleteBookingById(Long bookingKey);

    Booking fetchBookingById(Long bookingKey);

    Booking calculateRoomCost(Booking booking);

    List<Booking> fetchBookingsByUserId(Long userRef);

//    Refund calculateRefund(Refund refund, Booking booking) throws ParseException;

}
