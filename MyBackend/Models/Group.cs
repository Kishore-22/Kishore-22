using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace MyBackend.Models
{
    public class Group
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; }

        [StringLength(255)]
        public string Description { get; set; }

        // Define many-to-many relationship
        public List<GroupMember> GroupMembers { get; set; } = new List<GroupMember>();
    }

    public class GroupMember
    {
        public int GroupId { get; set; }
        public Group Group { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
