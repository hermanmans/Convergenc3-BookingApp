package com.herman.Springboottutorial.repository;

import com.herman.Springboottutorial.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByUserRef(Long userRef);

    Booking findByBookingKey(Long bookingKey);

    List<Booking> findByStartDate(String startDate);

    List<Booking> findByStartDateAndEndDate(String startDate, String endDate);
    List<Booking> findByStartDateLessThanEqualAndEndDateGreaterThanAndRoomSelected(Date startDate, Date startDuplicate, String roomSelected);
//    List<Booking> findByStartDateLessThanEqualAndEndDateGreaterThanAndRoomSelected(String startDate,String endDate,String roomSelected);


//    List<Booking> findByStartDateBetween(String startDate,String endDate);
//    @Query("select x from Booking x where x.room = ?1")
//    List<Booking> findByRoom(String room);
}

