Public class ConvertLeads
{
   
    public static void LeadAssign(Set<Id> LeadIds)
    {
       LeadStatus CLeadStatus= [SELECT Id, MasterLabel FROM LeadStatus 
       WHERE  IsConverted=true Limit 1];
      system.debug('CLeadStatus'+ CLeadStatus);
        List<Database.LeadConvert> MassLeadconvert = new List<Database.LeadConvert>();
        for(id currentlead : LeadIds){
                Database.LeadConvert Leadconvert = new Database.LeadConvert();
                Leadconvert.setLeadId ( currentlead );                
                Leadconvert.setConvertedStatus(CLeadStatus.MasterLabel);
                //Leadconvert.setDoNotCreateOpportunity(TRUE);  
                MassLeadconvert.add(Leadconvert);
        }
        
        if (!MassLeadconvert.isEmpty()) {
            system.debug('MassLeadconvert'+ MassLeadconvert);
            List<Database.LeadConvertResult> lcr = Database.convertLead(MassLeadconvert);
        }
    }}