/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 11-17-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class youtubeIntegrationApex {
    public youtubeIntegrationApex() {

    }
    @AuraEnabled(cacheable=true)

    public static list<mywrapper> getYoutubeVideos(string SEARCH_KEY, string SEARCH_URL, string API_KEY){

        SEARCH_KEY = SEARCH_KEY == null ? 'salesforce' : SEARCH_KEY;

        Http http = new Http();

        HttpRequest req = new HttpRequest();

        Httpresponse res = null;

        String endpoint  = SEARCH_URL +'?part=snippet' +'&maxResults=20' +'&type=video' +'&q=' + EncodingUtil.urlEncode(SEARCH_KEY, 'UTF-8') +'&key=' + API_KEY;

        req.setEndPoint(endpoint);

        req.setMethod('GET');

        res = http.send(req);

        YoutubeResponseController.Response response = (YoutubeResponseController.Response)JSON.deserialize(res.getBody(), YoutubeResponseController.Response.class);

        List<YoutubeResponseController.Item> items  =  response.items;

        List<mywrapper> wrp  = new List<mywrapper>();

        for (YoutubeResponseController.Item itemObj : items) {

            mywrapper YTWrap = new mywrapper();

            YTWrap.videoId = itemObj.id.videoId;

            YTWrap.description = itemObj.Snippet.description;

            YTWrap.thumbnails = itemObj.Snippet.thumbnails.medium.url;

            YTWrap.title = itemObj.Snippet.title;

            YTWrap.channelTitle = itemObj.Snippet.channelTitle;

            wrp.add(YTWrap);

        }

        return wrp;

    }



    public class mywrapper{

        @AuraEnabled public string videoId {get;set;}

        @AuraEnabled public string description {get;set;}

        @AuraEnabled public String thumbnails {get;set;}

        @AuraEnabled public String title {get;set;}

        @AuraEnabled public String channelTitle {get;set;}

        @AuraEnabled public String publishedAt  {get;set;}

    }
}