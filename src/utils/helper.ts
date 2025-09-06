export function convertNumbers(to: "en" | "fa" = "en", input: string | undefined) {
    const strInput = String(input);
    let number
    if (to === "en") {
        number = strInput.replace(/[\u06F0-\u06F9]/g, (c) =>
        String.fromCharCode(c.charCodeAt(0) - 0x06F0 + 48)
        );
    } else {
        number = strInput.replace(/[0-9]/g, (c) =>
        String.fromCharCode(c.charCodeAt(0) - 48 + 0x06F0)
        );
    }
    return String(number)
}

export function getAge (yearOfBirth:number,calendar: "gregorian" | "jalali" = "jalali"){
    let todayYear
    if (calendar === "gregorian") {
        todayYear = new Date().getFullYear();
    } else {
        todayYear = Number(
        new Intl.DateTimeFormat("fa-IR-u-nu-latn", { year: "numeric" }).format(
        new Date())
        );
    }
    const age = todayYear - yearOfBirth
    return String(age)
}
