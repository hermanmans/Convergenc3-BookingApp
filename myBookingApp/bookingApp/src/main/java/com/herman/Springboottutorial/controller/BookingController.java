package com.herman.Springboottutorial.controller;

import com.herman.Springboottutorial.entity.Booking;
import com.herman.Springboottutorial.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/bookingDates")
    public Booking saveBooking(@RequestBody Booking booking) throws ParseException {
        bookingService.calculate(booking);
        bookingService.calculateRoomCost(booking);
//        bookingService.calculateRefund(booking);
//        System.out.println(booking.getStartDate());
//        User test = new User();
//        test.setEntryId(test.getEntryId());
//        System.out.println(test);
        return bookingService.saveBooking(booking);
    }

    @GetMapping("/bookingDates")
    public List<Booking> fetchBookingList() {
        return bookingService.fetchBookingList();
    }

    @GetMapping("/bookingDates/{id}")
    public Booking fetchBookingById(@PathVariable("id") Long bookingKey) {
        return bookingService.fetchBookingById(bookingKey);
    }

    @GetMapping("/userDates/{userRef}")
    public List<Booking>fetchBookingsByUserId(@PathVariable("userRef") Long userRef) {
        return bookingService.fetchBookingsByUserId(userRef);
    }

    @PutMapping("/bookingDates/{id}")
    public Booking updateBooking(@PathVariable("id") Long bookingKey, @RequestBody Booking booking) throws ParseException {
        System.out.println(booking.getTotal());
        return bookingService.updateBooking(bookingKey, booking);
    }

    @DeleteMapping("/bookingDates/{id}")
    public void deleteBookingById(@PathVariable("id") Long bookingKey) {
        bookingService.deleteBookingById(bookingKey);
    }

//    @PutMapping("/refund/{id}")
//    public Booking calculateRefund(@PathVariable("id")Long bookingKey,@RequestBody Booking booking) throws ParseException {
//        bookingService.calculateRefund(bookingKey,booking);
//        return bookingService.updateBooking(bookingKey, booking);
//    }
//    @PostMapping("/refund")
//    public Refund calculateRefund(@RequestBody Refund refund, @RequestBody Booking booking) throws ParseException {
//        System.out.println(booking.getStartDate());
//        return bookingService.calculateRefund(refund, booking);
//    }
}
