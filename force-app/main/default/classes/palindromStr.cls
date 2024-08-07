public class palindromStr {
    public static boolean palindromString(String str){
        String reverseString='';
        System.debug('str '+str);
        reverseString =str.reverse();
        System.debug('reverseString '+reverseString);
        /*List<String> strList = str.split('');
        for(Integer i=strList.size()-1;i>=0;i--){
            reverseString = reverseString+strList[i];
             System.debug('reverseString '+reverseString);
        }
        if(str.equalsIgnoreCase(reverseString))return true;
        else{
            return false;
        }*/
        if(reverseString == str)return true;
        else{
            return false;
        }
    }
}