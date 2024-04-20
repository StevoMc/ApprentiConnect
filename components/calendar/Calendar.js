"use client";
import { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
  endOfMonth,
  startOfMonth,
  isSameMonth  
} from "date-fns";

const Calendar = ({ showDetailsHandle }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  // Function to get the week number of a given date
  const getWeekNumber = (date) => {
    const target = new Date(date.valueOf());
    const dayNumber = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNumber + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => changeMonthHandle("prev")}>
            prev month
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end">
          <div className="icon" onClick={() => changeMonthHandle("next")}>next month</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    const dateFormat = "d";
    const weekFormat = "W"; // Week number format
    const rows = [];
  
    let days = [];
    let day = startDate;
    let formattedDate = "";
  
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(cloneDay, currentMonth);
  
        days.push(
          <div
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            } ${!isCurrentMonth ? "empty" : ""}`}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            {isCurrentMonth && (
               <>
               <span className="number">{formattedDate}</span>
               <span className="bg">{formattedDate}</span>
               {i === 0 && (
                 <span className="week-number" >
                   {getWeekNumber(day)}
                 </span>
               )}
             </>
            )}
          </div>
        );
  
        day = addDays(day, 1);
      }
  
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
  
    return (
      <div className="body">
        {rows}
      </div>
    );
  };
  

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
