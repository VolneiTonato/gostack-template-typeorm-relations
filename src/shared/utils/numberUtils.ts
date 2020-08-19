export default class NumberUtils {
  static onlyNumber(value: string | number): number {
    return Number(value.toString().replace(/\D+/gi, ''));
  }

  static currencyBRLToDouble(
    value: string | number,
    isDefault = false,
  ): number | null {
    const valueAux = value.toString();
    let newNumber;

    if (/,/gi.test(valueAux))
      newNumber = Number(
        valueAux
          .replace('.', '')
          .replace(',', '.')
          .replace(/^\D+(\d{1,}\.\d{1,})?\D+/gi, `$1`),
      );
    else
      newNumber = Number(valueAux.replace(/^\D+(\d{1,}\.\d{1,})?\D+/gi, `$1`));

    if (!newNumber) return isDefault ? 0.0 : null;
    return Number(newNumber);
  }
}
