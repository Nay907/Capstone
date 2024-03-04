using capstone_backend.Models;

namespace capstone_backend.Repository.interfaces
{
    public interface IBugsRepo
    {
        /*IEnumerable<Bugs> GetAllBugs();
        Bugs GetBugById(Bugs bug);
        Bugs CreateBug(Bugs bug);*/
        Task<IEnumerable<Bugs>> GetAllBugsAsync();
        Task<Bugs> GetBugByIdAsync(int id);
        Task<Bugs> AddBugAsync(Bugs bugs);
        Task<Bugs> UpdateBugAsync(Bugs bugs);
        Task DeleteBugAsync(int id);
    }
}
