export class StringUtils {
  public static isEmpty(str?: string | null | undefined): boolean {
    return !str || str.trim() === "";
  }
}
