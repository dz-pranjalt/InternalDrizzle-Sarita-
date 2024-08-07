public class sfdcJson {
	public class Blogs {
		public String id;
		public String title;
		public String url;
	}
    public String author;
		public List<Blogs> blogs;

	
	public static SfdcJson parse(String json) {
		return (SfdcJson) System.JSON.deserialize(json, SfdcJson.class);
	}
}