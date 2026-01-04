using HIMS.Models;
using Microsoft.EntityFrameworkCore;
namespace HIMS.Repository
{
    public class PatientRepository : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Patinet>().ToTable("tblPatient");
            modelBuilder.Entity<Address>().ToTable("tblAddress");
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Data Source=VIKRAMPC\SQLEXPRESS;Initial Catalog=HIMSDB;Integrated Security=True;TrustServerCertificate=True"
            );

        }

        public DbSet<Patinet> patients { get; set;}
    }
}
