using DAL.Entities;
using DAL;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace karkarAPI.Services
{
    public class UserService : IUserService
    {
        private readonly KarkarDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UserService(KarkarDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public async Task<User> CreateUserAsync(string username, string password, string email)
        {
            var user = new User { UserName = username, Email = email };
            user.Password = _passwordHasher.HashPassword(user, password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public Task<User> GetUserByUsernameAsync(string username)
        {
            return _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
        }
        public Task<User?> GetUserByIdAsync(int id)
        {
            return _context.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .SingleOrDefaultAsync(u => u.Id == id);
        }


        public Task<User?> GetUserByEmailAsync(string email)
        {
            return _context.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .SingleOrDefaultAsync(u => u.Email == email);
        }

        public Task<bool> CheckPasswordAsync(User user, string password)
        {
            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
            return Task.FromResult(result == PasswordVerificationResult.Success);
        }

        public async Task AddToRoleAsync(User user, string role)
        {
            var roleEntity = await _context.Roles.SingleOrDefaultAsync(r => r.Name == role);
            if (roleEntity != null)
            {
                user.UserRoles.Add(new UserRole { UserId = user.Id, RoleId = roleEntity.Id });
                await _context.SaveChangesAsync();
            }
        }

        public async Task RemoveFromRoleAsync(User user, string role)
        {
            var userRole = await _context.UserRoles
                .Include(ur => ur.Role)
                .SingleOrDefaultAsync(ur => ur.UserId == user.Id && ur.Role.Name == role);
            if (userRole != null)
            {
                _context.UserRoles.Remove(userRole);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> IsInRoleAsync(User user, string role)
        {
            var userRole = await _context.UserRoles
                .Include(ur => ur.Role)
                .SingleOrDefaultAsync(ur => ur.UserId == user.Id && ur.Role.Name == role);
            return userRole != null;
        }

        public async Task<IList<string>> GetRolesAsync(User user)
        {
            return await _context.UserRoles
                .Where(ur => ur.UserId == user.Id)
                .Select(ur => ur.Role.Name)
                .ToListAsync();
        }
    }

}
