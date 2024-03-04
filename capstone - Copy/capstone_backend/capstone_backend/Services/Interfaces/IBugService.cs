using capstone_backend.Models;

namespace capstone_backend.Services.Interfaces
{
    public interface IBugService
    {
        /*List<Bugs> GetBugs();
        Bugs GetBugsById(int BugsId);
        Bugs CreateBugs(int BugsId);*/
        Task<IEnumerable<Bugs>> GetAllBugsAsync();
        Task<Bugs> GetBugByIdAsync(int id);
        Task<Bugs> AddBugAsync(Bugs bugs);
        Task<Bugs> UpdateBugAsync(Bugs bugs);
        Task DeleteBugAsync(int id);
    }
}
