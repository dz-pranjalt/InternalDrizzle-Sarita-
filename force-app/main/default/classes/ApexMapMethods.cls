public class ApexMapMethods {
    //put
    //containsKey
    //get
    //isEmpty
    //size
    //keySet
    //values
    //It will containt data into key and value pair,key will e unique,value can be duplicate
    
    
    //Syntax of Map Creation
    //Map<dataType,dataType> variableName = new Map<dataType,dataType>();
    public static void mapPut(){
        
        Map<String,String> mapStr = new Map<String,String>();
        mapStr.put('A','10');
        mapStr.put('A','50');
        mapStr.put('C','20');
        mapStr.put('C','40');
        mapStr.put('E','30');
        System.debug('mapStr '+mapStr);
    }
    public static void mapContainsKey(){
        Map<String,String> mapStr = new Map<String,String>();
        mapStr.put('A','10'); //A=Key, 10=Value
        mapStr.put('C','20');
        mapStr.put('E','30');
        Boolean isPre = mapStr.containsKey('a');
        System.debug('isPre '+isPre);
        System.debug('mapStr '+mapStr.containsKey('A'));
    }
    public static void mapGetMethod(){
        Map<String,String> mapStr = new Map<String,String>();
        mapStr.put('A','10'); 
        mapStr.put('C','20');
        mapStr.put('E','30');
        String isPre = mapStr.get('A'); // Will return value of key as '10'
        System.debug('isPre '+isPre);
    }
    public static void mapSizeMethod(){
        Map<String,String> mapStr = new Map<String,String>();
        mapStr.put('A','10'); 
        mapStr.put('C','20');
        mapStr.put('E','30');
        System.debug('isPre '+mapStr.size());
    }
    public static void mapKeySetMethod(){
        Map<String,String> mapStr = new Map<String,String>();
        mapStr.put('A','10'); 
        mapStr.put('C','20');
        mapStr.put('E','30');
        System.debug('mapStr 53 '+mapStr.keySet()); //will return key of map
    }
    public static void mapValuesMethod(){
        Map<String,String> mapStr = new Map<String,String>();
        mapStr.put('A','10'); 
        mapStr.put('C','20');
        mapStr.put('E','30');
        System.debug('mapStr 60 '+mapStr.values());//will return values of map
    }
    
}