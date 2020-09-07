using Microsoft.AspNetCore.Hosting;
using pwapi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace wealthy.Services
{
    public class EntryService : IEntryService
    {
        private IWebHostEnvironment _env;

        public EntryService(IWebHostEnvironment env)
        {
            _env = env;
        }

        private List<Entry> Entries
        {
            get
            {
                return new List<Entry>() {
                    new Entry { Id =1, Description = "mensal salary",
                        Category = EntryCategory.FixedIncome, 
                        Value = 20000 , Date = DateTime.UtcNow, Total = 20000, //Latitude = null, Longitude = null        
                    },
                    new Entry { Id = 2, Description = "mensal apartment rental income",
                        Category = EntryCategory.FixedIncome, 
                        Value = 1000 , Date = DateTime.UtcNow, Total = 21000,//Latitude = null, Longitude = null        
                    },
                    new Entry { Id = 3, Description = "free lance services", 
                        Category = EntryCategory.VariableIncome, 
                        Value = 5000 , Date = DateTime.UtcNow, Total = 26000,//Latitude = null, Longitude = null        
                    },
                    new Entry { Id = 4, Description = "mensal salary",
                        Category = EntryCategory.FixedIncome, 
                        Value = 20000 , Date = DateTime.UtcNow, Total = 46000,//Latitude = null, Longitude = null        
                    },
                    new Entry { Id = 5, Description = "mensal apartment rental income",
                        Category = EntryCategory.FixedIncome, 
                        Value = 1000 , Date = DateTime.UtcNow, Total = 47000,//Latitude = null, Longitude = null        
                    },
                    new Entry { Id = 6, Description = "free lance services",
                        Category = EntryCategory.VariableIncome, 
                        Value = 5000 , Date = DateTime.UtcNow, Total = 52000,//Latitude = null, Longitude = null        
                    },
                    new Entry { Id = 7, Description = "mensal salary",
                        Category = EntryCategory.FixedIncome, 
                        Value = 20000 , Date = DateTime.UtcNow, Total = 72000,//Latitude = null, Longitude = null        
                    },
                    new Entry { Id = 8, Description = "mensal apartment rental income",
                        Category = EntryCategory.FixedIncome, 
                        Value = 1000 , Date = DateTime.UtcNow, Total = 73000,//Latitude = null, Longitude = null        
                    },
                    new Entry { Id = 9, Description = "free lance services",
                        Category = EntryCategory.VariableIncome, 
                        Value = 5000 , Date = DateTime.UtcNow, Total = 78000,//Latitude = null, Longitude = null        
                    }
                };
            }
        }


        public string GetEntryText(String link)
        {
            var entry = Entries.FirstOrDefault(_ => _.Link == link);
            return File.ReadAllText($"{_env.WebRootPath}/Entries/{entry.Id}_entry.md");
        }

//     public string GetEntryText(string link)
//     {
//          var entry = Entries.FirstOrDefault(_ => _.Link == link);
//          return File.ReadAllText($"{_env.WebRootPath}/Entries/{entry.Id}_post.md");
//     }        

        public List<Entry> GetLatestEntries()
        {            
            return Entries.OrderByDescending(_ => _.Id).Take(3).ToList();
        }

        public List<Entry> GetOlderEntries(int oldestEntryId)
        {
            var entries = Entries.Where(_ => _.Id < oldestEntryId).OrderByDescending(_ => _.Id).ToList();

            if (entries.Count < 3)
                return entries;

            return entries.Take(3).ToList();
        }

        public Entry GetEntry(int Id)
        {
                return Entries.FindLast(_ => _.Id == Id);
        }

    }
}
