global class batchToupdateCampain implements Database.Batchable<sObject>{
    global batchToupdateCampain(){
        
    }
    global Database.QueryLocator start(Database.BatchableContext bc){
        String query ='SELECT Name,Status FROM Campaign';
        return Database.getQueryLocator(query);
    }
    global void execute(Database.BatchableContext bc,List<Campaign> sObj){
        List<Campaign> campUpdate = new List<Campaign>();
        for(Campaign camp : sObj){
            if(camp.Status !='Planned'){
                camp.Status ='Planned';
                campUpdate.add(camp);
            }
        }
        if(campUpdate.size()>0){
            update campUpdate;
        }
        /*
		Database.saveResult[] sr = Database.update(campUpdate,false);
     		for(Database.Saveresult srFor : sr){
				if(srFor.isSuccess()){
						Store Success Id in Set
					}
				else{
						for(Database.Error err : srFor.getErrors()){

					}
						failedId.add(srFor.getId);
					}
    					 }

		*/
    }
    global void finish(Database.BatchableContext bc){
        System.debug('Finish...');
    }
}