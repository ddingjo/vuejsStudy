export default {
  install: (app) => {
    // 전역적으로 사용 가능한 $addComma() 메서드 주입
    app.config.globalProperties.$addComma = (number) => {
      if(isNaN(number))
        return '숫자아님';
      else
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
}