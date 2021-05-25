export interface Encrypter {
  encrypt: (data: any) => Promise<string>;
  decrypt: (ciphertext: string) => Promise<string>;
}
