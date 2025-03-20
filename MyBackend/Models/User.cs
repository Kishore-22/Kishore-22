using System.Collections.Generic; //
using System.ComponentModel.DataAnnotations;

namespace MyBackend.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        //public List<Group> Groups { get; set; } = new List<Group>();
        public List<GroupMember> Groups { get; set; } = new List<GroupMember>();
    }
}
