export class AppConst {
  // Debug用
  static readonly BACKEND_HOST: string = '/backend';
  // 本番用
  //static readonly BACKEND_HOST: string = '/api;

  // スタティックな自身を返すクラスメソッドを追加
  public main(){
    const obj = AppConst;
    return obj;
  }
}
