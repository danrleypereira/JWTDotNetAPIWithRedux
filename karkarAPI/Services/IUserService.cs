using DAL.Entities;

namespace karkarAPI.Services
{
    public interface IUserService
    {
        Task<User> CreateUserAsync(string username, string password, string email);
        Task<User> GetUserByUsernameAsync(string username);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(int id);
        Task<bool> CheckPasswordAsync(User user, string password);
        Task AddToRoleAsync(User user, string role);
        Task RemoveFromRoleAsync(User user, string role);
        Task<bool> IsInRoleAsync(User user, string role);
        Task<IList<string>> GetRolesAsync(User user);
        // add other operations as necessary
    }
}
