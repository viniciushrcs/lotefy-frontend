// Validation source: https://dicasdeprogramacao.com.br/algoritmo-para-validar-cpf/

export class CpfValidator {
  private static regex = /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/;

  static validate(cpf: string): boolean {
    if (!cpf) return false;
    if (!cpf.match(this.regex)) return false;

    const cpfNumbers: number[] = cpf
      .replace(/\D+/g, "")
      .split("")
      .map((d) => +d);

    const areAllNumbersEqual = cpfNumbers.every((n) => n === cpfNumbers[0]);
    if (areAllNumbersEqual) return false;

    if (!this.validateSecondFromLastDigit(cpfNumbers)) return false;
    if (!this.validateLastDigit(cpfNumbers)) return false;

    return true;
  }

  private static validateSecondFromLastDigit(cpfNumbers: number[]): boolean {
    const secondFromLastDigit = cpfNumbers[9];
    const firstNineCpfNumbers = cpfNumbers.slice(0, 9);

    let sum = 0;
    let cpfNumbersIndex = 0;
    for (let i = 10; i >= 2; i--) {
      sum += firstNineCpfNumbers[cpfNumbersIndex] * i;
      cpfNumbersIndex++;
    }

    let divisionRemainder = (sum * 10) % 11;
    if (divisionRemainder === 10) divisionRemainder = 0;

    if (divisionRemainder !== secondFromLastDigit) return false;

    return true;
  }

  private static validateLastDigit(cpfNumbers: number[]): boolean {
    const lastDigit = cpfNumbers[10];
    const firstTenCpfNumbers = cpfNumbers.slice(0, 10);

    let sum = 0;
    let cpfNumbersIndex = 0;
    for (let i = 11; i >= 2; i--) {
      sum += firstTenCpfNumbers[cpfNumbersIndex] * i;
      cpfNumbersIndex++;
    }

    let divisionRemainder = (sum * 10) % 11;
    if (divisionRemainder === 10) divisionRemainder = 0;

    if (divisionRemainder !== lastDigit) return false;

    return true;
  }
}
