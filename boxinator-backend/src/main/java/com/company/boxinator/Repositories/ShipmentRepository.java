package com.company.boxinator.Repositories;

import com.company.boxinator.Models.Shipment;
import com.company.boxinator.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Integer> {

    Optional<List<Shipment>> findAllByUserId(Integer userId);

    Optional<Shipment> findByUserId(Integer userId);

    Optional<Shipment> findShipmentByIdAndUser(Integer shipmentId, User user);

    List<Shipment> findShipmentsByUserId(Integer userId);

}