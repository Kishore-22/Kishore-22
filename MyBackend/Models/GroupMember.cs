using System.ComponentModel.DataAnnotations.Schema;

namespace MyBackend.Models
{
    public class GroupMember
    {
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Group")]
        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}
