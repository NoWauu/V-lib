class Station {
  final int code;
  final String name;
  final double latitude;
  final double longitude;
  final int capacity;

  Station({
    required this.code,
    required this.name,
    required this.latitude,
    required this.longitude,
    required this.capacity,
  });

  factory Station.fromJson(Map<String, dynamic> json) {
    return Station(
      code: json['station_code'] != null ? json['station_code'] as int : -1,
      name: json['name']?.toString() ?? 'Inconnu',
      latitude: (json['latitude'] as num?)?.toDouble() ?? 0.0,
      longitude: (json['longitude'] as num?)?.toDouble() ?? 0.0,
      capacity: json['capacity'] != null ? json['capacity'] as int : 0,
    );
  }

}
