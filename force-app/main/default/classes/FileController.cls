public with sharing class FileController {
    public FileController() {

    }
    @AuraEnabled(cacheable=true)
    public static Map<ID, String> getRelatedFilesByRecordId(String recordId) {      
        List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
        List<ID> fileIDs = new List<ID>();
        for (ContentDocumentLink docLink : files) {
            fileIDs.add(docLink.ContentDocumentId);
        }
        List<ContentVersion> docs = [SELECT ContentDocumentId, FileExtension, Title FROM ContentVersion WHERE ContentDocumentId IN : fileIDs];
        Map<ID, String> mapIdTitle = new Map<ID, String>();
        for (ContentVersion docLink : docs) {
            mapIdTitle.put(docLink.ContentDocumentId, docLink.Title);
        }
        return mapIdTitle;
    }
    @AuraEnabled(cacheable=true)
    public static List<ContentVersion> getVersionFiles(String recordId){
        try {
            return [
		SELECT
		Id,Title,ContentDocumentId,FileType, ContentSize,FileExtension,VersionNumber,CreatedDate,VersionData,FirstPublishLocationId
		FROM ContentVersion WHERE FirstPublishLocationId =:recordId ORDER BY CreatedDate DESC];
        
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}