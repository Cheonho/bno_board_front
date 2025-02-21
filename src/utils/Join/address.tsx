// 주소 병합 함수
export const mergeAddress = (firstaddress: string, detail: string, code: string) => {
    return `${firstaddress} ${detail} (${code})`;
};
