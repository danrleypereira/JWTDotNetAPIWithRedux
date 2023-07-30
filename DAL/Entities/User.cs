using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace DAL.Entities
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }

        public List<UserRole> UserRoles { get; set; }
    }
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<UserRole> UserRoles { get; set; }
    }
    public class UserRole
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int RoleId { get; set; }
        public Role Role { get; set; }
    }


}
