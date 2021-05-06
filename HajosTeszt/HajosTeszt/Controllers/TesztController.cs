using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
   // [Route("api/[controller]")]
    [ApiController]
    public class TesztController : ControllerBase
    {
        [HttpGet]
        [HttpGet]
        [Route("questions/count")]
        public int M4() //Tetszőleges metódusnév
        {
            HajostesztContext context = new HajostesztContext();
            int kérdésekSzáma = context.Questions.Count();
            return kérdésekSzáma;
        }

        [HttpGet]
        [Route("questions/{sorszám}")]
        public ActionResult M2(int sorszám)
        {
            HajosTesztContext context = new HajosTesztContext();
            var kérdés = (from x in context.Questions
                          where x.QuestionId == sorszám
                          select x).FirstOrDefault();

            if (kérdés == null) return BadRequest("Nincs ilyen kérdés");

            return new JsonResult(kérdés);
        }
    }
    
}
