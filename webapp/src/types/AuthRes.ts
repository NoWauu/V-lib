export interface responseData {
  'status': string;
  'message': string;
  'data'?: {
    'email': string;
    'first_name': string;
    'last_name': string;
    'phone_number': string;
    'token_data': {
      'token': string;
      'expiration_date': string;
    }
  }
}