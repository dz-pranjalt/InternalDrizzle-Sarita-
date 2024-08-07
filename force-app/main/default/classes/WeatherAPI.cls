public class WeatherAPI {
     @AuraEnabled
    public static string getWeather(String city){
        System.debug('city '+city);
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(city);
        req.setMethod('GET');
        HttpResponse res = http.send(req);
        System.debug('res '+res.getBody());
        return res.getBody();
    }
}