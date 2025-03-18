using System.Collections.Generic;

namespace MyBackend.DTOs
{
    public class GroupDto
    {
        public int Id { get; set; }  // Ensure this property is present
        public string Name { get; set; }
        public string Description { get; set; }
        public List<int> Members { get; set; } = new List<int>();
    }
}
