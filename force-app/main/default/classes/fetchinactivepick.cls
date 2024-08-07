public class fetchinactivepick {
    public static List<Schema.PicklistEntry> getpickValues(Schema.sObjectField field){
        List<Schema.PicklistEntry> entries = field.getDescribe().getPickListValues();
        List<Schema.PicklistEntry> activeEntri =  new List<Schema.PicklistEntry>();
        For(Schema.PicklistEntry forEnt : entries){
            System.debug(' for '+forEnt.getValue());
            if(forEnt.isActive()){
                system.debug('In if 8 '+forEnt);
                activeEntri.add(forEnt);
            }
            if(!forEnt.isActive()){
                system.debug('In if '+forEnt);
            }
        }
        return activeEntri;
    }
}