using System.Collections.Generic;
using pwapi.Models;

namespace wealthy.Services
{
    public interface IEntryService
    {
        List<Entry> GetLatestEntries();
        Entry GetEntry(int Id);

        string GetEntryText(string link);

        List<Entry> GetOlderEntries(int oldestEntryId);
    }
}