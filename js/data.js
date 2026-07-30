/* =========================================================================
   data.js — mock "database" shared by every module.
   UC1 (Search Trains) and UC2 (Check Seat Availability) read TRAINS.
   Seat counts are intentionally mixed so some classes show Available
   and some show Waitlisted.
========================================================================= */

export const TRAINS = [
  { number:"12658", name:"Chennai Bengaluru Mail", source:"Chennai Central", destination:"KSR Bengaluru", depart:"22:20", arrive:"05:15", duration:"6h 55m",
    fare:{SL:420, "3A":1080, "2A":1560, "1A":2650}, classes:{SL:{total:72,booked:41}, "3A":{total:64,booked:64}, "2A":{total:40,booked:22}, "1A":{total:18,booked:16}} },
  { number:"16021", name:"Kaveri Express", source:"Katpadi Junction", destination:"KSR Bengaluru", depart:"12:35", arrive:"18:40", duration:"6h 05m",
    fare:{SL:280, "3A":740, "2A":1120, "1A":1900}, classes:{SL:{total:72,booked:30}, "3A":{total:64,booked:50}, "2A":{total:40,booked:12}, "1A":{total:18,booked:2}} },
  { number:"12649", name:"Karnataka Sampark Kranti", source:"Katpadi Junction", destination:"Hazrat Nizamuddin", depart:"20:10", arrive:"20:55 (+1d)", duration:"24h 45m",
    fare:{SL:780, "3A":2050, "2A":2980, "1A":4950}, classes:{SL:{total:72,booked:72}, "3A":{total:64,booked:60}, "2A":{total:40,booked:39}, "1A":{total:18,booked:5}} },
  { number:"12163", name:"Chennai Coimbatore Express", source:"Chennai Egmore", destination:"Coimbatore", depart:"21:40", arrive:"06:50 (+1d)", duration:"9h 10m",
    fare:{SL:320, "3A":840, "2A":1210, "1A":2050}, classes:{SL:{total:72,booked:55}, "3A":{total:64,booked:20}, "2A":{total:40,booked:8}, "1A":{total:18,booked:1}} },
  { number:"16724", name:"Trivandrum Mail", source:"Chennai Egmore", destination:"Thiruvananthapuram", depart:"17:50", arrive:"08:10 (+1d)", duration:"14h 20m",
    fare:{SL:460, "3A":1220, "2A":1780, "1A":3000}, classes:{SL:{total:72,booked:72}, "3A":{total:64,booked:64}, "2A":{total:40,booked:31}, "1A":{total:18,booked:9}} },
  { number:"12615", name:"Grand Trunk Express", source:"Chennai Central", destination:"Hazrat Nizamuddin", depart:"19:15", arrive:"05:40 (+2d)", duration:"34h 25m",
    fare:{SL:830, "3A":2180, "2A":3150, "1A":5300}, classes:{SL:{total:72,booked:66}, "3A":{total:64,booked:64}, "2A":{total:40,booked:18}, "1A":{total:18,booked:4}} },
  { number:"11077", name:"Mumbai Mail", source:"Mumbai CST", destination:"Chennai Central", depart:"23:00", arrive:"05:25 (+2d)", duration:"30h 25m",
    fare:{SL:770, "3A":2020, "2A":2930, "1A":4900}, classes:{SL:{total:72,booked:48}, "3A":{total:64,booked:64}, "2A":{total:40,booked:36}, "1A":{total:18,booked:7}} },

  // Return-direction services. Real routes run both ways (an "up" and a
  // "down" train); the section above only had the outbound leg, so a
  // search from, say, KSR Bengaluru back to Chennai Central returned
  // nothing even though the outbound train exists. These fill that gap.
  { number:"12657", name:"Chennai Bengaluru Mail", source:"KSR Bengaluru", destination:"Chennai Central", depart:"23:00", arrive:"06:00 (+1d)", duration:"7h 00m",
    fare:{SL:420, "3A":1080, "2A":1560, "1A":2650}, classes:{SL:{total:72,booked:60}, "3A":{total:64,booked:38}, "2A":{total:40,booked:19}, "1A":{total:18,booked:9}} },
  { number:"16022", name:"Kaveri Express", source:"KSR Bengaluru", destination:"Katpadi Junction", depart:"06:00", arrive:"12:10", duration:"6h 10m",
    fare:{SL:280, "3A":740, "2A":1120, "1A":1900}, classes:{SL:{total:72,booked:72}, "3A":{total:64,booked:44}, "2A":{total:40,booked:20}, "1A":{total:18,booked:6}} },
  { number:"12650", name:"Karnataka Sampark Kranti", source:"Hazrat Nizamuddin", destination:"Katpadi Junction", depart:"06:15", arrive:"07:00 (+1d)", duration:"24h 45m",
    fare:{SL:780, "3A":2050, "2A":2980, "1A":4950}, classes:{SL:{total:72,booked:58}, "3A":{total:64,booked:64}, "2A":{total:40,booked:24}, "1A":{total:18,booked:11}} },
  { number:"12164", name:"Chennai Coimbatore Express", source:"Coimbatore", destination:"Chennai Egmore", depart:"21:30", arrive:"06:35 (+1d)", duration:"9h 05m",
    fare:{SL:320, "3A":840, "2A":1210, "1A":2050}, classes:{SL:{total:72,booked:41}, "3A":{total:64,booked:64}, "2A":{total:40,booked:15}, "1A":{total:18,booked:3}} },
  { number:"16723", name:"Trivandrum Mail", source:"Thiruvananthapuram", destination:"Chennai Egmore", depart:"15:10", arrive:"05:40 (+1d)", duration:"14h 30m",
    fare:{SL:460, "3A":1220, "2A":1780, "1A":3000}, classes:{SL:{total:72,booked:70}, "3A":{total:64,booked:57}, "2A":{total:40,booked:22}, "1A":{total:18,booked:5}} },
  { number:"12616", name:"Grand Trunk Express", source:"Hazrat Nizamuddin", destination:"Chennai Central", depart:"21:40", arrive:"06:45 (+2d)", duration:"33h 05m",
    fare:{SL:830, "3A":2180, "2A":3150, "1A":5300}, classes:{SL:{total:72,booked:72}, "3A":{total:64,booked:52}, "2A":{total:40,booked:14}, "1A":{total:18,booked:2}} },
  { number:"11078", name:"Mumbai Mail", source:"Chennai Central", destination:"Mumbai CST", depart:"21:30", arrive:"04:20 (+2d)", duration:"30h 50m",
    fare:{SL:770, "3A":2020, "2A":2930, "1A":4900}, classes:{SL:{total:72,booked:39}, "3A":{total:64,booked:60}, "2A":{total:40,booked:28}, "1A":{total:18,booked:10}} }
];

export const STATIONS = [...new Set(TRAINS.flatMap(t => [t.source, t.destination]))];

// Every distinct source→destination pair that actually has a train, in
// data order. Used to power "Popular Routes" quick-picks so passengers
// can see what's searchable instead of guessing station names.
export const ROUTES = TRAINS.reduce((list, t) => {
  if(!list.some(r => r.source === t.source && r.destination === t.destination)){
    list.push({ source: t.source, destination: t.destination });
  }
  return list;
}, []);

export const CLASS_LABELS = { SL:"Sleeper", "3A":"AC 3 Tier", "2A":"AC 2 Tier", "1A":"AC First Class" };

export const MAX_PASSENGERS = 6;

export const BERTH_OPTIONS = ["No Preference","Lower","Middle","Upper","Side Lower","Side Upper"];
