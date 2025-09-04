function convertNumbers(
    to: "en" | "fa" = "en",
    input: string,
){
  if (to === "en") {
    return input.replace(/[\u06F0-\u06F9]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) - 0x06F0 + 48)
    );
  } else {
    return input.replace(/[0-9]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) - 48 + 0x06F0)
    );
  }
}

function getAge (yearOfBirth:string){
    const enYOB = convertNumbers("en",yearOfBirth)
    const todayYear = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
    year: "numeric",
    }).format(new Date());
    const age = Number(todayYear) - Number(enYOB)
    return age > 0 ? age : null
}

export {getAge,convertNumbers}
