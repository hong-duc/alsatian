export class Promise<T> {

   private _resolveCallback: (resolvedValue?: T) => any = () => {};
   private _rejectCallback: (error: Error) => any = () => {};

   public constructor(asyncFunction: (resolve: (resolvedValue?: T) => any, reject: (error: Error) => any) => any) {
      setTimeout(() => {
         try {
            asyncFunction(this._resolve.bind(this), this._reject.bind(this));
         }
         catch (error) {
            this._rejectCallback(error);
         }
      });
   }

   private _resolve(resolvedValue?: T) {
      try {
         this._resolveCallback(resolvedValue);
      }
      catch (error) {
         this._reject(error);
      }

   }

   private _reject(error: Error) {
      this._rejectCallback(error);
   }

   public then(callback: (resolvedValue?: T) => any) {
      this._resolveCallback = callback;
      return this;
   }

   public catch(callback: (error: Error) => any) {
      this._rejectCallback = callback;
      return this;
   }
}
