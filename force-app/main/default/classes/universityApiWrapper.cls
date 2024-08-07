public class universityApiWrapper {
	public List<String> web_pages {get;set;} 
	public Object state_province {get;set;} // in json: state-province
	public String alpha_two_code {get;set;} 
	public String name {get;set;} 
	public String country {get;set;} 
	public List<String> domains {get;set;} 

	public universityApiWrapper(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'web_pages') {
						web_pages = arrayOfString(parser);
                        system.debug('web_pages '+web_pages);
					} else if (text == 'state-province') {
						state_province = parser.readValueAs(Object.class);
                        system.debug('state_province '+state_province);
					} else if (text == 'alpha_two_code') {
						alpha_two_code = parser.getText();
                        system.debug('alpha_two_code '+alpha_two_code);
					} else if (text == 'name') {
						name = parser.getText();
                        system.debug('name '+name);
					} else if (text == 'country') {
						country = parser.getText();
                        system.debug('country '+country);
					} else if (text == 'domains') {
						domains = arrayOfString(parser);
                        system.debug('domains '+domains);
					} else {
						System.debug(LoggingLevel.WARN, 'JSON2Apex consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	
	public static List<universityApiWrapper> parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return arrayOfJSON2Apex(parser);
	}
	
	public static void consumeObject(System.JSONParser parser) {
		Integer depth = 0;
		do {
			System.JSONToken curr = parser.getCurrentToken();
			if (curr == System.JSONToken.START_OBJECT || 
				curr == System.JSONToken.START_ARRAY) {
				depth++;
			} else if (curr == System.JSONToken.END_OBJECT ||
				curr == System.JSONToken.END_ARRAY) {
				depth--;
			}
		} while (depth > 0 && parser.nextToken() != null);
	}
	


    private static List<String> arrayOfString(System.JSONParser p) {
        List<String> res = new List<String>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(p.getText());
        }
        return res;
    }

    private static List<universityApiWrapper> arrayOfJSON2Apex(System.JSONParser p) {
        List<universityApiWrapper> res = new List<universityApiWrapper>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new universityApiWrapper(p));
        }
        return res;
    }
}