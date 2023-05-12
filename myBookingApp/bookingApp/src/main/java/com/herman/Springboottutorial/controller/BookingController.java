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
    public List<Booking> fetchBookingsByUserId(@PathVariable("userRef") Long userRef) {
        return bookingService.fetchBookingsByUserId(userRef);
    }
    @GetMapping("/userTotal/{bookingKey}")
    public Booking fetchUserTotal(@PathVariable("bookingKey") Long bookingKey) {
        return bookingService.fetchUserTotal(bookingKey);
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

    @PutMapping("/bookingCancelled/{id}")
    public Booking cancelBooking(@PathVariable("id") Long bookingKey, @RequestBody Booking booking) throws ParseException {
        return bookingService.cancelBooking(bookingKey, booking);
    }

    @GetMapping("/findStart/{startDate}")
    public List <Booking> fetchStartDate(@PathVariable("startDate")String startDate) {
        return bookingService.fetchStartDate(startDate);
    }
    @GetMapping("/findStart/{startDate}/{endDate}")
    public List <Booking> fetchDates(@PathVariable("startDate")String startDate,@PathVariable("endDate")String endDate) throws ParseException {
        return bookingService.fetchDates(startDate,endDate);
    }

//    @GetMapping("/findBetween/{startDate}/{endDate}/{roomSelected}")
//    public List <Booking> fetchBetween(@PathVariable("startDate")String startDate,@PathVariable("endDate")String endDate,@PathVariable("roomSelected")String roomSelected) throws ParseException {
//        return bookingService.fetchBetween(startDate, endDate,roomSelected);
//    }

        @GetMapping("/findBetween/{startDate}/{roomSelected}")
    public List <Booking> fetchBetween(@PathVariable("startDate") String startDate, @PathVariable("startDate")String startDuplicate, @PathVariable("roomSelected")String roomSelected) throws ParseException {
        return bookingService.fetchBetween(startDate,startDuplicate,roomSelected);
    }
}


