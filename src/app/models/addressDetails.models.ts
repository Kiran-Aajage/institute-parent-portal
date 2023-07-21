// export class AddressDetails {
//   PostOffice!: string[];
//   COUNTRY!: string;
//   STATE!: string;
//   DISTRICT!: string;
// }
export class AddressDetails {
  getPinData(pinCode: any) {
      throw new Error('Method not implemented.');
  }
  Message!: string;
  Status!: string;
  PostOffice!: PostOffice[];
}
export class PostOffice {
  static Country(Country: any) {
      throw new Error('Method not implemented.');
  }
  Region!: string;
  State!: string;
  Country!: string;
}
