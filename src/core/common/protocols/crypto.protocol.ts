export interface TokenProtocol {
  sign(payload: any): Promise<string>;
  verify(token: string): Promise<any>;
}

export interface EncryptProtocol {
  encrypt(plaintext: any): Promise<string>;
}

export interface DecryptProtocol {
  encrypt(plaintext: string): Promise<any>;
}

export interface HashProtocol {
  hash(plaintext: string): Promise<string>;
}

export interface HashCompareProtocol {
  compare(plaintext: string, digest: string): Promise<boolean>;
}
