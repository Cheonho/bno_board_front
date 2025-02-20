// 주소 병합 함수
export const mergeAddress = (address: string, detail: string, code: string) => {
    return `${address} ${detail} (${code})`;
};
