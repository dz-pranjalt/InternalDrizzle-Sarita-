public with sharing class getopportunityforchart {
    public getopportunityforchart() {

    }
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getOppData(){
        
        return [SELECT SUM(ExpectedRevenue) expectRevenue, SUM(Amount) amount,StageName stage 
            FROM Opportunity WHERE StageName NOT IN ('Closed Won') GROUP BY StageName LIMIT 10];
       
         
    }
}