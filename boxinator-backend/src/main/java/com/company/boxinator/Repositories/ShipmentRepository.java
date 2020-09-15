package com.company.boxinator.Repositories;

import com.company.boxinator.Models.Enums.ShipmentStatus;
import com.company.boxinator.Models.Shipment;
import com.company.boxinator.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Integer> {
   // List<Shipment> findAllByUser(User user);
   // List<Shipment> findAllByShipmentStatusContaining(ShipmentStatus shipmentStatus);
}
