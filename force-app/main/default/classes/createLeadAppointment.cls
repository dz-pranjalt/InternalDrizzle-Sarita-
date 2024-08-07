public with sharing class createLeadAppointment {
    public createLeadAppointment() {

    }
    public class TimeSlot {
        public Integer id;
        public String slot;
        public TimeSlot(Integer id, String slot) {
            this.id = id;
            this.slot = slot;
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<String> getTimeSlots() {
    List<String> timeSlots = new List<String>();
    // Replace the endpoint URL with the actual URL to fetch the time slots
    String endpointUrl = 'https://a89496c3-66e5-4e50-8178-20d8c60d1530.mock.pstmn.io/slot';
    // Make the HTTP request to fetch the time slots
    HttpRequest request = new HttpRequest();
    request.setEndpoint(endpointUrl);
    request.setMethod('GET');
    HttpResponse response = new Http().send(request);
    // Parse the JSON response and populate the time slots
    if (response.getStatusCode() == 200) {
        Map<String, Object> jsonResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        List<Object> slots = (List<Object>) jsonResponse.get('time_slots');
        for (Object slotObj : slots) {
            Map<String, Object> slotMap = (Map<String, Object>) slotObj;
            String slot = (String) slotMap.get('slot');
            timeSlots.add(slot);
        }
    }
    system.debug(timeSlots);
    return timeSlots;
}
    @AuraEnabled
    public static string createLeadEvent(String recId,List<String> SelectedSlot){
        System.debug('recId '+recId+' SelectedSlot '+SelectedSlot[0]);
        Datetime cDT = Datetime.now() + 5;
        //Date dNow = System.Date();

        Event ev = new Event();
       Lead l = [select Id,OwnerId,Opportunity__c from Lead Where Id =: recId];
            if(recId != ''){
               // ev.WhatId = l.Opportunity__c;
                ev.WhoId = l.Id;
                ev.Subject = 'Lead Appointment';
                ev.OwnerId = l.OwnerId;
                // ev.StartDateTime = Datetime.valueOf(SelectedSlot[0]);
                // ev.EndDateTime = Datetime.valueOf(SelectedSlot[0]);
                ev.StartDateTime = Datetime.valueOf( cDT);
                ev.EndDateTime = Datetime.valueOf(cDT);
        insert ev;    
    }
    return 'success'; 
}
@AuraEnabled(cacheable=true)
    public static List<Lead> getLeadData() {
    List<Lead> LeadList = new List<Lead>();
    LeadList = [Select Name From Lead LIMIT 10];
    return LeadList;

    }
}