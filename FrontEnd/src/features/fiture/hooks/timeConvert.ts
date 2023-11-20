import moment from 'moment';


export function TimeFormat(){


  function formatTimeAgo(timestamp: Date): string {
      const now = moment();
      const time = moment(timestamp);
      const diff = now.diff(time);
  
      const duration = moment.duration(diff);
      
      if (duration.asSeconds() < 60) {
          return Math.floor(duration.asSeconds()) + " detik yang lalu";
      } else if (duration.asHours() < 1) {
          return Math.floor(duration.asMinutes()) + " menit yang lalu";
      } else if (duration.asDays() < 1) {
          return Math.floor(duration.asHours()) + " jam yang lalu";
      } else if (duration.asWeeks() < 1) {
          return Math.floor(duration.asDays()) + " hari yang lalu";
      } else if (duration.asMonths() < 1) {
          return Math.floor(duration.asWeeks()) + " minggu yang lalu";
      } else if (duration.asYears() < 1) {
          return Math.floor(duration.asMonths()) + " bulan yang lalu";
      } else {
          return Math.floor(duration.asYears()) + " tahun yang lalu";
      }
  }
  return{
    formatTimeAgo
  }
}

// // Contoh penggunaan
// const timestamp = moment("2023-08-01T12:00:00Z").valueOf();
// const formatted = formatTimeAgo(timestamp);
// console.log(formatted); // Output tergantung dari waktu saat ini dan timestamp di atas
