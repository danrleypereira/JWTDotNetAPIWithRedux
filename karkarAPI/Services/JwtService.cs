using DTOs.User;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DAL.Entities;


namespace karkarAPI.Services
{
    public class JwtService
    {
        private const int EXPIRATION_MINUTES = 1;

        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public JwtService(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        public async Task<AuthenticationResponse> CreateToken(User user)
        {
            var expiration = DateTime.UtcNow.AddMinutes(EXPIRATION_MINUTES);
            var claims = await CreateClaims(user);
            var signingCredentials = CreateSigningCredentials();
            var token = CreateJwtToken(
                claims,
                signingCredentials,
                expiration
            );

            var tokenHandler = new JwtSecurityTokenHandler();

            return new AuthenticationResponse
            {
                Token = tokenHandler.WriteToken(token),
                Expiration = expiration,
                Roles = claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToArray()
            };
        }

        private JwtSecurityToken CreateJwtToken(Claim[] claims, SigningCredentials credentials, DateTime expiration) =>
            new JwtSecurityToken(
                _configuration["JwtSettings:Issuer"],
                _configuration["JwtSettings:Audience"],
                claims,
                expires: expiration,
                signingCredentials: credentials
            );

        private async Task<Claim[]> CreateClaims(User user)
        {
            var userClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
            };

            // Add the roles to the claims
            var userRoles = await _userService.GetRolesAsync(user);
            userClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

            return userClaims.ToArray();
        }


        private SigningCredentials CreateSigningCredentials() =>
            new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"])
                ),
                SecurityAlgorithms.HmacSha256
            );
    }
}
