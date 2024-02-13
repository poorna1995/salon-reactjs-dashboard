// import authFetch from "utils/authFetch";
import mapAvailableSlots from "./mapAvailableSlots";
import mapBookedSlots from "./mapBookedSlots";
import { res } from "data/slotsData";
import authFetch from "utils/authFetch";
import { ADMIN_SERVICES } from "constants/API_URLS";
import { useDispatch } from "react-redux";
import { updateCalendarData } from "store/calendar/calendarSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function fetchCalendarView(bookedSlots) {
  const getSlots = mapBookedSlots(bookedSlots?.result);
  const getAvailableSlots = mapAvailableSlots(res?.result);
  

  return [...getSlots, ...getAvailableSlots];
  // function for filtering the result to show events after the current date only
  // const result =
  // 	getSlots &&
  // 	getSlots.filter((slot) => {
  // 		const {
  // 			start,
  // 			end,
  // 			title,
  // 			booking_id,
  // 			time_availability,
  // 			object_id,
  // 			session_id,
  // 			source_type,
  // 			timezone,
  // 			date,
  // 		} = slot;

  // 		const currentDate = new Date();

  // 		if (start < currentDate || end < currentDate) return null;

  // 		return {
  // 			start: new Date(start),
  // 			end: new Date(end),
  // 			// start,
  // 			// end,
  // 			title,
  // 			booking_id,
  // 			time_availability,
  // 			object_id,
  // 			session_id,
  // 			source_type,
  // 			timezone,
  // 			date,
  // 			...slot,
  // 		};
  // 	});

  // return result;
}
