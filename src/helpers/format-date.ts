/*
    This helper function is used to format the date in a more human-readable way.
    It takes a date string as an argument and returns a formatted date string.
*/

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
}