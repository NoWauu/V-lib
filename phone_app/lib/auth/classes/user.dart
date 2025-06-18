class User {
  final String email;
  final bool isEmailVerified;
  final String firstName;
  final String lastName;
  final String phoneNumber;

  const User ({
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.phoneNumber,
    required this.isEmailVerified
  });
}
