bool isReservationExpired(DateTime end) {
  return end.isBefore(DateTime.now());
}

