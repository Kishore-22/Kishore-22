using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyBackend.Models
{
    public class Group
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; }

        [StringLength(255)]
        public string Description { get; set; }

        public List<GroupMember> Members { get; set; } = new List<GroupMember>();
        //public List<GroupMember> Members { get; set; } = new List<GroupMember>();
    }
}
