using Microsoft.AspNetCore.Mvc;
using HIMS.Models;
using HIMS.Repository;
using Microsoft.EntityFrameworkCore;

namespace HIMS.Controllers
{
    [ApiController]
    [Route("Patient")]
    public class PatientController : ControllerBase
    {
        // store the patient data 
        [HttpPost("Add")]
        public IActionResult Add([FromBody]List<Patinet> pats)
        {
            if(pats != null && pats.Count != 0)
            {
                foreach (var pat in pats)
                {
                    PatientRepository p = new PatientRepository();
                    p.Add(pat);
                    p.SaveChanges();
                }
            
                return Ok(pats);


            }
            return BadRequest("No Data Provides!!");

        }
        // get the stored patient data from DB
        [HttpGet("Load")]
        public IActionResult Load()
        {
            using var db = new PatientRepository();
            var data = db.patients
                         .Include(x => x.Addresses)
                         .ToList();
            return Ok(data);
        }

        // update existing Patient
        [HttpPut("Update")]
        public IActionResult Update([FromBody] Patinet pat)
        {
            if (pat == null)
                return BadRequest();

            using var db = new PatientRepository();

            var existing = db.patients
                             .Include(x => x.Addresses)
                             .FirstOrDefault(x => x.Id == pat.Id);

            if (existing == null)
                return NotFound();

            // update main fields
            existing.name = pat.name;
            existing.code = pat.code;
            existing.amount = pat.amount;

            // replace addresses
            db.RemoveRange(existing.Addresses);
            existing.Addresses = pat.Addresses;

            db.SaveChanges();
            return Ok(existing);
        }
    }
}