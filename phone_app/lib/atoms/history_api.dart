import 'dart:convert';
import 'package:http/http.dart' as http;

Future<List<dynamic>> fetchUserHistory(String token, String apiUrl) async {
  final url = Uri.parse('http://$apiUrl/users/get-user-history/');
  final request = http.MultipartRequest('POST', url);
  request.fields['token'] = token;
  final streamedResponse = await request.send();
  final response = await http.Response.fromStream(streamedResponse);
  if (response.statusCode == 200) {
    return json.decode(response.body)["data"];
  } else {
    throw Exception('Erreur lors du chargement : \\${response.body}');
  }
}

