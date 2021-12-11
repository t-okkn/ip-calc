import { environment } from './../environments/environment';

export class Const {

  static readonly BACKEND_HOST: string = environment.backend;
}

export class Err {

  static readonly UNEXPECTED: string =`\
    予期せぬエラーが発生しました。
    ページを更新してください。`.replace(/ /g, '');

  static readonly SERIOUS: string =`\
    現在、このアプリは利用可能な状態ではありません。
    時間が経ってからアクセスし直してください。`.replace(/ /g, '');
}
