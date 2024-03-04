using capstone_backend.Models;
using capstone_backend.Repository.interfaces;
using System.Data.SqlClient;

namespace capstone_backend.Repository
{
    public class BugsRepo : IBugsRepo
    {
        private readonly string connectionString = "Data Source=APINP-ELPTF0UAL\\SQLEXPRESS;Initial Catalog=capstone_database;Persist Security Info=True;User ID=tap2023;Password=tap2023;Encrypt=False";

        public async Task<IEnumerable<Bugs>> GetAllBugsAsync()
        {
            var bugs = new List<Bugs>();
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("SELECT * FROM Bugs", connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var bug=new Bugs
                            {
                                BugId = reader.GetInt32(reader.GetOrdinal("BugId")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Description = reader.GetString(reader.GetOrdinal("Description")),
                                Severity = reader.GetString(reader.GetOrdinal("Severity")),
                                StepsToReproduce = reader.GetString(reader.GetOrdinal("StepsToReproduce")),
                                Status = reader.GetString(reader.GetOrdinal("Status")),
                                ExpectedResult = reader.GetString(reader.GetOrdinal("ExpectedResult")),
                                ActualResult = reader.GetString(reader.GetOrdinal("ActualResult")),
                                FilePath = reader.GetString(reader.GetOrdinal("FilePath")),
                                CreatedAt = reader.GetString(reader.GetOrdinal("CreatedAt")),
                                UpdatedAt = reader.GetString(reader.GetOrdinal("UpdatedAt")),
                                CompletedAt = reader.GetString(reader.GetOrdinal("CompletedAt")),
                                TesterName = reader.GetString(reader.GetOrdinal("TesterName")),
                                DeveloperName = reader.GetString(reader.GetOrdinal("DeveloperName"))
                            };
                            bugs.Add(bug);
                        }
                    }
                }
            }
            return bugs;
        }

        public async Task<Bugs> GetBugByIdAsync(int id)
        {
            Bugs bug = null;
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("SELECT * FROM Bugs WHERE BugId = @BugId", connection))
                {
                    command.Parameters.AddWithValue("@BugId", id);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            bug = new Bugs
                            {
                                BugId = reader.GetInt32(reader.GetOrdinal("BugId")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Description = reader.GetString(reader.GetOrdinal("Description")),
                                Severity = reader.GetString(reader.GetOrdinal("Severity")),
                                StepsToReproduce = reader.GetString(reader.GetOrdinal("StepsToReproduce")),
                                Status = reader.GetString(reader.GetOrdinal("Status")),
                                ExpectedResult = reader.GetString(reader.GetOrdinal("ExpectedResult")),
                                ActualResult = reader.GetString(reader.GetOrdinal("ActualResult")),
                                FilePath = reader.GetString(reader.GetOrdinal("FilePath")),
                                TesterName = reader.GetString(reader.GetOrdinal("TesterName")),
                                DeveloperName = reader.GetString(reader.GetOrdinal("DeveloperName")),
                                CreatedAt = reader.GetString(reader.GetOrdinal("CreatedAt")),
                                UpdatedAt = reader.GetString(reader.GetOrdinal("UpdatedAt")),
                                CompletedAt = reader.GetString(reader.GetOrdinal("CompletedAt"))
                            };
                        }
                    }
                }
            }
            return bug;
        }

        public async Task<Bugs> AddBugAsync(Bugs bugs)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("INSERT INTO Bugs (Title, Description, Severity, StepsToReproduce, Status, ExpectedResult, ActualResult, FilePath, TesterName, DeveloperName, CreatedAt, UpdatedAt, CompletedAt) VALUES (@Title, @Description, @Severity, @StepsToReproduce, @Status, @ExpectedResult, @ActualResult, @FilePath, @TesterName, @DeveloperName, @CreatedAt, @UpdatedAt, @CompletedAt); SELECT SCOPE_IDENTITY()", connection))
                {   
                    command.Parameters.AddWithValue("@Title", bugs.Title);
                    command.Parameters.AddWithValue("@Description", bugs.Description);
                    command.Parameters.AddWithValue("@Severity", bugs.Severity);
                    command.Parameters.AddWithValue("@StepsToReproduce", bugs.StepsToReproduce);
                    command.Parameters.AddWithValue("@Status", bugs.Status);
                    command.Parameters.AddWithValue("@ExpectedResult", bugs.ExpectedResult);
                    command.Parameters.AddWithValue("@ActualResult", bugs.ActualResult);
                    command.Parameters.AddWithValue("@FilePath", bugs.FilePath);
                    command.Parameters.AddWithValue("@TesterName", bugs.TesterName);
                    command.Parameters.AddWithValue("@DeveloperName", bugs.DeveloperName);
                    command.Parameters.AddWithValue("@CreatedAt", bugs.CreatedAt);
                    command.Parameters.AddWithValue("@UpdatedAt", bugs.UpdatedAt);
                    command.Parameters.AddWithValue("@CompletedAt", bugs.CompletedAt);

                    bugs.BugId = Convert.ToInt32(command.ExecuteNonQuery());
                }
            }
            return bugs;
        }

        public async Task<Bugs> UpdateBugAsync(Bugs bugs)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("UPDATE Bugs SET Title = @Title, Description = @Description, Severity = @Severity, StepsToReproduce = @StepsToReproduce, Status = @Status, ExpectedResult = @ExpectedResult, ActualResult = @ActualResult, FilePath = @FilePath, TesterName = @TesterName, DeveloperName = @DeveloperName, CreatedAt = @CreatedAt, UpdatedAt = @UpdatedAt, CompletedAt = @CompletedAt WHERE BugId = @BugId", connection))
                {
                    command.Parameters.AddWithValue("@BugId", bugs.BugId);
                    command.Parameters.AddWithValue("@Title", bugs.Title);
                    command.Parameters.AddWithValue("@Description", bugs.Description);
                    command.Parameters.AddWithValue("@Severity", bugs.Severity);
                    command.Parameters.AddWithValue("@StepsToReproduce", bugs.StepsToReproduce);
                    command.Parameters.AddWithValue("@Status", bugs.Status);
                    command.Parameters.AddWithValue("@ExpectedResult", bugs.ExpectedResult);
                    command.Parameters.AddWithValue("@ActualResult", bugs.ActualResult);
                    command.Parameters.AddWithValue("@FilePath", bugs.FilePath);
                    command.Parameters.AddWithValue("@TesterName", bugs.TesterName);
                    command.Parameters.AddWithValue("@DeveloperName", bugs.DeveloperName);
                    command.Parameters.AddWithValue("@CreatedAt", bugs.CreatedAt);
                    command.Parameters.AddWithValue("@UpdatedAt", bugs.UpdatedAt);
                    command.Parameters.AddWithValue("@CompletedAt", bugs.CompletedAt);

                    command.ExecuteNonQuery();
                }
            }
            return bugs;
        }

        public async Task DeleteBugAsync(int id)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("DELETE FROM Bugs WHERE BugId = @BugId", connection))
                {
                    command.Parameters.AddWithValue("@BugId", id);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }
    }
}
