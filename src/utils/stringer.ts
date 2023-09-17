// import { Address } from "../modules/geo/types";

const alphaDigits =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function sanitizeString(str: string): string {
  if (!str) {
    return "";
  }
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/đ/g, "d");

  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // tone characters
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export const compareSanitizeString = (
  a: string,
  b: string,
  options = {
    caseSensitive: false,
  }
): boolean => {
  const strA = options?.caseSensitive ? a : a.toLowerCase();
  const strB = options?.caseSensitive ? b : b.toLowerCase();

  return (
    strA === strB ||
    sanitizeString(strA)
      .toLowerCase()
      .includes(sanitizeString(strB).toLowerCase())
  );
};

export const generateRandomString = (
  len = 16,
  wishlist = alphaDigits
): string =>
  Array(len)
    .fill("")
    .map(
      () =>
        wishlist[
          Math.floor(
            (crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) *
              wishlist.length
          )
        ]
    )
    .join("");

export const generateUniqueId = (len = 8) => {
  const now = new Date();
  const sDate =
    now.getUTCFullYear().toString(32) +
    alphaDigits[now.getUTCMonth()] +
    alphaDigits[now.getUTCDate()] +
    alphaDigits[now.getUTCHours()] +
    alphaDigits[now.getUTCMinutes()] +
    alphaDigits[now.getUTCSeconds()];
  return `${sDate}${generateRandomString(len)}`;
};

export const toPostgresArray = (input: string[]): string =>
  `{${(input || []).join(",")}}`;

export const trimEnd = (input: string, char = " "): string => {
  let result = input;
  for (let i = input.length - 1; i <= 0; i--) {
    if (input[i] !== char) {
      break;
    }
    result = result.slice(0, i - 1);
  }

  return input;
};

export const encodeBase64 = (str: string): string =>
  window.btoa(unescape(encodeURIComponent(str)));

export const decodeBase64 = (str: string): string =>
  decodeURIComponent(escape(window.atob(str)));

export const toSlug = (str: string): string =>
  !str
    ? ""
    : sanitizeString(str.trim())
        .replace(/[^0-9a-zA-Z]+/g, "-")
        .toLowerCase();

export const toCode = (str: string): string =>
  !str
    ? ""
    : sanitizeString(str.trim())
        .replace(/[^0-9a-zA-Z]+/g, "")
        .toUpperCase();

// export function getLocaleContent<T = string>(
//   dict: Record<string, T>,
//   locale: string,
//   defaultLocale = Config.locale
// ): T | undefined {
//   if (!dict) {
//     return undefined;
//   }
//   if (dict[locale]) {
//     return dict[locale];
//   }
//   return dict[defaultLocale];
// }

// export function getLocaleContentFromArray<
//   T extends { language: string; [key: string]: any } = {
//     language: string;
//     [key: string]: any;
//   }
// >(items: T[], key: string, locale: string, defaultLocale = Config.locale): any {
//   if (!items?.length) {
//     return undefined;
//   }
//   const result =
//     items.find((o) => o.language === locale) ||
//     items.find((o) => o.language === defaultLocale);
//   if (!result) {
//     return undefined;
//   }
//   return result[key];
// }

export function buildKeywords(
  input: string | string[] | Record<string, string>
): string {
  if (!input) {
    return "";
  }

  let inputs: string[] = [];
  switch (typeof input) {
    case "string":
      inputs = [input];
      break;
    case "object":
      if (Array.isArray(input)) {
        inputs = input;
      } else {
        inputs = Object.values(input);
      }
      break;
    default:
      return "";
  }

  return inputs
    .map((s) => {
      const trimmed = s ? s.trim().toLowerCase() : "";
      if (!trimmed) {
        return "";
      }

      const sanitizedWords = sanitizeString(trimmed);
      return trimmed === sanitizedWords
        ? trimmed
        : `${trimmed} ${sanitizedWords}`;
    })
    .filter((s) => s)
    .join(" ");
}

