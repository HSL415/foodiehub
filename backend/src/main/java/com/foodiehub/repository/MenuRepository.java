package com.foodiehub.repository;

import com.foodiehub.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<MenuItem, Long> {

    // Find menu items by category
    List<MenuItem> findByCategory(String category);

    // Find available menu items
    List<MenuItem> findByAvailableTrue();

    // Find items by name (case-insensitive)
    List<MenuItem> findByNameContainingIgnoreCase(String name);
}