import React,{useEffect,useState,Component} from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

function DateSelector({label,value,name,onChange}) {
    const [startDate, setStartDate] = useState(null);

    const addMonths = (date, months)=> {
        date.setMonth(date.getMonth() + months);
        return date;
      }
    const dateSelector =  () => {
        return (
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            maxDate={addMonths(new Date(), 5)}
            showDisabledMonthNavigation
          />
        );
      };
        return (
            <React.Fragment>
            <label>{label}</label>
            {dateSelector}
            </React.Fragment>
        );
      };
 
export default DateSelector;
