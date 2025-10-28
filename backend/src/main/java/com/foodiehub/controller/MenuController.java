package com.foodiehub.controller;

import com.foodiehub.model.MenuItem;
import com.foodiehub.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
public class MenuController {

    @Autowired
    private MenuRepository menuRepository;

    // GET all menu items
    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        List<MenuItem> menuItems = menuRepository.findAll();
        return ResponseEntity.ok(menuItems);
    }

    // GET menu item by ID
    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Long id) {
        Optional<MenuItem> menuItem = menuRepository.findById(id);
        return menuItem.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET menu items by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<MenuItem>> getMenuItemsByCategory(@PathVariable String category) {
        List<MenuItem> menuItems = menuRepository.findByCategory(category);
        return ResponseEntity.ok(menuItems);
    }

    // GET available menu items
    @GetMapping("/available")
    public ResponseEntity<List<MenuItem>> getAvailableMenuItems() {
        List<MenuItem> menuItems = menuRepository.findByAvailableTrue();
        return ResponseEntity.ok(menuItems);
    }

    // POST create new menu item
    @PostMapping
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItem menuItem) {
        MenuItem savedItem = menuRepository.save(menuItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
    }

    // PUT update menu item
    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItem) {
        Optional<MenuItem> existingItem = menuRepository.findById(id);

        if (existingItem.isPresent()) {
            menuItem.setId(id);
            MenuItem updatedItem = menuRepository.save(menuItem);
            return ResponseEntity.ok(updatedItem);
        }

        return ResponseEntity.notFound().build();
    }

    // DELETE menu item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        if (menuRepository.existsById(id)) {
            menuRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}