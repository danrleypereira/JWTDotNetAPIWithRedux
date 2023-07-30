using DAL.Entities;
using DTOs.Veiculo;
using karkarAPI.Services;
using Microsoft.AspNetCore.Mvc;
using DTOs.User;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace karkarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<VeiculosController> _logger;
        private readonly JwtService _jwtService;
        private readonly IUserService _userService;

        public UsersController(
            IUserService userService,
            JwtService jwtService,
            ILogger<VeiculosController> logger
        )
        {
            _userService = userService;
            _jwtService = jwtService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UsuarioRegistroRequest user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _userService.GetUserByUsernameAsync(user.Nome);

            if (existingUser != null)
            {
                _logger.LogWarning("Username {Username} is already taken.", user.Nome);
                return BadRequest("Username already taken.");
            }

            existingUser = await _userService.GetUserByEmailAsync(user.Email);

            if (existingUser != null)
            {
                _logger.LogWarning("Email {Email} is already in use.", user.Email);
                return BadRequest("Email already in use.");
            }

            var createdUser = await _userService.CreateUserAsync(user.Nome, user.Senha, user.Email);

            if (createdUser == null)
            {
                _logger.LogError("An error occurred while creating the user {Username}.", user.Nome);
                return StatusCode(500, "An error occurred while creating the user.");
            }
            _logger.LogInformation("User {Username} created a new account with id {UserId}.", createdUser.UserName, createdUser.Id);
            createdUser.Password = null;
            return Created("", createdUser);
        }

        [HttpPost("BearerToken")]
        public async Task<ActionResult<AuthenticationResponse?>> CreateBearerToken(UsuarioLoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid request data.");
                return BadRequest("Invalid request data");
            }

            var user = await _userService.GetUserByEmailAsync(request.Email);

            if (user == null || !(await _userService.CheckPasswordAsync(user, request.Senha)))
            {
                return BadRequest("Invalid username or password.");
            }

            var token = await _jwtService.CreateToken(user);

            return Ok(token);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("{userId}/roles/{roleName}")]
        public async Task<ActionResult> AddRoleToUser(int userId, string roleName)
        {
            var user = await _userService.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            await _userService.AddToRoleAsync(user, roleName);
            _logger.LogWarning("User {Username} added to role {RoleName}.", user.UserName, roleName);

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{userId}/roles/{roleName}")]
        public async Task<ActionResult> RemoveRoleFromUser(int userId, string roleName)
        {
            var user = await _userService.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            await _userService.RemoveFromRoleAsync(user, roleName);

            return Ok();
        }

    }
}
