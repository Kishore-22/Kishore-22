using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackend.Models;
using MyBackend.DTOs;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class GroupsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public GroupsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Get all groups
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups()
    {
        var groups = await _context.Groups
            .Include(g => g.GroupMembers)
            .ThenInclude(gm => gm.User)
            .ToListAsync();

        if (groups.Count == 0)
        {
            return NotFound("No groups found.");
        }

        var groupDtos = groups.Select(g => new GroupDto
        {
            Id = g.Id,
            Name = g.Name,
            Description = g.Description,
            Members = g.GroupMembers.Select(gm => gm.UserId).ToList()
        });

        return Ok(groupDtos);
    }

    // Get group by ID
    [HttpGet("{id}")]
    public async Task<ActionResult<GroupDto>> GetGroup(int id)
    {
        var group = await _context.Groups
            .Include(g => g.GroupMembers)
            .ThenInclude(gm => gm.User)
            .FirstOrDefaultAsync(g => g.Id == id);

        if (group == null)
        {
            return NotFound("Group not found.");
        }

        var groupDto = new GroupDto
        {
            Id = group.Id,
            Name = group.Name,
            Description = group.Description,
            Members = group.GroupMembers.Select(gm => gm.UserId).ToList()
        };

        return Ok(groupDto);
    }

    // Create new group
    [HttpPost]
    public async Task<IActionResult> CreateGroup([FromBody] GroupDto request)
    {
        if (request == null || string.IsNullOrEmpty(request.Name))
        {
            return BadRequest("Group name is required.");
        }

        var group = new Group
        {
            Name = request.Name,
            Description = request.Description
        };

        _context.Groups.Add(group);
        await _context.SaveChangesAsync();

        var groupMembers = request.Members.Select(memberId => new GroupMember
        {
            GroupId = group.Id,
            UserId = memberId
        }).ToList();

        _context.GroupMembers.AddRange(groupMembers);
        await _context.SaveChangesAsync();

        var savedGroup = await _context.Groups
            .Include(g => g.GroupMembers)
            .ThenInclude(gm => gm.User)
            .FirstOrDefaultAsync(g => g.Id == group.Id);

        return CreatedAtAction(nameof(GetGroup), new { id = group.Id }, savedGroup);
    }
}
