package com.foodiehub.repository;

import com.foodiehub.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Find orders by customer name
    List<Order> findByCustomerName(String customerName);

    // Find orders by status
    List<Order> findByStatus(String status);

    // Find orders by customer name and status
    List<Order> findByCustomerNameAndStatus(String customerName, String status);
}