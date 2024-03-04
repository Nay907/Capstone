using capstone_backend.Models;
using capstone_backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace capstone_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BugsController : ControllerBase
    {
        private readonly IBugService _bugService;
        public BugsController(IBugService bugService)
        {
            _bugService = bugService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bugs>>> GetAllBugs()
        {
            var bugs = await _bugService.GetAllBugsAsync();
            return Ok(bugs);
        }

        // GET: api/Bugs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bugs>> GetBugById(int id)
        {
            var bug = await _bugService.GetBugByIdAsync(id);
            if (bug == null)
            {
                return NotFound();
            }
            return Ok(bug);
        }

        // POST: api/Bugs
        [HttpPost]
        public async Task<ActionResult<Bugs>> PostBug([FromBody] Bugs bug)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdBug = await _bugService.AddBugAsync(bug);
            return CreatedAtAction(nameof(GetBugById), new { id = createdBug.BugId }, createdBug);
        }

        // PUT: api/Bugs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBug(int id, [FromBody] Bugs bug)
        {
            if (id != bug.BugId)
            {
                return BadRequest();
            }

            await _bugService.UpdateBugAsync(bug);

            return NoContent();
        }

        // DELETE: api/Bugs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBug(int id)
        {
            await _bugService.DeleteBugAsync(id);
            return NoContent();
        }

    }
}
