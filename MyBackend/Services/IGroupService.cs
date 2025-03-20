using System.Collections.Generic;
using System.Threading.Tasks;
using MyBackend.DTOs;
using MyBackend.Models;

public interface IGroupService
{
    Task<Group> CreateGroupAsync(GroupDto groupDto);
    Task<List<Group>> GetAllGroupsAsync();
    Task<Group?> GetGroupByIdAsync(int id);
}