export const toI18nPhoneNumber = (code: number, phoneNumber: string) =>
  `+${code}${phoneNumber[0] === "0" ? phoneNumber.substring(1) : phoneNumber}`;

export const formatPhoneNumber = (phoneNumber: string) =>
  `${
    phoneNumber[0] === "0" && phoneNumber.length === 10
      ? phoneNumber
      : `0${phoneNumber}`
  }`;

export const toCapitalize = (s: string): string =>
  s.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

export const displayAddress = (address) =>
  [
    address?.street,
    address?.ward_name,
    address?.district_name,
    address?.province_name,
  ]
    .filter((e) => e?.length > 0)
    .join(", ");

export function formatCurrency(
  n: any,
  isUnit?: boolean,
  currency?: string
): string {
  if (n === 0) {
    return `0${isUnit ? "đ" : ""}`;
  }
  if (!n) {
    return "";
  }
  const c = Math.round(n)
    .toString()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return currency ? `${c} ${currency}` : isUnit ? `${c}đ` : c;
}
export const validateVietNamPhoneNumber = (phone: string): boolean => {
  if (!phone) {
    return false;
  }

  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(phone);
};

export const toAddressString = (address: any) => {
  return ["street", "ward_name", "district_name", "province_name"]
    .map((e) => address[e] || "")
    .join(", ");
};

const defaultNumbers = " hai ba bốn năm sáu bảy tám chín";

const chuHangDonVi = ("1 một" + defaultNumbers).split(" ");
const chuHangChuc = ("lẻ mười" + defaultNumbers).split(" ");
const chuHangTram = ("không một" + defaultNumbers).split(" ");

export const convert_block_three = (number) => {
  if (number == "000") return "";
  const _a = number + ""; //Convert biến 'number' thành kiểu string

  //Kiểm tra độ dài của khối
  switch (_a.length) {
    case 0:
      return "";
    case 1:
      return chuHangDonVi[_a];
    case 2:
      return convert_block_two(_a);
    case 3:
      let chuc_dv = "";
      if (_a.slice(1, 3) != "00") {
        chuc_dv = convert_block_two(_a.slice(1, 3));
      }
      const tram = chuHangTram[_a[0]] + " trăm";
      return tram + " " + chuc_dv;
  }
};

export const convert_block_two = (number) => {
  let dv = chuHangDonVi[number[1]];
  const chuc = chuHangChuc[number[0]];
  let append = "";

  // Nếu chữ số hàng đơn vị là 5
  if (number[0] > 0 && number[1] == 5) {
    dv = "lăm";
  }

  // Nếu số hàng chục lớn hơn 1
  if (number[0] > 1) {
    append = " mươi";

    if (number[1] == 1) {
      dv = " mốt";
    }
  }

  return chuc + "" + append + " " + dv;
};

const dvBlock = "1 nghìn triệu tỷ".split(" ");
export const to_vietnamese = (number) => {
  const str = parseInt(number) + "";
  let i = 0;
  const arr = [];
  let index = str.length;
  const result = [];
  let rsString = "";

  if (index == 0 || str == "NaN") {
    return "";
  }

  // Chia chuỗi số thành một mảng từng khối có 3 chữ số
  while (index >= 0) {
    arr.push(str.substring(index, Math.max(index - 3, 0)));
    index -= 3;
  }

  // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
  for (i = arr.length - 1; i >= 0; i--) {
    if (arr[i] != "" && arr[i] != "000") {
      result.push(convert_block_three(arr[i]));

      // Thêm đuôi của mỗi khối
      if (dvBlock[i]) {
        result.push(dvBlock[i]);
      }
    }
  }

  // Join mảng kết quả lại thành chuỗi string
  rsString = result.join(" ");

  // Trả về kết quả kèm xóa những ký tự thừa
  return rsString.replace(/[0-9]/g, "").replace(/ /g, " ").replace(/ $/, "");
};
