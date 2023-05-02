package com.herman.Springboottutorial.controller;

import com.herman.Springboottutorial.entity.Refund;
import com.herman.Springboottutorial.service.RefundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RefundController {
    @Autowired
    private RefundService refundService;
    @PostMapping("/refund")
    public Refund saveRefund(@RequestBody Refund refund) throws ParseException {
        refundService.calculateRefund(refund);
        return refundService.saveRefund(refund);
    }
    @GetMapping("/refund/{userRef}")
    public List<Refund> fetchRefundByUserId(@PathVariable("userRef") Long userRef) {
        return refundService.fetchRefundByUserId(userRef);
    }
}
