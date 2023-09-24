import React from "react";
import { saveAs } from "file-saver";

interface CalendarEventArgs {
    start?: Date;

    end?: Date;
  
    title?: string;
  
    eventLocation?: string;
  
    description?: string;

    downloadFileName?: string
}

interface CalenderTypeProps {
    icon?: any
    
    label?: string

    type?: string
}

interface AddToCalenderProps {
    calenderData: CalendarEventArgs

    calenderTypes: CalenderTypeProps[]
}

export const CALENDER_TYPE = {
    GOOGLE: "GOOGLE",
    OUTLOOK: "OUTLOOK",
    ICAL: "ICAL",
};

function clean(obj: Record<string, string | undefined>) {
    return Object.entries(obj).reduce<Record<string, string>>(
        (acc, [
            key, val
        ]) => {
            return val ? { ...acc, [ key ]: val } : acc;
        },
        {},
    );
}

const formatDate = (date: Date) => {
    const inputDate = date;
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");
    const hours = inputDate.getHours().toString().padStart(2, "0");
    const minutes = inputDate.getMinutes().toString().padStart(2, "0");
    const seconds = inputDate.getSeconds().toString().padStart(2, "0");
    
    const formattedDate = `${year}${month}${day}T${hours}${minutes}${seconds}`;
    return formattedDate;
};

function outLookDateFormat(inputDate: Date) {
    const date = inputDate;
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  
    return formattedDate;
}

const googleCalendarEventUrl = (args: CalendarEventArgs) => {
    const { start, end, title, eventLocation, ...rest } = args;
  
    const formattedStartDateString = start && formatDate(start);

    const formattedEndDateString = end && formatDate(end);

    const searchParams = {
        action: "TEMPLATE",
        dates: formattedStartDateString && formattedEndDateString ?
            `${formattedStartDateString}/${formattedEndDateString}`
            : "",
        text: title,
        location: eventLocation,
        ...rest,
    };
  
    const urlSearchParams = new URLSearchParams(clean(searchParams));

    const url ="https://calendar.google.com/calendar/event";
  
    return window.open(`${url}?${ urlSearchParams.toString()}`);
};


const outlookCalendarEventUrl = (args: CalendarEventArgs) => {
    const { start, end, title, eventLocation } = args;
    
    const searchParams = {
        rru: "TEMPLATE",
        startdt: start && outLookDateFormat(start),
        enddt: end && outLookDateFormat(end),
        subject: title,
        location: eventLocation,
        path: "/calendar/action/compose"
    };
  
    const urlSearchParams = new URLSearchParams(clean(searchParams));

    const url = "https://outlook.live.com/calendar/0/action/compose/?";
  
    return (
        window.open(`${url}+${ urlSearchParams.toString()}`)
    );
};

const iCalendarDownload = (args: CalendarEventArgs) => {

    const { start, end, title, eventLocation, description } = args;
    if (start && end) {      
        const calendar = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "BEGIN:VTIMEZONE",
            "TZID:Asia/Kolkata",
            "BEGIN:STANDARD",
            `DTSTART: ${formatDate(start)}`,
            "END:STANDARD",
            "END:VTIMEZONE",
            "BEGIN:VEVENT",
            `DTSTART;TZID=Asia/Kolkata:${formatDate(start)}`,
            `DTEND;TZID=Asia/Kolkata:${formatDate(end)}`,
            `SUMMARY: ${title}`,
            `DESCRIPTION: ${description}`,
            `LOCATION:${eventLocation}`,
            "SEQUENCE:0",
            "END:VEVENT",
            "END:VCALENDAR"
        ];
        
        const calendarString = calendar.join("\n");

        let blob: any = [
        ];
        if (navigator.userAgent.indexOf("MSIE 10") === -1) {
            // chrome or firefox
            blob = new Blob([
                calendarString
            ]);
        } else {
            // ie
            const BlobBuilder = (window as any).BlobBuilder || 
            (window as any).WebKitBlobBuilder || (window as any).MozBlobBuilder;
            
            const bb = new BlobBuilder();
            bb.append(calendar);
            blob = bb.getBlob(`text/x-vCalendar;charset=${ document.characterSet}`);
        }

        const fileName = args.downloadFileName? args.downloadFileName : "calender";
        saveAs(blob, `${fileName}.ics`);

        return calendarString;
    }
    return "";
};

export const AddToCalenderOptions = (props: AddToCalenderProps) => {
    const { calenderData, calenderTypes } = props;

    const calenderEvent = (args: CalenderTypeProps, dataFormat: CalendarEventArgs) => {
        if (args.type === CALENDER_TYPE.GOOGLE)
            return googleCalendarEventUrl(dataFormat);
        if (args.type === CALENDER_TYPE.OUTLOOK)
            return outlookCalendarEventUrl(dataFormat);
        if (args.type === CALENDER_TYPE.ICAL) {
            return iCalendarDownload(dataFormat);
        }
        return "";
    };
    
    return (
        <div className="calender-type-btns">
            {calenderTypes.map((item, index) => {
                return <>
                    <div className="calender-type-btn" key={index} onClick={() => {
                        return calenderEvent( item, calenderData ); 
                    }}>
                        <div className="calender-icons">{item.icon}</div>
                        <div className="icon-label">{item.label}</div></div>
                </>;
            })}
        </div>
    );
};
