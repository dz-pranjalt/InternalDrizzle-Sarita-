public class metadataCutom {
    public static void beforeSpring21(){
        List<connectedApp__mdt> connectList = [Select Id,Customer_Phone__c,DeveloperName,Customer_Name__c,CUstomer_Email__c From connectedApp__mdt];
        System.debug('connectList '+connectList);
    }
    public static void getAllData(){
        Map<String,connectedApp__mdt> metadataList = connectedApp__mdt.getAll();
        System.debug('metadataList '+metadataList);
    }
    public static void getInstanceByRecordId(String recordId){
        connectedApp__mdt metadataList = connectedApp__mdt.getInstance(recordId);
        System.debug('metadataList '+metadataList);
    }
    public static void getInstanceByDeveloperName(String label){
        connectedApp__mdt metadataList = connectedApp__mdt.getInstance(label);
        System.debug('metadataList '+metadataList);
    }
}