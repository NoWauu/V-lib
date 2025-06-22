import 'package:url_launcher/url_launcher.dart';

void openGoogleMaps(Map station) async {
  final url = 'https://www.google.com/maps/dir/?api=1&destination=${station['latitude']},${station['longitude']}&travelmode=walking';
  await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
}

