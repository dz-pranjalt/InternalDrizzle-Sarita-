public with sharing class BatchApexRecipes implements Database.Batchable<SObject>, Database.Stateful{
    private List<Id> successes = new List<Id>();
    private List<Id> failures = new List<Id>();
    private final String queryString = 'SELECT Id, Name FROM Account';

    @testVisible
    private static String result = '';
    // This allows us to cause a DML failure in execute batch, enabling testing.
    @testVisible
    private Boolean throwError = false;
    public Database.QueryLocator start(Database.BatchableContext context) {
        return Database.getQueryLocator(queryString);
    }
    public void execute(Database.BatchableContext context,List<Account> scope) 
    {  
        for (Account acct : scope) {
            acct.Name += ' Edited by Batch class';
            if (this.throwError) {
                acct.Name = null;
            }
        }
        List<Database.SaveResult> saveResults = new List<Database.SaveResult>();
        saveResults = Database.update(scope, false);
        for (Database.SaveResult sr : saveResults) {
            if (sr.isSuccess()) {
                successes.add(sr.id);
            } else {
                failures.add(sr.id);
            }
        }
    }
    public void finish(Database.BatchableContext context) {
        BatchApexRecipes.result =
            'Successes: ' +
            successes.size() +
            ' Failures: ' +
            failures.size();
    }
}