export const getTime = () => {
    let message='';
    let hour = new Date().getHours();
    if (hour < 12) {
        message = "上午";
    }else{
        message = "下午";
    }
    return message;
}