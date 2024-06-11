export class Regex {
  static cleanCNPJ(cnpj: string | undefined): string {
    return cnpj?.replace(/[./-]/g, "") || "";
  }

  static cleanCPF(cpf: string | undefined): string {
    return cpf?.replace(/[.-]/g, "") || "";
  }

  static formatDate(date: string | undefined) {
    const match = date?.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const year = parseInt(match[3], 10);
      return new Date(year, month, day);
    }

    return new Date();
  }

  static dateTransform(dateStr: string): string {
    const [year, month, day] = dateStr.split("-");

    let formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  static getInitials(fullName: string | undefined): string {
    const match = fullName?.match(/\b\w/g);

    if (match && fullName && match.length > 1) {
      const initials = match[0] + match[1];
      return initials.toUpperCase();
    } else if (match && fullName && match.length === 1) {
      const firstTwoLetters = fullName.substring(0, 2).toUpperCase();
      return firstTwoLetters;
    }
    return "";
  }
}
