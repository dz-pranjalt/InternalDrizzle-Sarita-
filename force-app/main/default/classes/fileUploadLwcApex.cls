public with sharing class fileUploadLwcApex {
    public fileUploadLwcApex() {

    }
    @AuraEnabled
    public static void saveFiles(Id contactId, List<String> fileIds) {
        List<ContentDocumentLink> linksToInsert = new List<ContentDocumentLink>();
        
        for (String fileId : fileIds) {
            if (!isFileLinked(contactId, fileId)) {
                System.debug('not duplicate');
                ContentDocumentLink cdl = new ContentDocumentLink();
                cdl.ContentDocumentId = fileId;
                cdl.LinkedEntityId = contactId;
                cdl.ShareType = 'V';
                cdl.Visibility = 'AllUsers';
                linksToInsert.add(cdl);
            }
            else {
                System.debug('duplicate');
            }
        }
        
        if (!linksToInsert.isEmpty()) {
            insert linksToInsert;
        }
    }
    @AuraEnabled
    public static void deleteFile(String fileId) {
        // Get the ContentDocumentLink associated with the file
        System.debug('fileId '+fileId);
        ContentDocumentLink cdl = [
            SELECT Id, ContentDocumentId
            FROM ContentDocumentLink
            WHERE ContentDocumentId = :fileId
        ];

        // Delete the ContentDocumentLink
        delete cdl;

        // Delete the ContentDocument (file) itself
        delete new ContentDocument(Id = fileId);
    }
    public static Boolean isFileLinked(Id contactId, String fileId) {
        Integer count = [SELECT COUNT() FROM ContentDocumentLink
                         WHERE LinkedEntityId = :contactId AND ContentDocumentId = :fileId];
        return count > 0;
    }
}