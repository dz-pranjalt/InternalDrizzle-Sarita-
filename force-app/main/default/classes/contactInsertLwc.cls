public with sharing class contactInsertLwc {
    public contactInsertLwc() {

    }
@AuraEnabled
public static string insertContac(Contact con){
System.debug(' con '+con);
    try {
         insert con;
        

    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
return 'success';
}
}