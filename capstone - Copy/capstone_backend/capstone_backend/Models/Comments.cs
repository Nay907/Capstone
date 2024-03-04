namespace capstone_backend.Models
{
    public class Comments
    {
        public int CommentId {  get; set; }
        public int BugId { get; set; }
        public int TesterId {  get; set; }
        public int DeveloperId {  get; set; }
        public string Comment { get; set; }
        public string CommentedAt {  get; set; }


    }
}
