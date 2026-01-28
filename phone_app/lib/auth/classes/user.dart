class User {
  final String email;
  bool isEmailVerified;
  final String firstName;
  final String lastName;
  final String phoneNumber;

   User ({
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.phoneNumber,
    required this.isEmailVerified
  });
}
