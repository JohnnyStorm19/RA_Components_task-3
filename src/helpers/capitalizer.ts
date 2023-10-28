export function capitalizeFirstLetter(str: string): string {
    const firstLetter = str.charAt(0);
    return firstLetter.toUpperCase() + str.slice(1);
}