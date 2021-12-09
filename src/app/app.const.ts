import { environment } from './../environments/environment';

export class AppConst {

  static readonly BACKEND_HOST: string = environment.backend;

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
