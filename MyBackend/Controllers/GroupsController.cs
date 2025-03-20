using Microsoft.AspNetCore.Mvc;
using MyBackend.Models;
using MyBackend.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyBackend.Controllers
{
    [Route("api/groups")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GroupController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroup([FromBody] GroupDto groupDto)
        {
            if (!ModelState.IsValid || groupDto.MemberIds == null || !groupDto.MemberIds.Any())

            {
                return BadRequest(new { message = "Invalid data. MemberIds cannot be empty." });
            }

            // Ensure all provided MemberIds exist in the database
            var validMembers = await _context.Users
                .Where(u => groupDto.MemberIds.Contains(u.Id))
                .Select(u => u.Id) // Get only valid UserIds
                .ToListAsync();

            if (!validMembers.Any())
            {
                return BadRequest(new { message = "No valid members found." });
            }

            var group = new Group
            {
                Name = groupDto.Name,
                Description = groupDto.Description,
                Members = validMembers.Select(id => new GroupMember { UserId = id }).ToList()
            };

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGroupById), new { id = group.Id }, group);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroupById(int id)
        {
            var group = await _context.Groups
                .Include(g => g.Members)
                .ThenInclude(gm => gm.User) // Ensure users are included correctly
                .FirstOrDefaultAsync(g => g.Id == id);

            if (group == null)
            {
                return NotFound(new { message = "Group not found." });
            }

            return Ok(group);
        }

        [HttpGet]
        public async Task<IActionResult> GetGroups()
        {
            var groups = await _context.Groups
                .Include(g => g.Members)
                .ThenInclude(gm => gm.User)  // Ensure Users are included
                .ToListAsync();

            if (!groups.Any())
            {
                return NotFound(new { message = "No groups found." });
            }

            return Ok(groups);
        }
    }
}