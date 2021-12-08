export class AppConst {

  // Debug用
  static readonly BACKEND_HOST: string = '/backend/v1';
  // 本番用
  //static readonly BACKEND_HOST: string = '/api/v1;

  static readonly COOKIE_NAME: string = 'icp-id';

  static readonly ERR_UNEXPECTED: string =`\
    予期せぬエラーが発生しました。
    ページを更新してください。`.replace(/ /g, '');

  static readonly ERR_SERIOUS: string =`\
    現在、このアプリは利用可能な状態ではありません。
    時間が経ってからアクセスし直してください。`.replace(/ /g, '');

  // スタティックな自身を返すクラスメソッド
  public self(){
    const obj = AppConst;
    return obj;
  }
}
