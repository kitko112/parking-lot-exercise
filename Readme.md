Parking Lot Exercise

# Assumptions
1. Concurrency handling is handled in database layer (Optimistic Locking or Pessimistic Locking)
2. Small vehicle can only take small spot, medium and large vehicle can only take spot in their size as well, it is feasible to make the change on spotAllocationService though
3. Database Transaction is not in scope
4. Repository layer normally should be tested in Component Test as it requires working with local database, it is covered in Unit Test as no database is invloved.
