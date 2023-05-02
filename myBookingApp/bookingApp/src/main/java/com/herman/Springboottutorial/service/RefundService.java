package com.herman.Springboottutorial.service;

import com.herman.Springboottutorial.entity.Refund;

import java.text.ParseException;
import java.util.List;

public interface RefundService {
    Refund saveRefund(Refund refund);

    Refund calculateRefund(Refund refund) throws ParseException, ParseException;

    List<Refund> fetchRefundByUserId(Long userRef);
}
