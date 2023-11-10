export const convertObject = (data) => {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.error('Lỗi khi chuyển đổi chuỗi thành đối tượng JSON:', error);
            return null;
        }
    } else {
        return data;
    }
};
