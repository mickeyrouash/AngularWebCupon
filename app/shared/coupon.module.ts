
export class Coupon {
  constructor(public ID: number, public title: string, public amount: number, public message: string,
              public type: string , public endDate: Date, public startDate: Date, public price: number , public image: string ) {
  }
}
