export function currentDate() {
  const today = new Date(); // Create a Date object for the current date and time

  // Convert the date and time to UTC explicitly
  today.setUTCFullYear(today.getFullYear());
  today.setUTCMonth(today.getMonth());
  today.setUTCDate(today.getDate());
  today.setUTCHours(today.getHours()); // This automatically accounts for local time offset
  today.setUTCMinutes(today.getMinutes());
  today.setUTCSeconds(today.getSeconds());

  // Use string formatting to get the desired format
  const formattedDate = today.toISOString().slice(0, 16);

  return formattedDate;
}

export function epochToUtcDateTime() {
  const currentTimestamp = Date.now();
  // Create a Date object from the epoch timestamp
  const date = new Date(currentTimestamp);

  // Get the UTC date and time components, accounting for local time offset
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // January is 0, so add 1 and pad
  const day = String(date.getUTCDate()).padStart(2, "0");
  // Subtract 1 hour from local hours to get UTC hours
  const hours = String(date.getUTCHours() + 1).padStart(2, "0"); // Adjust for UTC time
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  // Combine the components in the desired format
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return formattedDate;
}
