using Microsoft.EntityFrameworkCore;
using MyBackend.DTOs;
using MyBackend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class GroupService : IGroupService
{
    private readonly ApplicationDbContext _context;

    public GroupService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Group> CreateGroupAsync(GroupDto groupDto)
    {
        var group = new Group
        {
            Name = groupDto.Name,
            Description = groupDto.Description,
            Members = groupDto.MemberIds.Select(id => new GroupMember { UserId = id }).ToList()
        };

        _context.Groups.Add(group);
        await _context.SaveChangesAsync();
        return group;
    }

    public async Task<List<Group>> GetAllGroupsAsync()
    {
        return await _context.Groups
            .Include(g => g.Members)
            .ThenInclude(gm => gm.User) // Ensure users are included correctly
            .ToListAsync();
    }

    public async Task<Group?> GetGroupByIdAsync(int id)
    {
        return await _context.Groups
            .Include(g => g.Members)
            .ThenInclude(gm => gm.User) // Ensure users are included correctly
            .FirstOrDefaultAsync(g => g.Id == id);
    }
}