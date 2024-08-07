public class addProductApex {
@AuraEnabled
public static void saveInputData(List<DynamicNameInputWrapper> inputDataList) {
    List<Contact> recordsToInsert = new List<Contact>();
        List<ContentVersion> contentVersionsToInsert = new List<ContentVersion>();

    for (DynamicNameInputWrapper input : inputDataList) {
        Contact record = new Contact();
            record.FirstName = input.firstName;
            record.LastName = input.lastName;
            record.Email = input.email;
            recordsToInsert.add(record);
       

    }
    if (!recordsToInsert.isEmpty()) {
        //insert recordsToInsert;
    }
    //     if (input.file != null) {
    //         ContentVersion contentVersion = new ContentVersion(
    //             Title = 'File for ' + record.Id,
    //             PathOnClient = input.file,
    //             VersionData = Blob.valueOf(input.file),
    //             FirstPublishLocationId = record.Id
    //         );
    //         contentVersionsToInsert.add(contentVersion);
    //     }
    // if (!recordsToInsert.isEmpty()) {
    //     insert recordsToInsert;
    // }

    // if (!contentVersionsToInsert.isEmpty()) {
    //     insert contentVersionsToInsert;
    // }
    
}

public class DynamicNameInputWrapper {
    @AuraEnabled public String firstName { get; set; }
    @AuraEnabled public String lastName { get; set; }
    @AuraEnabled public String email { get; set; }
    @AuraEnabled public String file { get; set; }
}
}