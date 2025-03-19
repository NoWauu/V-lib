from VlibStations.functions.search import search_stations
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def search_request(req: HttpRequest) -> JsonResponse:
    regex = req.POST.get('query')

    if not regex:
        return JsonResponse({"error": "no query provided"}, status=400)

    found_stations = search_stations(regex)
    return JsonResponse(found_stations, safe=False)
