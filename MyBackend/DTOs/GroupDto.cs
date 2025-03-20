using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyBackend.DTOs
{
    public class GroupDto
    {
        [Required, StringLength(100)]
        public string Name { get; set; }

        [StringLength(255)]
        public string Description { get; set; }

        public List<int> MemberIds { get; set; } = new List<int>();
    }
}
