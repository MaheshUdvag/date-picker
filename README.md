# Custom React Date Picker Component

This allows users to select weekdays (Monday through Friday) and prevents them from selecting weekends (Saturday and Sunday).

Demo: https://maheshudvag.github.io/date-picker/

## **Assumptions**

- If the predefined range is invalid for Today's date we show the option but it is disabled.
- The weekends are ignored when calculating the date range. For eg - If the user selects last 7 days, we ignore the weekends while calculating the date range. 

## **Screenshots**

### **When user clicks on the picker component**

The current date is highlighted with the current month calender and the next month calender. If there are any invalid pre-defined selections ('yesterday') the option will be blured.

![image](https://github.com/MaheshUdvag/date-picker/assets/48888253/57701ba7-5a9f-40fb-98ae-5d0bce48c958)


### **After selecting the date range**

The selected date range is highlighted and the OK button is enabled. Clicking on OK returns the selected date range.

![image](https://github.com/MaheshUdvag/date-picker/assets/48888253/7fe9e23e-9de0-43d8-b8df-1fab2c52bd78)


### **Selected Date Range**

The selected date range displayed in a non editable input tag. Click on the x icon to reset the date and then click on the calender icon to reselect the dates.

![image](https://github.com/MaheshUdvag/date-picker/assets/48888253/369d1c7d-5760-4b6d-98b3-6942c9504ca9)


### Month Year Picker

The month picker is displayed when the user selects on the month-year text. The current year and month are preselected by default. Users can select months starting from year 1970 till 2969.

![image](https://github.com/MaheshUdvag/date-picker/assets/48888253/83124b96-b6cf-4829-9cbb-de16bf2257fa)

### Fewer Date Ranges

We can pass specific predefined ranges to be displayed.

![image](https://github.com/MaheshUdvag/date-picker/assets/48888253/a2b798f0-2e13-49c7-a67f-2fccc8d9db1f)


