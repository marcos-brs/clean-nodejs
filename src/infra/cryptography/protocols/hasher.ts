export interface Hasher {
  hash: (plaintext: string) => Promise<string>;
  compare: (plaitext: string, digest: string) => Promise<boolean>;
}
