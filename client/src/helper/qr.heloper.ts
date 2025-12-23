import QRcode from "qrcode";

export const createQRCodeDataURL = (data: string) => QRcode.toDataURL(data);
