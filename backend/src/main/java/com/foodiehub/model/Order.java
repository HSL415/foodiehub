package com.foodiehub.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private Long itemId;

    @Column(nullable = false)
    private String itemName;

    @Column(nullable = false)
    private Double totalPrice;

    @Column(nullable = false)
    private String status; // PENDING, COMPLETED, CANCELLED

    @Column(nullable = false)
    private LocalDateTime orderTime;

    // Constructors
    public Order() {
        this.orderTime = LocalDateTime.now();
        this.status = "PENDING";
    }

    public Order(String customerName, Long itemId, String itemName, Double totalPrice) {
        this.customerName = customerName;
        this.itemId = itemId;
        this.itemName = itemName;
        this.totalPrice = totalPrice;
        this.orderTime = LocalDateTime.now();
        this.status = "PENDING";
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getOrderTime() { return orderTime; }
    public void setOrderTime(LocalDateTime orderTime) { this.orderTime = orderTime; }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", customerName='" + customerName + '\'' +
                ", itemId=" + itemId +
                ", itemName='" + itemName + '\'' +
                ", totalPrice=" + totalPrice +
                ", status='" + status + '\'' +
                ", orderTime=" + orderTime +
                '}';
    }
}