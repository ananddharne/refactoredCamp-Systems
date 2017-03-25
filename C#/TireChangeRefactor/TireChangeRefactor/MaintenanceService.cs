using System;
using System.Collections.Generic;
using System.Linq;
using TireChangeRefactor.Model;

namespace TireChangeRefactor
{
    /// <summary>
    /// Service responsible for determining the maintenance that is required
    /// for aircrafts
    /// </summary>
    public class MaintenanceService
    {
        /// <summary>
        /// Gets all the aircraft that are due for a tire change.
        /// </summary>
        /// <returns>An array of aircraft that require tire changes according to mfg specifications</returns>
        public AircraftModel[] GetAllAircraftDueForTireChange()
        {
            // There are 3 aircraft manufactures, each with different requirements 
            //  for when the tires need to be changed
            //      FooPlane: 120 landings
            //      BarPlane: 75 landings
            //      BazPlane: 200 landings

            var repo = new DAL.AircraftRepository();
            var allAircraft = repo.GetAll().ToArray();
            var requiresTireChange = new List<AircraftModel>();
            for (var i = 0; i < allAircraft.Count(); i ++)
            {
                var landings = new List<DateTime>();
                for (var j = 0; j < allAircraft[i].Landings.Count(); j++)
                {
                    if (allAircraft[i].Landings[j] >= allAircraft[i].LastTireChange)
                        landings.Add(allAircraft[i].Landings[j]);
                }

                if (allAircraft[i].Manufacturer == "FooPlane" && landings.Count() >= 120)
                    requiresTireChange.Add(allAircraft[i]);
                else if (allAircraft[i].Manufacturer == "BarPlane" && landings.Count() >= 75)
                    requiresTireChange.Add(allAircraft[i]);
                else if (allAircraft[i].Manufacturer == "BazPlane" && landings.Count() >= 200)
                    requiresTireChange.Add(allAircraft[i]);
            }

            return requiresTireChange.ToArray();
        }
    }
}
