//Process builder-flow-apex
//apex will return name of the particular case the that will be pass to flow and will update description of case
public class flowApex {
 @InvocableMethod
    public static List<String> getFlowData(List<Id> ids){
        List<String> listStr = new List<String>();
        List<Case> caseList = [Select CaseName__c from Case where Id =: ids];
        if(caseList.size()>0){
            for(Case c : caseList){
                listStr.add(c.CaseName__c);
            }
        }
        return listStr;
        
    }
}