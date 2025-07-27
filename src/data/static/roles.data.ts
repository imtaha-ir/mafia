import type {  Role } from "../../types/roles.types"



const RoleDetails: Role[] = [
    {
        id:1,
        name:"شهروند ساده",
        side:"TOWN",
        description:"بدون قابلیت خاص"
    },
    {
        id:2,
        name:"مافیا ساده",
        side:"MAFIA",
        description:"بدون قابلیت خاص"
    },
    {
        id:3,
        name:"دکتر",
        side:"TOWN",
        description:"قابلیت نجات دادن جان شهروندان از جمله خودش"
    },
    {
        id:4,
        name:"پدر خوانده",
        side:"MAFIA",
        description:"قابلیت حذف یک شهروند در هر شب"
    },
    {
        id:5,
        name:"کاراگاه",
        side:"TOWN",
        description:"قابلیت شناسایی اعضای مافیا"
    },
    {
        id:6,
        name:"تک تیر انداز",
        side:"TOWN",
        description:"قابلیت فقط یکبار تیراندازی کردن"
    },
    {
        id:7,
        name:"مذاکره کننده",
        side:"MAFIA",
        description:"قابلیت فریب اعضای شهر"
    },
    {
        id:8,
        name:"جان سخت",
        side:"TOWN",
        description:"یک جان اضافه تر دارد"
    },
    {
        id:9,
        name:"دکتر لکتر",
        side:"MAFIA",
        description:"قابلیت نجات دادن اعضای مافیا حتی خودش"
    },
    {
        id:10,
        name:"ناتاشا",
        side:"MAFIA",
        description:"میتواند هر بار برای یک روز یک نفر را سایلنت کند"
    },
]
export default RoleDetails