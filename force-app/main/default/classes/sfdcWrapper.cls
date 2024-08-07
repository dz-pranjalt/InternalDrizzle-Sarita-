public class sfdcWrapper {
	public String author;
	public List<Blogs> blogs;

	public class Blogs {
		public String id;
		public String title;
		public String url;
	}

	
	public static sfdcWrapper parse(String json) {
		return (sfdcWrapper) System.JSON.deserialize(json, sfdcWrapper.class);
	}

}