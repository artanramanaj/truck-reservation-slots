Project Setup

APPLICATION OVERVIEW

The application displays and updates real-time truck reservation slots at terminal locations. It is compatible with all devices.

-Created symbolic header and footer components.

-TimeSlotList Component
On TimeSlotList component mount method getMainData() is called to fetch the initial data from the API.
While waiting for the response, a Spinner component will show up for better UX in case of delay.
Once data is received, it fills the slots variable. Then, groupSlotsByDate() is used to organize slots by date, returning a grouped object. The template uses a for loop with a nested loop to display them.

-Card Component
This child component receives slot data as props from TimeSlotList. Each card shows the slot ID or number, time, capacity, and category.
The layout looks like a table, with one box/card per date.

-Real-Time Updates
A reusable composable (useEventSources) is placed inside the composables folder. It’s called in the TimeSlotList component and takes two arguments: the URL and a callback function.
Inside the callback, the find() method is used to locate a slot by ID and update it in real-time.

-Category Handling
A method called getCategoryColor() is used to return a category type (e.g., green, yellow, red). Based on this value, the app displays the corresponding status image.

-Types folder
A types folder is created with an index.ts file where all the main interfaces are defined. These interfaces are used across the app to keep the code strongly typed and more maintainable.
Slot defines the structure of a time slot, including ID, time range, category, and capacity.
GroupedSlots is used when slots are grouped by date.
SSEUpdate represents the data structure for real-time updates received via Server-Sent Events (SSE).

-UI Explanation
The UI is designed to display a card (or box) for each date. Each card shows relevant data such as the slot number or ID, time range, capacity, and category. This structure makes it easy to scan through available time slots grouped by date.

Custom colors and utility classes are configured in the style.css file to match the app's design requirements. As mentioned earlier, the category of each slot (green, yellow, or red) is shown as an image, determined by a condition in the getCategoryColor() method.

When the data changes in real-time via SSE (Server-Sent Events), the UI updates immediately to reflect the new capacity and category values for the affected slot, maintaining a live and accurate view for the user.

-TECHNOLOGIES USED

Vite - modern frontend build tool
Vue 3 - (composition api) javascript framework for SPA applications
TypeScript - static type defination for javascript
Tailwind - CSS framework , mobile and utility first, custom classes and configurations in style.css file
Moment.js - Library for date format
Axios - Library that simplifies making async http request to API-s
