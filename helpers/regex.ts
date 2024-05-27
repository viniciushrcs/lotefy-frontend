export class Regex {
  static cleanCNPJ(cnpj: string | undefined): string {
    return cnpj?.replace(/[./-]/g, "") || "";
  }

  static formatDate(date: string | undefined) {
    const match = date?.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (!match) {
      throw new Error("Invalid date format. Expected DD/MM/YYYY.");
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const year = parseInt(match[3], 10);

    return new Date(year, month, day);
  }
}
