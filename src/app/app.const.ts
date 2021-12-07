export class AppConst {
  static readonly COOKIE_NAME: string = 'icp-id';
  // Debug用
  static readonly BACKEND_HOST: string = '/backend/v1';
  // 本番用
  //static readonly BACKEND_HOST: string = '/api/v1;

  // スタティックな自身を返すクラスメソッド
  public self(){
    const obj = AppConst;
    return obj;
  }
}
