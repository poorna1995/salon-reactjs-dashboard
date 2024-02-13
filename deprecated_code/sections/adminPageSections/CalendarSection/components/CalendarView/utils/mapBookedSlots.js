import parse from "date-fns/parse";
export default function mapBookedSlots(data = []) {
  // let masterData = {};
  // data.forEach((item) => {
  //   const { bookings } = item;
  //   bookings.forEach((bookingItem) => {
  //     const { service_date, service_time } = bookingItem.booking_data;
  //     const serviceTimestamp = `${service_date} ${service_time}`;

  //     const startTimeStr = `${service_date} ${service_time.split("-")[0]}`;
  //     const endTimeStr = `${service_date} ${service_time.split("-")[1]}`;
  //     const startTime = parse(startTimeStr, "yyyy-MM-dd hh:mma", new Date());
  //     const endTime = parse(endTimeStr, "yyyy-MM-dd hh:mma", new Date());

  //     if (serviceTimestamp in masterData) {
  //       masterData[serviceTimestamp]["bookingsData"].push(item);
  //     } else {
  //       masterData[serviceTimestamp] = {
  //         bookingsData: [item],
  //         start: startTime,
  //         end: endTime,
  //         availability: false,
  //         title: "Booked",
  //       };
  //     }
  //   });
  // });
  // const flatSlots = Object.values(masterData);
  // console.log(flatSlots)
  // return flatSlots;

  //##############################
  const getAvailableSlots = data?.map((item) => {
    const { service_date, service_time, bookings } = item;
    const startTimeStr = `${service_date} ${service_time.split("-")[0]}`;
    const endTimeStr = `${service_date} ${service_time.split("-")[1]}`;
    const startTime = parse(startTimeStr, "yyyy-MM-dd hh:mma", new Date());
    const endTime = parse(endTimeStr, "yyyy-MM-dd hh:mma", new Date());
    const eventTitle = `Bookings(${bookings.length})`;
    return {
      availability: false,
      title: eventTitle,
      // timezone,
      start: startTime,
      end: endTime,
      ...item,
    };
  });
  return getAvailableSlots;
  // const getFlatSlots = getAvailableSlots.flat();
  // return getFlatSlots;

  //##############################

  // const getAvailableSlots = data?.map((item) => {
  //   const { bookings } = item;
  //   return bookings?.map((bookedItem) => {
  //     const { booking_data, booking_id } = bookedItem;
  //     const { service_date, service_time } = booking_data;
  //     const startTimeStr = `${service_date} ${service_time.split("-")[0]}`;
  //     const endTimeStr = `${service_date} ${service_time.split("-")[1]}`;
  //     const startTime = parse(startTimeStr, "yyyy-MM-dd hh:mma", new Date());
  //     const endTime = parse(endTimeStr, "yyyy-MM-dd hh:mma", new Date());
  //     const eventTitle = "Booked";
  //     return {
  //       availability: false,
  //       booking_id,
  //       // source_type,
  //       title: eventTitle,
  //       // timezone,
  //       start: startTime,
  //       end: endTime,
  //       ...item,
  //     };
  //   });
  // });
  // const getFlatSlots = getAvailableSlots.flat();
  // return getFlatSlots;
}
