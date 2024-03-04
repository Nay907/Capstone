﻿using capstone_backend.Models;
using capstone_backend.Repository.interfaces;
using capstone_backend.Services.Interfaces;

namespace capstone_backend.Services
{
    public class BugServiceImpl : IBugService
    {
        private readonly IBugsRepo _bugsRepo;
        public BugServiceImpl(IBugsRepo bugsRepository)
        {
            _bugsRepo = bugsRepository;
        }

        public async Task<IEnumerable<Bugs>> GetAllBugsAsync()
        {
            return await _bugsRepo.GetAllBugsAsync();
        }

        public async Task<Bugs> GetBugByIdAsync(int id)
        {
            return await _bugsRepo.GetBugByIdAsync(id);
        }

        public async Task<Bugs> AddBugAsync(Bugs bugs)
        {
            return await _bugsRepo.AddBugAsync(bugs);
        }

        public async Task<Bugs> UpdateBugAsync(Bugs bugs)
        {
            return await _bugsRepo.UpdateBugAsync(bugs);
        }

        public async Task DeleteBugAsync(int id)
        {
            await _bugsRepo.DeleteBugAsync(id);
        }
    }
}
