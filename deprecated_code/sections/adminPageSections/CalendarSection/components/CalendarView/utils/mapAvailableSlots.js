import { format, parseISO } from "date-fns";
import parse from "date-fns/parse";
export default function mapAvailableSlots(data = []) {
  const getAvailableSlots = data?.map((item) => {
    const { service_date, service_time } = item;
    return service_time?.map((slot) => {
      const startTimeStr = `${service_date} ${slot.split("-")[0]}`;
      const endTimeStr = `${service_date} ${slot.split("-")[1]}`;
      const startTime = parse(startTimeStr, "yyyy-MM-dd hh:mma", new Date());
      const endTime = parse(endTimeStr, "yyyy-MM-dd hh:mma", new Date());
      const eventTitle = "Available";
      return {
        availability: true,
        // source_type,
        title: eventTitle,
        // timezone,
        start: startTime,
        end: endTime,
        ...item,
      };
    });
  });
  const getFlatSlots = getAvailableSlots.flat();
  return getFlatSlots;
}
