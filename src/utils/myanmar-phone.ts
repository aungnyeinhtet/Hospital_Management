export class MyanmarPhoneValidator {
  constructor(private phoneNumber: string) {}

  /**
   * clean phone number
   *
   * @param phoneNumber string
   * @returns string
   */
  private sanitizeInput(phoneNumber: string): string {
    return phoneNumber.trim().replace(/[- )(]/g, "");
  }

  /**
   * check is valid myanmar phone or not
   *
   * @returns boolean
   */
  public isValidPhone(): boolean {
    const phoneNumber = this.normalizeInput(this.phoneNumber);

    return this.checkValidNumber(phoneNumber);
  }

  /**
   * normalize input
   *
   * @param phoneNumber string
   * @returns
   */
  private normalizeInput(phoneNumber: string) {
    // TODO convert myanmar number

    return this.sanitizeInput(phoneNumber);
  }

  /**
   * clean double country code
   *
   * @param phoneNumber string
   * @returns
   */
  private cleanDoubleCountryCode(phoneNumber: string) {
    const replacer = phoneNumber.replace(/^\+?95959/, "");

    return phoneNumber.replace(/^\+?95950?9\d{7,9}$/, replacer);
  }

  /**
   * get phone number is valid or not
   *
   * @param phoneNumber string
   * @returns
   */
  private checkValidNumber(phoneNumber: string): boolean {
    const sanitizedNumber = this.sanitizeInput(phoneNumber);
    const commomPhoneNumber = this.checkCommonPhoneNumber(sanitizedNumber);

    return commomPhoneNumber ? this.isValidTelecom(phoneNumber) : false;
  }

  /**
   * check common phone number
   *
   * @param phoneNumber string
   * @returns
   */
  private checkCommonPhoneNumber(phoneNumber: string) {
    return /^(09|\+?950?9|\+?95950?9)\d{7,9}$/.test(phoneNumber);
  }

  /**
   * check value is MEC phone or not
   *
   * @param phoneNumber
   * @returns
   */
  private isMEC(phoneNumber: string) {
    console.log(phoneNumber, "is MEC");
    return /^(09|\+?959)3\d{7}$/.test(phoneNumber);
  }

  /**
   * check value is MPT phone or not
   *
   * @param phoneNumber string
   * @returns
   */
  private isMPT(phoneNumber: string) {
    console.log(phoneNumber, "MPT run");
    return /^(09|\+?959)(2[0-4]\d{5}|5[0-6]\d{5}|8[13-7]\d{5}|4[1379]\d{6}|73\d{6}|91\d{6}|25\d{7}|26[0-5]\d{6}|40[0-4]\d{6}|42\d{7}|44[0-589]\d{6}|45\d{7}|87\d{7}|88\d{7}|89[6789]\d{6})$/.test(
      phoneNumber,
    );
  }

  /**
   * check value is Mytel phone or not
   *
   * @param phoneNumber string
   * @returns
   */
  private isMytel(phoneNumber: string) {
    console.log(phoneNumber, "Mytel run");
    return /^(09|\+?959)6\d{8}$/.test(phoneNumber);
  }

  /**
   * check value is Ooredoo phone or not
   *
   * @param phoneNumber string
   * @returns
   */
  private isOoredoo(phoneNumber: string) {
    console.log(phoneNumber, "Ooredoo run");
    return /^(09|\+?959)9\d{8}$/.test(phoneNumber);
  }

  /**
   * check value is Meta phone or not
   *
   * @param phoneNumber string
   * @returns
   */
  private isMeta(phoneNumber: string) {
    console.log(phoneNumber, "Meta run");
    return /^(09|\+?959)7\d{8}$/.test(phoneNumber);
  }

  /**
   * get telecom name
   *
   * @param phoneNumber string
   */
  private isValidTelecom(phoneNumber: string) {
    return [
      this.isMEC(phoneNumber),
      this.isMPT(phoneNumber),
      this.isMytel(phoneNumber),
      this.isOoredoo(phoneNumber),
      this.isMeta(phoneNumber),
    ].some((value) => value);
  }
}
