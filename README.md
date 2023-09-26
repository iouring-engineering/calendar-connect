# Calender Connect

Simple react library to create Calendar events in Google Calendar, iCalendar, Outlook Calendar. With this library, users can easily integrate calendar events into your React applications. This library provides a user-friendly interface for users to create events and seamlessly add them to their Google Calendar, iCalendar, and Outlook Calendar.

## Installation

```bash
npm install @iouring-engineering/calender-connect
```

## Properties

### CalenderTypes

In `CalenderTypes`, you can pass the required Calendar types. It is an array of objects. In each object, you can include the following properties:

- `icon`: It should be an image or icon
- `label`: Label of the type It should be string
- `type`: CALENDER_TYPES.GOOGLE | CALENDER_TYPES.OUTLOOK | CALENDER_TYPES.ICAL

For the `type`, you can import `CALENDER_TYPES` from this library. It consists of the following options:

- `google`
- `outlook`
- `icalendar`

Example:

```javascript
const calendarTypes = [
  {
    icon: 'Icon for Google Calendar',
    label: 'Label for Google Calendar',
    type: CALENDER_TYPES.GOOGLE,
  },
  {
    icon: 'Icon for Outlook Calendar',
    label: 'Label for Outlook Calendar',
    type: CALENDER_TYPES.OUTLOOK,
  },
  {
    icon: 'Icon for iCalendar',
    label: 'Label for iCalendar',
    type: CALENDER_TYPES.ICAL,
  },
];
```

### CalenderData

Calendar Data should contain start, end, title, description, downloadFileName, eventLocation. Start and end should be in Date format.
| Field            | Description        |
|------------------|--------------------|
| **Start**        | Date format        |
| **End**          | Date format        |
| **Title**        | Event title        |
| **Description**  | Event description  |
| **DownloadFileName** | File name for download |
| **EventLocation** | Event location     |

Example:

```javascript
     const calenderTypes = {
            start: new Date("start date"),
            end: new Date("end date"),
            title: title,
            description: description,
            downloadFileName: results-calender,
            eventLocation: location
        };
```

## Usage

```jsx
import { AddToCalenderOptions, CALENDER_TYPE } from "./ICalendar";
import React from "react";

  const CalendarOptions = () => {
    const calenderTypes = [
        { icon: <img src={Ical} />, label: "iCal", type: CALENDER_TYPE.ICAL },
        { icon: <img src={Gcalender} className="google-img" />, label: "Google", type: CALENDER_TYPE.GOOGLE },
        { icon: <img src={Outlook} className="outlook-img" />, label: "Outlook", type: CALENDER_TYPE.OUTLOOK }
    ];

    const dataFormat = {
        start: new Date(),
        end: new Date(),
        title: "Calender Connect",
        description: "",
        downloadFileName: "calender",
        eventLocation: ""
    };

    return (
        <AddToCalenderOptions 
            calenderTypes={calenderTypes}
            calenderData={calenderData}
        />
    );
};

export default CalendarOptions;
```
